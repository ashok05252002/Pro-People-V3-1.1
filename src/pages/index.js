// Route path -> page component. Routes not listed here render the Placeholder.
import Dashboard from './Dashboard'
import EmployeeList from './employee/EmployeeList'
import BulkUpload from './employee/BulkUpload'
import BluePrint from './employee/BluePrint'
import CustomizeInputs from './employee/CustomizeInputs'
import EmployeeGroups from './employee/EmployeeGroups'
import { ProfileRequest, AttendancePolicy, MasterReport, ReportingManager } from './employee/EmployeeReports'
import { DocumentSetup, DocumentImport, LetterTemplates, Letters } from './employee/DocsLetters'
import * as R from './Recruitment'
import * as C from './Company'
import * as TA from './timetracker/Approvals'
import * as TS from './timetracker/Setup'
import * as AT from './timetracker/Attendance'
import * as V from './Visitors'
import * as P from './Payroll'
import * as PF from './Performance'
import * as M from './Misc'
import Settings from './Settings'
import { flatRoutes } from '../data/nav'

export const pages = {
  '/dashboard': Dashboard,
  '/employee/employee': EmployeeList,
  '/employee/bulk_upload': BulkUpload,
  '/employee/blue_print': BluePrint,
  '/employee/customize_inputs': CustomizeInputs,
  '/employee/group': EmployeeGroups,
  '/employee/new-profile-request-approval': ProfileRequest,
  '/employee/attendance_policy': AttendancePolicy,
  '/employee/report/employee_master': MasterReport,
  '/reporting_manager': ReportingManager,
  '/document/setup/categories': DocumentSetup,
  '/document/import': DocumentImport,
  '/lettermanager/templates': LetterTemplates,
  '/lettermanager/letterTable': Letters,
  '/recruitment/interview': R.Interviews,
  '/recruitment/onboard': R.Onboard,
  '/recruitment/letter-of-intent-history': R.LoiHistory,
  '/recruitment/candidates': R.Candidates,
  '/organization/department': C.Departments,
  '/organization/designation': C.Designations,
  '/organization/location': C.Locations,
  '/organization/categories': C.Categories,
  '/settings/documents': C.CompanyDocuments,
  '/organization/vendor': C.Vendors,
  '/organization/employment_types': C.EmploymentTypes,
  '/organization/ministry': C.Ministry,
  '/organization/nationalities': C.Nationalities,
  '/gratuity/contract-types': C.ContractTypes,
  '/zone': C.Zones,
  '/geotracking/geolocation': C.Geolocations,
  '/roles': C.AccessLevels,
  '/timetracker/approval': TA.LeaveRequests,
  '/timetracker/ot_approval': TA.OtApprovals,
  '/timetracker/compoff_approval': TA.CompOffRequests,
  '/overtime_application_approval': TA.OvertimeRequests,
  '/punchrequest/approval_punchrequest': TA.PunchRequests,
  '/timetracker/permission_approval': TA.PermissionRequests,
  '/prosync/devices': TS.ProsyncDevices,
  '/timetracker/devices': TS.BiometricDevices,
  '/prosync/device-groups': TS.DeviceGroups,
  '/camera': TS.Cameras,
  '/zone/mapping': TS.ZoneMapping,
  '/timetracker/leave_groups': TS.LeaveGroups,
  '/timetracker/leave_credits': TS.LeaveCredits,
  '/timetracker/calendar': TS.LeaveCalendar,
  '/timetracker/public_holidays': TS.PublicHolidays,
  '/optionalholiday': TS.OptionalHolidays,
  '/timetracker/master_shift': TS.Shifts,
  '/timetracker/shift_group': AT.ShiftGroups,
  '/timetracker/roster': AT.ShiftRoster,
  '/timetracker/reports': AT.ReportsHub,
  '/timetracker/exclude_late_deduction': AT.ExcludeLate,
  '/timetracker/lock_attendance': AT.LockAttendance,
  '/timetracker/manual_time_adjustment': AT.TimeAdjustment,
  '/attendance_adjustment': AT.AttendanceUploads,
  '/index': AT.LatePolicySetup,
  '/late-policy/leave-credits': AT.ProcessLeaveCredits,
  '/zone/reports': AT.ZoneReports,
  '/visitor-management/dashboard': V.VisitorDashboard,
  '/visitor-management/pre-entry': V.PreEntry,
  '/visitor-management/walk-in': V.WalkIn,
  '/visitor-management/approval-settings': V.ApprovalSettings,
  '/visitor-management/config': V.VisitorConfig,
  '/visitor-management/pass-settings': V.PassSettings,
  '/visitor-management/policy': V.VisitorPolicy,
  '/visitor-management/companies': V.VisitorCompanies,
  '/visitor-management/reports': V.VisitorReports,
  '/loan/loan_approvals': P.LoanApprovals,
  '/tds_approval': P.TdsApprovals,
  '/tax_regime_approval': P.TaxRegimeApprovals,
  '/timetracker/encashment_approval': P.EncashmentApprovals,
  '/expence/expense_approval': P.ExpenseRequests,
  '/dynamicpayroll/payrolls': P.Payrolls,
  '/loan/masters': P.LoanTypes,
  '/dynamicpayroll/salary_generation': P.SalaryGeneration,
  '/dynamicpayroll/payslip': P.Payslip,
  '/gratuity/setup': P.EosSetup,
  '/gratuity/settlement': P.EosSettlement,
  '/gratuity/reports/liability': P.GratuityLiability,
  '/gratuity/statement': P.EosStatement,
  '/employee_variable_pay': P.MonthlyVariables,
  '/dynamicpayroll/reports': P.PayrollReports,
  '/fnf': P.FnfSettlement,
  '/officedocument': M.OfficeDocuments,
  '/performance/kra_kpi': PF.KraKpi,
  '/performance/appraisal_periods': PF.AppraisalPeriods,
  '/performance/scoring_models': PF.ScoringModels,
  '/performance/increment_rules': PF.IncrementRules,
  '/performance/appraisal-cycle': PF.AppraisalCycles,
  '/performance/self-assessment': PF.SelfAssessment,
  '/performance/manager-review': PF.ManagerReview,
  '/performance/hr-finalization': PF.HrFinalization,
  '/performance/appraisal-history': PF.AppraisalHistory,
  '/performance/appraisal-templates': PF.AppraisalTemplates,
  '/performance/salary_revisions': PF.SalaryRevisions,
  '/performance/increment-letters': PF.IncrementLetters,
  '/performance/reports/kra-kpi-distribution': PF.KraDistribution,
  '/performance/reports/appraisal-tracker': PF.AppraisalTracker,
  '/performance/reports/performance-summary': PF.PerformanceSummary,
  '/notice/notice': M.Notices,
  '/settings/users': M.Users,
  '/audit_logs': M.AuditLogs,
  '/devtools/artisan': M.ArtisanRunner,
  '/devtools/prosync-logs': M.ProsyncLogs,
  '/devtools/laravel-log': M.LaravelLog,
  '/user-guide': M.UserGuide,
}

// Every Settings tab (/systemsetting/<slug>) uses the same data-driven page.
flatRoutes().filter((r) => r.path.startsWith('/systemsetting/')).forEach((r) => { pages[r.path] = Settings })
