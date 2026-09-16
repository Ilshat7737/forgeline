import { Card } from "@/components/ui/card";
import { ArrowIcon } from "@/components/ui/arrow-icon";
import { home } from "@/content/home";
import { homeLayout } from "@/content/home-layout";
import { TechnologyMark } from "./technology-mark";

export function StudioStrip() {
  return <div className="studio-strip">
    <Card surface="dark" className="technology-card">
      <ul className="technology-marks" aria-label={home.hero.technologies}>{homeLayout.technologyNames.map(name => <li key={name}><TechnologyMark name={name} /><span>{name}</span></li>)}</ul>
      <p>{homeLayout.technologies}</p>
    </Card>
    <Card className="status-card" role="img" aria-label={homeLayout.status.label}>
      <div aria-hidden="true">
        <p className="status-card__title">{homeLayout.status.title}<i /></p>
        <div className="status-card__body"><ul>{homeLayout.status.steps.map((step, index) => <li key={step}><span data-step={index}>{index === 0 ? "✓" : ""}</span>{step}</li>)}</ul><strong>{homeLayout.status.progress}</strong></div>
        <div className="status-card__track"><span /></div>
      </div>
    </Card>
    <Card surface="dark" padding="none" className="scroll-card"><a href="#about"><span>{homeLayout.scroll}</span><ArrowIcon direction="south" variant="long" /></a></Card>
  </div>;
}
