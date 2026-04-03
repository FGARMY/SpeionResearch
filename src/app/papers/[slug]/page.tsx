import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllSlugs, getPaperBySlug, formatDate } from "@/lib/papers";
import { mdxComponents } from "@/components/MDXComponents";
import TableOfContents from "@/components/TableOfContents";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const paper = getPaperBySlug(slug);
  if (!paper) return {};

  return {
    title: paper.meta.title,
    description: paper.meta.abstract,
    authors: paper.meta.authors.map((name) => ({ name })),
    openGraph: {
      title: paper.meta.title,
      description: paper.meta.abstract,
      type: "article",
      publishedTime: paper.meta.date,
      authors: paper.meta.authors,
      tags: paper.meta.tags,
    },
  };
}

export default async function PaperPage({ params }: PageProps) {
  const { slug } = await params;
  const paper = getPaperBySlug(slug);

  if (!paper) notFound();

  const { meta, content } = paper;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: meta.title,
    author: meta.authors.map((name) => ({
      "@type": "Person",
      name,
    })),
    datePublished: meta.date,
    description: meta.abstract,
    publisher: {
      "@type": "Organization",
      name: "Speion Research",
    },
    version: meta.version,
    keywords: meta.tags.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-12">
          {/* Main content */}
          <article>
            {/* Paper header */}
            <header className="mb-10">
              <div
                className="flex items-center gap-2 mb-3 text-xs text-[var(--color-muted)]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                <span className="inline-flex items-center px-1.5 py-0.5 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded font-medium">
                  {meta.version}
                </span>
                <span className="text-[var(--color-border)]">·</span>
                <time dateTime={meta.date}>{formatDate(meta.date)}</time>
                <span className="text-[var(--color-border)]">·</span>
                <span>{meta.readingTime}</span>
              </div>

              <h1
                className="text-2xl md:text-3xl font-bold leading-tight mb-4"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {meta.title}
              </h1>

              <p
                className="text-sm text-[var(--color-secondary)] mb-4"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {meta.authors.join(", ")}
              </p>

              {meta.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {meta.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[0.6875rem] px-2 py-0.5 bg-[var(--color-bg-secondary)] text-[var(--color-muted)] rounded"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Action bar */}
              <div
                className="flex items-center gap-4 py-3 border-y border-[var(--color-border)] text-sm"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {meta.pdf && (
                  <a
                    href={meta.pdf}
                    className="text-[var(--color-accent)] no-underline hover:underline font-medium"
                    download
                  >
                    ↓ Download PDF
                  </a>
                )}
                {meta.github && (
                  <a
                    href={meta.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-accent)] no-underline hover:underline font-medium"
                  >
                    View on GitHub
                  </a>
                )}
              </div>

              {/* Abstract */}
              <div className="mt-6 p-5 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded">
                <h2
                  className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)] mb-2"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  Abstract
                </h2>
                <p className="text-sm leading-relaxed text-[var(--color-secondary)]">
                  {meta.abstract}
                </p>
              </div>
            </header>

            {/* Paper body */}
            <div className="prose-academic">
              <MDXRemote
                source={content}
                components={mdxComponents}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [rehypeSlug],
                  },
                }}
              />
            </div>
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <TableOfContents />
          </aside>
        </div>
      </div>
    </>
  );
}
