import Link from "next/link";

import { siteConfig } from "@/config/site";

export function Header() {
  return (
    <header className="border-b">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-semibold">
          {siteConfig.name}
        </Link>
        <ul className="flex gap-6 text-sm">
          {siteConfig.nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
