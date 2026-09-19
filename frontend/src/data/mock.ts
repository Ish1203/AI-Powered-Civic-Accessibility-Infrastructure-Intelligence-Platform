import type {
  CivicReport,
} from "../api/reports.api";

export const mockReports: CivicReport[] = [
  {
    id: "rpt-001",
    civicIssueId: "KAN-2048",
    title: "Blocked pedestrian footpath",
    category: "Accessibility",
    issueType: "Blocked footpath",
    status: "AI VERIFIED",
    severity: "HIGH",
    confidence: 94,
    description:
      "Construction material is blocking a section of the pedestrian footpath and may restrict wheelchair and pedestrian movement.",
    imageUrl:
      "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8",
    location: {
      latitude: 26.4499,
      longitude: 80.3319,
      address: "Mall Road, Kanpur",
      city: "Kanpur",
      state: "Uttar Pradesh",
    },
    department: "Municipal Corporation",
    createdAt: "2026-09-18T10:30:00Z",
    updatedAt: "2026-09-18T12:10:00Z",
    accessibilityImpact:
      "Pedestrian and wheelchair passage may be restricted.",
  },

  {
    id: "rpt-002",
    civicIssueId: "KAN-2049",
    title: "Road pothole near crossing",
    category: "Road & Infrastructure",
    issueType: "Large pothole",
    status: "IN PROGRESS",
    severity: "CRITICAL",
    confidence: 91,
    description:
      "A large pothole is visible near a pedestrian crossing and could create a safety risk for pedestrians and vehicles.",
    imageUrl:
      "https://images.unsplash.com/photo-1518391846015-55a9cc003b25",
    location: {
      latitude: 26.451,
      longitude: 80.328,
      address: "Civil Lines",
      city: "Kanpur",
      state: "Uttar Pradesh",
    },
    department: "Road Maintenance",
    createdAt: "2026-09-17T08:20:00Z",
    updatedAt: "2026-09-18T14:00:00Z",
  },

  {
    id: "rpt-003",
    civicIssueId: "KAN-2050",
    title: "Garbage accumulation",
    category: "Cleanliness",
    issueType: "Garbage accumulation",
    status: "REPORTED",
    severity: "MEDIUM",
    confidence: 87,
    description:
      "Waste has accumulated beside the public walkway and appears to require collection.",
    imageUrl:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b",
    location: {
      latitude: 26.456,
      longitude: 80.34,
      address: "Swaroop Nagar",
      city: "Kanpur",
      state: "Uttar Pradesh",
    },
    department: "Sanitation",
    createdAt: "2026-09-18T15:30:00Z",
    updatedAt: "2026-09-18T15:30:00Z",
  },
];

export const mockNotifications = [
  {
    id: "n-001",
    title: "Report verified",
    message:
      "KAN-2048 has been verified by AccessPath AI.",
    type: "REPORT" as const,
    read: false,
    createdAt: "2026-09-18T12:10:00Z",
    reportId: "KAN-2048",
  },

  {
    id: "n-002",
    title: "Issue assigned",
    message:
      "KAN-2049 has been assigned to Road Maintenance.",
    type: "ASSIGNMENT" as const,
    read: false,
    createdAt: "2026-09-18T14:00:00Z",
    reportId: "KAN-2049",
  },

  {
    id: "n-003",
    title: "Welcome to AccessPath AI",
    message:
      "You can now report accessibility and civic infrastructure problems.",
    type: "SYSTEM" as const,
    read: true,
    createdAt: "2026-09-17T08:00:00Z",
  },
];

export const mockAnalytics = {
  summary: {
    totalReports: 1284,
    resolvedReports: 817,
    pendingReports: 467,
    criticalIssues: 43,
    accessibilityIssues: 286,
    averageResolutionTime: 3.8,
  },

  categories: [
    {
      category: "Accessibility",
      count: 286,
    },
    {
      category: "Road & Infrastructure",
      count: 418,
    },
    {
      category: "Cleanliness",
      count: 347,
    },
    {
      category: "Public Space",
      count: 233,
    },
  ],

  statuses: [
    {
      status: "Reported",
      count: 190,
    },
    {
      status: "AI Verified",
      count: 112,
    },
    {
      status: "Assigned",
      count: 156,
    },
    {
      status: "In Progress",
      count: 166,
    },
    {
      status: "Resolved",
      count: 420,
    },
    {
      status: "Closed",
      count: 240,
    },
  ],

  trends: [
    {
      date: "Sep 12",
      reports: 48,
      resolved: 31,
    },
    {
      date: "Sep 13",
      reports: 61,
      resolved: 42,
    },
    {
      date: "Sep 14",
      reports: 55,
      resolved: 37,
    },
    {
      date: "Sep 15",
      reports: 72,
      resolved: 46,
    },
    {
      date: "Sep 16",
      reports: 67,
      resolved: 51,
    },
    {
      date: "Sep 17",
      reports: 79,
      resolved: 58,
    },
    {
      date: "Sep 18",
      reports: 84,
      resolved: 63,
    },
  ],

  hotspots: [
    {
      id: "h-01",
      latitude: 26.4499,
      longitude: 80.3319,
      issueCount: 42,
      dominantCategory: "Accessibility",
    },
    {
      id: "h-02",
      latitude: 26.451,
      longitude: 80.328,
      issueCount: 31,
      dominantCategory: "Road & Infrastructure",
    },
  ],
};