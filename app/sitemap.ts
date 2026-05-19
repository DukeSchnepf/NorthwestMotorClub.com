import type { MetadataRoute } from "next";
import { getEventSlugs } from "@/lib/events";
import { getMemberSlugs } from "@/lib/members";

const baseUrl = "https://northwestmotorclub.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/events`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/members`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/history`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${baseUrl}/join`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
  ];

  const eventRoutes: MetadataRoute.Sitemap = getEventSlugs().map((slug) => ({
    url: `${baseUrl}/events/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const memberRoutes: MetadataRoute.Sitemap = getMemberSlugs().map((slug) => ({
    url: `${baseUrl}/members/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...eventRoutes, ...memberRoutes];
}
