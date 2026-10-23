// Dummy employees shared by every screen. All names are invented.
const first = ['Arun', 'Priya', 'Vijay', 'Lakshmi', 'Mohammed', 'Sara', 'Rahul', 'Divya', 'Karthik', 'Meena',
  'Arjun', 'Fatima', 'Suresh', 'Anitha', 'Rohan', 'Nisha', 'Imran', 'Kavya', 'Deepak', 'Revathi',
  'Ahmed', 'Sneha', 'Ganesh', 'Pooja', 'Hari', 'Aisha', 'Naveen', 'Swathi', 'Omar', 'Keerthi']
const last = ['Kumar', 'Raman', 'Shankar', 'Iyer', 'Irfan', 'Thomas', 'Nair', 'Pillai', 'Subramanian', 'Joseph',
  'Mehta', 'Khan', 'Reddy', 'Menon', 'Das']

export const departments = ['Customer Experience', 'Engineering & Technology', 'Executive Management', 'Facility',
  'Female Security', 'Finance', 'Front Office', 'Human Resources', 'Male Security', 'Management', 'Marketing']
export const designations = ['Engineering Lead', 'HR Manager', 'Security Officer', 'Accountant', 'Facility Manager',
  'General Manager', 'Front Office Officer', 'Software Engineer', 'Marketing Executive', 'Team Lead']
export const categories = ['Employee', 'Management', 'Contract']
export const locations = ['Head Office', 'Branch 1', 'Branch 2']
export const vendors = ['Direct', 'Alpha Staffing', 'Prime Manpower']
export const shifts = ['General (09:00 - 18:00)', 'Morning (06:00 - 14:00)', 'Evening (14:00 - 22:00)', 'Night (22:00 - 06:00)']
export const colors = ['#ea580c', '#0d9488', '#6b7280', '#16a34a', '#2563eb', '#9333ea', '#db2777', '#ca8a04']

const pick = (arr, i) => arr[i % arr.length]

export const employees = Array.from({ length: 49 }, (_, i) => {
  const name = `${pick(first, i * 7 + 3)} ${pick(last, i * 4 + 1)}`
  const status = i === 6 ? 'Offboard' : i === 1 || i % 11 === 6 ? 'Inactive' : 'Active'
  return {
    id: i + 1,
    name,
    code: `EMP${String(120 - i).padStart(3, '0')}`,
    department: pick(departments, i * 3),
    designation: pick(designations, i * 7),
    category: i % 9 === 1 ? 'Management' : i % 13 === 4 ? 'Contract' : 'Employee',
    location: pick(locations, i),
    vendor: pick(vendors, i % 5 === 0 ? 1 : 0),
    shift: pick(shifts, i % 4),
    status,
    tags: i === 6 ? ['Writing Off'] : [],
    gender: i % 3 === 0 ? 'Male' : 'Female',
    email: `${name.toLowerCase().replace(' ', '.')}@example.com`,
    phone: `+91 98${String(40000000 + i * 1371).slice(0, 8)}`,
    joined: `${String((i % 27) + 1).padStart(2, '0')}-${String((i % 12) + 1).padStart(2, '0')}-${2019 + (i % 7)}`,
    color: pick(colors, i * 3),
  }
})

export const emp = (i) => employees[i % employees.length]
