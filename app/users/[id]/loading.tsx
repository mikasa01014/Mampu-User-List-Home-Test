import { SkeletonCard } from "@/components/Skeletons";

export default function UserDetailLoading() {
  return (
    <div className="space-y-6">
      <div className="h-5 w-28 bg-slate-200 rounded animate-pulse" />
      <SkeletonCard />
    </div>
  );
}