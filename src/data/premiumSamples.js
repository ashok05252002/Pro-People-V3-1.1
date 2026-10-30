// Sample data for the premium preview on each upgrade page (invented, read-only).
// Table rows: when `person` is set, the first value is an employee index from people.js.
import { inr } from '../components/ui'

export const premiumSamples = {
  recruitment: {
    title: 'Candidates', person: true,
    stats: [['Open Positions', '6'], ['Candidates', '48'], ['Interviews This Week', '12'], ['Joining This Month', '3']],
    cols: ['Candidate', 'Position', 'Stage', 'Interview', 'Status'],
    rows: [[21, 'Security Officer', 'Technical Round', '03 Nov 26, 11:00 AM', 'Scheduled'], [33, 'Accountant', 'HR Round', '04 Nov 26, 03:30 PM', 'Scheduled'],
      [8, 'Facility Manager', 'Offer', '28 Oct 26', 'Offer Sent'], [41, 'Engineering Lead', 'Screening', '-', 'New'], [16, 'HR Manager', 'Onboarding', '27 Oct 26', 'Joined']],
  },
  payroll: {
    title: 'October 2026 Payroll', person: true,
    stats: [['Gross Payroll', inr(4862500)], ['Employees Processed', '44'], ['Payslips Generated', '44'], ['Pending Approvals', '5']],
    cols: ['Employee', 'Gross', 'Deductions', 'Net Pay', 'Status'],
    rows: [[0, inr(98500), inr(11820), inr(86680), 'Paid'], [3, inr(72000), inr(8640), inr(63360), 'Paid'],
      [5, inr(64500), inr(7740), inr(56760), 'Processing'], [9, inr(118000), inr(16520), inr(101480), 'Paid'], [12, inr(54000), inr(6480), inr(47520), 'On Hold']],
  },
  performance: {
    title: 'Appraisal Tracker: FY 2026-27 H1', person: true,
    stats: [['Active Cycle', 'FY 26-27 H1'], ['Self Assessments', '31 / 44'], ['Manager Reviews', '18'], ['Average Rating', '3.8 / 5']],
    cols: ['Employee', 'KRA Score', 'Self', 'Manager', 'Status'],
    rows: [[2, '86%', '4.2', '4.0', 'HR Review'], [7, '78%', '3.9', '3.6', 'Manager Review'], [11, '92%', '4.5', '4.6', 'Finalized'],
      [14, '71%', '3.5', '-', 'Self Assessment'], [19, '83%', '4.0', '3.8', 'HR Review']],
  },
  visitor: {
    title: "Today's Visitors",
    stats: [["Today's Visitors", '23'], ['Checked In', '9'], ['Pre-Registered', '14'], ['Pending Approval', '3']],
    cols: ['Visitor', 'Company', 'Host', 'Purpose', 'In Time', 'Status'],
    rows: [['Ravi Chandran', 'Apex Logistics', 'Lakshmi Raman', 'Vendor Meeting', '09:42 AM', 'Checked In'], ['Nisha Varma', 'BlueOak Consulting', 'Kavya Joseph', 'Interview', '10:15 AM', 'Checked In'],
      ['Imran Shaikh', 'Metro Electricals', 'Hari Menon', 'Maintenance', '11:05 AM', 'Checked Out'], ['Anita Das', 'Sunrise Foods', 'Ganesh Das', 'Delivery', '-', 'Pending'], ['Joseph Mathew', 'CityBank', 'Karthik Nair', 'Audit', '-', 'Expected']],
  },
  documents: {
    title: 'Employee Documents', person: true,
    stats: [['Documents', '1,284'], ['Expiring in 30 Days', '7'], ['Letters Issued', '96'], ['Templates', '12']],
    cols: ['Employee', 'Document', 'Category', 'Expiry', 'Status'],
    rows: [[1, 'Passport', 'Identity', '14 Dec 26', 'Expiring'], [4, 'Offer Letter', 'Letters', '-', 'Issued'], [6, 'Driving Licence', 'Identity', '02 Mar 29', 'Valid'],
      [10, 'Experience Letter', 'Letters', '-', 'Issued'], [13, 'Medical Fitness', 'Health', '20 Nov 26', 'Expiring']],
  },
  notice: {
    title: 'Notices',
    stats: [['Published', '18'], ['This Month', '4'], ['Scheduled', '2'], ['Read Rate', '86%']],
    cols: ['Title', 'Audience', 'Published', 'Read By', 'Status'],
    rows: [['Deepavali holiday on 08 Nov', 'All employees', '28 Oct 26', '41 / 44', 'Published'], ['Fire drill at Head Office', 'Head Office', '24 Oct 26', '19 / 22', 'Published'],
      ['New shift timings from Nov', 'Engineering & Technology', '21 Oct 26', '12 / 12', 'Published'], ['Year-end appraisal schedule', 'All employees', '05 Nov 26', '-', 'Scheduled']],
  },
  audit: {
    title: 'Recent Activity',
    stats: [['Changes Today', '142'], ['Active Users', '9'], ['Logins', '27'], ['Deletions', '3']],
    cols: ['Time', 'User', 'Module', 'Action', 'Record'],
    rows: [['30 Oct 26, 03:12 PM', 'Admin', 'Employee', 'Updated', 'EMP118 Kavya Joseph'], ['30 Oct 26, 02:48 PM', 'HR Manager', 'Leave', 'Approved', 'Annual Leave, EMP120'],
      ['30 Oct 26, 01:30 PM', 'Admin', 'Shifts', 'Created', 'Shift: Evening (14:00 - 22:00)'], ['30 Oct 26, 11:05 AM', 'Admin', 'Holidays', 'Deleted', 'Ayudha Pooja'], ['30 Oct 26, 09:58 AM', 'HR Manager', 'Login', 'Signed in', 'Web, Chrome']],
  },
  employee: {
    title: 'Profile Change Requests', person: true,
    stats: [['Employee Groups', '6'], ['Pending Requests', '4'], ['Custom Fields', '11'], ['Last Bulk Upload', '28 Oct 26']],
    cols: ['Employee', 'Field', 'Current', 'Requested', 'Status'],
    rows: [[3, 'Mobile Number', '+91 98400 04113', '+91 98411 22334', 'Pending'], [8, 'Address', 'Anna Nagar, Chennai', 'Velachery, Chennai', 'Pending'],
      [15, 'Bank Account', 'XXXX 4821', 'XXXX 9917', 'Approved'], [22, 'Emergency Contact', 'R. Kumar', 'S. Kumar', 'Rejected']],
  },
  company: {
    title: 'Vendors',
    stats: [['Vendors', '3'], ['Employment Types', '4'], ['Zones', '5'], ['Access Levels', '6']],
    cols: ['Vendor', 'Type', 'Contact', 'Employees', 'Status'],
    rows: [['Alpha Staffing', 'Manpower', 'alpha@example.com', '12', 'Active'], ['Prime Manpower', 'Manpower', 'prime@example.com', '8', 'Active'],
      ['SecureGuard Services', 'Security', 'secure@example.com', '5', 'Active'], ['CleanPro Facilities', 'Housekeeping', 'cleanpro@example.com', '0', 'Inactive']],
  },
  timetracker: {
    title: 'Overtime Approvals', person: true,
    stats: [['OT Requests', '9'], ['Comp Off Requests', '4'], ['Punch Requests', '6'], ['Permission Requests', '5']],
    cols: ['Employee', 'Date', 'Shift', 'OT Hours', 'Status'],
    rows: [[0, '29 Oct 26', 'General (09:00 - 18:00)', '2h 30m', 'Pending'], [5, '28 Oct 26', 'Evening (14:00 - 22:00)', '1h 45m', 'Pending'],
      [9, '27 Oct 26', 'Night (22:00 - 06:00)', '3h 00m', 'Approved'], [17, '26 Oct 26', 'Morning (06:00 - 14:00)', '1h 15m', 'Rejected']],
  },
}
