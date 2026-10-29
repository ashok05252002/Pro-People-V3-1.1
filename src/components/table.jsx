// List-page building blocks: page shell, toolbar, data table with selection/sort/pagination, filter drawer.
import { useMemo, useState } from 'react'
import { Search, X, ChevronLeft, ChevronRight, ChevronsUpDown, Filter, Eye, Pencil, Trash2 } from 'lucide-react'
import { Avatar } from './ui'

export function Page({ title, subtitle, actions, children }) {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex min-h-28 flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold">{title}</h1>
          {subtitle && <p className="mt-0.5 text-[13px] text-base-content/60">{subtitle}</p>}
        </div>
        {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
      </div>
      {children}
    </div>
  )
}

export function Btn({ icon: Icon, children, primary, onClick, className = '', type = 'button' }) {
  return (
    <button type={type} onClick={onClick}
      className={`btn h-10 gap-2 rounded-md px-4 text-[13px] font-semibold ${primary ? 'btn-primary' : 'border-base-300 bg-base-100 shadow-sm'} ${className}`}>
      {Icon && <Icon size={16} />}{children}
    </button>
  )
}

export function SearchBox({ value, onChange, placeholder = 'Search', className = '' }) {
  return (
    <label className={`flex h-10 items-center gap-2 rounded-md border border-base-300 bg-base-100 px-3 text-[13px] ${className}`}>
      <Search size={14} className="opacity-50" />
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="min-w-0 flex-1 outline-none placeholder:text-base-content/50" />
      {value && <X size={14} className="cursor-pointer opacity-50" onClick={() => onChange('')} />}
    </label>
  )
}

const badgeTone = {
  Active: 'bg-emerald-50 text-emerald-600', Approved: 'bg-emerald-50 text-emerald-600', Completed: 'bg-emerald-50 text-emerald-600',
  Online: 'bg-emerald-50 text-emerald-600', Published: 'bg-emerald-50 text-emerald-600', Paid: 'bg-emerald-50 text-emerald-600',
  Present: 'bg-emerald-50 text-emerald-600', Selected: 'bg-emerald-50 text-emerald-600', Open: 'bg-emerald-50 text-emerald-600',
  Inactive: 'bg-amber-50 text-amber-500', Pending: 'bg-amber-50 text-amber-600', Draft: 'bg-amber-50 text-amber-600',
  Offboard: 'bg-amber-50 text-amber-600', Scheduled: 'bg-blue-50 text-blue-600', 'In Progress': 'bg-blue-50 text-blue-600',
  Rejected: 'bg-rose-50 text-rose-500', Offline: 'bg-rose-50 text-rose-500', 'Writing Off': 'bg-rose-50 text-rose-500',
  Absent: 'bg-rose-50 text-rose-500', Cancelled: 'bg-rose-50 text-rose-500', Closed: 'bg-gray-100 text-gray-500',
  Locked: 'bg-gray-100 text-gray-600',
}

export function Badge({ children }) {
  return <span className={`inline-block rounded px-2 py-0.5 text-[11px] font-medium ${badgeTone[children] || 'bg-base-200 text-base-content/70'}`}>{children}</span>
}

// Cell renderer for a person: avatar + name + optional badges underneath.
export function Person({ e, badges }) {
  return (
    <div className="flex items-center gap-3">
      <Avatar name={e.name} color={e.color} size="size-10" />
      <div>
        <div className="font-semibold">{e.name}</div>
        {badges && <div className="mt-0.5 flex gap-1">{badges}</div>}
      </div>
    </div>
  )
}

/**
 * columns: [{ key, label, render?(row), sortable? }]
 * search: list of row keys matched by the search box (when the page owns no search box itself).
 */
export function DataTable({ columns, rows, selectable = true, pageSize: initial = 10, query = '', searchKeys = [], empty = 'No records found' }) {
  const [pageSize, setPageSize] = useState(initial)
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState(null)
  const [picked, setPicked] = useState(new Set())

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    let out = q ? rows.filter((r) => searchKeys.some((k) => String(r[k] ?? '').toLowerCase().includes(q))) : rows
    if (sort) out = [...out].sort((a, b) => String(a[sort.key]).localeCompare(String(b[sort.key]), undefined, { numeric: true }) * sort.dir)
    return out
  }, [rows, query, sort, searchKeys])

  const pages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const cur = Math.min(page, pages)
  const view = filtered.slice((cur - 1) * pageSize, cur * pageSize)
  const allPicked = view.length > 0 && view.every((r) => picked.has(r.id))
  const toggle = (id) => setPicked((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n })
  const toggleAll = () => setPicked((s) => { const n = new Set(s); view.forEach((r) => (allPicked ? n.delete(r.id) : n.add(r.id))); return n })

  return (
    <div className="overflow-hidden rounded-lg bg-base-100 shadow-sm">
      <div className="overflow-x-auto px-3">
        <table className="table text-sm">
          <thead>
            <tr className="border-base-300 text-sm text-base-content">
              {selectable && <th className="w-10"><input type="checkbox" className="checkbox checkbox-sm rounded-full" checked={allPicked} onChange={toggleAll} /></th>}
              {columns.map((c) => (
                <th key={c.key} className="py-4 font-bold">
                  {c.sortable ? (
                    <button className="flex items-center gap-1" onClick={() => setSort((s) => ({ key: c.key, dir: s?.key === c.key ? -s.dir : 1 }))}>
                      {c.label}<ChevronsUpDown size={11} className="opacity-60" />
                    </button>
                  ) : c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {view.map((r) => (
              <tr key={r.id} className="border-base-300 hover:bg-base-200/40">
                {selectable && <td><input type="checkbox" className="checkbox checkbox-sm rounded-full" checked={picked.has(r.id)} onChange={() => toggle(r.id)} /></td>}
                {columns.map((c) => <td key={c.key} className="py-3">{c.render ? c.render(r) : r[c.key]}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
        {!view.length && <div className="py-16 text-center text-[13px] text-base-content/50">{empty}</div>}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 text-[13px]">
        <div className="flex items-center gap-4">
          <select className="select select-sm w-16" value={pageSize} onChange={(e) => { setPageSize(+e.target.value); setPage(1) }}>
            {[10, 25, 50, 100].map((n) => <option key={n}>{n}</option>)}
          </select>
          <span className="text-base-content/70">
            Showing <b className="text-base-content">{filtered.length ? (cur - 1) * pageSize + 1 : 0}</b> to <b className="text-base-content">{Math.min(cur * pageSize, filtered.length)}</b> of <b className="text-base-content">{filtered.length}</b> results
          </span>
        </div>
        <div className="join">
          <button className="btn join-item btn-sm border-base-300 bg-base-100" disabled={cur === 1} onClick={() => setPage(cur - 1)}><ChevronLeft size={14} /></button>
          {Array.from({ length: pages }, (_, i) => i + 1).slice(Math.max(0, cur - 3), Math.max(5, cur + 2)).map((n) => (
            <button key={n} onClick={() => setPage(n)} className={`btn join-item btn-sm border-base-300 font-normal ${n === cur ? 'btn-primary' : 'bg-base-100'}`}>{n}</button>
          ))}
          <button className="btn join-item btn-sm border-base-300 bg-base-100" disabled={cur === pages} onClick={() => setPage(cur + 1)}><ChevronRight size={14} /></button>
        </div>
      </div>
    </div>
  )
}

// The common "title + actions, search bar, table" screen.
export function ListScreen({ title, subtitle, actions, placeholder = 'Search by Name', filter = true, tools, columns, rows, searchKeys = ['name'], selectable = false, before }) {
  const [q, setQ] = useState('')
  return (
    <Page title={title} subtitle={subtitle} actions={actions}>
      {before}
      <div className="mb-1 text-[11px] font-semibold">Search</div>
      <div className="mb-2 flex flex-wrap gap-2">
        <SearchBox value={q} onChange={setQ} placeholder={placeholder} className="min-w-72 flex-1" />
        {filter && <Btn primary icon={Filter}>Filter</Btn>}
        {tools}
      </div>
      <DataTable columns={columns} rows={rows} query={q} searchKeys={searchKeys} selectable={selectable} />
    </Page>
  )
}

export const rowsOf = (keys, data) => data.map((vals, i) => ({ id: i + 1, ...Object.fromEntries(keys.map((k, j) => [k, vals[j]])) }))

// onDelete(row): the bin icon removes the row (after a confirm).
export function Actions({ view = true, edit = true, del = true, row, onDelete }) {
  const drop = () => onDelete && window.confirm('Delete this record?') && onDelete(row)
  return (
    <span className="flex justify-end gap-3 text-base-content/80">
      {view && <Eye size={15} className="cursor-pointer" />}
      {edit && <Pencil size={15} className="cursor-pointer" />}
      {del && <Trash2 size={15} className="cursor-pointer hover:text-rose-500" onClick={drop} />}
    </span>
  )
}

export const statusCol = { key: 'status', label: 'Status', sortable: true, render: (r) => <span className={`rounded px-2 py-0.5 text-[11px] ${r.status === 'Active' ? 'bg-emerald-500 text-white' : 'bg-base-300'}`}>{r.status}</span> }
export const actionsCol = (opts) => ({ key: '_a', label: '', render: (r) => <Actions {...opts} row={r} /> })

export function Drawer({ open, title, onClose, children, footer, onSubmit }) {
  if (!open) return null
  const Box = onSubmit ? 'form' : 'div'
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <Box onSubmit={onSubmit} className="relative flex h-full w-full max-w-[38%] min-w-96 flex-col bg-base-100 px-8 shadow-xl">
        <div className="flex items-center justify-between border-b border-base-300 py-5">
          <h2 className="text-lg font-bold">{title}</h2>
          <button type="button" onClick={onClose}><X size={18} /></button>
        </div>
        <div className="flex-1 overflow-y-auto py-5">{children}</div>
        {footer && <div className="flex justify-end gap-2 border-t border-base-300 py-5">{footer}</div>}
      </Box>
    </div>
  )
}

export function Field({ label, hint, children }) {
  return (
    <label className="flex flex-col gap-1.5 text-[13px]">
      {label && <span className="font-medium">{label}</span>}
      {children}
      {hint && <span className="text-[11px] text-base-content/60">{hint}</span>}
    </label>
  )
}

export function FilterDrawer({ open, onClose, fields }) {
  return (
    <Drawer open={open} title="Filters" onClose={onClose}
      footer={<><Btn onClick={onClose}>Clear filters</Btn><Btn onClick={onClose}>Cancel</Btn><Btn primary icon={Filter} onClick={onClose}>Apply</Btn></>}>
      <div className="grid grid-cols-2 gap-x-3 gap-y-4">
        {fields.map(([label, all, hint]) => (
          <Field key={label} label={label} hint={hint}>
            <select className="select w-full"><option>{all}</option></select>
          </Field>
        ))}
      </div>
    </Drawer>
  )
}
