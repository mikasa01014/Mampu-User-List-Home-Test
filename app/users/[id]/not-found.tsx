import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-20 h-20 rounded-3xl bg-slate-100 flex items-center justify-center mb-6">
        <span className="text-4xl font-black text-slate-300">?</span>
      </div>
      <h1 className="text-2xl font-bold text-slate-900 mb-2">User not found</h1>
      <p className="text-slate-500 text-sm mb-6 max-w-xs">
        The user you&apos;r looking for doesn&apos;t exist or the ID is invalid.
      </p>
      <Link
        href={"/users"}
        className="inline-flex items-center gap-3 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-800 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to users list
      </Link>
    </div>
  );
}