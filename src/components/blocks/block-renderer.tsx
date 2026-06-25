import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import type { ContentBlock } from "@/lib/cms/types";

/** Narrow an unknown block field to a string. */
const str = (value: unknown): string => (typeof value === "string" ? value : "");

interface StatItem {
  value: string;
  label: string;
}

const toStatItems = (value: unknown): StatItem[] =>
  Array.isArray(value)
    ? value.map((item) => ({
        value: str((item as Record<string, unknown>)?.value),
        label: str((item as Record<string, unknown>)?.label),
      }))
    : [];

/**
 * Maps a CMS block `type` to a React component. Every block here is fully
 * editable in Payload — add a block type to `Pages.ts` and register it here.
 */
const BLOCKS: Record<
  string,
  (data: Record<string, unknown>) => React.ReactNode
> = {
  hero: (data) => (
    <Container className="py-20">
      <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
        {str(data.heading)}
      </h1>
      {str(data.subheading) && (
        <p className="mt-4 max-w-prose text-lg text-muted-foreground">
          {str(data.subheading)}
        </p>
      )}
    </Container>
  ),

  stats: (data) => {
    const items = toStatItems(data.items);
    return (
      <Container className="py-12">
        <dl className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {items.map((item) => (
            <div key={`${item.label}-${item.value}`} className="border-l-2 border-primary pl-4">
              <dt className="text-3xl font-bold text-foreground">{item.value}</dt>
              <dd className="mt-1 text-sm text-muted-foreground">{item.label}</dd>
            </div>
          ))}
        </dl>
      </Container>
    );
  },

  cta: (data) => (
    <Container className="py-16">
      <div className="rounded-xl bg-secondary px-8 py-12 text-center">
        <h2 className="font-display text-2xl font-bold">{str(data.heading)}</h2>
        <Link
          href={str(data.buttonHref) || "#"}
          className={`mt-6 inline-flex ${buttonVariants({ size: "lg" })}`}
        >
          {str(data.buttonLabel)}
        </Link>
      </div>
    </Container>
  ),
};

export function BlockRenderer({
  blocks,
}: {
  blocks: readonly ContentBlock[];
}) {
  return (
    <>
      {blocks.map((block) => {
        const render = BLOCKS[block.type];
        if (!render) {
          // Unknown block types are skipped rather than crashing the page.
          return null;
        }
        return <div key={block.id}>{render(block.data)}</div>;
      })}
    </>
  );
}
