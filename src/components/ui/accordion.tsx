import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

/**
 * FAQ-style accordion built on native `<details>`/`<summary>`. This needs zero
 * client JavaScript, works without hydration, and keeps the answer text in the
 * DOM (and crawlable) even while collapsed — ideal for SEO on marketing pages.
 * Pass `name` to a group of items to make them mutually exclusive (one open).
 */
export function Accordion({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("divide-y divide-border rounded-lg border border-border", className)}
      {...props}
    />
  );
}

interface AccordionItemProps {
  question: string;
  children: React.ReactNode;
  /** Shared name groups items so only one stays open at a time. */
  name?: string;
  /** Render the item expanded on first paint. */
  defaultOpen?: boolean;
}

export function AccordionItem({
  question,
  children,
  name,
  defaultOpen = false,
}: AccordionItemProps) {
  return (
    <details name={name} open={defaultOpen} className="group px-4">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-sm font-medium text-foreground marker:hidden focus-visible:outline-none">
        {question}
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </summary>
      <div className="pb-4 text-sm text-muted-foreground">{children}</div>
    </details>
  );
}
