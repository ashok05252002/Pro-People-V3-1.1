// Contact page: where to ask for more modules or a fully customised HRMS.
import { Mail, Blocks, Settings2, Cctv, GraduationCap } from 'lucide-react'
import { Page } from '../components/table'

const emails = [
  ['core@iproat.com', 'Modules and customisation', 'Talk to the product team about new modules or a customised HRMS.'],
  ['info@iproat.com', 'General enquiries', 'Pricing, plans, demos and anything else.'],
]
const offers = [
  [Blocks, 'More modules', 'Turn on any premium module: payroll, canteen, parking, AI solutions and more.'],
  [Settings2, 'Fully customised HRMS', 'Screens, workflows, approvals and reports built around how your company works.'],
  [Cctv, 'Camera and device integration', 'Connect your Dahua cameras and biometric devices to attendance, safety and access.'],
  [GraduationCap, 'Setup and training', 'Data migration from your current system and training for HR and admins.'],
]

function EmailCard({ email, title, text }) {
  return (
    <div className="flex flex-col gap-3 rounded-box border border-base-300 bg-base-100 p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary"><Mail size={20} /></span>
        <div><p className="text-[12px] text-base-content/60">{title}</p><a href={`mailto:${email}`} className="text-lg font-bold text-primary hover:underline">{email}</a></div>
      </div>
      <p className="text-[13px] text-base-content/70">{text}</p>
    </div>
  )
}

export default function Contact() {
  return (
    <Page title="Contact" subtitle="More modules or a complete customised HRMS">
      <div className="mb-4 rounded-box bg-gradient-to-r from-primary to-violet-500 px-6 py-6 text-primary-content shadow-sm">
        <h2 className="text-xl font-bold">Need more modules or a fully customised HRMS?</h2>
        <p className="mt-1 max-w-2xl text-[14px] opacity-90">Write to us and our team will get back to you with a plan that fits your company.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">{emails.map(([e, t, x]) => <EmailCard key={e} email={e} title={t} text={x} />)}</div>
      <h3 className="mt-7 mb-3 text-[13px] font-bold tracking-wide text-base-content/60 uppercase">What we can do for you</h3>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {offers.map(([Icon, title, text]) => (
          <div key={title} className="rounded-box bg-base-100 p-4 shadow-sm">
            <Icon size={20} className="text-primary" />
            <p className="mt-2 text-[14px] font-semibold">{title}</p>
            <p className="mt-1 text-[12px] text-base-content/65">{text}</p>
          </div>
        ))}
      </div>
    </Page>
  )
}
