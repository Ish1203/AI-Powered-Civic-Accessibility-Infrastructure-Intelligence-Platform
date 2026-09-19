export interface AnalyticsSummary {
  totalIssues: number;
  openIssues: number;
  resolvedIssues: number;
  criticalIssues: number;
  accessibilityIssues: number;
  averageResolutionTime: number;
}

export interface CategoryCount {
  category: string;
  count: number;
}

export interface SeverityCount {
  severity: string;
  count: number;
}

export interface StatusCount {
  status: string;
  count: number;
}

export interface TrendPoint {
  date: string;
  reported: number;
  resolved: number;
}

export interface Hotspot {
  id: string;
  location: string;
  issueCount: number;
  criticalCount: number;
  accessibilityCount: number;
  latitude: number;
  longitude: number;
}

export interface AnalyticsData {
  summary: AnalyticsSummary;
  categories: CategoryCount[];
  severity: SeverityCount[];
  status: StatusCount[];
  trends: TrendPoint[];
  hotspots: Hotspot[];
}