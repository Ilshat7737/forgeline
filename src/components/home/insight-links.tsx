import { SectionLabel } from "@/components/ui/section-label";
import { home } from "@/content/home";

export function InsightLinks() {
  return (
    <section className="home-section" data-surface="dark" aria-labelledby="insights-heading">
      <div className="site-container">
        <SectionLabel>{home.insights.label}</SectionLabel>
        <h2 id="insights-heading" className="home-section__heading">{home.insights.heading}</h2>
        <div className="insight-entries">
          {home.insights.entries.map((entry) => (
            <article key={entry.title} className="insight-entry">
              <SectionLabel>{home.insights.status}</SectionLabel>
              <h3>{entry.title}</h3>
              <p className="insight-entry__summary">{entry.summary}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
