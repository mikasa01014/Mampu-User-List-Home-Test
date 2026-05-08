interface ActivityBadgesProps {
  totalPosts: number;
  completedTodos: number;
  pendingTodos: number;
  compact?: boolean;
}

export function ActivityBadges({
  totalPosts,
  completedTodos,
  pendingTodos,
  compact = false,
}: ActivityBadgesProps) {
  const size = compact ? "text-[10px] px-1.5 py-0.5" : "text-xs px-2 py-0.5";

  return (
    <div className="flex flex-wrap gap-1.5">
      <span
        title="Total posts"
        className={`inline-flex items-center gap-1 rounded-full font-semibold bg-indigo-50 text-indigo-70 ${size}`}
      >
        <svg className="w-3 h-3" viewBox="0 0 16 16" fill="currentColor">
          <path d="M14 1H2a1 1 0 00-1 1v10a1 1 0 001 1h3l3 2 3-2h3a1 1 0 001-1V2a1 1 0 00-1-1zm-1 10H3V3h10v8z" />
        </svg>
        {totalPosts}
        {!compact && <span className="font-normal opacity-60">posts</span>}
      </span>
      <span
        title="Completed todos"
        className={`inline-flex items-center gap-1 rounded-full font-semibold bg-emerald-50 text-emerald-700 ${size}`}
      >
        <svg className="w-3 h-3" viewBox="0 0 16 16" fill="currentColor">
          <path d="M6 11.5L2.5 8l1-1L6 9.5l6.5-6.5 1 1L6 11.5z" />
        </svg>
        {completedTodos}
        {!compact && <span className="font-normal opacity-70">done</span>}
      </span>
      {pendingTodos > 0 ? (
        <span
          className={`inline-flex items-center gap-1 rounded-full font-semibold bg-amber-50 text-amber-700 ${size}`}
          title="Pending todos"
        >
          <svg className="w-3 h-3" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 12A5 5 0 118 3a5 5 0 010 10zm1-5.5V4H7v5l3.5 2.1.8-1.2L9 8.5z" />
          </svg>
          {pendingTodos}
          {!compact && <span className="font-normal opacity-70">pending</span>}
        </span>
      ) : (
        <span
          className={`inline-flex items-center gap-1 rounded-full font-semibold bg-slate-100 text-slate-500 ${size}`}
          title="No pending todos"
        >
          <svg className="w-3 h-3" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 12A5 5 0 118 3a5 5 0 010 10zm1-5.5V4H7v5l3.5 2.1.8-1.2L9 8.5z" />
          </svg>
          0{!compact && <span className="font-normal opacity-70">pending</span>}
        </span>
      )}
    </div>
  );
}