import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  MapPin,
  Search,
  Users,
} from "lucide-react";

import { Link, useSearchParams } from "react-router-dom";

import {
  type ReactNode,
  useMemo,
  useState,
} from "react";

import useIssues from "../../hooks/useIssues";

const Assignments = () => {
  const { issues = [], loading } = useIssues();

  const [searchParams] = useSearchParams();
  const issueId = searchParams.get("issue");

  const [search, setSearch] = useState("");

  /* =========================
     FILTER PENDING ISSUES
  ========================= */

  const pending = useMemo(() => {
    return issues.filter((issue: any) => {
      const searchText = search.toLowerCase();

      const matchSearch =
        !search ||
        issue.title
          ?.toLowerCase()
          .includes(searchText) ||
        issue.location?.address
          ?.toLowerCase()
          .includes(searchText);

      const matchIssue =
        !issueId || issue.id === issueId;

      return (
        matchSearch &&
        matchIssue &&
        !["RESOLVED", "CLOSED"].includes(
          issue.status
        )
      );
    });
  }, [issues, search, issueId]);

  return (
    <div className="min-h-screen bg-[#f5f7f6] px-4 py-6 md:px-8">
      <div className="mx-auto max-w-[1300px]">

        {/* =========================
            HEADER
        ========================= */}

        <div className="mb-7">
          <Link
            to="/authority"
            className="text-sm text-slate-500 hover:text-[#21634d]"
          >
            ← Operations dashboard
          </Link>

          <h1 className="mt-3 text-3xl font-bold text-[#14251f]">
            Assignments
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Route civic issues to the appropriate department
            or operational team.
          </p>
        </div>

        {/* =========================
            SUMMARY
        ========================= */}

        <div className="grid gap-4 sm:grid-cols-3">

          <Summary
            icon={<ClipboardList size={19} />}
            label="Open issues"
            value={pending.length}
          />

          <Summary
            icon={<Users size={19} />}
            label="Active teams"
            value="8"
          />

          <Summary
            icon={<CheckCircle2 size={19} />}
            label="Assigned today"
            value="24"
          />

        </div>

        {/* =========================
            SEARCH
        ========================= */}

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="relative">

            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search issues to assign..."
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:border-[#4c8c72] focus:bg-white"
            />

          </div>
        </div>

        {/* =========================
            ASSIGNMENT QUEUE
        ========================= */}

        <div className="mt-6 space-y-3">

          {/* Loading */}

          {loading ? (
            Array.from({ length: 5 }).map(
              (_, index) => (
                <div
                  key={index}
                  className="h-28 animate-pulse rounded-2xl bg-slate-200"
                />
              )
            )

          /* Empty */

          ) : pending.length === 0 ? (

            <div className="rounded-2xl border border-slate-200 bg-white p-14 text-center">

              <CheckCircle2
                size={35}
                className="mx-auto text-emerald-500"
              />

              <h3 className="mt-4 font-semibold text-slate-800">
                No pending assignments
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                The current queue has no unresolved matching
                issues.
              </p>

            </div>

          /* Issues */

          ) : (

            pending.map((issue: any) => (
              <AssignmentCard
                key={issue.id}
                issue={issue}
              />
            ))

          )}

        </div>
      </div>
    </div>
  );
};

/* =====================================================
   ASSIGNMENT CARD
===================================================== */

const AssignmentCard = ({
  issue,
}: {
  issue: any;
}) => {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md">

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center">

        {/* IMAGE */}

        <div className="h-20 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-100">

          {issue.imageUrl ? (

            <img
              src={issue.imageUrl}
              alt={issue.title || "Civic issue"}
              className="h-full w-full object-cover"
            />

          ) : (

            <div className="flex h-full items-center justify-center text-slate-300">
              <ClipboardList size={22} />
            </div>

          )}

        </div>

        {/* ISSUE INFO */}

        <div className="min-w-0 flex-1">

          <div className="flex flex-wrap items-center gap-2">

            <span className="font-mono text-xs text-slate-400">
              {issue.civicIssueId || issue.id}
            </span>

            <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-bold text-amber-700">
              {issue.severity || "MEDIUM"}
            </span>

            {issue.status && (
              <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-blue-700">
                {issue.status}
              </span>
            )}

          </div>

          <h3 className="mt-2 truncate font-semibold text-slate-800">
            {issue.title ||
              issue.issueType ||
              "Civic issue"}
          </h3>

          <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">

            <MapPin size={14} />

            <span className="truncate">
              {issue.location?.address ||
                "Location unavailable"}
            </span>

          </div>

        </div>

        {/* ACTIONS */}

        <div className="flex shrink-0 gap-2">

          <Link
            to={`/authority/issues/${issue.id}`}
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Review
          </Link>

          <Link
            to={`/authority/assignments?issue=${issue.id}`}
            className="inline-flex items-center gap-2 rounded-xl bg-[#143c2e] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0e3025]"
          >
            Assign

            <ArrowRight size={15} />

          </Link>

        </div>

      </div>
    </div>
  );
};

/* =====================================================
   SUMMARY CARD
===================================================== */

const Summary = ({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string | number;
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8f2ed] text-[#21634d]">
          {icon}
        </div>

        <div>

          <p className="text-xs text-slate-400">
            {label}
          </p>

          <p className="mt-1 text-xl font-bold text-slate-800">
            {value}
          </p>

        </div>

      </div>

    </div>
  );
};

export default Assignments;