import Link from "next/link";

type CardProps = {
  title: string;
  description: string | undefined;
  href: string;
  category?: string;
  date?: string;
};

// Post infomation Card
export default function Card({ title, description, href, category, date }: CardProps) {
  return (
    <Link
      href={href}
      className="group relative flex min-h-72 w-full basis-full flex-col justify-between overflow-hidden rounded-2xl border border-fd-border/60 bg-fd-background/85 p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-fd-primary/30 hover:shadow-xl sm:basis-[calc(50%-0.5rem)]"
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-fd-primary/10 blur-3xl opacity-70 transition-opacity duration-200 group-hover:opacity-100" />

      <div className="relative space-y-5">
        {(category || date) && (
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {category && (
              <span className="rounded-xl border border-fd-primary/20 bg-fd-primary/10 px-3 py-1 font-medium text-fd-primary">
                {category}
              </span>
            )}
            {date && <span className="text-fd-muted-foreground">{date}</span>}
          </div>
        )}

        <div>
          <h5 className="text-2xl font-semibold tracking-tight text-fd-foreground leading-8 transition-colors group-hover:text-fd-primary">
            {title}
          </h5>
          {description && (
            <p className="mt-3 text-sm leading-7 text-fd-muted-foreground line-clamp-4">
              {description}
            </p>
          )}
        </div>
      </div>

      <div className="relative mt-8 flex items-center justify-between border-t border-fd-border/50 pt-4">
        <span className="text-xs font-semibold uppercase tracking-[0.24em] text-fd-muted-foreground">
          Read post
        </span>
        <span className="rounded-xl border border-fd-border/60 px-3 py-1 text-xs font-medium text-fd-foreground transition-colors group-hover:border-fd-primary/30 group-hover:text-fd-primary">
          Open
        </span>
      </div>
    </Link>
  );
}
