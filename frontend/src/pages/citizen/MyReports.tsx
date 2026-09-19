import {
  ArrowRight,
  Filter,
  MapPin,
  Search,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";

import useReports from "../../hooks/useReports";

const MyReports = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");

  const { reports, loading } = useReports();

  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      const matchesSearch =
        report.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        report.category
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        report.civicIssueId
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        status === "ALL" ||
        report.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [reports, search, status]);

  return (
    <div className="min-h-screen bg-[#f6f8f7] px-4 py-6 md:px-8">
      <div className="mx-auto max-w-7xl">

        <div className="mb-7">
          <p className="text-sm font-medium text-slate-500">
            Citizen portal
          </p>

          <h1 className="mt-1 text-2xl font-bold text-[#10231d]">
            My reports
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Follow the progress of every civic issue you have reported.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row">

            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search reports..."
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:border-[#4c8c72] focus:bg-white focus:ring-2 focus:ring-[#dcece5]"
              />
            </div>

            <div className="relative">
              <Filter
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value)
                }
                className="h-11 min-w-[190px] appearance-none rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-8 text-sm text-slate-700 outline-none focus:border-[#4c8c72] focus:ring-2 focus:ring-[#dcece5]"
              >
                <option value="ALL">
                  All statuses
                </option>
                <option value="REPORTED">
                  Reported
                </option>
                <option value="AI VERIFIED">
                  AI Verified
                </option>
                <option value="ASSIGNED">
                  Assigned
                </option>
                <option value="IN PROGRESS">
                  In Progress
                </option>
                <option value="RESOLVED">
                  Resolved
                </option>
                <option value="CLOSED">
                  Closed
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* Reports */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {loading ? (
            <div className="divide-y divide-slate-100">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="flex gap-4 p-5"
                >
                  <div className="h-20 w-20 animate-pulse rounded-xl bg-slate-100" />

                  <div className="flex-1 space-y-3">
                    <div className="h-4 w-1/2 animate-pulse rounded bg-slate-100" />
                    <div className="h-3 w-1/3 animate-pulse rounded bg-slate-100" />
                    <div className="h-3 w-2/3 animate-pulse rounded bg-slate-100" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredReports.length === 0 ? (
            <div className="px-5 py-16 text-center">
              <Search
                size={38}
                className="mx-auto text-slate-300"
              />

              <h3 className="mt-4 font-semibold text-slate-800">
                No reports found
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Try changing your search or filter.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filteredReports.map((report) => (
                <Link
                  key={report.id}
                  to={`/reports/${report.id}`}
                  className="group flex gap-4 p-5 transition hover:bg-slate-50"
                >
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                    {report.imageUrl ? (
                      <img
                        src={report.imageUrl}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <MapPin className="text-slate-400" />
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                      <div>
                        <h2 className="font-semibold text-slate-800 group-hover:text-[#21634d]">
                          {report.title}
                        </h2>

                        <p className="mt-1 text-xs text-slate-500">
                          {report.civicIssueId ||
                            report.id}
                        </p>
                      </div>

                      <StatusBadge
                        status={report.status}
                      />
                    </div>

                    <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-500">
                      <span>{report.category}</span>

                      <span>•</span>

                      <span>
                        {report.issueType}
                      </span>

                      {report.location.address && (
                        <>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MapPin size={12} />
                            {report.location.address}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <ArrowRight
                    size={18}
                    className="hidden self-center text-slate-300 group-hover:text-[#21634d] md:block"
                  />
                </Link>
              ))}
            </div>
          )}
        </div>
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
    REPORTED: "bg-slate-100 text-slate-700",
    "AI VERIFIED": "bg-blue-50 text-blue-700",
    ASSIGNED: "bg-purple-50 text-purple-700",
    "IN PROGRESS": "bg-amber-50 text-amber-700",
    RESOLVED: "bg-emerald-50 text-emerald-700",
    CLOSED: "bg-green-50 text-green-700",
  };

  return (
    <span
      className={`w-fit rounded-full px-2.5 py-1 text-[11px] font-semibold ${
        styles[status] ||
        "bg-slate-100 text-slate-600"
      }`}
    >
      {status}
    </span>
  );
};

export default MyReports;