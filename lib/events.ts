import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type EventMeta = {
  slug: string;
  title: string;
  date: string;
  location: string;
  attendees: number;
  status: "upcoming" | "past";
  cover: string;
  blurb: string;
};

const EVENTS_DIR = path.join(process.cwd(), "content", "events");

export function getEvents(): EventMeta[] {
  if (!fs.existsSync(EVENTS_DIR)) return [];
  return fs
    .readdirSync(EVENTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const { data } = matter(fs.readFileSync(path.join(EVENTS_DIR, file), "utf8"));
      return { slug: file.replace(/\.mdx$/, ""), ...(data as Omit<EventMeta, "slug">) };
    })
    .sort((a, b) => +new Date(a.date) - +new Date(b.date));
}

export function getUpcomingEvents(limit?: number): EventMeta[] {
  const upcoming = getEvents().filter((e) => e.status !== "past");
  return typeof limit === "number" ? upcoming.slice(0, limit) : upcoming;
}
