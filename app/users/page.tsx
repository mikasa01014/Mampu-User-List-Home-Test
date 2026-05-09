import { fetchUsersWithActivity } from "@/lib/api";
import { Suspense } from "react";
import type { Metadata } from "next";
import { UsersTable } from "@/components/UserTable";
import { SkeletonTable, SkeletonMobileCard } from "@/components/Skeletons";
import { ErrorState } from "@/components/ErrorState";

export const metadata: Metadata = {
  title: "Users",
  description:
    "Browse all users with their activity signals — posts, completed and pending todos.",
};

async function UsersData() {
  let users;
  let errorMsg;

  try {
    users = await fetchUsersWithActivity();
  } catch (err) {
    errorMsg = err instanceof Error ? err.message : "Unknown Error";
  }

  if (errorMsg) {
    return <ErrorState message={`Failed to load users. ${errorMsg}`} />;
  }
  return <UsersTable users={users ?? []} />;
}

function UsersLoadingFallback() {
  return (
    <>
      {/* Desktop Skeleton */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-sm" aria-label="Loading users">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              {[
                "Name",
                "Posts",
                "Completed",
                "Pending",
                "Email",
                "Website",
              ].map((header) => (
                <th
                  key={header}
                  className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <SkeletonTable rows={8} />
        </table>
      </div>

      {/* Mobile skeleton */}
      <div className="md:hidden">
        <SkeletonMobileCard count={5} />
      </div>
    </>
  );
}

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
          Users
        </h1>
      </div>

      <Suspense fallback={<UsersLoadingFallback />}>
        <UsersData />
      </Suspense>
    </div>
  );
}
