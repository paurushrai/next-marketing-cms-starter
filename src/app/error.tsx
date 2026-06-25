"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto flex max-w-5xl flex-1 flex-col items-center justify-center gap-4 px-6 py-24">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <button onClick={reset} className="underline">
        Try again
      </button>
    </main>
  );
}
