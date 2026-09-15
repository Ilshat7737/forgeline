import { SectionLabel } from "@/components/ui/section-label";
import { home } from "@/content/home";

export function ValueStatement() {
  return (
    <section id="about" className="home-section home-section--light" data-surface="light" aria-labelledby="about-heading">
      <div className="site-container">
        <SectionLabel>{home.about.label}</SectionLabel>
        <div className="value-statement content-grid">
          <h2 id="about-heading" className="home-display">{home.about.heading}</h2>
          <div className="value-statement__body">
            <p>{home.about.body}</p>
            <SectionLabel className="value-statement__note">{home.about.note}</SectionLabel>
          </div>
        </div>
      </div>
    </section>
  );
}
