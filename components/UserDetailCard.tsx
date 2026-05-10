"use client";

import type { User, Post, Todo } from "@/lib/types";
import { useState } from "react";

interface InfoRowProps {
  label: string;
  value: string;
}

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div>
      <dt className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-0.5">
        {label}
      </dt>
      <dd className="text-sm text-slate-800 font-medium break-words">
        {value}
      </dd>
    </div>
  );
}

interface UserDetailCardProps {
  user: User;
  post: Post[];
  todo: Todo[];
}

export function UserDetailCard({ user, post, todo }: UserDetailCardProps) {
  const completeTodos = todo.filter((data) => data.completed);
  const pendingTodos = todo.filter((data) => !data.completed);

  const [showAllPosts, setShowAllPosts] = useState(false);
  const [showAllTodos, setShowAllTodos] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-300 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-2xl font-black flex-shrink-0">
            {user.name
              .split(" ")
              .splice(0, 2)
              .map((name) => name[0])
              .join("")
              .toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight leading-tight break-words">
              {user.name}
            </h1>
            <p className="text-slate-500 font-mono text-sm mt-0.5">
              @{user.username}
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="badge badge-blue">{post.length} posts</span>
              <span className="badge badge-green">
                {completeTodos.length} done
              </span>
              {pendingTodos.length > 0 && (
                <span className="badge badge-amber">
                  {pendingTodos.length} pending
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Contact */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
            Contact
          </h2>
          <dl className="space-y-3">
            <InfoRow label="📧 Email" value={user.email} />
            <InfoRow label="📞 Phone" value={user.phone} />
            <InfoRow label="🌐 Website" value={user.website} />
          </dl>
        </div>

        {/* Address */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
            Address
          </h2>
          <dl className="space-y-3">
            <InfoRow
              label="Street"
              value={`${user.address.street}, ${user.address.suite}`}
            />
            <InfoRow label="City" value={user.address.city} />
            <InfoRow label="Zipcode" value={user.address.zipcode} />
          </dl>
        </div>

        {/* Company */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm md:col-span-2">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
            Company
          </h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <InfoRow label="Name" value={user.company.name} />
            <InfoRow label="Catchphrase" value={user.company.catchPhrase} />
          </dl>
        </div>
      </div>

      {/* Posts */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
          <h2 className="font-bold text-slate-900">
            Post{" "}
            <span className="text-slate-500 font-normal text-sm ml-1">
              ({post.length})
            </span>
          </h2>
        </div>
        {post.length === 0 ? (
          <p className="px-5 py-4 text-sm text-slate-500 text-center">
            No post(s) yet
          </p>
        ) : (
          <ul className="divide-y divide-slate-200" data-testid="posts-list">
            {showAllPosts
              ? post.map((posts) => (
                  <li key={posts.id} className="px-5 py-4">
                    <p className="font-semibold text-slate-800 text-sm capitalize leading-snug break-words">
                      {posts.title}
                    </p>
                    <p className="text-slate-500 text-sm mt-1 line-clamp-2 break-words">
                      {posts.body}
                    </p>
                  </li>
                ))
              : post.slice(0, 5).map((posts) => (
                  <li key={posts.id} className="px-5 py-4">
                    <p className="font-semibold text-slate-800 text-sm capitalize leading-snug break-words">
                      {posts.title}
                    </p>
                    <p className="text-slate-500 text-sm mt-1 line-clamp-2 break-words">
                      {posts.body}
                    </p>
                  </li>
                ))}
            {!showAllPosts && post.length > 5 && (
              <li className="px-5 py-3 bg-slate-50">
                <button
                  onClick={() => setShowAllPosts(true)}
                  className="w-full text-xs text-indigo-600 text-center hover:text-indigo-700 font-medium cursor-pointer"
                >
                  +{post.length - 5} more post(s)
                </button>
              </li>
            )}

            {showAllPosts && post.length > 5 && (
              <li className="px-5 py-3 bg-slate-50">
                <button
                  onClick={() => setShowAllPosts(false)}
                  className="w-full text-xs text-slate-500 hover:text-slate-700 font-medium cursor-pointer"
                >
                  Show less
                </button>
              </li>
            )}
          </ul>
        )}
      </div>

      {/* Todos */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 flex items-center gap-3">
          <h2 className="font-bold text-slate-800">
            Todos{" "}
            <span className="text-slate-400 font-normal text-sm ml-1">
              ({todo.length})
            </span>
          </h2>
          <div className="flex gap-2 ml-auto text-xs">
            <span className="badge badge-green">
              {completeTodos.length} done
            </span>
            {pendingTodos.length > 0 && (
              <span className="badge badge-amber">
                {pendingTodos.length} pending
              </span>
            )}
          </div>
        </div>
        {todo.length === 0 ? (
          <p className="px-5 py-8 text-sm text-slate-400 text-center">
            No todo(s) yet.
          </p>
        ) : (
          <ul
            className="divide-y divide-slate-100 max-h-80 overflow-y-auto"
            data-testid="todos-list"
          >
            {showAllTodos
              ? [...pendingTodos, ...completeTodos].map((todo) => (
                  <li
                    key={todo.id}
                    className="px-5 py-3 flex items-start gap-3"
                  >
                    <div
                      className={`mt-0.5 w-4 h-4 rounded flex-shrink-0 flex items-center justify-center ${
                        todo.completed
                          ? "bg-emerald-500"
                          : "border-2 border-amber-400"
                      }`}
                    >
                      {todo.completed && (
                        <svg
                          className="w-2.5 h-2.5 text-white"
                          viewBox="0 0 10 10"
                          fill="none"
                        >
                          <path
                            d="M2 5l2.5 2.5L8 2.5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                    <span
                      className={`text-sm break-words ${
                        todo.completed
                          ? "text-slate-400 line-through"
                          : "text-slate-700"
                      }`}
                    >
                      {todo.title}
                    </span>
                  </li>
                ))
              : [...pendingTodos.slice(0, 5), ...completeTodos.slice(0, 5)].map(
                  (todo) => (
                    <li
                      key={todo.id}
                      className="px-5 py-3 flex items-start gap-3"
                    >
                      <div
                        className={`mt-0.5 w-4 h-4 rounded flex-shrink-0 flex items-center justify-center ${
                          todo.completed
                            ? "bg-emerald-500"
                            : "border-2 border-amber-400"
                        }`}
                      >
                        {todo.completed && (
                          <svg
                            className="w-2.5 h-2.5 text-white"
                            viewBox="0 0 10 10"
                            fill="none"
                          >
                            <path
                              d="M2 5l2.5 2.5L8 2.5"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>
                      <span
                        className={`text-sm break-words ${
                          todo.completed
                            ? "text-slate-400 line-through"
                            : "text-slate-700"
                        }`}
                      >
                        {todo.title}
                      </span>
                    </li>
                  ),
                )}
          </ul>
        )}
        {!showAllTodos && todo.length > 10 && (
          <div className="px-5 py-3 bg-slate-50 border-t border-slate-300">
            <button
              onClick={() => setShowAllTodos(true)}
              className="w-full text-xs text-indigo-600 text-center hover:text-indigo-700 font-medium cursor-pointer"
            >
              Showing 10 of {todo.length} todo(s)
            </button>
          </div>
        )}

        {showAllTodos && todo.length > 10 && (
          <div className="px-5 py-3 bg-slate-50 border-t border-slate-100">
            <button
              onClick={() => setShowAllTodos(false)}
              className="w-full text-xs text-slate-500 hover:text-slate-700 font-medium cursor-pointer"
            >
              Show less
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
