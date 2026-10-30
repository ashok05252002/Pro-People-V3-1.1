// Login screen, laid out like hrms.in4cloud.in/login. Any input logs in (static UI, no auth).
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, Eye, EyeOff, CalendarCheck, Clock, Users, Fingerprint, CalendarRange, ShieldCheck, FileBarChart } from 'lucide-react'

const modules = [
  [CalendarCheck, 'Attendance & Leave'], [Users, 'Employee Management'],
  [Clock, 'Shifts & Roster'], [Fingerprint, 'Biometric Devices'],
  [CalendarRange, 'Leave Application'], [ShieldCheck, 'Permission Rules'],
  [FileBarChart, 'Time Tracker Reports', true],
]

export const DahuaLogo = ({ className = 'h-10 w-[104px]' }) => (
  <img src="/dahua-logo.jpg" alt="Dahua Technology" className={`object-cover object-[center_47%] ${className}`} />
)
const IproatLogo = ({ className = 'h-9' }) => <img src="/iproat-logo.png" alt="iProAT Solutions" className={`w-auto self-start ${className}`} />

export default function Login() {
  const go = useNavigate()
  const [show, setShow] = useState(false)
  const login = (e) => { e.preventDefault(); go('/dashboard') }

  return (
    <div data-theme="light" className="grid min-h-screen bg-base-100 lg:grid-cols-[54%_1fr]">
      {/* brand panel */}
      <section className="relative hidden flex-col overflow-hidden bg-[radial-gradient(120%_95%_at_0%_0%,#3c90cd_0%,#5a62b0_30%,#8a6cb0_52%,#7a2f5c_76%,#1f1a2e_100%)] px-14 py-14 text-white lg:flex">
        <div className="pointer-events-none absolute -right-32 top-1/3 size-[28rem] rounded-full bg-brand-red/25 blur-3xl" />
        <div className="w-fit rounded-xl bg-white px-3 py-1.5 shadow-lg"><DahuaLogo /></div>

        <div className="mt-auto">
          <h1 className="text-5xl font-black tracking-tight">ONE LOGIN</h1>
          <p className="mt-2 text-xl font-bold text-white/85">End-to-End Workforce Automation</p>
          <p className="mt-2 max-w-md text-[15px] leading-relaxed text-white/70">
            A complete human resource suite: track people, attendance, leave, shifts and permissions.
            Secure biometric integration with seamless reporting.
          </p>

          <p className="mt-9 mb-3 text-[11px] font-bold tracking-[0.2em] text-white/50">STRATEGIC MODULES</p>
          <div className="grid max-w-3xl grid-cols-2 gap-2.5">
            {modules.map(([Icon, label, wide]) => (
              <div key={label} className={`flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-2.5 py-2.5 text-[13px] font-semibold backdrop-blur-sm ${wide ? 'col-span-2' : ''}`}>
                <span className="grid size-7 place-items-center rounded-md border border-white/15 bg-white/10"><Icon size={14} /></span>{label}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto flex items-end justify-between pt-12">
          <div>
            <p className="text-2xl font-black">360°</p>
            <p className="text-[10px] font-bold tracking-[0.2em] text-white/50">COMPREHENSIVE COVERAGE</p>
          </div>
          <a href="https://www.iproat.com" target="_blank" rel="noreferrer"
            className="rounded-full border border-white/25 px-3.5 py-1 text-xs font-semibold hover:bg-white/10">www.iproat.com</a>
        </div>
      </section>

      {/* sign-in panel */}
      <section className="relative flex flex-col bg-gradient-to-br from-base-100 via-base-100 to-violet-50 px-8 py-6">
        <IproatLogo />
        <form onSubmit={login} className="m-auto flex w-full max-w-sm flex-col gap-4 py-10">
          <div className="text-center">
            <h2 className="text-2xl font-light italic">Hello, Welcome Back</h2>
            <p className="mt-1 text-[10px] font-bold tracking-[0.2em] text-base-content/50">SECURE TERMINAL ACCESS</p>
          </div>
          <div className="mb-1 flex justify-center lg:hidden"><DahuaLogo /></div>
          <div className="flex justify-center"><IproatLogo className="h-12" /></div>

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
