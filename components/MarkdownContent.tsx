"use client";

import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type MarkdownContentProps = {
  content: string;
  className?: string;
};

const linkClass =
  "text-primary underline underline-offset-[3px] transition-colors hover:text-on-background";

export function MarkdownContent({ content, className = "" }: MarkdownContentProps) {
  if (!content.trim()) return null;

  return (
    <div className={`markdown-content ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children, ...rest }) => {
            const h = href ?? "";
            const external = /^https?:\/\//.test(h) || h.startsWith("//");
            if (external) {
              return (
                <a
                  href={h}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                  {...rest}
                >
                  {children}
                </a>
              );
            }
            return (
              <Link href={h || "#"} className={linkClass} {...rest}>
                {children}
              </Link>
            );
          },
          p: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
          ul: ({ children }) => (
            <ul className="mb-3 list-disc space-y-2 pl-5 last:mb-0">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-3 list-decimal space-y-1 pl-5 last:mb-0">{children}</ol>
          ),
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          strong: ({ children }) => <strong className="font-semibold text-on-background">{children}</strong>,
          em: ({ children }) => <em>{children}</em>,
          code: ({ children }) => (
            <code className="rounded bg-surface-container-high px-1.5 py-0.5 font-mono text-[0.9em] text-on-surface-variant">
              {children}
            </code>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
