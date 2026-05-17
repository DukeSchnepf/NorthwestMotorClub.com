// Client-safe member constants/types (no node:fs — safe in client bundles).

export const CATEGORIES = [
  "Muscle",
  "JDM",
  "Euro",
  "Truck",
  "Off-road",
  "Classic",
  "Daily",
] as const;
export type Category = (typeof CATEGORIES)[number];

export type MemberMeta = {
  slug: string;
  name: string;
  handle: string;
  title: string;
  ymm: string;
  category: Category;
  location: string;
  ig: string;
  cover: string;
};
