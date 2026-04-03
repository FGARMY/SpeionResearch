import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

export interface PaperMeta {
  title: string;
  authors: string[];
  date: string;
  version: string;
  abstract: string;
  tags: string[];
  github?: string;
  pdf?: string;
  status: "published" | "draft" | "preprint";
  slug: string;
  readingTime: string;
}

const PAPERS_DIR = path.join(process.cwd(), "src/content/papers");

export function getAllPapers(): PaperMeta[] {
  if (!fs.existsSync(PAPERS_DIR)) return [];

  const files = fs.readdirSync(PAPERS_DIR).filter((f) => f.endsWith(".mdx"));

  const papers = files.map((filename) => {
    const filePath = path.join(PAPERS_DIR, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);
    const stats = readingTime(content);
    const slug = filename.replace(/\.mdx$/, "");

    return {
      title: data.title || "Untitled",
      authors: data.authors || [],
      date: data.date || "",
      version: data.version || "v1",
      abstract: data.abstract || "",
      tags: data.tags || [],
      github: data.github || undefined,
      pdf: data.pdf || undefined,
      status: data.status || "published",
      slug,
      readingTime: stats.text,
    } as PaperMeta;
  });

  return papers
    .filter((p) => p.status !== "draft")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPaperBySlug(slug: string) {
  const filePath = path.join(PAPERS_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  const stats = readingTime(content);

  return {
    meta: {
      title: data.title || "Untitled",
      authors: data.authors || [],
      date: data.date || "",
      version: data.version || "v1",
      abstract: data.abstract || "",
      tags: data.tags || [],
      github: data.github || undefined,
      pdf: data.pdf || undefined,
      status: data.status || "published",
      slug,
      readingTime: stats.text,
    } as PaperMeta,
    content,
  };
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(PAPERS_DIR)) return [];

  return fs
    .readdirSync(PAPERS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
