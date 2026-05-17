import type { Metadata } from "next";
import { getEvents } from "@/lib/events";
import SectionHeading from "@/components/ui/SectionHeading";
import EventsBrowser from "@/components/events/EventsBrowser";
import CtaBand from "@/components/home/CtaBand";

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming and past Northwest Motor Club drives, meets and shows.",
};

export default function EventsPage() {
  const events = getEvents();

  return (
    <>
      <section className="mx-auto max-w-content px-6 pb-24 pt-36 md:px-16 md:pb-32 md:pt-44">
        <SectionHeading
          supertitle="Drives, Meets, Shows"
          title="Events"
          className="mb-12"
        />
        <EventsBrowser events={events} />
      </section>
      <CtaBand />
    </>
  );
}
