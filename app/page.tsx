import Hero from "@/components/home/Hero";
import MissionOpen from "@/components/home/MissionOpen";
import StoryTimeline from "@/components/home/StoryTimeline";
import StoryClose from "@/components/home/StoryClose";
import BayGrid from "@/components/home/BayGrid";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import InstagramWall from "@/components/home/InstagramWall";
import CtaBand from "@/components/home/CtaBand";

// Home page composition. Section order tracks the design spec at
// docs/superpowers/specs/2026-05-26-the-garage-redesign-design.md
//
//   01  Hero ........... ✅ Phase B
//   02  Story ........... ✅ Phase C.1 (MissionOpen + StoryTimeline + StoryClose)
//   03  The Fleet ....... ✅ Phase C.2 (BayGrid)
//   04  Drives .......... ⏳ Phase D   (DrivesSection — to replace UpcomingEvents)
//   06  CTA ............. ⏳ Phase D   (new CtaBand)
//
// Old components still rendering below the new sections are intentional
// during the migration — they'll be replaced in Phase D. Visually you'll
// see a clean break where the new design ends and the old design begins.
export default function Home() {
  return (
    <>
      {/* Section 01 — Hero (Phase B) */}
      <Hero />

      {/* Section 02 — Our Story (Phase C.1) */}
      <MissionOpen />
      <StoryTimeline />
      <StoryClose />

      {/* Section 03 — The Fleet / Bays (Phase C.2) */}
      <BayGrid />

      {/* Still on the old design — replaced in Phase D */}
      <UpcomingEvents />
      <InstagramWall />
      <CtaBand />
    </>
  );
}
