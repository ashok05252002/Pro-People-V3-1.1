// Register New Employee: 8-step wizard. Fields follow the staging create wizard and the employee profile tabs.
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, Plus, Trash2 } from 'lucide-react'
import { Btn } from '../../components/table'
import { FormGrid } from '../../components/forms'
import { departments, designations, categories, locations } from '../../data/people'

const sel = (label, options, extra) => ({ label, type: 'select', placeholder: `Select ${label}`, options, ...extra })
const sec = (label) => ({ label, type: 'section' })

// Repeater rows (qualifications, past jobs, KYC documents): add/remove cards with the same field set.
function Repeater({ title, add, fields }) {
  const [rows, setRows] = useState([1])
  return (
    <div className="space-y-3">
      {rows.map((id, i) => (
        <div key={id} className="rounded-md border border-base-300 p-4">
          <div className="mb-3 flex items-center justify-between text-xs font-semibold">{title} {i + 1}
            {rows.length > 1 && <button onClick={() => setRows(rows.filter((r) => r !== id))} className="text-rose-500"><Trash2 size={14} /></button>}
          </div>
          <FormGrid cols={2} fields={fields} />
        </div>
      ))}
      <button onClick={() => setRows([...rows, Math.max(...rows) + 1])} className="btn btn-sm btn-outline btn-primary gap-1"><Plus size={14} />{add}</button>
    </div>
  )
}

const steps = [
  { title: 'Account & Employment', fields: [
    sec('Account Status'), sel('Account Status', ['Active', 'Inactive'], { placeholder: '', value: 'Active' }), { label: 'Inactive From Date', type: 'date' },
  ] },
  { title: 'Work Profile', fields: [
    sec('Employment Details'), { label: 'Employee Code', req: true }, { label: 'Employee Device Code' },
    { label: 'Official Email', type: 'email' }, { label: 'Date of Joining', type: 'date', req: true },
    { label: 'End of Probation', type: 'date' }, { label: 'Wages', type: 'number' }, { label: 'Grade' },
    sec('Organization'), sel('Department', departments, { req: true }), sel('Designation', designations, { req: true }), sel('Category', categories),
    sel('Nationality', ['Indian', 'Omani', 'Filipino', 'British', 'Egyptian']), sel('Location', locations),
    sec('Employee Contract Information'), sel('Contract Type', ['Permanent', 'Limited', 'Unlimited']),
  ] },
  { title: 'Personal Details', fields: [
    sec('Basic'), { label: 'First Name', req: true }, { label: 'Last Name' }, { label: 'Father Name' }, sel('Gender', ['Male', 'Female', 'Other']),
    { label: 'Date of Birth', type: 'date' }, sel('Blood Group', ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']),
    sel('Religion', ['Hindu', 'Islam', 'Christian', 'Other']), sel('Nationality', ['Indian', 'Omani', 'Filipino', 'British', 'Egyptian']),
    sec('Contact'), { label: 'Personal Email', type: 'email' }, { label: 'Contact Number', type: 'tel' }, { label: 'Alternate Contact Number', type: 'tel' },
    { label: 'Emergency Contact Number', type: 'tel' }, { label: 'Emergency Contact Relation' }, { label: 'City of Residence' },
    { label: 'Permanent Address', type: 'textarea', rows: 2 }, { label: 'Current Address', type: 'textarea', rows: 2 },
    sec('Family'), sel('Marital Status', ['Single', 'Married', 'Divorced', 'Widowed']), { label: 'Number of Children', type: 'number' },
    { label: 'Family Members', span: true, placeholder: 'e.g. Spouse, 2 children' },
  ] },
  { title: 'Attendance', fields: [
    sec('Overtime'), sel('Overtime Applicable', ['Yes', 'No']),
    sec('Late'), sel('Late Applicable', ['Yes', 'No']),
    sec('Device Group'), sel('Device Group', ['Head Office', 'Regional']),
  ] },
  { title: 'Identity Document (KYC)', render: () => (
    <>
      <Repeater title="Document" add="Add KYC Document" fields={[
        sel('Document Name', ['Passport', 'Visa', 'Civil ID', 'Aadhaar', 'PAN', 'Driving License'], { req: true, placeholder: 'Document Type' }),
        { label: 'Number' }, { label: 'Reminder Days', type: 'number', value: 0 }, { label: 'Expiry Date', type: 'date' },
        { label: 'Document', type: 'file', hint: 'Supports PDF, Images, Word.', span: true },
      ]} />
      <div className="mt-5"><FormGrid fields={[{ label: 'Profile Picture', type: 'file', hint: 'Default avatar in use' }]} /></div>
    </>
  ) },
]

export default function AddEmployee() {
  const [step, setStep] = useState(0)
  const s = steps[step]
  const last = step === steps.length - 1
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
          {steps.map((x, i) => (
            <li key={x.title}>
              <button onClick={() => setStep(i)} className={`flex w-full items-center gap-3 rounded-md px-2 py-2.5 text-left text-xs ${i === step ? 'font-semibold text-primary' : 'text-base-content/70'}`}>
                <span className={`grid size-6 shrink-0 place-items-center rounded-full text-[11px] ${i === step ? 'bg-primary text-primary-content' : i < step ? 'bg-emerald-500 text-white' : 'bg-base-200'}`}>
                  {i < step ? <Check size={12} /> : i + 1}
                </span>{x.title}
              </button>
            </li>
          ))}
        </ol>
        <div className="rounded-md border border-base-300 p-5">
          <div className="mb-5 border-l-4 border-primary pl-3">
            <div className="flex items-center gap-2"><span className="rounded bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">STEP {step + 1}/{steps.length}</span>
              <h2 className="font-semibold">{s.title}</h2></div>
            <p className="mt-0.5 text-[11px] text-base-content/60">Please fill in the details below.</p>
          </div>
          {s.render ? s.render() : <FormGrid cols={2} fields={s.fields} />}
          <div className="mt-6 flex justify-between border-t border-base-300 pt-4">
            {step > 0 ? <Btn icon={ArrowLeft} onClick={() => setStep(step - 1)}>Previous</Btn> : <span />}
            {last
              ? <Link to="/employee/employee"><Btn primary icon={Check}>Register Employee</Btn></Link>
              : <Btn primary onClick={() => setStep(step + 1)}>Next Step <ArrowRight size={15} /></Btn>}
          </div>
        </div>
      </div>
    </div>
  )
}
