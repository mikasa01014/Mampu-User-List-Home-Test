"use client";

import { useMemo, useState, useCallback, useRef, useEffect } from "react";
import {
  type UserWithActivity,
  type SortOrder,
  type SortField,
  FilterType,
} from "@/lib/types";
import { ActivityBadges } from "./ActivityBadges";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { EmptyState } from "./EmptyState";

interface UsersTableProps {
  users: UserWithActivity[];
}

const SORT_LABELS: Record<SortField, string> = {
  name: "Name",
  totalPosts: "Post",
  completedTodos: "Completed",
  pendingTodos: "Pending",
};

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .splice(0, 2)
    .map((name) => name[0])
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
      className={`${color} w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}

function SortIcon({
  field,
  sortField,
  sortOrder,
}: {
  field: SortField;
  sortField: SortField;
  sortOrder: SortOrder;
}) {
  if (field !== sortField) {
    return (
      <svg
        className="w-3 h-3 opacity-30"
        viewBox="0 0 16 16"
        fill="currentColor"
      >
        <path d="M5 8l3-4 3 4H5zm0 0l3 4 3-4H5z" opacity="0" />
        <path d="M4 6l4-4 4 4H4zm0 4l4 4 4-4H4z" />
      </svg>
    );
  }

  return sortOrder === "asc" ? (
    <svg
      className="w-3.5 h-3.5 text-indigo-600"
      viewBox="0 0 16 16"
      fill="currentColor"
    >
      <path d="M4 10l4-6 4 6H4z" />
    </svg>
  ) : (
    <svg
      className="w-3.5 h-3.5 text-indigo-600"
      viewBox="0 0 16 16"
      fill="currentColor"
    >
      <path d="M4 6l4 6 4-6H4z" />
    </svg>
  );
}

export function UsersTable({ users }: UsersTableProps) {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const [searchs, setSearchs] = useState(
    () => searchParams.get("search") ?? "",
  );
  const [sortField, setSortField] = useState<SortField>(
    () => (searchParams.get("sort") as SortField) ?? "name",
  );
  const [sortOrder, setSortOrder] = useState<SortOrder>(
    () => (searchParams.get("order") as SortOrder) ?? "asc",
  );
  const [filter, setFilter] = useState<FilterType>(
    () => (searchParams.get("filter") as FilterType) ?? "all",
  );

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Sync the state to URL
  const syncURL = useCallback(
    (search: string, sort: SortField, order: SortOrder, filter: FilterType) => {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (sort !== "name") params.set("sort", sort);
      if (order !== "asc") params.set("order", order);
      if (filter !== "all") params.set("filter", filter);
      const query = params.toString();
      router.replace(`${pathName}${query ? `?${query}` : ""} `, {
        scroll: false,
      });
    },
    [router, pathName],
  );

  useEffect(() => {
    syncURL(searchs, sortField, sortOrder, filter);
  }, [searchs, sortField, sortOrder, filter, syncURL]);

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortOrder((order) => (order === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const filtered = useMemo(() => {
    let result = users;

    // Search
    const search = searchs.toLowerCase().trim();
    if (search) {
      result = result.filter(
        (user) =>
          user.name.toLowerCase().includes(search) ||
          user.email.toLowerCase().includes(search) ||
          user.username.toLowerCase().includes(search),
      );
    }

    // Filter
    if (filter === "hasPending") {
      result = result.filter((user) => user.pendingTodos > 0);
    } else if (filter === "noCompleted") {
      result = result.filter((user) => user.completedTodos === 0);
    } else if (filter === "active") {
      result = result.filter((user) => user.totalPosts > 0);
    }

    // Sort
    result = [...result].sort((a, b) => {
      let aValue: string | number =
        sortField === "name" ? a.name : a[sortField];
      let bValue: string | number =
        sortField === "name" ? b.name : b[sortField];
      if (typeof aValue === "string") aValue = aValue.toLowerCase();
      if (typeof bValue === "string") bValue = bValue.toLowerCase();
      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return result;
  }, [users, searchs, filter, sortField, sortOrder]);

  const clearFilter = () => {
    setSearchs("");
    setSortField("name");
    setSortOrder("asc");
    setFilter("all");
    searchInputRef.current?.focus();
  };

  const hasActiveFilter = searchs || filter !== "all" || sortField !== "name";

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-2">
        {/* Search */}
        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            ref={searchInputRef}
            type="search"
            placeholder="Search by name, username or email"
            value={searchs}
            onChange={(e) => setSearchs(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder:text-slate-400 transition-shadow"
            aria-label="Search users"
          />
        </div>

        {/* Activity filter */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as FilterType)}
          className="px-3 py-2.5 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700 transition-shadow cursor-pointer"
          aria-label="Filter users"
        >
          <option value="all">All users</option>
          <option value="hasPending">Has pending todos</option>
          <option value="noCompleted">No completed todos</option>
          <option value="active">Has posts</option>
        </select>
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>
          Showing <strong className="text-slate-800">{users.length}</strong> of{" "}
          <strong className="text-slate-800">{users.length}</strong> users
        </span>
        {hasActiveFilter && (
          <button
            onClick={clearFilter}
            className="text-indigo-600 hover:text-indigo-700 font-medium underline underline-offset-2"
          >
            Clear Filter
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="No user match your filter"
          message="Try different search or adjust the filter."
          action={
            <button
              onClick={clearFilter}
              className="text-sm text-indigo-600 font-semibold hover:underline"
            >
              Clear all filter(s)
            </button>
          }
        />
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
            <table
              className="w-full text-sm"
              role="grid"
              aria-label="Users List"
            >
              <thead>
                <tr className="border-b border-slate-200 bg-slate-100">
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
                    onClick={() => router.push(`/users/${user.id}`)}
                  >
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3 min-w-0">
                        <Avatar name={user.name} />
                        <div className="min-w-0">
                          <a
                            href={`/users/${user.id}`}
                            className="font-semibold text-slate-800 hover:text-indigo-600 transition-colors truncate block max-w-[180px] group-hover:text-indigo-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {user.name}
                          </a>
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
          <div
            className="md:hidden space-y-4"
            role="list"
            aria-label="Users list"
          >
            {filtered.map((user) => (
              <a
                href={`/users/${user.id}`}
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
                    <p className="text-xs text-slate-500 truncate">
                      {user.email}
                    </p>
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
              </a>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
