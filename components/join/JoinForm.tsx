"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { joinSchema, type JoinInput } from "@/lib/joinSchema";
import { submitJoin } from "@/app/join/actions";

const FIELDS: {
  name: keyof JoinInput;
  label: string;
  type?: string;
  textarea?: boolean;
  placeholder: string;
}[] = [
  { name: "name", label: "Name", placeholder: "First name is fine" },
  { name: "email", label: "Email", type: "email", placeholder: "you@example.com" },
  { name: "instagram", label: "Instagram", placeholder: "@yourhandle" },
  { name: "vehicle", label: "Vehicle (Year / Make / Model)", placeholder: "1998 Ford Ranger XLT" },
  { name: "city", label: "City", placeholder: "Bellevue" },
  { name: "why", label: "Why do you want to join?", textarea: true, placeholder: "Tell us about your car and what you're after." },
];

export default function JoinForm() {
  const [done, setDone] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<JoinInput>({ resolver: zodResolver(joinSchema) });

  if (done) {
    return (
      <div
        role="status"
        className="flex flex-col items-center gap-5 border border-line bg-raised px-8 py-16 text-center"
      >
        <span className="check-pop flex h-16 w-16 items-center justify-center rounded-full bg-lime text-2xl text-ink">
          ✓
        </span>
        <h2 className="font-display text-3xl text-fg">We&apos;ll be in touch</h2>
        <p className="max-w-sm text-muted">
          Request received. Keep an eye on your DMs — and follow the club for
          the next meet drop.
        </p>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(async (data) => {
        setServerError(null);
        const res = await submitJoin(data);
        if (res.ok) setDone(true);
        else setServerError(res.error);
      })}
      className="flex flex-col gap-6"
    >
      {FIELDS.map((f) => {
        const err = errors[f.name]?.message;
        return (
          <div key={f.name} className="flex flex-col gap-2">
            <label
              htmlFor={f.name}
              className="font-mono text-xs uppercase tracking-[0.2em] text-muted"
            >
              {f.label}
            </label>
            {f.textarea ? (
              <textarea
                id={f.name}
                rows={4}
                aria-invalid={!!err}
                aria-describedby={err ? `${f.name}-error` : undefined}
                placeholder={f.placeholder}
                className="border border-line bg-base px-4 py-3 text-fg outline-none placeholder:text-dim focus-visible:border-lime"
                {...register(f.name)}
              />
            ) : (
              <input
                id={f.name}
                type={f.type ?? "text"}
                aria-invalid={!!err}
                aria-describedby={err ? `${f.name}-error` : undefined}
                placeholder={f.placeholder}
                className="border border-line bg-base px-4 py-3 text-fg outline-none placeholder:text-dim focus-visible:border-lime"
                {...register(f.name)}
              />
            )}
            {err && (
              <p
                id={`${f.name}-error`}
                role="alert"
                className="font-mono text-xs text-rust"
              >
                {err}
              </p>
            )}
          </div>
        );
      })}

      {serverError && (
        <p role="alert" aria-live="polite" className="font-mono text-xs text-rust">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 self-start rounded-full bg-lime px-8 py-3.5 font-mono text-sm font-semibold uppercase tracking-[0.15em] text-ink transition-transform duration-200 ease-exit hover:scale-105 disabled:opacity-60"
      >
        {isSubmitting ? "Sending…" : "Send it"}
      </button>
    </form>
  );
}
