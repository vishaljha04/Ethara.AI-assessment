export function StatCard({ title, value, description, icon: Icon, trend }) {
  return (
    <div className="group rounded-lg border border-slate-200 bg-white p-6 transition hover:border-slate-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">{title}</p>
          <div className="mt-3 flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-100">{value}</h3>
            {trend && <span className={`text-xs font-semibold ${trend.positive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>{trend.label}</span>}
          </div>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{description}</p>
        </div>
        {Icon && <div className="ml-4 rounded-lg bg-slate-100 p-3 text-slate-600 dark:bg-slate-700 dark:text-slate-400"><Icon size={24} /></div>}
      </div>
    </div>
  )
}
