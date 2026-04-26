import { source } from "@/lib/source";
import { notFound } from "next/navigation";
import { getMDXComponents } from "@/components/mdx";
import { ModalOverlay } from "@/app/posts/components/modal-overlay";
import { DocsBody } from "fumadocs-ui/layouts/docs/page";
import { createRelativeLink } from "fumadocs-ui/mdx";
import { ImageZoom } from "fumadocs-ui/components/image-zoom";
import { LinkCard } from "@/components/link-card";

type Props = {
  params: Promise<{ slug?: string[] }>;
};

export default async function InterceptedDocsPage({ params }: Props) {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <ModalOverlay title={page.data.title} description={page.data.description}>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            LinkCard,
            a: createRelativeLink(source, page),
            img: (props) => <ImageZoom {...(props as any)} />,
          })}
        />
      </DocsBody>
    </ModalOverlay>
  );
}
