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
}
