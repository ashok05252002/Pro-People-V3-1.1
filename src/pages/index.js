// Route path -> page component. Routes not listed here render the Placeholder.
import Dashboard from './Dashboard'
import EmployeeList from './employee/EmployeeList'
import AddEmployee from './employee/AddEmployee'
import Profile from './employee/Profile'
import * as C from './Company'
import * as TA from './timetracker/Approvals'
import * as TS from './timetracker/Setup'
import * as AT from './timetracker/Attendance'
import * as LA from './leave/LeaveApplication'

export const pages = {
  '/dashboard': Dashboard,
  '/employee/employee': EmployeeList,
  '/organization/department': C.Departments,
  '/organization/designation': C.Designations,
  '/organization/location': C.Locations,
  '/organization/categories': C.Categories,
  '/leave/apply': LA.ApplyLeave,
  '/timetracker/approval': TA.LeaveRequests,
  '/timetracker/devices': TS.BiometricDevices,
  '/timetracker/leave_groups': TS.LeaveGroups,
  '/timetracker/leave_credits': TS.LeaveCredits,
  '/timetracker/permission_settings': TS.PermissionSettings,
  '/timetracker/public_holidays': TS.PublicHolidays,
  '/timetracker/master_shift': TS.Shifts,
  '/timetracker/shift_group': AT.ShiftGroups,
  '/timetracker/roster': AT.ShiftRoster,
  '/timetracker/reports': AT.ReportsHub,
  '/timetracker/manual_time_adjustment': AT.TimeAdjustment,
}

// Pages reached from a list page (not in the sidebar).
export const extraPages = {
  '/employee/employee/create': AddEmployee,
  '/employee/employee/:id': Profile,
  '/timetracker/roster/create': AT.ShiftPatternCreate,
}
