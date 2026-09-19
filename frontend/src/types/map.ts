import type {
  ReportCategory,
  ReportStatus,
  Severity,
} from "./reports";

export interface MapIssue {
  id: string;
  civicIssueId: string;

  latitude: number;
  longitude: number;

  title: string;
  category: ReportCategory;
  severity: Severity;
  status: ReportStatus;

  accessibilityImpact: boolean;

  locationName?: string;

  createdAt: string;
}

export interface MapFilters {
  category: ReportCategory | "All";
  severity: Severity | "All";
  status: ReportStatus | "All";
  accessibilityOnly: boolean;
  dateRange?: string;
}

export interface MapCenter {
  latitude: number;
  longitude: number;
  zoom: number;
}