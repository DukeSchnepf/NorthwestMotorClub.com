import Hero from "@/components/home/Hero";
import MissionOpen from "@/components/home/MissionOpen";
import StoryTimeline from "@/components/home/StoryTimeline";
import StoryClose from "@/components/home/StoryClose";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import FeaturedBuild from "@/components/home/FeaturedBuild";
import InstagramWall from "@/components/home/InstagramWall";
import CtaBand from "@/components/home/CtaBand";

// Home page composition. Section order tracks the design spec at
// docs/superpowers/specs/2026-05-26-the-garage-redesign-design.md
//
//   01  Hero ........... ✅ Phase B
//   02  Story ........... ✅ Phase C.1 (MissionOpen + StoryTimeline + StoryClose)
//   03  The Fleet ....... ⏳ Phase C.2 (BayGrid — to replace FeaturedBuild)
//   04  Drives .......... ⏳ Phase D   (DrivesSection — to replace UpcomingEvents + InstagramWall)
//   06  CTA ............. ⏳ Phase D   (new CtaBand)
//
// Old components still rendering below the new Story group are
// intentional during the migration — they'll be replaced section by
// section. Visually you'll see a clean break where the new design ends
// and the old design begins; that's the in-progress edge.
export default function Home() {
  return (
    <>
      {/* Section 01 — Hero (Phase B) */}
      <Hero />

      {/* Section 02 — Our Story (Phase C.1) */}
      <MissionOpen />
      <StoryTimeline />
      <StoryClose />

      {/* Still on the old design — replaced in Phases C.2 + D */}
      <UpcomingEvents />
      <FeaturedBuild />
      <InstagramWall />
      <CtaBand />
    </>
  );
}
