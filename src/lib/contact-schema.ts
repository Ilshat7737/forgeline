import { z } from "zod";
import { contactErrors, contactServiceOptions } from "@/content/contact";

export const contactSchema = z.object({
  name: z.string({ error: contactErrors.name }).trim().min(2, contactErrors.name).max(100, contactErrors.name),
  email: z.string({ error: contactErrors.email }).trim().max(254, contactErrors.email).pipe(z.email({ error: contactErrors.email })),
  company: z.string({ error: contactErrors.company }).trim().max(120, contactErrors.company).optional(),
  services: z.array(z.enum(contactServiceOptions.map((option) => option.value), { error: contactErrors.services }), { error: contactErrors.services }),
  project: z.string({ error: contactErrors.project }).trim().min(20, contactErrors.project).max(4000, contactErrors.project),
  timing: z.string({ error: contactErrors.timing }).trim().max(160, contactErrors.timing).optional(),
  ndaRequested: z.boolean({ error: contactErrors.ndaRequested }),
});

export type ContactValues = z.infer<typeof contactSchema>;
