import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Clock3,
  MapPin,
  MoreHorizontal,
  RefreshCw,
  ShieldAlert,
  TrendingUp,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

import StatCard from "../../components/dashboard/StatCard";
import AnalyticsChart from "../../components/dashboard/AnalyticsChart";
import HotspotCard from "../../components/dashboard/HotspotCard";
import IssueTable from "../../components/dashboard/IssueTable";

import useIssues from "../../hooks/useIssues";

const AuthorityDashboard = () => {
  const {
    issues,
    loading,
    refetch,
  } = useIssues();

  const totalIssues = issues?.length ?? 0;

  const criticalIssues =
    issues?.filter(
      (issue: any) =>
        issue.severity === "CRITICAL"
    ).length ?? 0;

  const inProgress =
    issues?.filter(
      (issue: any) =>
        issue.status === "IN PROGRESS"
    ).length ?? 0;

  const resolved =
    issues?.filter(
      (issue: any) =>
        issue.status === "RESOLVED" ||
        issue.status === "CLOSED"
    ).length ?? 0;

  return (
    <div className="min-h-screen bg-[#f5f7f6] px-4 py-6 md:px-8">
      <div className="mx-auto max-w-[1500px]">

        {/* ------------------------------------------------ */}
        {/* HEADER */}
        {/* ------------------------------------------------ */}

        <header className="mb-7">

          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-[#21634d]">
                <span className="h-2 w-2 rounded-full bg-[#3b8065]" />
                Operations overview
              </div>

              <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#14251f]">
                Civic operations dashboard
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Monitor reported civic issues, prioritize
                urgent cases and track resolution progress
                across your service area.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">

              <button
                onClick={() => refetch()}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                <RefreshCw
                  size={16}
                  className={
                    loading
                      ? "animate-spin"
                      : ""
                  }
                />
                Refresh
              </button>

              <Link
                to="/authority/issues"
                className="inline-flex items-center gap-2 rounded-xl bg-[#143c2e] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0e3025]"
              >
                View all issues
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </header>

        {/* ------------------------------------------------ */}
        {/* ALERT */}
        {/* ------------------------------------------------ */}

        {criticalIssues > 0 && (
          <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-red-200 bg-red-50 p-4 md:flex-row md:items-center md:justify-between">

            <div className="flex items-start gap-3">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-red-600">
                <ShieldAlert size={20} />
              </div>

              <div>
                <p className="font-semibold text-red-900">
                  {criticalIssues} critical issue
                  {criticalIssues !== 1
                    ? "s"
                    : ""}{" "}
                  require attention
                </p>

                <p className="mt-1 text-sm text-red-700">
                  Review safety and accessibility
                  risks before lower-priority reports.
                </p>
              </div>
            </div>

            <Link
              to="/authority/issues?severity=CRITICAL"
              className="inline-flex items-center gap-2 self-start rounded-lg border border-red-200 bg-white px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-50 md:self-auto"
            >
              Review critical
              <ArrowRight size={15} />
            </Link>
          </div>
        )}

        {/* ------------------------------------------------ */}
        {/* STAT GRID */}
        {/* ------------------------------------------------ */}

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <StatCard
            title="Total reports"
            value={totalIssues.toLocaleString()}
            icon={<BarChart3 size={20} />}
            trend="+12%"
            trendLabel="this month"
          />

          <StatCard
            title="Needs attention"
            value={criticalIssues.toLocaleString()}
            icon={<AlertTriangle size={20} />}
            trend="Priority"
            trendLabel="critical cases"
          />

          <StatCard
            title="In progress"
            value={inProgress.toLocaleString()}
            icon={<Clock3 size={20} />}
            trend="+8%"
            trendLabel="this week"
          />

          <StatCard
            title="Resolved"
            value={resolved.toLocaleString()}
            icon={<CheckCircle2 size={20} />}
            trend="+18%"
            trendLabel="this month"
          />
        </section>

        {/* ------------------------------------------------ */}
        {/* MAIN ANALYTICS */}
        {/* ------------------------------------------------ */}

        <section className="mt-6 grid gap-6 xl:grid-cols-[1fr_360px]">

          {/* CHART */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <h2 className="font-semibold text-slate-800">
                  Issue activity
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Reports received and resolved over
                  the selected period
                </p>
              </div>

              <select
                className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600 outline-none focus:border-[#4c8c72]"
                defaultValue="30"
              >
                <option value="7">
                  Last 7 days
                </option>

                <option value="30">
                  Last 30 days
                </option>

                <option value="90">
                  Last 90 days
                </option>
              </select>
            </div>

            <div className="p-5">
              <AnalyticsChart />
            </div>
          </div>

          {/* HOTSPOTS */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="flex items-center justify-between border-b border-slate-100 p-5">

              <div>
                <h2 className="font-semibold text-slate-800">
                  Active hotspots
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Areas with repeated reports
                </p>
              </div>

              <MapPin
                size={18}
                className="text-[#21634d]"
              />
            </div>

            <div className="divide-y divide-slate-100">
              <HotspotCard
                title="Civil Lines"
                count={28}
                category="Road & pedestrian"
              />

              <HotspotCard
                title="Swaroop Nagar"
                count={19}
                category="Cleanliness"
              />

              <HotspotCard
                title="Mall Road"
                count={14}
                category="Accessibility"
              />

              <HotspotCard
                title="Kakadeo"
                count={11}
                category="Infrastructure"
              />
            </div>

            <div className="border-t border-slate-100 p-4">
              <Link
                to="/authority/analytics"
                className="flex items-center justify-center gap-2 text-sm font-semibold text-[#21634d] hover:text-[#143c2e]"
              >
                Explore hotspots
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------ */}
        {/* QUICK OPERATIONS */}
        {/* ------------------------------------------------ */}

        <section className="mt-6 grid gap-4 md:grid-cols-3">

          <QuickAction
            icon={<AlertTriangle size={19} />}
            title="Review priority issues"
            description="Start with reports that have high safety or accessibility impact."
            href="/authority/issues?sort=priority"
          />

          <QuickAction
            icon={<Users size={19} />}
            title="Manage assignments"
            description="See which teams are handling active civic issues."
            href="/authority/assignments"
          />

          <QuickAction
            icon={<TrendingUp size={19} />}
            title="View performance"
            description="Track resolution trends and recurring civic problems."
            href="/authority/analytics"
          />

        </section>

        {/* ------------------------------------------------ */}
        {/* ISSUE TABLE */}
        {/* ------------------------------------------------ */}

        <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="flex flex-col gap-4 border-b border-slate-100 p-5 md:flex-row md:items-center md:justify-between">

            <div>
              <h2 className="font-semibold text-slate-800">
                Recent civic issues
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Latest reports requiring operational
                review
              </p>
            </div>

            <div className="flex items-center gap-2">

              <button className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-50">
                <MoreHorizontal size={18} />
              </button>

              <Link
                to="/authority/issues"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Open issue queue
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          <div className="overflow-x-auto">
            <IssueTable
              issues={issues?.slice(0, 8) ?? []}
              loading={loading}
            />
          </div>

          {!loading && (
            <div className="border-t border-slate-100 p-4 text-center">
              <Link
                to="/authority/issues"
                className="text-sm font-semibold text-[#21634d] hover:text-[#143c2e]"
              >
                View complete issue queue
              </Link>
            </div>
          )}
        </section>

        {/* ------------------------------------------------ */}
        {/* FOOTER INFO */}
        {/* ------------------------------------------------ */}

        <div className="mt-6 flex flex-col gap-2 rounded-xl border border-slate-200 bg-white px-5 py-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">

          <span>
            AccessPath AI · Civic operations
          </span>

          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Data updated from current system
          </span>
        </div>
      </div>
    </div>
  );
};

/* ====================================================== */
/* QUICK ACTION */
/* ====================================================== */

const QuickAction = ({
  icon,
  title,
  description,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}) => {
  return (
    <Link
      to={href}
      className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
    >
      <div className="flex items-start justify-between">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8f2ed] text-[#21634d]">
          {icon}
        </div>

        <ArrowRight
          size={17}
          className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-[#21634d]"
        />
      </div>

      <h3 className="mt-4 text-sm font-semibold text-slate-800">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {description}
      </p>
    </Link>
  );
};

export default AuthorityDashboard;