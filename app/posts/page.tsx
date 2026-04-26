import Link from "next/link";
import Card from "@/app/posts/components/card";
import ProfileInterests from "@/app/posts/components/profile-interests";
import { source } from "@/lib/source";

type PostsPageProps = {
  searchParams: Promise<{ category?: string }>;
};

type PostPage = (typeof source)["$inferPage"];

const dateFormatter = new Intl.DateTimeFormat("ja-JP", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

function getCategory(page: PostPage) {
  return page.slugs[0] ?? null;
}

function sortPostsByDateDesc(a: PostPage, b: PostPage) {
  const dateA = a.data.date ? new Date(a.data.date).getTime() : 0;
  const dateB = b.data.date ? new Date(b.data.date).getTime() : 0;

  if (dateA === dateB) {
    return a.data.title.localeCompare(b.data.title, "ja");
  }

  return dateB - dateA;
}

function formatDate(date?: string | Date) {
  if (!date) return undefined;

  const parsedDate = date instanceof Date ? date : new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return undefined;
  }

  return dateFormatter.format(parsedDate);
}

function getFilterLinkClass(isActive: boolean) {
  return [
    "inline-flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm font-medium transition-all duration-200",
    isActive
      ? "border-fd-primary/40 bg-fd-primary/10 text-fd-primary shadow-sm"
      : "border-fd-border/60 bg-fd-background text-fd-muted-foreground hover:border-fd-primary/30 hover:text-fd-foreground",
  ].join(" ");
}

export default async function PostsPage({ searchParams }: PostsPageProps) {
  const { category } = await searchParams;

  const posts = source.getPages().filter((page) => page.slugs.length > 0);
  const categoryCounts = posts.reduce<Record<string, number>>((counts, page) => {
    const pageCategory = getCategory(page);

    if (!pageCategory) return counts;

    counts[pageCategory] = (counts[pageCategory] ?? 0) + 1;
    return counts;
  }, {});

  const categoryEntries = Object.entries(categoryCounts).sort(([left], [right]) =>
    left.localeCompare(right, "ja"),
  );
  const selectedCategory = category && categoryCounts[category] ? category : null;
  const visiblePosts = [...posts]
    .sort(sortPostsByDateDesc)
    .filter((page) => !selectedCategory || getCategory(page) === selectedCategory);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 py-8 md:px-6 lg:flex-row lg:gap-10 lg:py-10">
      <aside className="lg:w-1/3 lg:shrink-0">
        <div className="relative overflow-hidden rounded-2xl border border-fd-border/60 bg-fd-card shadow-sm lg:sticky lg:top-24">
          <div className="pointer-events-none absolute -left-12 top-0 h-36 w-36 rounded-2xl bg-fd-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute right-0 top-28 h-44 w-44 rounded-2xl bg-fd-primary/5 blur-3xl" />

          <div className="relative space-y-6 p-6 sm:p-8">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-fd-primary">
                About me
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-fd-foreground sm:text-4xl">
                Person, notes, and things I am building.
              </h1>
              <p className="text-sm leading-7 text-fd-muted-foreground">
                こんにちは、私はまだまだジュニアエンジニアの Fractです。
              </p>
              <p className="text-sm leading-7 text-fd-muted-foreground">
                名前の由来は、After Effects
                のエフェクトであるフラクタルノイズから来ています。適当です。
              </p>

              <p className="text-sm leading-7 text-fd-muted-foreground">
                最近はアーキテクチャやコードの品質、エディタのカスタマイズなどに興味があります。
              </p>
            </div>

            <ProfileInterests />

            <div className="rounded-2xl border border-dashed border-fd-border/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-fd-primary">
                Note
              </p>
              <p className="mt-2 text-sm leading-6 text-fd-muted-foreground">
                備忘録とか技術メモ、あれこれ書きためてます。
              </p>
            </div>
          </div>
        </div>
      </aside>

      <main className="min-w-0 flex-1 lg:w-2/3">
        <section className="space-y-6">
          <div className="relative overflow-hidden rounded-2xl border border-fd-border/60 bg-fd-card p-5 shadow-sm sm:p-6">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-r from-fd-primary/10 via-transparent to-fd-primary/5" />

            <div className="relative flex flex-col gap-5">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-fd-primary">
                  Posts
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-2xl font-semibold tracking-tight text-fd-foreground sm:text-3xl">
                    Post archive
                  </h2>
                  <span className="rounded-full border border-fd-border/60 bg-fd-background px-3 py-1 text-xs font-medium text-fd-muted-foreground">
                    {selectedCategory ? `# ${selectedCategory}` : "all"}
                  </span>
                  <span className="rounded-full border border-fd-border/60 bg-fd-background px-3 py-1 text-xs font-medium text-fd-muted-foreground">
                    {visiblePosts.length} entries
                  </span>
                </div>
                <p className="text-sm leading-7 text-fd-muted-foreground">
                  ディレクトリ名からカテゴリを動的に作り、カードは横方向に並べながら画面幅に応じて自然に折り返します。
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Link href="/posts" className={getFilterLinkClass(!selectedCategory)}>
                  <span>All</span>
                  <span className="rounded-full bg-fd-muted px-2 py-0.5 text-xs text-fd-muted-foreground">
                    {posts.length}
                  </span>
                </Link>

                {categoryEntries.map(([name, count]) => {
                  const isActive = name === selectedCategory;

                  return (
                    <Link
                      key={name}
                      href={{ pathname: "/posts", query: { category: name } }}
                      aria-current={isActive ? "page" : undefined}
                      className={getFilterLinkClass(isActive)}
                    >
                      <span>{name}</span>
                      <span className="rounded-full bg-fd-muted px-2 py-0.5 text-xs text-fd-muted-foreground">
                        {count}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {visiblePosts.length > 0 ? (
            <div className="flex flex-wrap gap-4">
              {visiblePosts.map((page) => (
                <Card
                  key={page.url}
                  title={page.data.title}
                  description={page.data.description}
                  href={page.url}
                  category={getCategory(page) ?? undefined}
                  date={formatDate(page.data.date)}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-fd-border/60 bg-fd-card px-6 py-12 text-center shadow-sm">
              <p className="text-lg font-semibold text-fd-foreground">
                該当する投稿はまだありません。
              </p>
              <p className="mt-2 text-sm text-fd-muted-foreground">
                フィルタを切り替えるか、All で全件表示に戻してください。
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
