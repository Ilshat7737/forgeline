type SampleRecord = { name: string; owner: string; status: string };
type WorkArtworkContent = {
  sample: string;
  workflow: { title: string; tabs: readonly string[]; columns: readonly string[]; records: readonly SampleRecord[]; detail: string; reason: string; owner: string; action: string; history: string };
  creative: { title: string; filesLabel: string; files: readonly string[]; preview: string; review: string; notes: readonly string[]; timeline: string; versions: readonly string[]; saved: string };
  processing: { title: string; action: string; stages: readonly string[]; columns: readonly string[]; jobs: readonly { name: string; status: string; progress: number }[]; issue: string; reason: string; retry: string };
  delivery: { title: string; stages: readonly { title: string; cards: readonly { title: string; detail: string }[] }[]; blocker: string; reason: string; owner: string; waiting: string };
};

// Neutral sample interface data only; these are not project outcomes.
export const workArtwork = {
  sample: "SAMPLE WORKSPACE",
  workflow: {
    title: "Approval queue", tabs: ["All requests", "Needs review", "Decision history"],
    columns: ["Request", "Owner", "Status"],
    records: [{ name: "Request A", owner: "Reviewer A", status: "In review" }, { name: "Request B", owner: "Reviewer B", status: "Exception" }, { name: "Request C", owner: "Reviewer A", status: "Approved" }],
    detail: "Request B / Exception", reason: "Supporting file required", owner: "Assigned to Reviewer B", action: "Request information", history: "Submitted → Validation → Review",
  },
  creative: {
    title: "Production workspace", filesLabel: "Local files", files: ["Composition A", "Study B", "Sequence C"], preview: "Composition A / Preview",
    review: "Review notes", notes: ["Simplify the opening", "Keep the wider frame"], timeline: "Version history", versions: ["Draft A", "Draft B", "Current"], saved: "Saved locally",
  },
  processing: {
    title: "Processing console", action: "Configure job", stages: ["Input", "Validate", "Process", "Export"],
    columns: ["Job", "Progress", "Status"], jobs: [{ name: "Asset A", status: "Processing", progress: 65 }, { name: "Asset B", status: "Needs input", progress: 25 }, { name: "Asset C", status: "Queued", progress: 0 }],
    issue: "Asset B / Validation", reason: "A required input is missing.", retry: "Review & retry",
  },
  delivery: {
    title: "Delivery flow",
    stages: [
      { title: "Planned", cards: [{ title: "Work item A", detail: "Scope ready" }] },
      { title: "In progress", cards: [{ title: "Work item B", detail: "Dependency pending" }] },
      { title: "Review", cards: [{ title: "Work item C", detail: "Awaiting review" }, { title: "Work item D", detail: "Feedback received" }] },
    ],
    blocker: "Work item B / Blocked", reason: "Waiting for the input from work item A.", owner: "Owner: Team A", waiting: "Waiting: 1 day / sample",
  },
} as const satisfies WorkArtworkContent;
