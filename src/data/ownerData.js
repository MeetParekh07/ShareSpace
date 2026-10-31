export const ownerResources = [
  {
    id: "RES001",
    name: "Professional DSLR Camera",
    category: "Photography",
    location: "Ahmedabad",
    status: "available",
    condition: "Excellent",
    totalCopies: 2,
    borrowedCopies: 0,
  },
  {
    id: "RES002",
    name: "HD Projector",
    category: "Electronics",
    location: "Ahmedabad",
    status: "available",
    condition: "Good",
    totalCopies: 1,
    borrowedCopies: 0,
  },
  {
    id: "RES003",
    name: "Power Drill Kit",
    category: "Tools & Equipment",
    location: "Gandhinagar",
    status: "borrowed",
    condition: "Good",
    totalCopies: 2,
    borrowedCopies: 1,
  },
  {
    id: "RES004",
    name: "Arduino Starter Kit",
    category: "Lab Equipment",
    location: "Vadodara",
    status: "available",
    condition: "Excellent",
    totalCopies: 3,
    borrowedCopies: 0,
  },
];

export const ownerRequests = [
  {
    id: "REQ001",
    resourceName: "Professional DSLR Camera",
    borrowerName: "Rahul Patel",
    borrowerEmail: "rahul@example.com",
    startDate: "2026-11-02",
    endDate: "2026-11-05",
    purpose: "Photography for a college event.",
    status: "pending",
  },
  {
    id: "REQ002",
    resourceName: "HD Projector",
    borrowerName: "Priya Shah",
    borrowerEmail: "priya@example.com",
    startDate: "2026-11-04",
    endDate: "2026-11-06",
    purpose: "Project presentation.",
    status: "pending",
  },
  {
    id: "REQ003",
    resourceName: "Arduino Starter Kit",
    borrowerName: "Amit Joshi",
    borrowerEmail: "amit@example.com",
    startDate: "2026-10-28",
    endDate: "2026-11-02",
    purpose: "IoT mini project.",
    status: "approved",
  },
];


export const resourceCategories = [
  "Photography",
  "Electronics",
  "Tools & Equipment",
  "Lab Equipment",
  "Study Materials",
  "Sports",
  "Other",
];

export const resourceLocations = [
  "Ahmedabad",
  "Vadodara",
  "Gandhinagar",
  "Surat",
  "Other",
];