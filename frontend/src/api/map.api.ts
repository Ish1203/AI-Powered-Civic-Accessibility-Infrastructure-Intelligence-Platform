import apiClient from "./client";
import type {
  ReportStatus,
  Severity,
} from "./reports.api";

export interface MapIssue {
  id: string;
  civicIssueId: string;
  title: string;
  category: string;
  issueType: string;
  severity: Severity;
  status: ReportStatus;
  latitude: number;
  longitude: number;
  createdAt: string;
}

export interface MapFilters {
  category?: string;
  severity?: Severity;
  status?: ReportStatus;
  accessibilityOnly?: boolean;
  dateFrom?: string;
  dateTo?: string;
  lat?: number;
  lng?: number;
  radius?: number;
}

export const mapApi = {
  async getIssues(filters?: MapFilters) {
    const response = await apiClient.get<MapIssue[]>(
      "/map/issues",
      {
        params: filters,
      }
    );

    return response.data;
  },

  async getNearby(
    latitude: number,
    longitude: number,
    radius = 5
  ) {
    const response = await apiClient.get<MapIssue[]>(
      "/map/issues",
      {
        params: {
          lat: latitude,
          lng: longitude,
          radius,
        },
      }
    );

    return response.data;
  },
};