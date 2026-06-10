import Reveal from "@/components/motion/Reveal";

export default function SectionHeading({
  supertitle,
  title,
  className = "",
}: {
  supertitle: string;
  title: string;
  className?: string;
}) {
  return (
    <Reveal className={`flex flex-col gap-3 ${className}`}>
      <p className="font-mono text-sm uppercase tracking-[0.25em] text-moss">
        {supertitle}
      </p>
      <h2 className="font-display text-3xl text-fg max-md:text-2xl">{title}</h2>
    </Reveal>
  );
}
