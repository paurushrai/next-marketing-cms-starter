import type { ReactNode } from "react";

/**
 * Semantic showcase section: a labelled `<section>` with a level-2 heading the
 * page-level `<h1>` owns. Keeps the gallery's document outline clean for SEO
 * and screen-reader navigation.
 */
export function Section({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  const headingId = `${id}-heading`;
  return (
    <section aria-labelledby={headingId} className="scroll-mt-24 py-10">
      <h2
        id={headingId}
        className="font-display text-2xl font-semibold tracking-tight"
      >
        {title}
      </h2>
      {description && (
        <p className="mt-2 max-w-prose text-sm text-muted-foreground">
          {description}
        </p>
      )}
      <div className="mt-6">{children}</div>
    </section>
  );
}
