import React from "react";
import AuthorityChart from "./AuthorityChart";

function heading(level: number) {
  const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;
  return function HeadingComponent({
    children,
    ...props
  }: React.HTMLAttributes<HTMLHeadingElement>) {
    const text =
      typeof children === "string"
        ? children
        : React.Children.toArray(children).join("");
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    return React.createElement(
      Tag,
      { id, ...props },
      children
    );
  };
}

export const mdxComponents = {
  h1: heading(1),
  h2: heading(2),
  h3: heading(3),
  h4: heading(4),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => <p {...props} />,
  a: ({
    href,
    children,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={href} target={href?.startsWith("http") ? "_blank" : undefined} rel={href?.startsWith("http") ? "noopener noreferrer" : undefined} {...props}>
      {children}
    </a>
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote {...props} />
  ),
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto">
      <table {...props} />
    </div>
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => <pre {...props} />,
  code: (props: React.HTMLAttributes<HTMLElement>) => <code {...props} />,
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => <ul {...props} />,
  ol: (props: React.OlHTMLAttributes<HTMLOListElement>) => <ol {...props} />,
  li: (props: React.LiHTMLAttributes<HTMLLIElement>) => <li {...props} />,
  hr: () => <hr />,
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <figure>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img {...props} alt={props.alt || ""} className="max-w-full mx-auto" />
      {props.alt && <figcaption>{props.alt}</figcaption>}
    </figure>
  ),
  AuthorityChart: (props: any) => <AuthorityChart {...props} />,
};
