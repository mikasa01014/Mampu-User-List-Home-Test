import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchUser, fetchPostsByUser, fetchTodosByUser } from "@/lib/api";
import Link from "next/link";
import { UserDetailCard } from "@/components/UserDetailCard";

interface Params {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const idNum = parseInt(id, 10);

  if (isNaN(idNum) || idNum < 1) {
    return { title: "User Not Found" };
  }

  try {
    const user = await fetchUser(idNum);
    return {
      title: `${user.name} | User Detail`,
      description: `Detail page of ${user.name}'s profile, posts, and todos. Works at ${user.company.name}.`,
    };
  } catch {
    return { title: "User Not Found" };
  }
}

export default async function UserDetailPage({ params }: Params) {
  const { id } = await params;
  const idNum = parseInt(id, 10);

  // Handle invalid id
  if (isNaN(idNum) || idNum < 1 || idNum > 10) {
    notFound();
  }

  let user, post, todo;

  try {
    [user, post, todo] = await Promise.all([
      fetchUser(idNum),
      fetchPostsByUser(idNum),
      fetchTodosByUser(idNum),
    ]);
  } catch(e) {
    const errorMsg = e instanceof Error ? e.message : "Unknown error";
    return (
      <div className="space-y-4">
        <Link
          href="/users"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to list
        </Link>
        <div
          role="alert"
          data-testid="error-state"
          className="flex flex-col items-center justify-center py-20 text-center"
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
            Failed to load user
          </h3>
          <p className="text-slate-500 text-sm">{errorMsg}</p>
        </div>
      </div>
    );
  }

  if(!user || typeof user.id === 'undefined') {
    notFound();
  }

  return (
    <div className="space-y-6">
      <Link
        href={"/users"}
        className="inline-flex items-center gap-2 test-sm text-slate-500 hover:text-indigo-600 transition-colors font-medium"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to list
      </Link>

      <UserDetailCard user={user} post={post} todo={todo} />
    </div>
  );
}