// In-memory record store so "Save" on an add form shows the new row right away.
// Lives for the browser session only (a page reload restores the dummy data).
import { useSyncExternalStore } from 'react'

const data = {}
let nextId = Date.now()
const subs = new Set()
const subscribe = (fn) => (subs.add(fn), () => subs.delete(fn))
const emit = () => subs.forEach((fn) => fn())

export function useRows(key, initial) {
  if (!(key in data)) data[key] = typeof initial === 'function' ? initial() : initial
  const rows = useSyncExternalStore(subscribe, () => data[key])
  const add = (row) => { data[key] = [{ ...row, id: ++nextId }, ...data[key]]; emit() }
  const update = (id, patch) => { data[key] = data[key].map((r) => (r.id === id ? { ...r, ...patch } : r)); emit() }
  const remove = (id) => { data[key] = data[key].filter((r) => r.id !== id); emit() }
  return [rows, add, update, remove]
}

// Empty form value -> dash for the table.
export const val = (v) => (v === undefined || v === null || v === '' ? '-' : v)
