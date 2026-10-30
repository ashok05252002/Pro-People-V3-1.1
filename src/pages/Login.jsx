// Login screen, laid out like hrms.in4cloud.in/login. Any input logs in (static UI, no auth).
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, Eye, EyeOff, CalendarCheck, Clock, Users, Fingerprint, CalendarRange, Timer, PartyPopper, FileBarChart, ImagePlus, ArrowUpRight } from 'lucide-react'

const modules = [
  [CalendarCheck, 'Attendance Tracking'], [Users, 'Employee Management'],
  [Clock, 'Shifts & Roster'], [Fingerprint, 'Biometric Devices'],
  [CalendarRange, 'Leave Management'], [Timer, 'Permission Requests'],
  [PartyPopper, 'Holiday Calendar'], [FileBarChart, 'Reports & Analytics'],
]

export const DahuaLogo = ({ className = 'h-10 w-[104px]' }) => (
  <img src="/dahua-logo.jpg" alt="Dahua Technology" className={`object-cover object-[center_47%] ${className}`} />
)
const IproatLogo = ({ className = 'h-9' }) => <img src="/iproat-logo.png" alt="iProAT Solutions" className={`w-auto ${className}`} />

// Slot for the end customer's own logo (each Dahua customer puts theirs here); small = app header size.
export const CustomerLogo = ({ small }) => small ? (
  <div className="flex h-9 items-center gap-1.5 rounded-md border-2 border-dashed border-base-300 px-3 text-[12px] font-semibold text-base-content/45">
    <ImagePlus size={15} strokeWidth={1.75} />Customer Logo
  </div>
) : (
  <div className="mx-auto flex h-20 w-56 flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-base-300 bg-base-100/70 text-base-content/45">
    <ImagePlus size={22} strokeWidth={1.5} />
    <span className="text-[13px] font-semibold">Customer Logo</span>
    <span className="text-[10px]">Your company logo here</span>
  </div>
)

export default function Login() {
  const go = useNavigate()
  const [show, setShow] = useState(false)
  const login = (e) => { e.preventDefault(); go('/dashboard') }

  return (
    <div data-theme="light" className="iproat-theme grid min-h-screen bg-base-100 lg:grid-cols-[54%_1fr]">
      {/* brand panel */}
      <section className="relative hidden overflow-hidden bg-[radial-gradient(120%_95%_at_0%_0%,#3c90cd_0%,#5a62b0_30%,#8a6cb0_52%,#7a2f5c_76%,#1f1a2e_100%)] px-16 py-12 text-white lg:flex">
        <div className="pointer-events-none absolute -right-32 top-1/3 size-[28rem] rounded-full bg-brand-red/25 blur-3xl" />
        <div className="relative mx-auto flex w-full max-w-[600px] flex-col">
          <div className="w-fit rounded-2xl bg-white px-5 py-2.5 shadow-lg"><DahuaLogo className="h-[72px] w-[188px]" /></div>

          <div className="my-auto py-12">
            <p className="text-[11px] font-bold tracking-[0.25em] text-white/60">WORKFORCE MANAGEMENT SUITE</p>
            <h1 className="mt-3 text-5xl leading-none font-black tracking-tight">ONE LOGIN</h1>
            <p className="mt-3 text-xl font-bold text-white/90">End-to-End Workforce Automation</p>
            <p className="mt-3 text-[15px] leading-relaxed text-white/70">
              A complete human resource suite to track people, attendance, leave, shifts and permissions,
              with secure biometric integration and seamless reporting.
            </p>

            <p className="mt-10 mb-3 text-[11px] font-bold tracking-[0.25em] text-white/60">STRATEGIC MODULES</p>
            <div className="grid grid-cols-2 gap-3">
              {modules.map(([Icon, label]) => (
                <div key={label} className="flex h-12 items-center gap-3 rounded-lg border border-white/15 bg-white/[0.07] px-3 text-[13px] font-semibold backdrop-blur-sm">
                  <span className="grid size-7 shrink-0 place-items-center rounded-md bg-white/15"><Icon size={14} /></span>{label}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-white/15 pt-6">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-bold tracking-[0.25em] text-white/60">POWERED BY</span>
              <span className="rounded-lg bg-white px-3 py-1.5 shadow-md"><IproatLogo className="h-8" /></span>
            </div>
            <a href="https://www.iproat.com" target="_blank" rel="noreferrer"
              className="flex items-center gap-1 rounded-full border border-white/25 px-3.5 py-1.5 text-xs font-semibold hover:bg-white/10">www.iproat.com<ArrowUpRight size={13} /></a>
          </div>
        </div>
      </section>

      {/* sign-in panel */}
      <section className="relative flex flex-col bg-gradient-to-br from-base-100 via-base-100 to-violet-50 px-8 py-6">
        <form onSubmit={login} className="m-auto flex w-full max-w-sm flex-col gap-4 py-10">
          <CustomerLogo />
          <div className="mt-2 text-center">
            <h2 className="text-2xl font-light italic">Hello, Welcome Back</h2>
            <p className="mt-1 text-[10px] font-bold tracking-[0.2em] text-base-content/50">SECURE TERMINAL ACCESS</p>
          </div>

          <label className="input h-11 w-full gap-2 focus-within:border-primary focus-within:outline-primary">
            <Mail size={15} className="opacity-50" />
            <input type="text" placeholder="Email or Username" autoComplete="username" />
          </label>
          <label className="input h-11 w-full gap-2 focus-within:border-primary focus-within:outline-primary">
            <button type="button" onClick={() => setShow(!show)} className="opacity-50">{show ? <Eye size={15} /> : <EyeOff size={15} />}</button>
            <input type={show ? 'text' : 'password'} placeholder="Password" autoComplete="current-password" />
          </label>
          <div className="flex items-center justify-between text-[13px]">
            <label className="flex items-center gap-2 font-medium"><input type="checkbox" className="checkbox checkbox-sm checkbox-primary" />Remember me</label>
            <a href="#" onClick={(e) => e.preventDefault()} className="text-xs font-medium text-primary hover:underline">Forgot password?</a>
          </div>
          <button type="submit" className="btn btn-primary h-11 w-full text-sm shadow-md shadow-brand-violet/30">Log in</button>
        </form>
        <p className="text-center text-[11px] text-base-content/40">© 2026 iProAT Solutions</p>
      </section>
    </div>
  )
}
