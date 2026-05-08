"use client";

import { useMemo } from "react";
import type { UserWithActivity } from "@/lib/types";
import { ActivityBadges } from "./ActivityBadges";

interface UsersTableProps {
  users: UserWithActivity[];
}


function Avatar({ name } : { name : string }) {
  const initials = name
    .split(" ")
    .splice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
  const colors = [
    "bg-indigo-500",
    "bg-violet-500",
    "bg-pink-500",
    "bg-fuchsia-500",
    "bg-teal-500",
    "bg-cyan-500",
    "bg-sky-500",
    "bg-rose-500",
    "bg-amber-500",
    "bg-emerald-500",
  ];
  const color = colors[name.charCodeAt(0) % colors.length];
  return (
    <div
      className={`${color} w-8.5 h-8.5 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shirnk-0`}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}

export function UsersTable({ users } : UsersTableProps) {
  const filtered = useMemo(() => {
    const result = users;

    return result;
  }, [users]);
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>
          Showing <strong className="text-slate-800">{users.length}</strong> of{" "}
          <strong className="text-slate-800">{users.length}</strong> users
        </span>
      </div>
      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-sm" role="grid" aria-label="Users List">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-60">
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider rounded-tl-xl"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"
              >
                Post
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"
              >
                Completed
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"
              >
                Pending
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider rounded-tr-xl"
              >
                Website
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-indigo-50/40 transition-colors group cursor-pointer"
              >
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-3 min-w-0">
                    <Avatar name={user.name} />
                    <div className="min-w-0">
                      <div className="font-semibold text-slate-800 hover:text-indigo-600 transition-colors truncate block max-w-[180px] group-hover:text-indigo-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded">
                        {user.name}
                      </div>
                      <span className="text-xs text-slate-400 font-mono">
                        @{user.username}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <span className="inline-flex items-center gap-1 font-semibold text-indigo-700">
                    {user.totalPosts}
                  </span>
                </td>
                <td className="px-4 py-3.5">
                  <span className="inline-flex items-center gap-1 font-semibold text-indigo-700">
                    {user.completedTodos}
                  </span>
                </td>
                <td className="px-4 py-3.5">
                  {user.pendingTodos > 0 ? (
                    <span className="inline-flex items-center gap-1 font-semibold text-amber-700">
                      {user.pendingTodos}
                    </span>
                  ) : (
                    <span className="text-slate-300 font-semibold">0</span>
                  )}
                </td>
                <td className="px-4 py-3.5">
                  <span className="text-slate-600 truncate block max-w-[200px]">
                    {user.email}
                  </span>
                </td>
                <td className="px-4 py-3.5">
                  <a
                    href={`https://${user.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:underline text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {user.website}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card list */}
      <div className="md:hidden space-y-4" role="list" aria-label="Users list">
        {filtered.map((user) => (
          <div
            className="flex flex-col gap-3 bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            key={user.id}
            role="listitem"
          >
            <div className="flex items-center gap-3">
              <Avatar name={user.name} />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-800 truncate">
                  {user.name}
                </p>
                <p className="text-xs text-slate-500 truncate">{user.email}</p>
              </div>
              <svg
                className="w-4 h-4 text-slate-300 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
            <ActivityBadges
              totalPosts={user.totalPosts}
              completedTodos={user.completedTodos}
              pendingTodos={user.pendingTodos}
            />
          </div>
        ))}
      </div>
    </div>
  );
}