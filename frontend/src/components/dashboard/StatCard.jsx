export function StatCard({ title, value, description, accent }) {
  return (
    <div className={`rounded-3xl border border-slate-200 bg-white p-6 shadow-sm ${accent}`}>
      <div className="text-sm font-medium uppercase tracking-[0.3em] text-slate-500">{title}</div>
      <div className="mt-4 text-3xl font-semibold text-slate-900">{value}</div>
      <p className="mt-2 text-sm text-slate-600">{description}</p>
    </div>
  )
}
