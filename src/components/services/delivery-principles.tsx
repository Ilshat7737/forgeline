import { servicesPage } from "@/content/services";

export function DeliveryPrinciples() {
  return (
    <div className="delivery-principles py-section" data-surface="light">
      <div className="site-container delivery-principles__grid">
        {servicesPage.principles.map((principle) => (
          <section key={principle.title}>
            <h2 className="font-display text-heading-md font-semibold">{principle.title}</h2>
            <p>{principle.body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
