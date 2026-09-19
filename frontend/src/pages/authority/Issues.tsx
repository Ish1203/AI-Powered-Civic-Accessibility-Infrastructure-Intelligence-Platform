import {
  AlertTriangle,
  ChevronRight,
  Filter,
  MapPin,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";

import useIssues from "../../hooks/useIssues";

const Issues = () => {
  const { issues = [], loading } = useIssues();

  const [search, setSearch] = useState("");
  const [severity, setSeverity] = useState("ALL");
  const [status, setStatus] = useState("ALL");
  const [category, setCategory] = useState("ALL");

  const filteredIssues = useMemo(() => {
    return issues.filter((issue: any) => {
      const query = search.toLowerCase();

      const matchesSearch =
        !query ||
        issue.title?.toLowerCase().includes(query) ||
        issue.issueType?.toLowerCase().includes(query) ||
        issue.civicIssueId?.toLowerCase().includes(query) ||
        issue.location?.address
          ?.toLowerCase()
          .includes(query);

      const matchesSeverity =
        severity === "ALL" ||
        issue.severity === severity;

      const matchesStatus =
        status === "ALL" ||
        issue.status === status;

      const matchesCategory =
        category === "ALL" ||
        issue.category === category;

      return (
        matchesSearch &&
        matchesSeverity &&
        matchesStatus &&
        matchesCategory
      );
    });
  }, [
    issues,
    search,
    severity,
    status,
    category,
  ]);

  const clearFilters = () => {
    setSearch("");
    setSeverity("ALL");
    setStatus("ALL");
    setCategory("ALL");
  };

  return (
    <div className="min-h-screen bg-[#f5f7f6] px-4 py-6 md:px-8">
      <div className="mx-auto max-w-[1500px]">

        {/* Header */}
        <div className="mb-7 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Link
              to="/authority/dashboard"
              className="text-sm font-medium text-slate-500 hover:text-[#21634d]"
            >
              ← Operations dashboard
            </Link>

            <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#14251f]">
              Issue queue
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Review, prioritize and assign reported civic
              issues.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <AlertTriangle
              size={17}
              className="text-amber-600"
            />

            <div>
              <p className="text-xs text-slate-400">
                Showing
              </p>
              <p className="text-sm font-bold text-slate-700">
                {filteredIssues.length} issues
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

          <div className="flex flex-col gap-3 xl:flex-row">

            <div className="relative flex-1">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search issue, ID, location..."
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:border-[#4c8c72] focus:bg-white focus:ring-2 focus:ring-[#dcece5]"
              />
            </div>

            <FilterSelect
              value={severity}
              onChange={setSeverity}
              options={[
                "ALL",
                "CRITICAL",
                "HIGH",
                "MEDIUM",
                "LOW",
              ]}
              label="Severity"
            />

            <FilterSelect
              value={status}
              onChange={setStatus}
              options={[
                "ALL",
                "REPORTED",
                "AI VERIFIED",
                "ASSIGNED",
                "IN PROGRESS",
                "RESOLVED",
                "VERIFICATION",
                "CLOSED",
              ]}
              label="Status"
            />

            <FilterSelect
              value={category}
              onChange={setCategory}
              options={[
                "ALL",
                "Accessibility",
                "Road & Infrastructure",
                "Cleanliness",
                "Public Space",
                "Pedestrian Safety",
              ]}
              label="Category"
            />

            {(search ||
              severity !== "ALL" ||
              status !== "ALL" ||
              category !== "ALL") && (
              <button
                onClick={clearFilters}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-600 hover:bg-slate-50"
              >
                <X size={15} />
                Clear
              </button>
            )}
          </div>

          <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
            <SlidersHorizontal size={14} />
            Filters update the issue queue instantly.
          </div>
        </div>

        {/* Table */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70 text-left">
                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-400">
                    Issue
                  </th>

                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-400">
                    Category
                  </th>

                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-400">
                    Location
                  </th>

                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-400">
                    Severity
                  </th>

                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-400">
                    Status
                  </th>

                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-400">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <LoadingRows />
                ) : filteredIssues.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-5 py-16 text-center"
                    >
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                        <Filter
                          size={20}
                          className="text-slate-400"
                        />
                      </div>

                      <p className="mt-4 font-semibold text-slate-700">
                        No issues found
                      </p>

                      <p className="mt-1 text-sm text-slate-400">
                        Try changing the current filters.
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredIssues.map((issue: any) => (
                    <IssueRow
                      key={issue.id}
                      issue={issue}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const IssueRow = ({
  issue,
}: {
  issue: any;
}) => {
  return (
    <tr className="group border-b border-slate-100 last:border-0 hover:bg-slate-50/60">

      <td className="px-5 py-4">
        <div className="flex items-center gap-3">

          <div className="h-12 w-12 overflow-hidden rounded-lg bg-slate-100">
            {issue.imageUrl ? (
              <img
                src={issue.imageUrl}
                alt=""
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-slate-300">
                <AlertTriangle size={18} />
              </div>
            )}
          </div>

          <div>
            <p className="max-w-[260px] truncate text-sm font-semibold text-slate-800">
              {issue.title ||
                issue.issueType ||
                "Civic issue"}
            </p>

            <p className="mt-1 font-mono text-[11px] text-slate-400">
              {issue.civicIssueId || issue.id}
            </p>
          </div>
        </div>
      </td>

      <td className="px-5 py-4">
        <span className="text-sm text-slate-600">
          {issue.category || "—"}
        </span>
      </td>

      <td className="px-5 py-4">
        <div className="flex max-w-[220px] gap-2">
          <MapPin
            size={15}
            className="mt-0.5 shrink-0 text-slate-400"
          />

          <span className="truncate text-sm text-slate-600">
            {issue.location?.address ||
              "Location unavailable"}
          </span>
        </div>
      </td>

      <td className="px-5 py-4">
        <Severity severity={issue.severity} />
      </td>

      <td className="px-5 py-4">
        <Status status={issue.status} />
      </td>

      <td className="px-5 py-4">
        <Link
          to={`/authority/issues/${issue.id}`}
          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 transition hover:border-[#b9d5c8] hover:bg-[#f2f8f5] hover:text-[#21634d]"
        >
          Details
          <ChevronRight size={14} />
        </Link>
      </td>
    </tr>
  );
};

const Severity = ({
  severity,
}: {
  severity?: string;
}) => {
  const styles: Record<string, string> = {
    CRITICAL:
      "bg-red-50 text-red-700 border-red-100",
    HIGH:
      "bg-orange-50 text-orange-700 border-orange-100",
    MEDIUM:
      "bg-amber-50 text-amber-700 border-amber-100",
    LOW:
      "bg-slate-100 text-slate-600 border-slate-200",
  };

  return (
    <span
      className={`rounded-full border px-2.5 py-1 text-[11px] font-bold ${
        styles[severity || ""] ||
        styles.LOW
      }`}
    >
      {severity || "UNKNOWN"}
    </span>
  );
};

const Status = ({
  status,
}: {
  status?: string;
}) => {
  return (
    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600">
      {status || "REPORTED"}
    </span>
  );
};

const FilterSelect = ({
  value,
  onChange,
  options,
  label,
}: {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  label: string;
}) => {
  return (
    <select
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
      aria-label={label}
      className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-medium text-slate-600 outline-none focus:border-[#4c8c72]"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option === "ALL"
            ? `All ${label}`
            : option}
        </option>
      ))}
    </select>
  );
};

const LoadingRows = () => {
  return (
    <>
      {Array.from({ length: 6 }).map((_, index) => (
        <tr key={index}>
          {Array.from({ length: 6 }).map(
            (_, cell) => (
              <td
                key={cell}
                className="px-5 py-5"
              >
                <div className="h-4 animate-pulse rounded bg-slate-100" />
              </td>
            )
          )}
        </tr>
      ))}
    </>
  );
};

export default Issues;