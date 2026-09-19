import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileText,
  MapPin,
  Plus,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";
import { Link } from "react-router-dom";

import useReports from "../../hooks/useReports";
import useNotifications from "../../hooks/useNotifications";

const Dashboard = () => {
  const {
    reports,
    loading,
    totalReports,
    resolvedReports,
    pendingReports,
    criticalReports,
  } = useReports();

  const { unreadCount } = useNotifications();

  const recentReports = reports.slice(0, 4);

  return (
    <div className="min-h-screen bg-[#f6f8f7] px-4 py-6 md:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-1 text-sm font-medium text-slate-500">
              Citizen dashboard
            </p>

            <h1 className="text-2xl font-bold tracking-tight text-[#10231d] md:text-3xl">
              Good morning, Anmol
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              Track your civic reports, monitor resolutions,
              and help make public spaces safer and more accessible.
            </p>
          </div>

          {/* Report Issue */}
          <Link
            to="/report"
            className="inline-flex w-fit items-center gap-2 rounded-xl bg-[#143c2e] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0f3025]"
          >
            <Plus size={18} />
            Report an issue
          </Link>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total reports"
            value={totalReports}
            icon={<FileText size={19} />}
            description="Reports submitted"
          />

          <StatCard
            title="Resolved"
            value={resolvedReports}
            icon={<CheckCircle2 size={19} />}
            description="Successfully completed"
          />

          <StatCard
            title="In progress"
            value={pendingReports}
            icon={<Clock3 size={19} />}
            description="Awaiting action"
          />

          <StatCard
            title="Critical issues"
            value={criticalReports}
            icon={<TriangleAlert size={19} />}
            description="Require attention"
          />
        </div>

        {/* Main grid */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">

          {/* Recent reports */}
          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5">
              <div>
                <h2 className="font-semibold text-[#10231d]">
                  Recent reports
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Your latest civic observations
                </p>
              </div>

              <Link
                to="/my-reports"
                className="inline-flex items-center gap-1 text-sm font-semibold text-[#21634d] hover:underline"
              >
                View all
                <ArrowRight size={15} />
              </Link>
            </div>

            <div className="divide-y divide-slate-100">

              {loading ? (
                <div className="space-y-4 p-5">
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="flex gap-4"
                    >
                      <div className="h-16 w-16 animate-pulse rounded-xl bg-slate-100" />

                      <div className="flex-1 space-y-2">
                        <div className="h-4 w-2/3 animate-pulse rounded bg-slate-100" />
                        <div className="h-3 w-1/3 animate-pulse rounded bg-slate-100" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : recentReports.length === 0 ? (
                <div className="px-5 py-14 text-center">
                  <FileText
                    className="mx-auto text-slate-300"
                    size={38}
                  />

                  <h3 className="mt-3 font-semibold text-slate-800">
                    No reports yet
                  </h3>

                  <p className="mx-auto mt-1 max-w-sm text-sm text-slate-500">
                    Your submitted civic issues will appear here.
                  </p>

                  {/* Create first report */}
                  <Link
                    to="/report"
                    className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#143c2e] px-4 py-2.5 text-sm font-semibold text-white"
                  >
                    <Plus size={16} />
                    Create first report
                  </Link>
                </div>
              ) : (
                recentReports.map((report) => (
                  <Link
                    key={report.id}
                    to={`/reports/${report.id}`}
                    className="group flex gap-4 px-5 py-5 transition hover:bg-slate-50"
                  >
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                      {report.imageUrl ? (
                        <img
                          src={report.imageUrl}
                          alt={report.title}
                          className="h-full w-full object-cover transition group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <FileText
                            size={20}
                            className="text-slate-400"
                          />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">

                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h3 className="truncate font-semibold text-slate-800 group-hover:text-[#21634d]">
                            {report.title}
                          </h3>

                          <p className="mt-1 text-xs text-slate-500">
                            {report.civicIssueId || report.id}
                          </p>
                        </div>

                        <StatusBadge
                          status={report.status}
                        />
                      </div>

                      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500">
                        <span>
                          {report.category}
                        </span>

                        <span className="flex items-center gap-1">
                          <MapPin size={13} />
                          {report.location?.city ||
                            "Location available"}
                        </span>
                      </div>
                    </div>

                    <ArrowRight
                      size={17}
                      className="mt-1 hidden text-slate-300 transition group-hover:translate-x-1 group-hover:text-[#21634d] sm:block"
                    />
                  </Link>
                ))
              )}
            </div>
          </section>

          {/* Right column */}
          <aside className="space-y-6">

            {/* Accessibility card */}
            <div className="rounded-2xl border border-[#d8e7e0] bg-[#edf7f2] p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#21634d] shadow-sm">
                <ShieldCheck size={20} />
              </div>

              <h3 className="mt-4 font-semibold text-[#143c2e]">
                Accessibility matters
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#49675b]">
                Reporting blocked paths, missing ramps,
                unsafe crossings and other barriers helps
                make public spaces easier to navigate.
              </p>

              {/* Report a barrier */}
              <Link
                to="/report"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#21634d]"
              >
                Report a barrier
                <ArrowRight size={15} />
              </Link>
            </div>

            {/* Notifications */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-800">
                  Notifications
                </h3>

                {unreadCount > 0 && (
                  <span className="rounded-full bg-red-50 px-2 py-1 text-xs font-bold text-red-600">
                    {unreadCount} new
                  </span>
                )}
              </div>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Stay updated when your reports are verified,
                assigned or resolved.
              </p>

              <Link
                to="/notifications"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#21634d]"
              >
                Open notifications
                <ArrowRight size={15} />
              </Link>
            </div>

          </aside>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({
  title,
  value,
  icon,
  description,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  description: string;
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-500">
          {title}
        </span>

        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-50 text-[#21634d]">
          {icon}
        </span>
      </div>

      <div className="mt-5">
        <p className="text-3xl font-bold tracking-tight text-[#10231d]">
          {value}
        </p>

        <p className="mt-1 text-xs text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
};

const StatusBadge = ({
  status,
}: {
  status: string;
}) => {
  const styles: Record<string, string> = {
    REPORTED:
      "bg-slate-100 text-slate-700",
    "AI VERIFIED":
      "bg-blue-50 text-blue-700",
    ASSIGNED:
      "bg-purple-50 text-purple-700",
    "IN PROGRESS":
      "bg-amber-50 text-amber-700",
    RESOLVED:
      "bg-emerald-50 text-emerald-700",
    CLOSED:
      "bg-green-50 text-green-700",
    REOPENED:
      "bg-red-50 text-red-700",
  };

  return (
    <span
      className={`w-fit shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
        styles[status] ||
        "bg-slate-100 text-slate-600"
      }`}
    >
      {status}
    </span>
  );
};

export default Dashboard;