import type { Metadata } from "next";
import { getMembers } from "@/lib/members";
import SectionHeading from "@/components/ui/SectionHeading";
import MembersBrowser from "@/components/members/MembersBrowser";
import CtaBand from "@/components/home/CtaBand";

export const metadata: Metadata = {
  title: "Builds",
  description: "Featured rides from the Northwest Motor Club roster.",
};

export default function MembersPage() {
  const members = getMembers();

  return (
    <>
      <section className="mx-auto max-w-content px-6 pb-24 pt-36 md:px-16 md:pb-32 md:pt-44">
        <SectionHeading
          supertitle="The Roster"
          title="Featured Rides"
          className="mb-12"
        />
        <MembersBrowser members={members} />
      </section>
      <CtaBand />
    </>
  );
}
