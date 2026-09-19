import {
  Bell,
  CheckCheck,
  FileCheck2,
  Info,
  UserRoundCheck,
} from "lucide-react";

import useNotifications from "../../hooks/useNotifications";

const Notifications = () => {
  const {
    notifications,
    loading,
    unreadCount,
    markAsRead,
    markAllAsRead,
  } = useNotifications();

  const iconFor = (type: string) => {
    if (type === "REPORT") {
      return <FileCheck2 size={18} />;
    }

    if (type === "ASSIGNMENT") {
      return <UserRoundCheck size={18} />;
    }

    return <Info size={18} />;
  };

  return (
    <div className="min-h-screen bg-[#f6f8f7] px-4 py-6 md:px-8">
      <div className="mx-auto max-w-4xl">

        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-500">
              Updates
            </p>

            <h1 className="mt-1 text-2xl font-bold text-[#10231d]">
              Notifications
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Updates about your civic reports.
            </p>
          </div>

          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              <CheckCheck size={16} />
              Mark all read
            </button>
          )}
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {loading ? (
            <div className="space-y-5 p-5">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="flex gap-4"
                >
                  <div className="h-10 w-10 animate-pulse rounded-full bg-slate-100" />

                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-1/2 animate-pulse rounded bg-slate-100" />
                    <div className="h-3 w-3/4 animate-pulse rounded bg-slate-100" />
                  </div>
                </div>
              ))}
            </div>
          ) : notifications.length === 0 ? (
            <div className="px-5 py-16 text-center">
              <Bell
                size={38}
                className="mx-auto text-slate-300"
              />

              <h3 className="mt-4 font-semibold text-slate-800">
                You're all caught up
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                New report updates will appear here.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {notifications.map(
                (notification) => (
                  <button
                    key={notification.id}
                    onClick={() =>
                      !notification.read &&
                      markAsRead(
                        notification.id
                      )
                    }
                    className={`flex w-full gap-4 p-5 text-left transition hover:bg-slate-50 ${
                      !notification.read
                        ? "bg-[#f8fbf9]"
                        : ""
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                        notification.read
                          ? "bg-slate-100 text-slate-500"
                          : "bg-[#e5f2ec] text-[#21634d]"
                      }`}
                    >
                      {iconFor(
                        notification.type
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-semibold text-slate-800">
                          {notification.title}
                        </h3>

                        {!notification.read && (
                          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#21634d]" />
                        )}
                      </div>

                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        {notification.message}
                      </p>

                      <p className="mt-2 text-xs text-slate-400">
                        {new Date(
                          notification.createdAt
                        ).toLocaleString()}
                      </p>
                    </div>
                  </button>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;