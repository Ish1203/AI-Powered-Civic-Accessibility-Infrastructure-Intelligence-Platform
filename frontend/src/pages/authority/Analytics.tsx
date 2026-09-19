import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  BarChart3,
  CheckCircle2,
  Clock3,
  MapPin,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";

import useIssues from "../../hooks/useIssues";

const Analytics = () => {
  const { issues = [], loading } =
    useIssues();

  const total = issues.length;

  const resolved = issues.filter(
    (x: any) =>
      x.status === "RESOLVED" ||
      x.status === "CLOSED"
  ).length;

  const critical = issues.filter(
    (x: any) =>
      x.severity === "CRITICAL"
  ).length;

  const accessibility = issues.filter(
    (x: any) =>
      x.category === "Accessibility"
  ).length;

  const categories = [
    "Accessibility",
    "Road & Infrastructure",
    "Cleanliness",
    "Public Space",
    "Pedestrian Safety",
  ];

  return (
    <div className="min-h-screen bg-[#f5f7f6] px-4 py-6 md:px-8">
      <div className="mx-auto max-w-[1400px]">

        <Link
          to="/authority/dashboard"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-[#21634d]"
        >
          <ArrowLeft size={16} />
          Operations dashboard
        </Link>

        <div className="mt-5">
          <p className="text-sm font-semibold text-[#21634d]">
            Civic intelligence
          </p>

          <h1 className="mt-1 text-3xl font-bold text-[#14251f]">
            Analytics & insights
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Understand where civic problems are recurring,
            which issues require attention and how the
            resolution pipeline is performing.
          </p>
        </div>

        {/* KPI */}
        <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <Metric
            icon={<Activity size={19} />}
            label="Total reports"
            value={total}
            note="All reported issues"
          />

          <Metric
            icon={<AlertTriangle size={19} />}
            label="Critical"
            value={critical}
            note="High priority review"
          />

          <Metric
            icon={<CheckCircle2 size={19} />}
            label="Resolved"
            value={resolved}
            note="Resolved or closed"
          />

          <Metric
            icon={<MapPin size={19} />}
            label="Accessibility"
            value={accessibility}
            note="Accessibility-related"
          />
        </div>

        {/* Charts */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">

          {/* Category */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-slate-800">
                  Reports by category
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Distribution of observed civic issues
                </p>
              </div>

              <BarChart3
                size={19}
                className="text-[#21634d]"
              />
            </div>

            <div className="mt-7 space-y-5">
              {categories.map(
                (category) => {
                  const count =
                    issues.filter(
                      (x: any) =>
                        x.category === category
                    ).length;

                  const percentage =
                    total > 0
                      ? Math.round(
                          (count / total) * 100
                        )
                      : 0;

                  return (
                    <div key={category}>

                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-600">
                          {category}
                        </span>

                        <span className="text-xs font-bold text-slate-400">
                          {count}
                        </span>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-[#4c8c72] transition-all"
                          style={{
                            width: `${Math.max(
                              percentage,
                              count > 0 ? 4 : 0
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </section>

          {/* Status */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-slate-800">
                  Resolution pipeline
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Current distribution across workflow stages
                </p>
              </div>

              <TrendingUp
                size={19}
                className="text-[#21634d]"
              />
            </div>

            <div className="mt-7 space-y-3">

              {[
                ["REPORTED", "Reported"],
                ["AI VERIFIED", "AI verified"],
                ["ASSIGNED", "Assigned"],
                ["IN PROGRESS", "In progress"],
                ["RESOLVED", "Resolved"],
                ["CLOSED", "Closed"],
              ].map(
                ([status, label]) => {
                  const count =
                    issues.filter(
                      (x: any) =>
                        x.status === status
                    ).length;

                  return (
                    <div
                      key={status}
                      className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <span className="h-2 w-2 rounded-full bg-[#5e987e]" />

                        <span className="text-sm font-medium text-slate-600">
                          {label}
                        </span>
                      </div>

                      <span className="text-sm font-bold text-slate-800">
                        {count}
                      </span>
                    </div>
                  );
                }
              )}
            </div>
          </section>
        </div>

        {/* Insights */}
        <section className="mt-6 grid gap-4 md:grid-cols-3">

          <Insight
            icon={<AlertTriangle size={18} />}
            title="Priority monitoring"
            text={
              critical > 0
                ? `${critical} critical issue(s) currently require operational review.`
                : "No critical issues are currently present in the loaded data."
            }
          />

          <Insight
            icon={<Clock3 size={18} />}
            title="Resolution workflow"
            text="Track unresolved reports from assignment through resolution and citizen verification."
          />

          <Insight
            icon={<MapPin size={18} />}
            title="Location intelligence"
            text="Use the civic map to identify recurring areas and investigate potential hotspots."
          />
        </section>

        {/* Data note */}
        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4 text-xs leading-5 text-slate-500">
          <strong className="text-slate-700">
            Analytics note:
          </strong>{" "}
          These figures are calculated from the currently
          loaded issue records. They are operational insights,
          not official government statistics.
        </div>
      </div>
    </div>
  );
};

const Metric = ({
  icon,
  label,
  value,
  note,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  note: string;
}) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <div className="flex items-center justify-between">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8f2ed] text-[#21634d]">
        {icon}
      </div>

      <span className="text-xs font-medium text-slate-400">
        Live data
      </span>
    </div>

    <p className="mt-5 text-3xl font-bold text-slate-800">
      {value.toLocaleString()}
    </p>

    <p className="mt-1 text-sm font-semibold text-slate-700">
      {label}
    </p>

    <p className="mt-1 text-xs text-slate-400">
      {note}
    </p>
  </div>
);

const Insight = ({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e8f2ed] text-[#21634d]">
      {icon}
    </div>

    <h3 className="mt-4 text-sm font-bold text-slate-800">
      {title}
    </h3>

    <p className="mt-2 text-sm leading-6 text-slate-500">
      {text}
    </p>
  </div>
);

export default Analytics;