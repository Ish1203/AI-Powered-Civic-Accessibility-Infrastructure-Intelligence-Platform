import apiClient from "./client";

export interface ResolutionEvidence {
  id: string;
  issueId: string;
  imageUrl: string;
  description: string;
  submittedAt: string;
  submittedBy: string;
}

export interface Verification {
  id: string;
  issueId: string;
  decision: "CONFIRMED" | "REJECTED";
  comment?: string;
  createdAt: string;
}

export interface VerificationPayload {
  decision: "CONFIRMED" | "REJECTED";
  comment?: string;
}

export const verificationApi = {
  async getEvidence(issueId: string) {
    const response =
      await apiClient.get<ResolutionEvidence[]>(
        `/issues/${issueId}/resolution`
      );

    return response.data;
  },

  async verify(
    issueId: string,
    payload: VerificationPayload
  ) {
    const response =
      await apiClient.post<Verification>(
        `/issues/${issueId}/verify`,
        payload
      );

    return response.data;
  },
};