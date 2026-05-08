import type { User, Post, Todo, UserWithActivity } from "./types";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export async function fetchUsers(): Promise<User[]> {
  const res = await fetch(`${BASE_URL}/users`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch users: ${res.status}`);
  }

  return res.json();
}

export async function fetchUser(id: string | number): Promise<User> {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch user ${id}: ${res.status}`);
  }

  return res.json();
}

export async function fetchPosts(): Promise<Post[]> {
  const res = await fetch(`${BASE_URL}/posts`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch posts: ${res.status}`);
  }

  return res.json();
}

export async function fetchTodos(): Promise<Todo[]> {
  const res = await fetch(`${BASE_URL}/todos`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch todos: ${res.status}`);
  }

  return res.json();
}

export async function fetchPostsByUser(userId: string | number): Promise<Post[]> {
  const res = await fetch(`${BASE_URL}/posts?userId=${userId}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch posts for user ${userId}: ${res.status}`);
  }

  return res.json();
}

export async function fetchTodosByUser(userId: string | number): Promise<Todo[]> {
  const res = await fetch(`${BASE_URL}/todos?userId=${userId}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch todos for user ${userId}: ${res.status}`);
  }

  return res.json();
}

export async function fetchUsersWithActivity(): Promise<UserWithActivity[]> {
  const [users, posts, todos] = await Promise.all([
    fetchUsers(),
    fetchPosts(),
    fetchTodos(),
  ]);

  const postCountByUser: Record<number, number> = {};
  for (const post of posts) {
    postCountByUser[post.userId] = (postCountByUser[post.userId] ?? 0) + 1;
  }

  const completedByUser: Record<number, number> = {};
  const pendingByUser: Record<number, number> = {};
  for (const todo of todos) {
    if (todo.completed) {
      completedByUser[todo.userId] = (completedByUser[todo.userId] ?? 0) + 1;
    } else {
      pendingByUser[todo.userId] = (pendingByUser[todo.userId] ?? 0) + 1;
    }
  }

  return users.map((user) => ({
    ...user,
    totalPosts: postCountByUser[user.id] ?? 0,
    completedTodos: completedByUser[user.id] ?? 0,
    pendingTodos: pendingByUser[user.id] ?? 0,
  }));
}