import { useState } from 'react'
import { NavLink, Link, Outlet, useLocation } from 'react-router-dom'
import {
  Menu, Search, VolumeX, Moon, Sun, Bell, ChevronRight, ChevronsLeft, ChevronsRight, CircleDot, LogOut,
} from 'lucide-react'
import { nav } from '../data/nav'
import { Toaster } from './forms'
import { CustomerLogo } from '../pages/Login'

// A list item also owns the pages under it ("<path>/create", "<path>/<id>").
const containsPath = (item, path) =>
  item.path === path || path.startsWith(item.path + '/') || (item.children || []).some((c) => containsPath(c, path))

function SubMenu({ items, depth }) {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(() => items.find((i) => i.children && containsPath(i, pathname))?.label)
  return (
    <ul className={`flex flex-col gap-0.5 py-1 ${depth === 1 ? 'pl-5' : 'pl-4'}`}>
      {items.map((item) =>
        item.children ? (
          <li key={item.label}>
            <button
              onClick={() => setOpen(open === item.label ? null : item.label)}
              className="flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-sm text-base-content/70 hover:bg-base-200"
            >
              <CircleDot size={13} className="opacity-60" />
              <span className="flex-1 text-left">{item.label}</span>
              <ChevronRight size={14} className={`opacity-50 transition-transform ${open === item.label ? 'rotate-90' : ''}`} />
            </button>
            {open === item.label && <SubMenu items={item.children} depth={depth + 1} />}
          </li>
        ) : (
          <li key={item.path + item.label}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm ${isActive ? 'bg-primary/10 font-semibold text-primary' : 'text-base-content/70 hover:bg-base-200'}`
              }
            >
              <CircleDot size={13} className="opacity-60" />
              {item.label}
            </NavLink>
          </li>
        ),
      )}
    </ul>
  )
}

function Sidebar({ collapsed, setCollapsed }) {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(() => nav.find((i) => i.children && containsPath(i, pathname))?.label)
  const top = (active) =>
    `flex w-full items-center gap-3 rounded-lg px-2.5 py-3 text-sm transition-all ${active ? 'bg-primary/10 text-primary font-bold shadow-sm' : 'text-base-content/80 hover:bg-base-200'}`

  return (
    <aside className={`fixed bottom-0 left-0 top-[57px] z-20 flex flex-col border-r border-base-300 bg-base-100 transition-all ${collapsed ? 'w-[72px]' : 'w-64'}`}>
      <ul className="flex flex-1 flex-col gap-1 overflow-y-auto px-2.5 py-3">
        {nav.map((item) => {
          const Icon = item.icon
          if (!item.children) {
            return (
              <li key={item.label}>
                <NavLink to={item.path} className={({ isActive }) => top(isActive)} title={item.label}>
                  <Icon size={20} strokeWidth={1.5} className="shrink-0" />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </NavLink>
              </li>
            )
          }
          const isOpen = open === item.label && !collapsed
          return (
            <li key={item.label}>
              <button
                className={top(containsPath(item, pathname))}
                onClick={() => (collapsed ? setCollapsed(false) : setOpen(isOpen ? null : item.label))}
                title={item.label}
              >
                <Icon size={20} strokeWidth={1.5} className="shrink-0" />
                {!collapsed && <span className="truncate text-left">{item.label}</span>}
              </button>
              {isOpen && <SubMenu items={item.children} depth={1} />}
            </li>
          )
        })}
      </ul>
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center gap-2 border-t border-base-300 px-6 py-5 text-[13px] font-semibold"
      >
        {collapsed ? <ChevronsRight size={18} /> : <><ChevronsLeft size={18} /> Collapse Sidebar</>}
      </button>
    </aside>
  )
}

function Header({ onMenu, dark, setDark }) {
  return (
    <header className="fixed inset-x-0 top-0 z-30 flex h-[57px] items-center gap-3 border-b border-base-300 bg-base-100 px-5">
      <button onClick={onMenu} className="btn btn-ghost btn-sm btn-square"><Menu size={18} strokeWidth={1.5} /></button>
      <Link to="/dashboard"><CustomerLogo small /></Link>
      <div className="flex-1" />
      <label className="flex h-9 w-36 items-center gap-2 rounded-lg border border-base-300 bg-base-200/60 px-2.5 text-[13px] text-base-content/50">
        <Search size={14} />
        <span className="flex-1">Search...</span>
        <kbd className="rounded border border-base-300 px-1 text-[10px]">⌘ K</kbd>
      </label>
      <span className="px-1 text-xs font-bold">IN</span>
      <VolumeX size={17} strokeWidth={1.5} className="opacity-70" />
      <button onClick={() => setDark(!dark)} className="opacity-70">
        {dark ? <Sun size={16} strokeWidth={1.5} /> : <Moon size={16} strokeWidth={1.5} />}
      </button>
      <Bell size={16} strokeWidth={1.5} className="opacity-70" />
      <div className="dropdown dropdown-end">
        <button className="grid size-8 place-items-center rounded-md bg-neutral text-xs font-bold text-neutral-content">A</button>
        <ul className="dropdown-content menu z-40 mt-2 w-40 rounded-box border border-base-300 bg-base-100 p-1 shadow-lg">
          <li><Link to="/login"><LogOut size={14} />Log out</Link></li>
        </ul>
      </div>
    </header>
  )
}

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false)
  const [dark, setDark] = useState(false)
  document.documentElement.dataset.theme = dark ? 'dark' : 'light'
  return (
    <>
      <Header onMenu={() => setCollapsed(!collapsed)} dark={dark} setDark={setDark} />
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <main className={`min-h-screen pt-[57px] transition-all ${collapsed ? 'pl-[72px]' : 'pl-64'}`}>
        <div className="px-12 py-10">
          <Outlet />
        </div>
      </main>
      <Toaster />
    </>
  )
}
