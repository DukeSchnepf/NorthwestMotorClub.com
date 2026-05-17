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
  { label: "About", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Builds", href: "/members" },
  { label: "History", href: "/history" },
  { label: "Join", href: "/join" },
] as const;

// PLACEHOLDER — Duke to confirm/replace founders, bios, vehicles.
export const founders = [
  {
    name: "Duke",
    handle: "@duke_schnepf",
    role: "Founder",
    vehicle: "1969 Dodge Charger Daytona",
    bio: "Started the group chat that started the club. Runs point on routes and the rooftop spots.",
    image: "/media/members/ride-01.jpg",
  },
  {
    name: "Jake",
    handle: "@4banger_daddy",
    role: "Core Crew",
    vehicle: "Track-prepped four-banger",
    bio: "Keeps the late-night sessions honest and the four-cylinder count high.",
    image: "/media/members/ride-02.jpg",
  },
  {
    name: "Quinn",
    handle: "@qmanproductions",
    role: "Media",
    vehicle: "Behind the lens",
    bio: "The reason the club looks this good. Shoots the meets, drives, and everything in between.",
    image: "/media/members/ride-03.jpg",
  },
] as const;

export const values = [
  {
    title: "Everyone, Everything",
    body: "Stock daily or full build, first car or fifth — every car has a place in the lot.",
  },
  {
    title: "Roads Over Clout",
    body: "We'd rather be out chasing a wet backroad than chasing a feed. The drive is the point.",
  },
  {
    title: "Respect The Spot",
    body: "Clean lots, calm neighbors, no burnouts where they'll burn us. The scene lasts if we do.",
  },
] as const;

// PLACEHOLDER — Duke to confirm recurring meet areas.
export const contactAreas = [
  "Bellevue · Eastside garages",
  "Issaquah · Transit + lots",
  "Highway 2 · Cascade runs",
] as const;
