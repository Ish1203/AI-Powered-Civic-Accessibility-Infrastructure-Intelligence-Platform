import apiClient from "./client";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type:
    | "REPORT"
    | "ASSIGNMENT"
    | "RESOLUTION"
    | "SYSTEM";
  read: boolean;
  createdAt: string;
  reportId?: string;
}

export const notificationsApi = {
  async getAll() {
    const response =
      await apiClient.get<Notification[]>(
        "/notifications"
      );

    return response.data;
  },

  async markAsRead(id: string) {
    const response = await apiClient.patch(
      `/notifications/${id}`,
      {
        read: true,
      }
    );

    return response.data;
  },

  async markAllAsRead() {
    const response = await apiClient.patch(
      "/notifications/read-all"
    );

    return response.data;
  },
};