import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { submitProjectEnquiry } from "@/app/contact/actions";
import { contactErrors, contactPage } from "@/content/contact";
import type { EnquiryResult } from "@/lib/enquiry/types";
import { EnquiryForm } from "./enquiry-form";
import { ProjectEnquiryForm } from "./project-enquiry-form";

vi.mock("@/app/contact/actions", () => ({ submitProjectEnquiry: vi.fn() }));
const submit = vi.mocked(submitProjectEnquiry);
const project = "We need a customer portal to replace our spreadsheet workflow.";
function fill() {
  fireEvent.change(screen.getByLabelText(/Your name/), { target: { value: "  Alex Morgan  " } });
  fireEvent.change(screen.getByLabelText(/Work email/), { target: { value: "alex@example.com" } });
  fireEvent.change(screen.getByRole("textbox", { name: /Tell us about your project/ }), { target: { value: project } });
}
function send() { fireEvent.click(screen.getByRole("button", { name: contactPage.submit })); }
function renderShort() { render(<EnquiryForm compact defaults={{ services: [], project: "" }} />); }
beforeEach(() => { submit.mockReset(); });
afterEach(() => { cleanup(); vi.unstubAllEnvs(); });

describe("short Home enquiry", () => {
  it("shows only the three visitor fields, associates errors, and focuses the summary on each failed attempt", async () => {
    renderShort();
    expect(screen.getAllByRole("textbox")).toHaveLength(3);
    expect(screen.queryByRole("checkbox")).toBeNull();
    send();
    const heading = await screen.findByText(contactPage.errorSummary);
    await waitFor(() => expect(document.activeElement).toBe(heading.parentElement));
    for (const [id, message] of [["name", contactErrors.name], ["email", contactErrors.email], ["project", contactErrors.project]]) {
      const field = document.getElementById(`contact-${id}`)!;
      expect(field.getAttribute("aria-invalid")).toBe("true");
      expect(field.getAttribute("aria-describedby")).toBe(`contact-${id}-error`);
      expect(document.getElementById(`contact-${id}-error`)?.textContent).toBe(message);
    }
    fireEvent.click(screen.getByRole("link", { name: `Work email: ${contactErrors.email}` }));
    expect(document.activeElement).toBe(screen.getByLabelText(/Work email/));
    send();
    await waitFor(() => expect(document.activeElement).toBe(heading.parentElement));
    expect(submit).not.toHaveBeenCalled();
  });

  it("submits the trimmed subset, prevents resubmission while pending, and focuses the shared success state", async () => {
    let finish!: (result: EnquiryResult) => void;
    submit.mockImplementation(() => new Promise(resolve => { finish = resolve; }));
    renderShort(); fill(); send();
    const pending = await screen.findByRole("button", { name: contactPage.pending });
    expect((pending as HTMLButtonElement).disabled).toBe(true);
    expect(screen.getByRole("form").getAttribute("aria-busy")).toBe("true");
    expect(screen.getByLabelText(/Your name/).closest("fieldset")?.disabled).toBe(true);
    fireEvent.click(pending);
    expect(submit).toHaveBeenCalledTimes(1);
    expect(submit).toHaveBeenCalledWith({ name: "Alex Morgan", email: "alex@example.com", project, services: [], ndaRequested: false, website: "" });
    await act(async () => finish({ status: "success", enquiryId: "dev-test", development: true }));
    const success = screen.getByRole("heading", { name: contactPage.success.heading });
    expect(document.activeElement).toBe(success);
    expect(screen.getByText(contactPage.success.development)).toBeTruthy();
    expect(screen.queryByRole("form")).toBeNull();
  });

  it("maps server field errors into the same summary and inline description", async () => {
    submit.mockResolvedValue({ status: "invalid", fieldErrors: { email: contactErrors.email } });
    renderShort(); fill(); send();
    const heading = await screen.findByText(contactPage.errorSummary);
    await waitFor(() => expect(document.activeElement).toBe(heading.parentElement));
    expect(screen.getByLabelText(/Work email/).getAttribute("aria-describedby")).toBe("contact-email-error");
  });

  it("fails closed with the real production action and preserves the entered values", async () => {
    vi.stubEnv("NODE_ENV", "production");
    const actual = await vi.importActual<typeof import("@/app/contact/actions")>("@/app/contact/actions");
    submit.mockImplementation(actual.submitProjectEnquiry);
    renderShort(); fill(); send();
    expect((await screen.findByRole("alert")).textContent).toBe(contactErrors.notConfigured);
    expect((screen.getByRole("textbox", { name: /Tell us about your project/ }) as HTMLTextAreaElement).value).toBe(project);
    expect(screen.queryByText(contactPage.success.heading)).toBeNull();
    expect((screen.getByRole("button", { name: contactPage.submit }) as HTMLButtonElement).disabled).toBe(false);
  });

  it("preserves values after a transport failure and allows a retry", async () => {
    submit.mockRejectedValueOnce(new Error("Network unavailable")).mockResolvedValueOnce({ status: "success", enquiryId: "ok", development: false });
    renderShort(); fill(); send();
    expect((await screen.findByRole("alert")).textContent).toBe(contactErrors.general);
    expect((screen.getByRole("textbox", { name: /Tell us about your project/ }) as HTMLTextAreaElement).value).toBe(project);
    send();
    await screen.findByRole("heading", { name: contactPage.success.heading });
    expect(submit).toHaveBeenCalledTimes(2);
    expect(screen.queryByText(contactPage.success.development)).toBeNull();
  });

  it("keeps the honeypot outside the tab order and rejects a filled trap with the real action", async () => {
    const actual = await vi.importActual<typeof import("@/app/contact/actions")>("@/app/contact/actions");
    submit.mockImplementation(actual.submitProjectEnquiry);
    renderShort(); fill();
    const trap = document.getElementById("contact-website")!;
    expect(trap.tabIndex).toBe(-1);
    expect(trap.parentElement?.getAttribute("aria-hidden")).toBe("true");
    fireEvent.change(trap, { target: { value: "bot.example" } }); send();
    await waitFor(() => expect(submit).toHaveBeenCalled());
    await waitFor(() => expect(screen.getByRole("form").getAttribute("aria-busy")).toBe("false"));
    expect(screen.queryByText(contactPage.success.heading)).toBeNull();
  });
});

describe("shared full form", () => {
  it("retains query defaults, optional fields and NDA submission", async () => {
    submit.mockResolvedValue({ status: "success", enquiryId: "ok", development: false });
    render(<ProjectEnquiryForm defaults={{ services: ["web-development"], project }} />);
    expect((screen.getByRole("checkbox", { name: "Web development" }) as HTMLInputElement).checked).toBe(true);
    expect((screen.getByRole("textbox", { name: /Tell us about your project/ }) as HTMLTextAreaElement).value).toBe(project);
    fill();
    fireEvent.change(screen.getByLabelText(/Company/), { target: { value: "Example" } });
    fireEvent.click(screen.getByRole("checkbox", { name: /NDA/ }));
    send();
    await screen.findByRole("heading", { name: contactPage.success.heading });
    expect(submit).toHaveBeenCalledWith(expect.objectContaining({ company: "Example", services: ["web-development"], ndaRequested: true }));
  });
});
