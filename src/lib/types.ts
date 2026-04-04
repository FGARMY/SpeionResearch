export interface PaperMeta {
  title: string;
  authors: string[];
  date: string;
  version: string;
  doi?: string;
  area?: string;
  abstract: string;
  tags: string[];
  contributions: string[];
  github?: string;
  pdf?: string;
  status: "published" | "draft" | "preprint";
  slug: string;
  readingTime: string;
}
