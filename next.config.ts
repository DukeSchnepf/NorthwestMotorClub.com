import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

const withMDX = createMDX({
  options: {
    // String form is required for Turbopack compatibility.
    remarkPlugins: ["remark-frontmatter", "remark-gfm"],
  },
});

export default withMDX(nextConfig);
