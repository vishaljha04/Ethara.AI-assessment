export function Card({ children, className }) {
  return (
    <div className={`rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100 ${className || ''}`}>
      {children}
    </div>
  )
}
