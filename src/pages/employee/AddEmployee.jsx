// Register New Employee: 4-step wizard, fields as on the test staging create wizard.
// All steps live in one <form>, so "Register Employee" submits every step together.
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { Btn } from '../../components/table'
import { FormGrid, readForm, toast } from '../../components/forms'
import { useRows } from '../../data/store'
import { employees as seed, colors, departments, designations, categories, locations } from '../../data/people'

const sel = (label, options, extra) => ({ label, type: 'select', placeholder: `Select ${label}`, options, ...extra })
const sec = (label) => ({ label, type: 'section' })
const yesNo = ['Yes', 'No']
export const nationalities = ['Indian', 'Emirati', 'Omani', 'Filipino', 'British', 'Egyptian']

export const workFields = (code) => [
  sec('Employment Details'), { label: 'Employee Code', req: true, value: code }, { label: 'Employee Device Code', req: true, placeholder: 'Enter device code' },
  sel('Department', departments, { req: true }), sel('Designation', designations, { req: true }), sel('Category', categories, { req: true }),
  sel('Nationality', nationalities, { req: true }), { label: 'Date of Joining', type: 'date', req: true }, { label: 'End of Probation', type: 'date', req: true },
  sel('Location', locations, { req: true }),
]
export const personalFields = [
  sec('Basic'), { label: 'First Name', req: true }, { label: 'Last Name' }, sel('Gender', ['Male', 'Female', 'Other']),
  { label: 'Date of Birth', type: 'date' }, sel('Blood Group', ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']),
  sel('Religion', ['Hindu', 'Islam', 'Christian', 'Other', 'No Religion']),
  sec('Contact'), { label: 'Personal Email', type: 'email' }, { label: 'Contact Number', type: 'tel' }, { label: 'Alternate Contact Number', type: 'tel' },
  { label: 'Emergency Contact Number', type: 'tel' }, { label: 'Emergency Contact Relation' }, { label: '', type: 'custom', render: () => null },
  { label: 'Permanent Address', type: 'textarea', rows: 2 }, { label: 'Current Address', type: 'textarea', rows: 2 },
  sec('Family'), sel('Marital Status', ['Single', 'Married', 'Divorced', 'Widowed']),
]
export const policyFields = [
  sec('Overtime'), sel('Overtime Applicable', yesNo), sec('Late'), sel('Late Applicable', yesNo),
  sec('Auto Shift'), sel('Auto Shift', yesNo), sec('Device Group'), sel('Device Group', ['Head Office', 'Regional']),
]

const steps = (code) => [
  { title: 'Account & Employment', cols: 3, fields: [sec('Permissions'), sel('Role', ['Organization', 'Self', 'Team'])] },
  { title: 'Work Profile', cols: 3, fields: workFields(code) },
  { title: 'Personal Details', cols: 3, fields: personalFields },
  { title: 'Attendance', cols: 3, fields: policyFields },
]

// Submitted wizard values -> employee list row (the raw values stay on `details` for the profile page).
export const employeeOf = (v, n) => ({
  name: [v['First Name'], v['Last Name']].filter(Boolean).join(' ') || v['Employee Code'] || 'New Employee',
  code: v['Employee Code'] || '-', department: v.Department || '-', designation: v.Designation || '-', category: v.Category || '-',
  location: v.Location || '-', status: 'Active', tags: [], gender: v.Gender || '-', color: colors[n % colors.length], details: v,
})

export default function AddEmployee() {
  const go = useNavigate()
  const [rows, add] = useRows('employees', seed)
  const [step, setStep] = useState(0)
  const [code] = useState(() => `EMP${String(121 + rows.length - seed.length).padStart(3, '0')}`)
  const all = steps(code)
  const last = step === all.length - 1
  const submit = (e) => {
    e.preventDefault()
    if (!last) return setStep(step + 1)
    const emp = employeeOf(readForm(e.currentTarget), rows.length)
    add(emp)
    toast(`${emp.name} registered`)
    go('/employee/employee')
  }
  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex min-h-24 items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">Register New Employee</h1>
          <p className="text-[13px] text-base-content/60">Complete the steps below to onboard a new employee.</p>
        </div>
        <Link to="/employee/employee"><Btn icon={ArrowLeft}>Back to List</Btn></Link>
      </div>
      <div className="grid gap-4 rounded-lg bg-base-100 p-4 shadow-sm md:grid-cols-[230px_1fr]">
        <ol className="space-y-1">
          {all.map((x, i) => (
            <li key={x.title}>
              <button type="button" onClick={() => setStep(i)} className={`flex w-full items-center gap-3 rounded-md px-2 py-2.5 text-left text-xs ${i === step ? 'font-semibold text-primary' : 'text-base-content/70'}`}>
                <span className={`grid size-6 shrink-0 place-items-center rounded-full text-[11px] ${i === step ? 'bg-primary text-primary-content' : i < step ? 'bg-emerald-500 text-white' : 'bg-base-200'}`}>
                  {i < step ? <Check size={12} /> : i + 1}
                </span>{x.title}
              </button>
            </li>
          ))}
        </ol>
        <form onSubmit={submit} className="rounded-md border border-base-300 p-5">
          <div className="mb-5 border-l-4 border-primary pl-3">
            <div className="flex items-center gap-2"><span className="rounded bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">STEP {step + 1}/{all.length}</span>
              <h2 className="font-semibold">{all[step].title}</h2></div>
            <p className="mt-0.5 text-[11px] text-base-content/60">Please fill in the details below.</p>
          </div>
          {all.map((x, i) => <div key={x.title} className={i === step ? '' : 'hidden'}><FormGrid cols={x.cols} fields={x.fields} /></div>)}
          <div className="mt-6 flex justify-between border-t border-base-300 pt-4">
            {step > 0 ? <Btn icon={ArrowLeft} onClick={() => setStep(step - 1)}>Previous</Btn> : <span />}
            {last
              ? <Btn primary type="submit" icon={Check}>Register Employee</Btn>
              : <Btn primary type="submit">Next Step <ArrowRight size={15} /></Btn>}
          </div>
        </form>
      </div>
    </div>
  )
}
