import type {
  ReportCategory,
  ReportStatus,
  Severity,
  LocationData,
} from "./reports";

export interface Department {
  id: string;
  name: string;
  description?: string;
  activeIssues: number;
  teamSize: number;
  status: "active" | "inactive";
}

export interface Assignment {
  id: string;
  issueId: string;
  departmentId: string;
  departmentName: string;
  assignedTo?: string;
  assignedAt: string;
}

export interface CivicIssue {
  id: string;
  civicIssueId: string;

  title: string;
  category: ReportCategory;
  issueType: string;

  severity: Severity;
  status: ReportStatus;

  confidence: number;

  location: LocationData;

  accessibilityImpact: boolean;

  description: string;

  department?: Department;

  assignment?: Assignment;

  duplicateCount?: number;

  createdAt: string;
  updatedAt?: string;
}

export interface IssueFilters {
  category?: ReportCategory | "All";
  severity?: Severity | "All";
  status?: ReportStatus | "All";
  accessibilityOnly?: boolean;
  search?: string;
}