import type { Metadata } from "next";

export const metadata: Metadata = { title: "Blog" };

export default function BlogIndexPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-24">
      <h1 className="text-3xl font-bold">Blog</h1>
    </main>
  );
}
