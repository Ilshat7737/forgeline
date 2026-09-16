import { servicesPage } from "@/content/services";
import { Card, type CardSurface } from "@/components/ui/card";
import { Icon, type IconName } from "@/components/ui/icon";

import "@/styles/delivery-principles.css";

const surfaces: readonly CardSurface[] = ["white", "lavender", "dark"];
const icons: readonly IconName[] = ["scan", "cube", "users"];

export function DeliveryPrinciples({ principles = servicesPage.principles, level = 2 }: {
  principles?: readonly { title: string; body: string }[];
  level?: 2 | 3;
}) {
  const Heading = level === 2 ? "h2" : "h3";
  return (
    <div className="delivery-principles">
      {principles.map((principle, index) => (
        <Card as="section" key={principle.title} surface={surfaces[index]} shadow="soft">
          <Icon name={icons[index]} />
          <Heading>{principle.title}</Heading>
          <p>{principle.body}</p>
        </Card>
      ))}
    </div>
  );
}
