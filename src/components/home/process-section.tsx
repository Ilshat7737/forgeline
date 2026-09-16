import { Card } from "@/components/ui/card";
import { Icon, type IconName } from "@/components/ui/icon";
import { ArrowIcon } from "@/components/ui/arrow-icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { home } from "@/content/home";
import { homeLayout } from "@/content/home-layout";
const icons: IconName[] = ["conversation", "scan", "workflow", "play"];
export function ProcessSection() {
  return <section id="approach" className="home-section" aria-labelledby="approach-heading">
    <SectionHeading label={homeLayout.processLabel} heading={home.process.heading} headingId="approach-heading" supporting={homeLayout.processSupporting} />
    <ol className="process-steps">{home.process.steps.map((step, index) => <li key={step.title}>
      <Card className="process-step" shadow="soft"><div className="process-step__top"><span className="process-step__icon"><Icon name={icons[index]} /></span><span>{String(index + 1).padStart(2, "0")}</span></div><h3>{step.title}</h3><p>{step.body}</p></Card>
      {index < 3 && <ArrowIcon direction="east" className="process-step__connector" />}
    </li>)}</ol>
  </section>;
}
