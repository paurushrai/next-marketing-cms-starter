import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-5xl flex-1 flex-col items-center justify-center gap-4 px-6 py-24">
      <h1 className="text-2xl font-bold">Page not found</h1>
      <Link href="/" className="underline">
        Back to home
      </Link>
    </main>
  );
}
