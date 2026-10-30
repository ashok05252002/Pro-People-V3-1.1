// Small shared building blocks used across pages.

export function PageHeader({ title, subtitle, children }) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {subtitle && <p className="mt-0.5 text-[13px] text-base-content/60">{subtitle}</p>}
      </div>
      {children && <div className="flex flex-wrap items-center gap-2">{children}</div>}
    </div>
  )
}

export function Card({ icon: Icon, title, subtitle, action, children, className = '', bodyClass = 'p-4' }) {
  return (
    <section className={`flex flex-col rounded-xl border border-base-300 bg-base-100 shadow-sm ${className}`}>
      {title && (
        <header className="flex items-center gap-3 border-b border-base-300 px-4 py-3.5">
          {Icon && (
            <span className="grid size-8 place-items-center rounded-md bg-primary/5 text-primary">
              <Icon size={16} strokeWidth={1.6} />
            </span>
          )}
          <div className="flex-1">
            <h3 className="text-[15px] font-semibold">{title}</h3>
            {subtitle && <p className="text-[11px] text-base-content/50">{subtitle}</p>}
          </div>
          {action}
        </header>
      )}
      <div className={`flex-1 ${bodyClass}`}>{children}</div>
    </section>
  )
}

export function Empty({ icon: Icon, text }) {
  return (
    <div className="flex h-full min-h-40 flex-col items-center justify-center gap-3 text-[13px] text-base-content/50">
      {Icon && (
        <span className="grid size-12 place-items-center rounded-full bg-base-200">
          <Icon size={20} strokeWidth={1.4} />
        </span>
      )}
      {text}
    </div>
  )
}

export const initials = (name) => name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase()

export function Avatar({ name, color = '#6366f1', size = 'size-9' }) {
  return (
    <span className={`grid ${size} shrink-0 place-items-center rounded-full text-xs font-bold text-white`} style={{ background: color }}>
      {initials(name)}
    </span>
  )
}

export const inr = (n) => '₹' + n.toLocaleString('en-IN')
