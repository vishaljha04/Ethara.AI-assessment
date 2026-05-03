export function StatCard({ title, value, description, icon: Icon, trend }) {
  return (
    <div className="group rounded-lg border border-zinc-200 bg-white p-6 transition hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">{title}</p>
          <div className="mt-3 flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">{value}</h3>
            {trend && <span className={`text-xs font-semibold ${trend.positive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>{trend.label}</span>}
          </div>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
        </div>
        {Icon && <div className="ml-4 rounded-lg bg-zinc-100 p-3 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"><Icon size={24} /></div>}
      </div>
    </div>
  )
}
