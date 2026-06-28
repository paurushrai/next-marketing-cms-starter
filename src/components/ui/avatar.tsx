import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const avatarVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted text-muted-foreground font-medium select-none",
  {
    variants: {
      size: {
        sm: "h-8 w-8 text-xs",
        md: "h-10 w-10 text-sm",
        lg: "h-14 w-14 text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

/** Derive up to two uppercase initials from a name for the fallback. */
function initialsOf(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

interface AvatarProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, "children">,
    VariantProps<typeof avatarVariants> {
  /** Person/entity name — used for initials and the image alt text. */
  name: string;
  /** Optional image URL. Falls back to initials when omitted. */
  src?: string;
}

/**
 * Circular avatar. Renders the image when `src` is provided, otherwise shows
 * initials derived from `name`. `name` always drives the alt text for a11y.
 */
export function Avatar({ className, size, name, src, ...props }: AvatarProps) {
  return (
    <span className={cn(avatarVariants({ size }), className)} {...props}>
      {src ? (
        // A library avatar must accept arbitrary (often remote) URLs. next/image
        // would force consumers to allowlist every host in remotePatterns or hit
        // a runtime throw; the gain on a ≤56px image is negligible. Plain img is
        // the correct primitive here.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={name}
          className="h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <span aria-hidden>{initialsOf(name)}</span>
      )}
    </span>
  );
}

export { avatarVariants, initialsOf };
