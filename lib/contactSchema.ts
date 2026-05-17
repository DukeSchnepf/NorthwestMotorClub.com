import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Your name").max(80),
  email: z.string().email("Enter a valid email"),
  message: z.string().min(10, "A sentence or two").max(800),
});

export type ContactInput = z.infer<typeof contactSchema>;
