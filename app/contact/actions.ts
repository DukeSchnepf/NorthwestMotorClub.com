"use server";

import { contactSchema, type ContactInput } from "@/lib/contactSchema";

export type ContactResult = { ok: true } | { ok: false; error: string };

/**
 * NOTE: no email backend wired yet (Duke to choose — surfaced in the
 * asset-gap list). Validates and acknowledges; does not deliver mail.
 */
export async function submitContact(
  input: ContactInput,
): Promise<ContactResult> {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Please check the form and try again." };
  }
  // TODO(Duke): deliver via Resend/Postmark.
  return { ok: true };
}
