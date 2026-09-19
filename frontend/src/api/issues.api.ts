import apiClient from "./client";
import type {
  CivicReport,
  ReportStatus,
  Severity,
} from "./reports.api";

export interface IssueFilters {
  category?: string;
  severity?: Severity;
  status?: ReportStatus;
  search?: string;
  page?: number;
  limit?: number;
}

export interface AssignmentPayload {
  departmentId: string;
  officerId?: string;
  note?: string;
}

export interface ResolutionPayload {
  description: string;
  evidence?: File;
}

export const issuesApi = {
  async getAll(filters?: IssueFilters) {
    const response = await apiClient.get<CivicReport[]>(
      "/issues",
      {
        params: filters,
      }
    );

    return response.data;
  },

  async getById(id: string) {
    const response = await apiClient.get<CivicReport>(
      `/issues/${id}`
    );

    return response.data;
  },

  async assign(
    id: string,
    payload: AssignmentPayload
  ) {
    const response = await apiClient.post(
      `/issues/${id}/assign`,
      payload
    );

    return response.data;
  },

  async updateStatus(
    id: string,
    status: ReportStatus
  ) {
    const response = await apiClient.patch(
      `/issues/${id}/status`,
      { status }
    );

    return response.data;
  },

  async addResolution(
    id: string,
    payload: ResolutionPayload
  ) {
    const formData = new FormData();

    formData.append(
      "description",
      payload.description
    );

    if (payload.evidence) {
      formData.append(
        "evidence",
        payload.evidence
      );
    }

    const response = await apiClient.post(
      `/issues/${id}/resolution`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  },
};