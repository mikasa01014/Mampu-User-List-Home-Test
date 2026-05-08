import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    default: "Test User List",
    template: "%s | Test User List",
  },
  description: "User list workspace — browse users, posts, and todos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300..700;1,9..40,300..700&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-slate-50 antialiased">
        <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2.5 text-indigo-600 font-bold text-lg tracking-tight hover:text-indigo-700 transition-colors"
            >
              <span className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-sm font-black">
                L
              </span>
              User List Workspace
            </Link>
            <a
              href="/users"
              className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
            >
              Users
            </a>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <footer className="mt-18 border-t border-slate-300 py-6 text-center text-xs text-slate-500">
          User List Workspace · Built with Next.js 16 &amp; Tailwind CSS
        </footer>
      </body>
    </html>
  );
}
