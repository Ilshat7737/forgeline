import { servicesPage } from "@/content/services";
import { Card, type CardSurface } from "@/components/ui/card";
import { Icon, type IconName } from "@/components/ui/icon";

const surfaces: readonly CardSurface[] = ["white", "lavender", "dark"];
const icons: readonly IconName[] = ["scan", "cube", "users"];

export function DeliveryPrinciples() {
  return (
    <div className="delivery-principles">
      {servicesPage.principles.map((principle, index) => (
        <Card as="section" key={principle.title} surface={surfaces[index]} shadow="soft">
          <Icon name={icons[index]} />
          <h2>{principle.title}</h2>
          <p>{principle.body}</p>
        </Card>
      ))}
    </div>
  );
}
