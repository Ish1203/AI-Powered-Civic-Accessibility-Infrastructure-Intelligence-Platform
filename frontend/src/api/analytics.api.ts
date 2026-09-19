import apiClient from "./client";

export interface AnalyticsSummary {
  totalReports: number;
  resolvedReports: number;
  pendingReports: number;
  criticalIssues: number;
  accessibilityIssues: number;
  averageResolutionTime: number;
}

export interface CategoryStat {
  category: string;
  count: number;
}

export interface StatusStat {
  status: string;
  count: number;
}

export interface TrendPoint {
  date: string;
  reports: number;
  resolved: number;
}

export interface Hotspot {
  id: string;
  latitude: number;
  longitude: number;
  issueCount: number;
  dominantCategory: string;
}

export interface AnalyticsData {
  summary: AnalyticsSummary;
  categories: CategoryStat[];
  statuses: StatusStat[];
  trends: TrendPoint[];
  hotspots: Hotspot[];
}

export const analyticsApi = {
  async get() {
    const response =
      await apiClient.get<AnalyticsData>(
        "/analytics"
      );

    return response.data;
  },
};