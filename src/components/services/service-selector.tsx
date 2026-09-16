"use client";

import { useRef, useState, useSyncExternalStore, type KeyboardEvent, type ReactNode } from "react";
import { serviceSituations, servicesPage, type ServiceGroupId, type ServiceSituationId } from "@/content/services";
import { groupsForSituation } from "@/lib/service-selector";
import { SectionHeading } from "@/components/ui/section-heading";

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export function ServiceSelector({ groups }: { groups: readonly { id: ServiceGroupId; content: ReactNode }[] }) {
  const enhanced = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [selected, setSelected] = useState<ServiceSituationId>(serviceSituations[0].id);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const relevantGroups = groupsForSituation(selected);

  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    switch (event.key) {
      case "ArrowRight": case "ArrowDown": next = (index + 1) % serviceSituations.length; break;
      case "ArrowLeft": case "ArrowUp": next = (index - 1 + serviceSituations.length) % serviceSituations.length; break;
      case "Home": next = 0; break;
      case "End": next = serviceSituations.length - 1; break;
      default: return;
    }
    event.preventDefault();
    setSelected(serviceSituations[next].id);
    buttons.current[next]?.focus();
  }

  return (
    <div className="services-catalogue">
      <section className="service-selector" aria-labelledby="situation-heading">
        <SectionHeading headingId="situation-heading" heading={servicesPage.selector.heading} />
        <div className="service-selector__tabs" role={enhanced ? "tablist" : undefined} aria-labelledby="situation-heading">
          {serviceSituations.map((situation, index) => (
            <button
              key={situation.id}
              ref={(node) => { buttons.current[index] = node; }}
              type="button"
              id={`situation-${situation.id}`}
              role={enhanced ? "tab" : undefined}
              aria-selected={enhanced ? selected === situation.id : undefined}
              aria-controls={enhanced ? `situation-panel-${situation.id}` : undefined}
              tabIndex={enhanced && selected !== situation.id ? -1 : 0}
              onClick={() => setSelected(situation.id)}
              onKeyDown={(event) => navigate(event, index)}
            >
              {situation.title}
            </button>
          ))}
        </div>
        <div className="service-selector__panels">
          {serviceSituations.map((situation) => (
            <div
              key={situation.id}
              id={`situation-panel-${situation.id}`}
              role={enhanced ? "tabpanel" : "region"}
              aria-labelledby={`situation-${situation.id}`}
              tabIndex={enhanced ? 0 : undefined}
              hidden={enhanced && selected !== situation.id}
            >
              <p className="service-selector__fallback-title" hidden={enhanced}>{situation.title}</p>
              <p>{situation.body}</p>
            </div>
          ))}
        </div>
      </section>
      <div className="service-groups">
        {groups.map((group) => (
          <div key={group.id} data-relevant={enhanced && relevantGroups.includes(group.id)}>
            {group.content}
          </div>
        ))}
      </div>
    </div>
  );
}
