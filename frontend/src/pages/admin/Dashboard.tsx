import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Building2,
  CheckCircle2,
  ClipboardList,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const stats = [
    {
      label: "Total users",
      value: "1,284",
      icon: Users,
      note: "+12.4% this month",
    },
    {
      label: "Active departments",
      value: "8",
      icon: Building2,
      note: "All operational",
    },
    {
      label: "Total issues",
      value: "3,842",
      icon: ClipboardList,
      note: "Across all categories",
    },
    {
      label: "Open critical",
      value: "17",
      icon: AlertTriangle,
      note: "Requires review",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f7f6] px-4 py-6 md:px-8">
      <div className="mx-auto max-w-[1500px]">

        {/* Header */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-[#21634d]">
              Administration
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight text-[#14251f]">
              System overview
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Manage AccessPath AI users, departments, issue
              categories and system activity from one place.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <ShieldCheck
              size={17}
              className="text-[#21634d]"
            />

            <div>
              <p className="text-xs text-slate-400">
                System status
              </p>
              <p className="text-sm font-bold text-emerald-700">
                Operational
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <StatCard
              key={stat.label}
              {...stat}
            />
          ))}
        </div>

        {/* Main */}
        <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_380px]">

          {/* Activity */}
          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div>
                <h2 className="font-semibold text-slate-800">
                  Recent system activity
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  Latest administrative events
                </p>
              </div>

              <Link
                to="/admin/audit-logs"
                className="text-xs font-bold text-[#21634d] hover:underline"
              >
                View audit logs
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              <ActivityRow
                icon={<Users size={16} />}
                title="New authority account created"
                detail="Municipal Operations Department"
                time="12 minutes ago"
              />

              <ActivityRow
                icon={<Building2 size={16} />}
                title="Department updated"
                detail="Public Works Department"
                time="48 minutes ago"
              />

              <ActivityRow
                icon={<ClipboardList size={16} />}
                title="Issue category configuration changed"
                detail="Pedestrian Safety"
                time="2 hours ago"
              />

              <ActivityRow
                icon={<ShieldCheck size={16} />}
                title="Authority permissions updated"
                detail="Operations Supervisor"
                time="4 hours ago"
              />
            </div>
          </section>

          {/* Quick actions */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <h2 className="font-semibold text-slate-800">
              Administration
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Common management actions
            </p>

            <div className="mt-5 space-y-2">
              <QuickAction
                to="/admin/users"
                icon={<Users size={18} />}
                title="Manage users"
                description="Roles and account access"
              />

              <QuickAction
                to="/admin/departments"
                icon={<Building2 size={18} />}
                title="Departments"
                description="Routing and ownership"
              />

              <QuickAction
                to="/admin/categories"
                icon={<ClipboardList size={18} />}
                title="Issue categories"
                description="Configure civic taxonomy"
              />

              <QuickAction
                to="/admin/audit-logs"
                icon={<Activity size={18} />}
                title="Audit logs"
                description="Review system actions"
              />
            </div>
          </section>
        </div>

        {/* Health */}
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8f2ed] text-[#21634d]">
              <Activity size={19} />
            </div>

            <div>
              <h2 className="font-semibold text-slate-800">
                Platform health
              </h2>

              <p className="text-xs text-slate-400">
                Current service indicators
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <HealthItem
              name="API"
              status="Operational"
            />

            <HealthItem
              name="Database"
              status="Operational"
            />

            <HealthItem
              name="Image storage"
              status="Operational"
            />

            <HealthItem
              name="AI inference"
              status="Operational"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

const StatCard = ({
  label,
  value,
  icon: Icon,
  note,
}: any) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <div className="flex items-center justify-between">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8f2ed] text-[#21634d]">
        <Icon size={19} />
      </div>

      <span className="text-xs text-slate-400">
        Live
      </span>
    </div>

    <p className="mt-5 text-3xl font-bold text-slate-800">
      {value}
    </p>

    <p className="mt-1 text-sm font-semibold text-slate-700">
      {label}
    </p>

    <p className="mt-1 text-xs text-slate-400">
      {note}
    </p>
  </div>
);

const ActivityRow = ({
  icon,
  title,
  detail,
  time,
}: any) => (
  <div className="flex gap-4 px-5 py-4">
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
      {icon}
    </div>

    <div className="min-w-0 flex-1">
      <p className="text-sm font-semibold text-slate-700">
        {title}
      </p>

      <p className="mt-1 text-xs text-slate-400">
        {detail}
      </p>
    </div>

    <span className="shrink-0 text-xs text-slate-400">
      {time}
    </span>
  </div>
);

const QuickAction = ({
  to,
  icon,
  title,
  description,
}: any) => (
  <Link
    to={to}
    className="group flex items-center gap-3 rounded-xl border border-slate-100 p-3 transition hover:border-[#c9ded4] hover:bg-[#f5faf7]"
  >
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 group-hover:bg-[#e8f2ed] group-hover:text-[#21634d]">
      {icon}
    </div>

    <div className="min-w-0 flex-1">
      <p className="text-sm font-semibold text-slate-700">
        {title}
      </p>

      <p className="mt-0.5 text-xs text-slate-400">
        {description}
      </p>
    </div>

    <ArrowRight
      size={15}
      className="text-slate-300 group-hover:text-[#21634d]"
    />
  </Link>
);

const HealthItem = ({
  name,
  status,
}: any) => (
  <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
    <span className="text-sm font-medium text-slate-600">
      {name}
    </span>

    <span className="flex items-center gap-2 text-xs font-bold text-emerald-700">
      <span className="h-2 w-2 rounded-full bg-emerald-500" />
      {status}
    </span>
  </div>
);

export default Dashboard;