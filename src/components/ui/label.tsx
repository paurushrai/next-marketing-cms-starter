import type { LabelHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

/**
 * Form label. Pair with a control via `htmlFor` so clicks focus the input and
 * screen readers announce the accessible name.
 */
export function Label({
  className,
  ...props
}: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn(
        "text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className,
      )}
      {...props}
    />
  );
}
