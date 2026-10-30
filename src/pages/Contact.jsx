// Contact page: the emails to write to for more modules or a fully customised HRMS.
import { Mail } from 'lucide-react'
import { Page } from '../components/table'

const emails = ['core@iproat.com', 'info@iproat.com']

export default function Contact() {
  return (
    <Page title="Contact">
      <div className="rounded-box bg-base-100 p-6 shadow-sm">
        <p className="text-[15px] font-semibold">For more modules or a fully customised HRMS, contact us at:</p>
        <ul className="mt-4 space-y-3">
          {emails.map((e) => (
            <li key={e} className="flex items-center gap-3 text-[15px]">
              <Mail size={18} className="text-primary" />
              <a href={`mailto:${e}`} className="font-semibold text-primary hover:underline">{e}</a>
            </li>
          ))}
        </ul>
      </div>
    </Page>
  )
}
