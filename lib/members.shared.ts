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
  /**
   * Bay assignment (1-12). Drives sort order in the home page bay grid and
   * the visible badge ("BAY 03"). Optional during migration — members
   * without a number fall to the end alphabetically.
   */
  bayNumber?: number;
  /**
   * Featured bay of the week. Exactly one member should have this true;
   * the BayGrid renders it as a 2×2 cell with the cedar accent and the
   * pull quote rendered prominently. Rotate manually for now (Phase E
   * could automate via cron).
   */
  featured?: boolean;
  /**
   * Short pull quote from the build feature. Surfaces in the featured
   * bay. If omitted, the BayGrid just skips the quote.
   */
  pull?: string;
};
