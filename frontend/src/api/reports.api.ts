import apiClient from "./client";

export type ReportStatus =
  | "REPORTED"
  | "AI VERIFIED"
  | "ASSIGNED"
  | "IN PROGRESS"
  | "RESOLVED"
  | "VERIFICATION"
  | "CLOSED"
  | "REOPENED";

export type Severity =
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "CRITICAL";

export interface ReportLocation {
  latitude: number;
  longitude: number;
  address?: string;
  city?: string;
  state?: string;
}

export interface AIAnalysis {
  category: string;
  issueType: string;
  confidence: number;
  severity: Severity;
  detectedObjects: string[];
  accessibilityImpact: string;
  safetyRisk?: string;
  description?: string;
}

export interface CivicReport {
  id: string;
  civicIssueId?: string;
  title: string;
  category: string;
  issueType: string;
  status: ReportStatus;
  severity: Severity;
  confidence?: number;
  description: string;
  imageUrl?: string;
  location: ReportLocation;
  department?: string;
  createdAt: string;
  updatedAt: string;
  accessibilityImpact?: string;
}

export interface CreateReportPayload {
  image: File;
  latitude: number;
  longitude: number;
  address?: string;
  description?: string;
}

export interface ReportFilters {
  status?: ReportStatus;
  category?: string;
  severity?: Severity;
  search?: string;
  page?: number;
  limit?: number;
}

export const reportsApi = {
  // --------------------------------
  // AI ANALYSIS
  // --------------------------------
  async analyze(payload: CreateReportPayload) {
    const formData = new FormData();

    formData.append("image", payload.image);
    formData.append("latitude", String(payload.latitude));
    formData.append("longitude", String(payload.longitude));

    if (payload.address) {
      formData.append("address", payload.address);
    }

    if (payload.description) {
      formData.append("description", payload.description);
    }

    console.log("ANALYZE FORMDATA:");

    for (const [key, value] of formData.entries()) {
      console.log(
        key,
        value instanceof File
          ? {
              name: value.name,
              type: value.type,
              size: value.size,
            }
          : value
      );
    }

    const response = await apiClient.post<AIAnalysis>(
      "/reports/analyze",
      formData
    );

    console.log("AI ANALYSIS RESPONSE:", response.data);

    return response.data;
  },

  // --------------------------------
  // CREATE REPORT
  // --------------------------------
  async create(payload: CreateReportPayload) {
    const formData = new FormData();

    formData.append("image", payload.image);
    formData.append("latitude", String(payload.latitude));
    formData.append("longitude", String(payload.longitude));

    if (payload.address) {
      formData.append("address", payload.address);
    }

    if (payload.description) {
      formData.append("description", payload.description);
    }

    const response = await apiClient.post<CivicReport>(
      "/reports/",
      formData
    );

    console.log("CREATE REPORT RESPONSE:", response.data);

    return response.data;
  },

  // --------------------------------
  // GET ALL REPORTS
  // --------------------------------
  async getAll(filters?: ReportFilters) {
    const response = await apiClient.get<any>(
      "/reports/",
      {
        params: filters,
      }
    );

    console.log(
      "GET REPORTS RESPONSE:",
      response.data
    );

    if (Array.isArray(response.data)) {
      return response.data as CivicReport[];
    }

    if (Array.isArray(response.data?.reports)) {
      return response.data.reports as CivicReport[];
    }

    if (Array.isArray(response.data?.data)) {
      return response.data.data as CivicReport[];
    }

    return [];
  },

  // --------------------------------
  // GET REPORT BY ID
  // --------------------------------
  async getById(id: string) {
    const response =
      await apiClient.get<CivicReport>(
        `/reports/${id}`
      );

    return response.data;
  },

  // --------------------------------
  // UPDATE REPORT
  // --------------------------------
  async update(
    id: string,
    payload: Partial<CivicReport>
  ) {
    const response =
      await apiClient.patch<CivicReport>(
        `/reports/${id}`,
        payload
      );

    return response.data;
  },

  // --------------------------------
  // SUBMIT REPORT
  // --------------------------------
  async submit(id: string) {
    const response =
      await apiClient.post<CivicReport>(
        `/reports/${id}/submit`
      );

    return response.data;
  },
};