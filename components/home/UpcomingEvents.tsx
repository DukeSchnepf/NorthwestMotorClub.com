import Link from "next/link";
import { getUpcomingEvents } from "@/lib/events";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/motion/Reveal";
import EventCard from "@/components/home/EventCard";

export default function UpcomingEvents() {
  const events = getUpcomingEvents(6);

  return (
    <section
      id="events"
      className="scroll-mt-28 bg-base px-6 py-24 md:px-16 md:py-32"
    >
      <div className="mx-auto max-w-content">
        <div className="mb-12 flex items-end justify-between gap-6">
          <SectionHeading
            supertitle="Drives, Meets, Shows"
            title="Upcoming"
          />
          <Link
            href="/events"
            className="hidden shrink-0 font-mono text-xs uppercase tracking-[0.2em] text-lime transition-colors duration-200 hover:text-fg sm:inline"
          >
            View all events →
          </Link>
        </div>

        {events.length === 0 ? (
          <p className="font-mono text-sm text-muted">
            Next dates TBA — follow the club for the drop.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event, i) => (
              <Reveal key={event.slug} delay={i * 0.07} as="article">
                <EventCard event={event} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
