// Login screen, laid out like hrms.in4cloud.in/login. Any input logs in (static UI, no auth).
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, Eye, EyeOff, CalendarCheck, Clock, Users, Fingerprint, CalendarRange, Timer, PartyPopper, FileBarChart, ImagePlus, ArrowUpRight } from 'lucide-react'

const modules = [
  [CalendarCheck, 'Attendance Tracking'], [Users, 'Employee Management'],
  [Clock, 'Shifts & Roster'], [Fingerprint, 'Biometric Devices & Integration'],
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

const PoweredBy = ({ dark }) => (
  <div className="flex items-center gap-3">
    <span className={`text-[11px] font-bold tracking-[0.25em] 2xl:text-[13px] ${dark ? 'text-base-content/50' : 'text-white/60'}`}>POWERED BY</span>
    <span className={`rounded-lg bg-white px-3 py-1.5 ${dark ? 'border border-base-300' : 'shadow-md'}`}><IproatLogo className="h-7 2xl:h-10" /></span>
  </div>
)

export default function Login() {
  const go = useNavigate()
  const [show, setShow] = useState(false)
  const login = (e) => { e.preventDefault(); go('/dashboard') }

  return (
    <div data-theme="light" className="iproat-theme grid min-h-screen bg-base-100 lg:grid-cols-[55%_1fr]">
      {/* brand panel (lg and up); the column widens with the screen so the side gutters stay small */}
      <section className="relative hidden overflow-hidden bg-[radial-gradient(120%_95%_at_0%_0%,#3c90cd_0%,#5a62b0_30%,#8a6cb0_52%,#7a2f5c_76%,#1f1a2e_100%)] px-10 py-8 text-white lg:flex xl:px-14 2xl:px-20 2xl:py-10">
        <div className="pointer-events-none absolute -right-32 top-1/3 size-[28rem] rounded-full bg-brand-red/25 blur-3xl" />
        <div className="relative mx-auto flex w-full max-w-[920px] flex-col">
          <div className="w-fit rounded-2xl bg-white px-5 py-2.5 shadow-lg"><DahuaLogo className="h-[64px] w-[167px] 2xl:h-[72px] 2xl:w-[188px]" /></div>

          <div className="my-auto py-8">
            <p className="text-[11px] font-bold tracking-[0.25em] text-white/60 2xl:text-[13px]">WORKFORCE MANAGEMENT SUITE</p>
            <h1 className="mt-3 text-5xl leading-none font-black tracking-tight 2xl:text-6xl">ONE LOGIN</h1>
            <p className="mt-3 text-xl font-bold text-white/90 2xl:text-2xl">End-to-End Workforce Automation</p>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-white/70 2xl:text-lg">
              A complete human resource suite to track people, attendance, leave, shifts and permissions,
              with secure biometric integration and seamless reporting.
            </p>

            <p className="mt-8 mb-3 text-[11px] font-bold tracking-[0.25em] text-white/60 2xl:mt-10 2xl:text-[13px]">STRATEGIC MODULES</p>
            <div className="grid grid-cols-2 gap-3 2xl:gap-4">
              {modules.map(([Icon, label]) => (
                <div key={label} className="flex h-12 items-center gap-3 rounded-lg border border-white/15 leading-tight bg-white/[0.07] px-3 text-[13px] font-semibold backdrop-blur-sm 2xl:h-14 2xl:gap-4 2xl:px-4 2xl:text-[15px]">
                  <span className="grid size-7 shrink-0 place-items-center rounded-md bg-white/15 2xl:size-9"><Icon className="size-3.5 2xl:size-[18px]" /></span>{label}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-white/15 pt-5">
            <PoweredBy />
            <a href="https://www.iproat.com" target="_blank" rel="noreferrer"
              className="flex items-center gap-1 rounded-full border border-white/25 px-3.5 py-1.5 text-xs font-semibold hover:bg-white/10 2xl:text-sm">www.iproat.com<ArrowUpRight size={13} /></a>
          </div>
        </div>
      </section>

      {/* sign-in panel; below lg it is the whole page, so it carries a small brand strip */}
      <section className="relative flex min-h-screen flex-col bg-gradient-to-br from-base-100 via-base-100 to-violet-50 px-5 py-6 sm:px-10 lg:min-h-0">
        <div className="-mx-5 -mt-6 flex items-center justify-between bg-[linear-gradient(90deg,#3c90cd,#8a6cb0_55%,#d13854)] px-5 py-3 sm:-mx-10 sm:px-10 lg:hidden">
          <span className="rounded-lg bg-white px-2 py-1"><DahuaLogo className="h-9 w-[94px]" /></span>
          <a href="https://www.iproat.com" target="_blank" rel="noreferrer" className="text-xs font-semibold text-white">www.iproat.com</a>
        </div>

        <form onSubmit={login} className="m-auto flex w-full max-w-md flex-col gap-4 py-10 2xl:max-w-lg 2xl:gap-5">
          <CustomerLogo />
          <div className="mt-2 text-center">
            <h2 className="text-2xl font-light italic 2xl:text-4xl">Hello, Welcome Back</h2>
            <p className="mt-1 text-[10px] font-bold tracking-[0.2em] text-base-content/50 2xl:text-xs">SECURE TERMINAL ACCESS</p>
          </div>

          <label className="input h-11 w-full gap-2 focus-within:border-primary focus-within:outline-primary 2xl:h-14 2xl:text-base">
            <Mail size={15} className="opacity-50" />
            <input type="text" placeholder="Email or Username" autoComplete="username" />
          </label>
          <label className="input h-11 w-full gap-2 focus-within:border-primary focus-within:outline-primary 2xl:h-14 2xl:text-base">
            <button type="button" onClick={() => setShow(!show)} className="opacity-50">{show ? <Eye size={15} /> : <EyeOff size={15} />}</button>
            <input type={show ? 'text' : 'password'} placeholder="Password" autoComplete="current-password" />
          </label>
          <div className="flex items-center justify-between text-[13px] 2xl:text-[15px]">
            <label className="flex items-center gap-2 font-medium"><input type="checkbox" className="checkbox checkbox-sm checkbox-primary" />Remember me</label>
            <a href="#" onClick={(e) => e.preventDefault()} className="text-xs font-medium text-primary hover:underline 2xl:text-sm">Forgot password?</a>
          </div>
          <button type="submit" className="btn btn-primary h-11 w-full text-sm shadow-md shadow-brand-violet/30 2xl:h-14 2xl:text-base">Log in</button>
        </form>

        <div className="flex justify-center pb-2 lg:hidden"><PoweredBy dark /></div>
        <p className="text-center text-[11px] text-base-content/40">© 2026 iProAT Solutions</p>
      </section>
    </div>
  )
}
