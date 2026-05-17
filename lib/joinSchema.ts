import { z } from "zod";

export const joinSchema = z.object({
  name: z.string().min(2, "Tell us your name").max(80),
  email: z.string().email("Enter a valid email"),
  instagram: z.string().min(2, "Your @handle").max(40),
  vehicle: z.string().min(2, "Year / make / model").max(80),
  city: z.string().min(2, "Your city").max(60),
  why: z.string().min(10, "A sentence or two").max(600),
});

export type JoinInput = z.infer<typeof joinSchema>;
