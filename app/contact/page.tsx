import type { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import CtaBand from "@/components/home/CtaBand";
import { site, contactAreas } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Northwest Motor Club.",
};

export default function ContactPage() {
  return (
    <>
      <section className="mx-auto grid max-w-content gap-16 px-6 pb-24 pt-36 md:grid-cols-2 md:px-16 md:pb-32 md:pt-44">
        <div className="flex flex-col gap-8">
          <div>
            <p className="font-mono text-sm uppercase tracking-[0.25em] text-lime">
              Say Hello
            </p>
            <h1 className="mt-4 font-display text-5xl text-fg max-md:text-4xl">
              Get in touch
            </h1>
            <p className="mt-5 max-w-md text-lg text-muted">
              Meet collabs, press, or just want to roll out — reach us here or
              on the gram.
            </p>
          </div>

          <div className="flex flex-col gap-3 font-mono text-sm">
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lime hover:text-fg"
            >
              {site.instagramHandle} →
            </a>
            <a href={`mailto:${site.email}`} className="text-lime hover:text-fg">
              {site.email} →
            </a>
          </div>

          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-dim">
              Where we run
            </p>
            <ul className="flex flex-col gap-2 text-sm text-muted">
              {contactAreas.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
            {/* PLACEHOLDER: static meet map (Mapbox) deferred per brief — v1
                lists areas instead of an embed. */}
          </div>
        </div>

        <ContactForm />
      </section>
      <CtaBand />
    </>
  );
}
