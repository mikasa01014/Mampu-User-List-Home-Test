import { SkeletonTable, SkeletonMobileCard } from "@/components/Skeletons";

export default function UsersLoading() {
  return (
    <div className="space-y-6">
      <div>
        <div className="h-7 w-24 bg-slate-200 rounded-lg animate-pulse" />
        <div className="h-4 w-64 bg-slate-200 rounded mt-2 animate-pulse" />
      </div>
      <div className="hidden md:block overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              {["Name", "Posts", "Completed", "Pending", "Email", "Website"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <SkeletonTable rows={8} />
        </table>
      </div>
      <div className="md:hidden">
        <SkeletonMobileCard count={5} />
      </div>
    </div>
  );
}
