import Link from "next/link";

import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";

export function Header() {
  return (
    <header className="border-b border-border bg-background/80 backdrop-blur">
      <Container className="flex items-center justify-between py-4">
        <Link href="/" className="font-display font-semibold">
          {siteConfig.name}
        </Link>
        <nav className="flex items-center gap-6">
          <ul className="hidden items-center gap-6 text-sm text-muted-foreground sm:flex">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </nav>
      </Container>
    </header>
  );
}
