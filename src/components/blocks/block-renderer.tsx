import type { ContentBlock } from "@/lib/cms/types";

/**
 * Maps a CMS block `type` to a React component. Add new block types here as
 * the content model grows — pages never change, only this registry does.
 */
const BLOCKS: Record<
  string,
  (data: Record<string, unknown>) => React.ReactNode
> = {
  hero: (data) => <h1 className="text-3xl font-bold">{String(data.heading ?? "")}</h1>,
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
