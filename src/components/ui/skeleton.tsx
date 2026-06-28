import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

/**
 * Loading placeholder. `aria-hidden` keeps the pulsing block out of the
 * accessibility tree; the animation self-disables under reduced-motion.
 */
export function Skeleton({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
}
