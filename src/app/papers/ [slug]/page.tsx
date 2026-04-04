import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllSlugs, getPaperBySlug } from "@/lib/papers";
import { formatDate } from "@/lib/utils";
import { mdxComponents } from "@/components/MDXComponents";
import TableOfContents from "@/components/TableOfContents";
import CitationGenerator from "@/components/CitationGenerator";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import type { Metadata } from "next";
import { Download, Github, Link as LinkIcon, Calendar, User, Hash } from "lucide-react";

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
    },
  };
}

export default async function PaperPage({ params }: PageProps) {
  const { slug } = await params;
  const paper = getPaperBySlug(slug);

  if (!paper) notFound();

  const { meta, content } = paper;

  return (
    <div className="relative">
      {/* TOC - Fixed Header on Tablet/Mobile or Sidebar on wide screens */}
      <aside className="hidden xl:block fixed left-10 top-32 w-64 no-print h-[calc(100vh-160px)] overflow-y-auto">
        <div className="text-[10px] uppercase tracking-widest font-bold text-[#BBBBBB] mb-4">Contents</div>
        <TableOfContents />
      </aside>

      <article className="max-w-[700px] mx-auto">
        <header className="space-y-8 mb-16">
          <div className="metadata-line">
            <span className="flex items-center gap-1.5"><Calendar size={13} /> {formatDate(meta.date)}</span>
            <span className="flex items-center gap-1.5"><Hash size={13} /> {meta.version}</span>
            {meta.doi && (
              <span className="flex items-center gap-1.5 font-mono"><LinkIcon size={13} /> {meta.doi}</span>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-serif font-bold leading-tight text-[#111111]">
            {meta.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium text-[#111111]">
            {meta.authors.map((author, i) => (
              <span key={author} className="flex items-center gap-2">
                <User size={14} className="text-[#999999]" />
                {author}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[#F5F5F5] no-print">
            {meta.pdf && (
              <a href={meta.pdf} className="btn-academic">
                <Download size={14} /> Download PDF
              </a>
            )}
            {meta.github && (
              <a href={meta.github} target="_blank" className="btn-academic">
                <Github size={14} /> View Source
              </a>
            )}
          </div>
        </header>

        <section className="academic-box">
          <div className="abstract-title">Abstract</div>
          <p className="text-[#333333] leading-relaxed text-justify m-0">
            {meta.abstract}
          </p>
        </section>

        {/* Paper content */}
        <section className="prose-academic mt-12 mb-20">
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
        </section>

        {/* Footer actions */}
        <footer className="border-t border-[#EEEEEE] pt-12 space-y-12 no-print">
          <section>
            <div className="abstract-title mb-6">Cite this paper</div>
            <CitationGenerator meta={meta} />
          </section>
          
          <div className="bg-[#F9F9F9] p-8 text-center space-y-4">
            <h4 className="font-serif font-bold text-lg">Speion Research Labs Archive</h4>
            <p className="text-[13px] text-[#666666] max-w-[400px] mx-auto">
              This publication is archived on the decentralized web. Verified by the Speion Independent Board.
            </p>
          </div>
        </footer>
      </article>
    </div>
  );
}
