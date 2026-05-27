import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import HistoryTimeline from "@/components/history/HistoryTimeline";
import CtaBand from "@/components/home/CtaBand";
import timeline from "@/content/timeline.json";

export const metadata: Metadata = {
  title: "History",
  description:
    "Northwest Motor Club through the years — from the first Eastside lot onward.",
};

// The home-page Story section includes `placeholder: true` years (2019,
// 2021, 2023, 2025) that have no photo yet — Duke will fill these in
// later. The /history page only renders confirmed milestones with photos,
// so we filter those out here. HistoryTimeline's stricter Milestone type
// (image: string) stays unchanged; we narrow at the call site.
const confirmedMilestones = timeline.milestones
  .filter((m): m is typeof m & { image: string } => Boolean(m.image))
  .map(({ year, title, blurb, image }) => ({ year, title, blurb, image }));

export default function HistoryPage() {
  return (
    <>
      <section className="mx-auto max-w-content px-6 pb-16 pt-36 md:px-16 md:pt-44">
        <SectionHeading
          supertitle="Pacific NW Car Culture"
          title="History"
        />
        <p className="mt-6 max-w-xl leading-relaxed text-muted">
          The club, lot by lot. Scroll the timeline — the pump turns with it.
        </p>
      </section>

      <section className="pb-24 md:pb-32">
        <HistoryTimeline milestones={confirmedMilestones} />
      </section>

      <CtaBand />
    </>
  );
}
