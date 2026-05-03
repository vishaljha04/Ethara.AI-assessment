export function StatCard({ title, value, description, accent }) {
  return (
    <div className={`rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800 ${accent}`}>
      <div className="text-sm font-medium uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">{title}</div>
      <div className="mt-4 text-3xl font-semibold text-slate-900 dark:text-slate-100">{value}</div>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{description}</p>
    </div>
  )
}
