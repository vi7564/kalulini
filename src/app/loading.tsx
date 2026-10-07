export default function Loading() {
  return (
    <main aria-busy="true" aria-live="polite" className="mx-auto flex min-h-[50vh] w-full max-w-7xl items-center justify-center px-4 py-16">
      <p className="rounded-xl bg-slate-100 px-5 py-4 text-sm font-medium text-slate-700">
        <span className="sr-only">Loading page. </span>
        Please wait…
      </p>
    </main>
  );
}
