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

        setNotifications(data);
        setError(null);
      } catch {
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
  };

  const markAllAsRead = async () => {
    await notificationsApi.markAllAsRead();

    setNotifications((previous) =>
      previous.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  const unreadCount =
    notifications.filter(
      (notification) => !notification.read
    ).length;

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