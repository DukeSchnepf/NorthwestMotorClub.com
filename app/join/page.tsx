import type { Metadata } from "next";
import JoinForm from "@/components/join/JoinForm";
import CtaBand from "@/components/home/CtaBand";

export const metadata: Metadata = {
  title: "Join",
  description: "Roll with Northwest Motor Club. Open membership — every car welcome.",
};

export default function JoinPage() {
  return (
    <>
      <section className="mx-auto max-w-content px-6 pb-24 pt-36 md:px-16 md:pb-32 md:pt-44">
        <div className="mx-auto max-w-2xl">
          <p className="font-mono text-sm uppercase tracking-[0.25em] text-moss">
            Open Membership
          </p>
          <h1 className="mt-4 font-display text-5xl text-fg max-md:text-4xl">
            Roll with us.
          </h1>
          <p className="mt-5 text-lg text-muted">
            No tiers, no wall — stock daily or full build, you&apos;re welcome.
            Drop your details and we&apos;ll loop you in.
          </p>
          {/* PLACEHOLDER: single open membership for v1. The "NWMC Underground"
              inner tier from Duke's notes is deferred (confirmed: v1 = next-meet
              banner only). */}
          <div className="mt-12">
            <JoinForm />
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
