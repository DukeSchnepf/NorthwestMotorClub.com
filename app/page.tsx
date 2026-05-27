import Hero from "@/components/home/Hero";
import MissionOpen from "@/components/home/MissionOpen";
import StoryTimeline from "@/components/home/StoryTimeline";
import StoryClose from "@/components/home/StoryClose";
import BayGrid from "@/components/home/BayGrid";
import DrivesSection from "@/components/home/DrivesSection";
import CtaBand from "@/components/home/CtaBand";

// Home page composition. Section order tracks the design spec at
// docs/2026-05-26-redesign-design.md
//
//   01  Hero ........... ✅ Phase B   (components/home/Hero.tsx)
//   02  Story ........... ✅ Phase C.1 (MissionOpen + StoryTimeline + StoryClose)
//   03  The Fleet ....... ✅ Phase C.2 (BayGrid)
//   04  Drives .......... ✅ Phase D   (DrivesSection)
//   06  CTA ............. ✅ Phase D   (new CtaBand)
//
// Phase E (polish): real audio loop, weather integration, Lighthouse pass,
// docs/EDITING-CONTENT.md walkthrough. See the spec for the full plan.
//
// Legacy components (Manifesto, TimelineTeaser, FeaturedBuild,
// UpcomingEvents, InstagramWall) remain on disk for now as references;
// a cleanup commit removes them after Phase E.
export default function Home() {
  return (
    <>
      {/* Section 01 — Hero */}
      <Hero />

      {/* Section 02 — Our Story */}
      <MissionOpen />
      <StoryTimeline />
      <StoryClose />

      {/* Section 03 — The Fleet / Bays */}
      <BayGrid />

      {/* Section 04 — Upcoming Drives */}
      <DrivesSection />

      {/* Section 06 — Final CTA band (Section 05 = SiteHeader, wrapped via layout) */}
      <CtaBand />
    </>
  );
}
