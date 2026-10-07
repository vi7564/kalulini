import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center gap-4 px-4 py-16 text-center">
      <p className="text-sm font-bold uppercase tracking-widest text-aqua-700">404 · Page not found</p>
      <h1 className="text-3xl font-black tracking-tight text-charcoal sm:text-4xl">This page isn’t available</h1>
      <p className="max-w-lg text-sm leading-6 text-slate-600">The page may have moved or the address may be incorrect.</p>
      <Link href="/" className="inline-flex min-h-11 items-center rounded-xl bg-aqua-700 px-5 py-3 text-sm font-semibold text-white hover:bg-aqua-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua-700">
        Return to home
      </Link>
    </main>
  );
}
