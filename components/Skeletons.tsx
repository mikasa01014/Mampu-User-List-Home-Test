"use client";

export function SkeletonRow() {
  return (
    <tr className="border-b border-slate-100">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <td key={i} className="px-4 py-3">
          <div
            className="h-4 rounded-md bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200"
            style={{
              width: `${[70, 85, 60, 50, 45, 55][i - 1]}%`,
              backgroundSize: "200% 100%",
              animation: "shimmer 1.5s infinite",
              animationDelay: `${i * 0.1}s`,
            }}
          />
        </td>
      ))}
    </tr>
  );
}

export function SkeletonTable({ rows = 8 }: { rows?: number }) {
  return (
    <tbody data-testid="skeleton-table">
      {Array.from({ length: rows }).map((_, i) => (
        <SkeletonRow key={i} />
      ))}
    </tbody>
  );
}

export function SkeletonCard() {
  return (
    <div className="animate-pulse space-y-4" data-testid="skeleton-card">
      <div className="h-8 bg-slate-200 rounded-lg w-1/2" />
      <div className="h-4 bg-slate-200 rounded w-1/3" />
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-3 bg-slate-200 rounded w-1/4" />
            <div className="h-4 bg-slate-200 rounded w-3/4" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function SkeletonMobileCard({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-3" data-testid="skeleton-mobile">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-xl border border-slate-200 p-4 space-y-3 animate-pulse"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-200 flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-slate-200 rounded w-3/4" />
              <div className="h-3 bg-slate-200 rounded w-1/2" />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="h-6 bg-slate-200 rounded-full w-20" />
            <div className="h-6 bg-slate-200 rounded-full w-20" />
            <div className="h-6 bg-slate-200 rounded-full w-20" />
          </div>
        </div>
      ))}
    </div>
  );
}
