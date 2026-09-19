import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  notificationsApi,
  type Notification,
} from "../api/notifications.api";

export const useNotifications = () => {
  const [notifications, setNotifications] =
    useState<Notification[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const fetchNotifications =
    useCallback(async () => {
      setLoading(true);

      try {
        const data =
          await notificationsApi.getAll();

        // API may return:
        // 1. Notification[]
        // 2. { notifications: Notification[] }
        // 3. { data: Notification[] }

        const notificationList: Notification[] =
          Array.isArray(data)
            ? data
            : Array.isArray(data?.notifications)
            ? data.notifications
            : Array.isArray(data?.data)
            ? data.data
            : [];

        setNotifications(notificationList);
        setError(null);
      } catch (err) {
        console.error(
          "Failed to fetch notifications:",
          err
        );

        setNotifications([]);
        setError(
          "Unable to load notifications."
        );
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const markAsRead = async (
    id: string
  ) => {
    try {
      await notificationsApi.markAsRead(id);

      setNotifications((previous) =>
        previous.map((notification) =>
          notification.id === id
            ? {
                ...notification,
                read: true,
              }
            : notification
        )
      );
    } catch (err) {
      console.error(
        "Failed to mark notification as read:",
        err
      );
    }
  };

  const markAllAsRead = async () => {
    try {
      await notificationsApi.markAllAsRead();

      setNotifications((previous) =>
        previous.map((notification) => ({
          ...notification,
          read: true,
        }))
      );
    } catch (err) {
      console.error(
        "Failed to mark all notifications as read:",
        err
      );
    }
  };

  const unreadCount =
    Array.isArray(notifications)
      ? notifications.filter(
          (notification) => !notification.read
        ).length
      : 0;

  return {
    notifications,
    loading,
    error,
    unreadCount,
    markAsRead,
    markAllAsRead,
    refetch: fetchNotifications,
  };
};

export default useNotifications;