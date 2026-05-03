export function Skeleton({ className, count = 1 }) {
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <div key={i} className={`animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800 ${className}`} />
      ))}
    </>
  )
}

export function SkeletonCard() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <Skeleton className="h-4 w-32 mb-4" />
      <Skeleton className="h-8 w-full mb-2" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  )
}

export function SkeletonTable() {
  return (
    <div className="space-y-3">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center gap-4">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 flex-1" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      ))}
    </div>
  )
}
