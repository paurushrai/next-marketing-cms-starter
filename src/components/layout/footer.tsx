import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-5xl px-6 py-8 text-sm text-gray-500">
        {siteConfig.name}
      </div>
    </footer>
  );
}
