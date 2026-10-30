// Route path -> page component. Routes not listed here render the Placeholder.
import Dashboard from './Dashboard'
import EmployeeList from './employee/EmployeeList'
import AddEmployee from './employee/AddEmployee'
import Profile from './employee/Profile'
import * as C from './Company'
import * as TA from './timetracker/Approvals'
import * as TS from './timetracker/Setup'

export const pages = {
  '/dashboard': Dashboard,
  '/employee/employee': EmployeeList,
  '/organization/department': C.Departments,
  '/organization/designation': C.Designations,
  '/organization/location': C.Locations,
  '/organization/categories': C.Categories,
  '/timetracker/approval': TA.LeaveRequests,
  '/timetracker/devices': TS.BiometricDevices,
}

// Pages reached from a list page (not in the sidebar).
export const extraPages = {
  '/employee/employee/create': AddEmployee,
  '/employee/employee/:id': Profile,
}
