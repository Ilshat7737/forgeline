import { serviceSituations, type ServiceGroupId, type ServiceSituationId } from "@/content/services";

export function groupsForSituation(situation: ServiceSituationId): readonly ServiceGroupId[] {
  return serviceSituations.find(({ id }) => id === situation)?.groups ?? [];
}
