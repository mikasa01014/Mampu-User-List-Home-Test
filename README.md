# User List Dashboard

Technical assessment for PT Mampu Inovasi Digital built with **Next.js 16 App Router**, **TypeScript**, and **Tailwind CSS**.

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Data fetching | Server Components + `fetch()` with ISR (`revalidate: 60`) |
| Testing | Jest 30 + React Testing Library |
| State persistence | URL search params (via `useSearchParams` / `router.replace`) |

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev
# → http://localhost:3000  (redirects to /users)

# 3. Run tests
npm test

# 4. Production build
npm run build && npm start
```

---

## Feature Coverage

### Task 1 — Setup ✅
- Next.js 16 + TypeScript + App Router
- Tailwind CSS configured with custom theme
- Jest + RTL for unit tests

### Task 2 — Users List `/users` ✅
- Server Component fetches users + posts + todos concurrently
- Streaming via `<Suspense>` with skeleton fallback
- ISR revalidation every 60 seconds (`next: { revalidate: 60 }`)
- Search input (name + email filter)
- Sort by: Name, Posts, Completed Todos, Pending Todos
- Loading skeleton and error states

### Task 3 — User Details `/users/[id]` ✅
- `generateMetadata` for per-user SEO titles/descriptions
- Shows: Name, Username, Email, Phone, Website, Company (name + catchphrase), Address
- "Back to list" link
- Loading and error states
- `notFound()` for invalid IDs

### Task 4 — User Operations ✅
- Enriches each user row with: **total posts**, **completed todos**, **pending todos**
- Activity filter dropdown: All / Has pending todos / No completed todos / Has posts
- URL-persisted filter + sort state — survives back-navigation
- User detail page shows first 5 posts and first 10 todos (pending-first)
- Graceful handling: empty results, fetch failures, invalid user IDs, long content

### Task 5 — Styling & UX ✅
- Responsive: desktop table + mobile card list
- Skeleton loaders for all async sections
- Empty-state messaging with clear-filters action
- Accessible: `scope="col"` headers, `aria-sort`, focus-visible rings, `role="list"` on mobile

### Task 6 — Testing ✅
- **`users-list.test.tsx`** — renders with activity signals, name/email search, activity filter, sort, empty state, error state
- **`user-detail.test.tsx`** — user fields, posts section, todos section, empty sub-sections
- **`api.test.ts`** — `fetchUsers`, `fetchUser`, `fetchUsersWithActivity` with mocked `fetch`
- **`components.test.tsx`** — Skeleton, EmptyState, ErrorState, ActivityBadges

---

## Project Structure

```
app/
  layout.tsx              # Root layout with nav
  page.tsx                # Redirects → /users
  users/
    page.tsx              # Task 2+4: users list (Server Component + Suspense)
    loading.tsx           # Skeleton fallback
    [id]/
      page.tsx            # Task 3+4: user detail (Server Component)
      loading.tsx         # Skeleton fallback
      not-found.tsx       # 404 for invalid IDs

components/
  UsersTable.tsx          # Client: search, filter, sort, desktop table + mobile cards
  UserDetailCard.tsx      # User info + posts + todos
  ActivityBadges.tsx      # Posts / completed / pending badges
  Skeletons.tsx           # Loading skeletons
  EmptyState.tsx          # Empty + error states

lib/
  api.ts                  # fetch wrappers with ISR + error handling
  types.ts                # TypeScript types

__tests__/
  fixtures.ts             # Shared mock data
  users-list.test.tsx
  user-detail.test.tsx
  api.test.ts
  components.test.tsx
```

---

## Key Design Decisions

**URL-based filter state** — Search query, sort field, sort order, and activity filter are all synced to the URL via `router.replace`. This means clicking a user and pressing Back restores the exact filter state, no state management library needed.

**Server Components for data** — All three APIs (users, posts, todos) are fetched concurrently in a single Server Component with `Promise.all`, keeping the client bundle lean.

**ISR** — All `fetch` calls use `next: { revalidate: 60 }` so data is cached at the CDN edge and revalidated every 60 seconds.

**Responsive split** — Desktop uses an accessible `<table>` with sortable column headers; mobile uses a card list so content is never squeezed.

---

## Notes

- JSONPlaceholder only has users 1–10; navigating to `/users/11+` returns a 404 page.
