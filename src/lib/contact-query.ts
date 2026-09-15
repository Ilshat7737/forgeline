import { contactProjectSuggestion, contactServiceMapping, type ContactServiceOption } from "@/content/contact";
import { workConcepts } from "@/content/work";

export type ContactSearchParams = Record<string, string | string[] | undefined>;
export type ContactDefaults = { services: ContactServiceOption[]; project: string };

export function resolveContactQuery(searchParams: ContactSearchParams): ContactDefaults {
  const { service, project } = searchParams;
  const option = typeof service === "string" && Object.hasOwn(contactServiceMapping, service)
    ? contactServiceMapping[service as keyof typeof contactServiceMapping] : undefined;
  const concept = typeof project === "string" ? workConcepts.find((entry) => entry.id === project) : undefined;
  return { services: option ? [option] : [], project: concept ? contactProjectSuggestion(concept.title) : "" };
}
