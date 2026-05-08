import { fetchUsersWithActivity } from '@/lib/api'
import { Suspense } from 'react'
import type { Metadata } from "next";
import { UsersTable } from '@/components/UserTable';

export const metadata: Metadata = {
  title: "Users",
  description: "Browse all users with their activity signals — posts, completed and pending todos."
}

async function UsersData() {
  let users;
  let errorMsg;

  try {
    users = await fetchUsersWithActivity();
    console.log(users);
  } catch (err) {
    errorMsg = err instanceof Error ? err.message : "Unknown Error";
  }

  if (errorMsg) {
    return (
      <div
        className="flex flex-col items-center justify-center py-20 text-center"
        data-testid="error-state"
        role="alert"
      >
        <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
        </div>
        <h3 className="text-slate-800 font-semibold text-base mb-1">
          Something went wrong
        </h3>
        <p className="text-slate-500 text-sm max-w-xs">{`Failed to load users. ${errorMsg}`}</p>
      </div>
    );
  }
  return <UsersTable users={users ?? []} />;
}

export default function UsersPage() {
 
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
          Users
        </h1>
      </div>

      <Suspense>
        <UsersData />
      </Suspense>
    </div>
  );
}