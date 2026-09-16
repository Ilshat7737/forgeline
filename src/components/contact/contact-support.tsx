import { ContactArtwork } from "@/components/contact/contact-artwork";
import { contactPage } from "@/content/contact";

export function ContactSupport() {
  return (
    <section className="contact-support" aria-labelledby="contact-next-heading">
      <h2 id="contact-next-heading">{contactPage.next.heading}</h2>
      <p className="contact-support__body">{contactPage.next.body}</p>
      <ul className="contact-support__points">
        {contactPage.supportingPoints.map((point) => <li key={point}>{point}</li>)}
      </ul>
      <div className="contact-support__art">
        <ContactArtwork />
      </div>
    </section>
  );
}
