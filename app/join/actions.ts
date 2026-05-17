"use server";

import { joinSchema, type JoinInput } from "@/lib/joinSchema";

export type JoinResult =
  | { ok: true }
  | { ok: false; error: string };

/**
 * Server-side re-validation of the join request.
 *
 * NOTE: no email backend / store is wired yet (Duke to choose Resend vs
 * Postmark vs Airtable — surfaced in the asset-gap list). Until then this
 * validates and acknowledges; it does NOT persist or notify anyone.
 */
export async function submitJoin(input: JoinInput): Promise<JoinResult> {
  const parsed = joinSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Please check the form and try again." };
  }
  // TODO(Duke): send via Resend/Postmark + log to Airtable/JSON.
  return { ok: true };
}
