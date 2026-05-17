import Hero from "@/components/home/Hero";
import Manifesto from "@/components/home/Manifesto";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import FeaturedBuild from "@/components/home/FeaturedBuild";
import TimelineTeaser from "@/components/home/TimelineTeaser";
import InstagramWall from "@/components/home/InstagramWall";
import CtaBand from "@/components/home/CtaBand";

export default function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <UpcomingEvents />
      <FeaturedBuild />
      <TimelineTeaser />
      <InstagramWall />
      <CtaBand />
    </>
  );
}
