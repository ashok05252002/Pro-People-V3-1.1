// Add/edit form building blocks: modal, field renderer, and ready-made "Add X" modal/drawer driven by a field list.
// Field spec: { label, name, type, options, placeholder, hint, req, span, value, render }
// type: text (default) | email | number | textarea | select | multi | date | time | file | radio | toggle | check | color | section | custom
// Every input is named by f.name or f.label, so a submitted form reads back as { [label]: value }.
import { useEffect, useState } from 'react'
import { X, Calendar, Clock, MapPin, CircleCheck } from 'lucide-react'
import { Btn, Drawer } from './table'

export const useOpen = () => {
  const [open, setOpen] = useState(false)
  return [open, () => setOpen(true), () => setOpen(false)]
}

// Toast: call toast('Saved') anywhere; <Toaster /> in the layout shows it.
export const toast = (text) => window.dispatchEvent(new CustomEvent('app-toast', { detail: text }))
export function Toaster() {
  const [items, setItems] = useState([])
  useEffect(() => {
    const on = (e) => {
      const id = Date.now() + Math.random()
      setItems((s) => [...s, { id, text: e.detail }])
      setTimeout(() => setItems((s) => s.filter((t) => t.id !== id)), 2500)
    }
    window.addEventListener('app-toast', on)
    return () => window.removeEventListener('app-toast', on)
  }, [])
  return (
    <div className="toast toast-top toast-end z-[60] pt-16">
      {items.map((t) => <div key={t.id} className="alert alert-success py-2.5 text-[13px] text-white shadow-lg"><CircleCheck size={16} />{t.text}</div>)}
    </div>
  )
}

// Read a submitted <form> as { name: value }; unchecked boxes come back as false, checked as true.
export function readForm(form) {
  const out = {}
  for (const el of form.elements) {
    if (!el.name || el.type === 'file' && !el.files.length) continue
    if (el.type === 'checkbox') out[el.name] = el.checked
    else if (el.type === 'radio') { if (el.checked) out[el.name] = el.value; else if (!(el.name in out)) out[el.name] = '' }
    else if (el.type === 'file') out[el.name] = el.files[0].name
    else out[el.name] = el.value.trim()
  }
  return out
}

// Shared submit handler: read the form, hand it to onSave, toast, close.
export const submitWith = (onSave, done, message) => (e) => {
  e.preventDefault()
  onSave?.(readForm(e.currentTarget))
  if (message) toast(message)
  done?.()
}

export function Modal({ open, title, onClose, children, footer, size = 'max-w-lg', onSubmit }) {
  if (!open) return null
  const Box = onSubmit ? 'form' : 'div'
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <Box onSubmit={onSubmit} className={`relative flex max-h-[90vh] w-full ${size} flex-col rounded-lg bg-base-100 shadow-xl`}>
        <div className="flex items-center justify-between border-b border-base-300 px-5 py-4">
          <h2 className="text-[15px] font-bold">{title}</h2>
          <button type="button" onClick={onClose} className="opacity-60 hover:opacity-100"><X size={16} /></button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4">{children}</div>
        {footer && <div className="flex justify-end gap-2 border-t border-base-300 px-5 py-4">{footer}</div>}
      </Box>
    </div>
  )
}

const Label = ({ f }) => f.label ? <span className="font-medium">{f.label}{f.req && <span className="ml-0.5 text-rose-500">*</span>}</span> : null

const IconInput = ({ icon: Icon, ...props }) => (
  <label className="input w-full">
    <Icon size={14} className="opacity-50" />
    <input {...props} className="grow" />
  </label>
)

const nameOf = (f) => f.name || f.label

// One input, picked by f.type.
export function Input({ f }) {
  const { type = 'text', options = [], placeholder = '', value } = f
  const name = nameOf(f)
  switch (type) {
    case 'textarea': return <textarea name={name} rows={f.rows || 3} placeholder={placeholder} defaultValue={value} className="textarea w-full" />
    case 'select':
    case 'multi': return (
      <select name={name} defaultValue={value ?? ''} className="select w-full">
        {placeholder && <option value="">{placeholder}</option>}{options.map((o) => <option key={o}>{o}</option>)}
      </select>
    )
    case 'date': return <IconInput icon={Calendar} name={name} type="date" defaultValue={value} />
    case 'time': return <IconInput icon={Clock} name={name} type="text" placeholder={placeholder || 'HH:MM'} defaultValue={value} />
    case 'file': return <input name={name} type="file" className="file-input w-full" />
    case 'radio': return (
      <div className="flex flex-wrap gap-5 py-1.5">
        {options.map((o) => <label key={o} className="flex items-center gap-2"><input type="radio" name={name} value={o} defaultChecked={o === value} className="radio radio-sm" />{o}</label>)}
      </div>
    )
    case 'color': return <input name={name} type="color" defaultValue={value || '#6366f1'} className="input w-full p-1" />
    case 'custom': return f.render()
    default: return <input name={name} type={type} placeholder={placeholder} defaultValue={value} className="input w-full" />
  }
}

export function FieldBox({ f }) {
  if (f.type === 'section') return <h4 className={`col-span-full mt-2 text-[11px] font-bold tracking-wide text-primary uppercase ${f.line ? 'border-b border-base-300 pb-2' : ''}`}>{f.label}</h4>
  if (f.type === 'toggle' || f.type === 'check') return (
    <label className={`flex items-start gap-2.5 py-1 text-[13px] ${f.span ? 'col-span-full' : ''}`}>
      <input type="checkbox" name={nameOf(f)} defaultChecked={f.value} className={f.type === 'toggle' ? 'toggle toggle-sm toggle-success' : 'checkbox checkbox-sm'} />
      <span><span className="font-medium">{f.label}</span>{f.hint && <span className="block text-[11px] text-base-content/60">{f.hint}</span>}</span>
    </label>
  )
  return (
    <div className={`flex flex-col gap-1.5 text-[13px] ${f.span ? 'col-span-full' : ''}`}>
      <Label f={f} />
      <Input f={f} />
      {f.hint && <span className="text-[11px] text-base-content/60">{f.hint}</span>}
    </div>
  )
}

export function FormGrid({ fields, cols = 1 }) {
  const grid = { 1: 'grid-cols-1', 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-3' }[cols]
  return <div className={`grid gap-x-4 gap-y-4 ${grid}`}>{fields.map((f, i) => <FieldBox key={f.label + i} f={f} />)}</div>
}

const saveBar = (onClose, save = 'Save') => <><Btn onClick={onClose}>Cancel</Btn><Btn primary type="submit">{save}</Btn></>
const savedText = (title) => title.replace(/^(Add|Create|Edit)\s+/i, '') + ' saved'

// onSave(values) gets the submitted form as { [label]: value }.
export function AddModal({ open, onClose, title, fields, cols, size, save, children, onSave }) {
  return (
    <Modal open={open} onClose={onClose} title={title} size={size} footer={saveBar(onClose, save)} onSubmit={submitWith(onSave, onClose, savedText(title))}>
      {fields && <FormGrid fields={fields} cols={cols} />}
      {children}
    </Modal>
  )
}

export function AddDrawer({ open, onClose, title, fields, cols, children, onSave }) {
  return (
    <Drawer open={open} onClose={onClose} title={title} footer={saveBar(onClose)} onSubmit={submitWith(onSave, onClose, savedText(title))}>
      {fields && <FormGrid fields={fields} cols={cols} />}
      {children}
    </Drawer>
  )
}

// Static map stand-in for geofence pickers.
export function MapBox({ range = 100 }) {
  return (
    <div className="relative h-56 overflow-hidden rounded-md border border-base-300 bg-[repeating-linear-gradient(45deg,#eef2f7_0_12px,#e5eaf1_12px_24px)]">
      <span className="absolute top-1/2 left-1/2 grid size-32 -translate-1/2 place-items-center rounded-full border-2 border-rose-400 bg-rose-400/30">
        <MapPin size={26} className="fill-rose-500 text-rose-700" />
      </span>
      <span className="absolute bottom-2 left-2 rounded bg-base-100/90 px-2 py-0.5 text-[10px]">Radius {range} m</span>
    </div>
  )
}

// Name-only master forms (Department, Category ...).
export const nameOnly = [{ label: 'Name' }]
