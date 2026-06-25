import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

/** Centered, max-width content wrapper used to keep page gutters consistent. */
export function Container({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mx-auto w-full max-w-5xl px-6", className)}
      {...props}
    />
  );
}
