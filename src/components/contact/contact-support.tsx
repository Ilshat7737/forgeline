import { contactPage } from "@/content/contact";

export function ContactSupport() {
  return (
    <div className="contact-support">
      <ul className="contact-support__points">
        {contactPage.supportingPoints.map((point) => <li key={point}>{point}</li>)}
      </ul>
      <section aria-labelledby="contact-next-heading">
        <h2 id="contact-next-heading">{contactPage.next.heading}</h2>
        <p>{contactPage.next.body}</p>
      </section>
    </div>
  );
}
