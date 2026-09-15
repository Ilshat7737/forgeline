import { home } from "@/content/home";

export function ProcessSection() {
  return (
    <section id="approach" className="home-section home-section--light" data-surface="light" aria-labelledby="approach-heading">
      <div className="site-container">
        <h2 id="approach-heading" className="home-section__heading">{home.process.heading}</h2>
        <ol className="process-steps">
          {home.process.steps.map((step, index) => (
            <li key={step.title} className="process-step">
              <span className="process-step__number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
