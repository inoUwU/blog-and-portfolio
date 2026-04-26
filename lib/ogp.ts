import { parse, type HTMLElement } from "node-html-parser";
import { cache } from "react";

export type LinkPreviewMetadata = {
  url: string;
  hostname: string;
  title?: string;
  description?: string;
  siteName?: string;
  image?: string;
  icon?: string;
};

const LINK_CARD_REVALIDATE_SECONDS = 60 * 60 * 6; // 6 hours
const USER_AGENT =
  "Mozilla/5.0 (compatible; LinkCardBot/1.0; +https://github.com/ino/blog-and-portfolio)";

const iconSelectors = [
  "link[rel='apple-touch-icon']",
  "link[rel='shortcut icon']",
  "link[rel='icon']",
];

const metaCandidates: Record<string, string[]> = {
  title: ["og:title", "twitter:title", "title"],
  description: ["og:description", "description", "twitter:description"],
  siteName: ["og:site_name"],
  image: ["og:image", "twitter:image"],
};

const absoluteUrl = (value: string | undefined, base: URL): string | undefined => {
  if (!value) return undefined;
  try {
    return new URL(value, base).toString();
  } catch {
    return undefined;
  }
};

const normalizeUrl = (rawUrl: string): URL => {
  try {
    return new URL(rawUrl);
  } catch {
    return new URL(`https://${rawUrl}`);
  }
};

const pickMeta = (root: HTMLElement, key: string): string | undefined => {
  const selectors = metaCandidates[key];
  if (!selectors) return undefined;
  for (const candidate of selectors) {
    const element = root.querySelector(`meta[property='${candidate}'], meta[name='${candidate}']`);
    const content = element?.getAttribute("content")?.trim();
    if (content) return content;
  }
  if (key === "title") {
    return root.querySelector("title")?.text.trim();
  }
  return undefined;
};

const pickIcon = (root: HTMLElement, base: URL): string | undefined => {
  for (const selector of iconSelectors) {
    const node = root.querySelector(selector);
    const href = node?.getAttribute("href")?.trim();
    const sized = absoluteUrl(href, base);
    if (sized) return sized;
  }
  return undefined;
};

const collectMetadata = (
  html: string,
  base: URL,
): Omit<LinkPreviewMetadata, "url" | "hostname"> => {
  const root = parse(html);
  const title = pickMeta(root, "title");
  const description = pickMeta(root, "description");
  const siteName = pickMeta(root, "siteName");
  const image = absoluteUrl(pickMeta(root, "image"), base);
  const icon = pickIcon(root, base);
  return { title, description, siteName, image, icon };
};

export const fetchLinkPreview = cache(async (rawUrl: string): Promise<LinkPreviewMetadata> => {
  const baseUrl = normalizeUrl(rawUrl);
  const fallback: LinkPreviewMetadata = {
    url: baseUrl.toString(),
    hostname: baseUrl.hostname,
  };
  try {
    const response = await fetch(baseUrl.toString(), {
      headers: {
        "user-agent": USER_AGENT,
      },
      next: {
        revalidate: LINK_CARD_REVALIDATE_SECONDS,
      },
    });
    if (!response.ok) return fallback;
    const html = await response.text();
    const metadata = collectMetadata(html, baseUrl);
    return {
      ...fallback,
      ...metadata,
    };
  } catch {
    return fallback;
  }
});
