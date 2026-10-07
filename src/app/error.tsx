'use client';

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="mx-auto flex min-h-[50vh] max-w-3xl flex-col items-center justify-center gap-4 px-4 py-16 text-center">
      <h1 className="text-2xl font-bold text-charcoal">Something went wrong</h1>
      <p className="text-sm text-slate-600">The page could not be loaded. Please try again.</p>
      <button
        type="button"
        onClick={() => reset()}
        className="min-h-11 rounded-xl bg-aqua-700 px-5 py-3 text-sm font-semibold text-white hover:bg-aqua-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua-700"
      >
        Try again
      </button>
    </main>
  );
}
