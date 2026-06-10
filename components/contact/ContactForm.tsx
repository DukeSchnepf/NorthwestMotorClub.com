"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactInput } from "@/lib/contactSchema";
import { submitContact } from "@/app/contact/actions";

export default function ContactForm() {
  const [done, setDone] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  if (done) {
    return (
      <div
        role="status"
        className="flex flex-col items-center gap-4 border border-line bg-raised px-8 py-12 text-center"
      >
        <span className="check-pop flex h-14 w-14 items-center justify-center rounded-full bg-moss text-xl text-ink">
          ✓
        </span>
        <p className="font-display text-2xl text-fg">Message sent</p>
        <p className="text-sm text-muted">We&apos;ll get back to you.</p>
      </div>
    );
  }

  const fields: {
    name: keyof ContactInput;
    label: string;
    type?: string;
    textarea?: boolean;
  }[] = [
    { name: "name", label: "Name" },
    { name: "email", label: "Email", type: "email" },
    { name: "message", label: "Message", textarea: true },
  ];

  return (
    <form
      noValidate
      onSubmit={handleSubmit(async (data) => {
        setServerError(null);
        const res = await submitContact(data);
        if (res.ok) setDone(true);
        else setServerError(res.error);
      })}
      className="flex flex-col gap-6"
    >
      {fields.map((f) => {
        const err = errors[f.name]?.message;
        return (
          <div key={f.name} className="flex flex-col gap-2">
            <label
              htmlFor={`c-${f.name}`}
              className="font-mono text-xs uppercase tracking-[0.2em] text-muted"
            >
              {f.label}
            </label>
            {f.textarea ? (
              <textarea
                id={`c-${f.name}`}
                rows={5}
                aria-invalid={!!err}
                aria-describedby={err ? `c-${f.name}-error` : undefined}
                className="border border-line bg-base px-4 py-3 text-fg outline-none placeholder:text-dim focus-visible:border-moss"
                {...register(f.name)}
              />
            ) : (
              <input
                id={`c-${f.name}`}
                type={f.type ?? "text"}
                aria-invalid={!!err}
                aria-describedby={err ? `c-${f.name}-error` : undefined}
                className="border border-line bg-base px-4 py-3 text-fg outline-none placeholder:text-dim focus-visible:border-moss"
                {...register(f.name)}
              />
            )}
            {err && (
              <p
                id={`c-${f.name}-error`}
                role="alert"
                className="font-mono text-xs text-cedar"
              >
                {err}
              </p>
            )}
          </div>
        );
      })}

      {serverError && (
        <p role="alert" aria-live="polite" className="font-mono text-xs text-cedar">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 self-start rounded-full bg-moss px-8 py-3.5 font-mono text-sm font-semibold uppercase tracking-[0.15em] text-ink transition-transform duration-200 ease-exit hover:scale-105 disabled:opacity-60"
      >
        {isSubmitting ? "Sending…" : "Send"}
      </button>
    </form>
  );
}
