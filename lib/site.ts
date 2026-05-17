// Central club config. Values marked PLACEHOLDER need confirmation from Duke
// (surfaced in the asset-gap list) — kept tasteful, not lorem.

export const site = {
  name: "Northwest Motor Club",
  shortName: "NWMC",
  region: "Pacific NW",
  establishedYear: 2018, // PLACEHOLDER — legacy site contradicts itself ("2018" vs "almost 10 years")
  tagline: "Cars. Roads. Rain.",
  instagram: "https://instagram.com/nwmotorclub",
  instagramHandle: "@nwmotorclub",
  email: "hello@northwestmotorclub.com", // PLACEHOLDER
} as const;

export type NextMeet = {
  status: "scheduled" | "tba";
  title: string;
  /** ISO date, or null when TBA */
  date: string | null;
  location: string;
  href: string;
};

// PLACEHOLDER — Duke's #1 priority is this banner; wire real values here.
export const nextMeet: NextMeet = {
  status: "tba",
  title: "Next Meet",
  date: null,
  location: "Eastside, WA",
  href: "/#events",
};

// PLACEHOLDER manifesto — Duke to supply 2–3 tagline candidates to typeset.
export const manifestoLines = [
  "We don’t chase clout.",
  "We chase backroads in the rain.",
  "Stock daily or full build —",
  "if it moves you, you belong here.",
] as const;

export const manifestoBody =
  "Northwest Motor Club is a Pacific Northwest car community — not a brand, not a feed. We meet where the asphalt is wet and the evergreens close in: garage rooftops, gravel lots, the long way around the mountain. Bring the car you have.";

export const navLinks = [
  { label: "About", href: "/#mission" },
  { label: "Events", href: "/#events" },
  { label: "Builds", href: "/#featured" },
  { label: "History", href: "/#timeline" },
  { label: "Join", href: "/#join" },
] as const;
