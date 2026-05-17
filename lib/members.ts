import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { MemberMeta } from "./members.shared";

export { CATEGORIES } from "./members.shared";
export type { Category, MemberMeta } from "./members.shared";

const DIR = path.join(process.cwd(), "content", "members");

export function getMembers(): MemberMeta[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const { data } = matter(fs.readFileSync(path.join(DIR, file), "utf8"));
      return {
        slug: file.replace(/\.mdx$/, ""),
        ...(data as Omit<MemberMeta, "slug">),
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getMemberSlugs(): string[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getMemberSource(slug: string): string | null {
  const file = path.join(DIR, `${slug}.mdx`);
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : null;
}
