import { servicesPage } from "@/content/services";

export function TechnologyStrip() {
  return (
    <section className="technology-strip py-section" data-surface="dark" aria-labelledby="technology-heading">
      <div className="site-container">
        <h2 id="technology-heading" className="font-display text-heading-lg font-semibold">{servicesPage.technology.heading}</h2>
        <p className="technology-strip__body">{servicesPage.technology.body}</p>
        <div className="technology-strip__fade">
          <div className="technology-strip__scroll" role="region" tabIndex={0} aria-labelledby="technology-heading">
            <ul className="technology-strip__names">
              {servicesPage.technology.names.map((name) => <li key={name}>{name}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
