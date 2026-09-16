import { Card } from "@/components/ui/card";
import { Icon, type IconName } from "@/components/ui/icon";
import { ArrowIcon } from "@/components/ui/arrow-icon";
import { home } from "@/content/home";
import "@/styles/process.css";

const icons: readonly IconName[] = ["conversation", "scan", "workflow", "play"];

export function ProcessSteps({ steps = home.process.steps }: { steps?: readonly { title: string; body: string }[] }) {
  return (
    <ol className="process-steps">
      {steps.map((step, index) => (
        <li key={step.title}>
          <Card className="process-step" shadow="soft">
            <div className="process-step__top">
              <span className="process-step__icon"><Icon name={icons[index]} /></span>
              <span>{String(index + 1).padStart(2, "0")}</span>
            </div>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </Card>
          {index < steps.length - 1 && <ArrowIcon direction="east" className="process-step__connector" />}
        </li>
      ))}
    </ol>
  );
}
