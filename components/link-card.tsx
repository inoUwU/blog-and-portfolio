// oxlint-disable nextjs/no-img-element
import Link from "next/link";
import type { CSSProperties } from "react";
import { fetchLinkPreview } from "@/lib/ogp";

export type LinkCardProps = {
  url: string;
  title?: string;
  description?: string;
  label?: string;
  className?: string;
};

const descriptionClampStyle: CSSProperties = {
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
};

export async function LinkCard({ url, title, description, label, className = "" }: LinkCardProps) {
  const preview = await fetchLinkPreview(url);
  const siteLabel = label ?? preview.siteName ?? preview.hostname;
  const displayTitle = title ?? preview.title ?? preview.hostname;
  const displayDescription = description ?? preview.description;

  return (
    <Link
      href={preview.url}
      prefetch={false}
      target="_blank"
      rel="noreferrer"
      aria-label={`${displayTitle} へのリンク`}
      className={`group flex w-full gap-4 overflow-hidden rounded-2xl border border-zinc-200/80 bg-white/70 p-4 no-underline shadow-sm transition hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-zinc-700 ${className}`.trim()}
    >
      <div className="relative aspect-video w-40 shrink-0 overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800">
        {preview.image ? (
          <img
            src={preview.image}
            alt={displayTitle}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : preview.icon ? (
          <div className="flex h-full w-full items-center justify-center bg-white/60 p-6 dark:bg-black/40">
            <img
              src={preview.icon}
              alt={`${siteLabel} のアイコン`}
              loading="lazy"
              className="h-16 w-16 rounded-xl object-contain"
            />
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center px-3 text-center text-xs font-semibold text-zinc-400">
            {siteLabel}
          </div>
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          {preview.icon ? (
            <img
              src={preview.icon}
              alt={`${siteLabel} のアイコン`}
              loading="lazy"
              className="h-4 w-4 rounded"
            />
          ) : null}
          <span className="truncate">{siteLabel}</span>
        </div>
        <span className="truncate text-base font-semibold text-zinc-900 dark:text-zinc-50">
          {displayTitle}
        </span>
        {displayDescription ? (
          <p className="text-sm text-zinc-600 dark:text-zinc-300" style={descriptionClampStyle}>
            {displayDescription}
          </p>
        ) : null}
        <span className="text-xs text-zinc-400 dark:text-zinc-500">{preview.hostname}</span>
      </div>
    </Link>
  );
}
