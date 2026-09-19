import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  FileText,
  MapPin,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { Link, useParams } from "react-router-dom";

import {
  type ReactNode,
  useEffect,
  useState,
} from "react";

import useReports from "../../hooks/useReports";

import StatusTimeline from "../../components/reports/StatusTimeline";
import SeverityBadge from "../../components/reports/SeverityBadge";
import ConfidenceBadge from "../../components/reports/ConfidenceBadge";

import BeforeAfter from "../../components/verification/BeforeAfter";
import VerificationPanel from "../../components/verification/VerificationPanel";

const ReportDetail = () => {
  const { id } = useParams<{ id: string }>();

  const {
    selectedReport,
    loading,
    fetchReport,
  } = useReports({
    autoFetch: false,
  });

  const [activeImage, setActiveImage] =
    useState<"original" | "resolution">("original");

  useEffect(() => {
    if (id) {
      fetchReport(id);
    }
  }, [id, fetchReport]);

  if (loading) {
    return <LoadingState />;
  }

  if (!selectedReport) {
    return <NotFoundState />;
  }

  const report = selectedReport;

  return (
    <div className="min-h-screen bg-[#f6f8f7] px-4 py-6 md:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Back */}
        <Link
          to="/my-reports"
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-[#21634d]"
        >
          <ArrowLeft size={16} />
          Back to my reports
        </Link>

        {/* Header */}
        <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[#e8f2ed] px-3 py-1 text-xs font-bold text-[#21634d]">
                {report.civicIssueId || report.id}
              </span>

              <StatusBadge status={report.status} />
            </div>

            <h1 className="mt-3 text-2xl font-bold tracking-tight text-[#10231d] md:text-3xl">
              {report.title}
            </h1>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
              {report.description ||
                "No additional description was provided."}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck size={15} />
            Citizen report
          </div>
        </div>

        {/* Main */}
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">

          {/* LEFT */}
          <div className="space-y-6">

            {/* Evidence */}
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                <div>
                  <h2 className="font-semibold text-slate-800">
                    Evidence
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Images associated with this report
                  </p>
                </div>

                <div className="flex rounded-lg bg-slate-100 p-1">
                  <button
                    type="button"
                    onClick={() => setActiveImage("original")}
                    className={`rounded-md px-3 py-1.5 text-xs font-semibold ${
                      activeImage === "original"
                        ? "bg-white text-slate-800 shadow-sm"
                        : "text-slate-500"
                    }`}
                  >
                    Original
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveImage("resolution")}
                    className={`rounded-md px-3 py-1.5 text-xs font-semibold ${
                      activeImage === "resolution"
                        ? "bg-white text-slate-800 shadow-sm"
                        : "text-slate-500"
                    }`}
                  >
                    Resolution
                  </button>
                </div>
              </div>

              <div className="bg-slate-50">
                {activeImage === "original" ? (
                  report.imageUrl ? (
                    <img
                      src={report.imageUrl}
                      alt={report.title}
                      className="max-h-[520px] w-full object-contain"
                    />
                  ) : (
                    <ImagePlaceholder />
                  )
                ) : report.resolutionImageUrl ? (
                  <img
                    src={report.resolutionImageUrl}
                    alt="Resolution evidence"
                    className="max-h-[520px] w-full object-contain"
                  />
                ) : (
                  <div className="flex min-h-[300px] items-center justify-center px-6 text-center">
                    <div>
                      <Clock3
                        size={30}
                        className="mx-auto text-slate-300"
                      />

                      <p className="mt-3 font-semibold text-slate-700">
                        Resolution evidence not available yet
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        A before/after image will appear here
                        when the issue is resolved.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* AI Assessment */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-semibold text-slate-800">
                    AI assessment
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Analysis generated from submitted evidence
                  </p>
                </div>

                <ConfidenceBadge
                  confidence={report.confidence || 0}
                />
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <InfoBox
                  label="Category"
                  value={report.category || "Not identified"}
                />

                <InfoBox
                  label="Issue type"
                  value={report.issueType || "Not identified"}
                />

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Severity
                  </p>

                  <div className="mt-2">
                    <SeverityBadge severity={report.severity} />
                  </div>
                </div>

                <InfoBox
                  label="Accessibility impact"
                  value={
                    report.accessibilityImpact ||
                    "Not identified"
                  }
                />
              </div>
            </section>

            {/* Location */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e8f2ed] text-[#21634d]">
                  <MapPin size={18} />
                </div>

                <div>
                  <h2 className="font-semibold text-slate-800">
                    Issue location
                  </h2>

                  <p className="text-xs text-slate-500">
                    Location associated with this report
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-medium text-slate-700">
                  {report.location?.address ||
                    "Location recorded"}
                </p>

                <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-500">
                  <span>
                    Latitude:{" "}
                    {report.location?.latitude ?? "—"}
                  </span>

                  <span>
                    Longitude:{" "}
                    {report.location?.longitude ?? "—"}
                  </span>
                </div>
              </div>
            </section>

            {/* Complaint */}
            {report.complaint && (
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                    <FileText size={18} />
                  </div>

                  <div>
                    <h2 className="font-semibold text-slate-800">
                      Submitted complaint
                    </h2>

                    <p className="text-xs text-slate-500">
                      AI-assisted report description
                    </p>
                  </div>
                </div>

                <div className="mt-5 rounded-xl bg-slate-50 p-5">
                  <p className="text-sm leading-7 text-slate-600">
                    {report.complaint}
                  </p>
                </div>
              </section>
            )}

            {/* Verification */}
            {report.status === "RESOLVED" ||
            report.status === "VERIFICATION" ||
            report.status === "CLOSED" ? (
              <>
                <BeforeAfter
                  beforeImage={report.imageUrl}
                  afterImage={report.resolutionImageUrl}
                />

                <VerificationPanel
                  reportId={report.id}
                />
              </>
            ) : null}
          </div>

          {/* RIGHT */}
          <aside className="space-y-6">

            {/* Status */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="font-semibold text-slate-800">
                Report status
              </h2>

              <div className="mt-5">
                <StatusTimeline status={report.status} />
              </div>
            </section>

            {/* Metadata */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="font-semibold text-slate-800">
                Report details
              </h2>

              <div className="mt-5 space-y-4">
                <MetaRow
                  icon={<CalendarDays size={16} />}
                  label="Submitted"
                  value={
                    report.createdAt
                      ? new Date(
                          report.createdAt
                        ).toLocaleDateString(
                          "en-IN",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )
                      : "—"
                  }
                />

                <MetaRow
                  icon={<UserRound size={16} />}
                  label="Submitted by"
                  value="You"
                />

                <MetaRow
                  icon={<MapPin size={16} />}
                  label="City"
                  value={
                    report.location?.city || "—"
                  }
                />

                <MetaRow
                  icon={<ShieldCheck size={16} />}
                  label="Visibility"
                  value="Civic information only"
                />
              </div>
            </section>

            {/* Department */}
            {report.department && (
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Responsible department
                </p>

                <h3 className="mt-2 font-semibold text-slate-800">
                  {report.department.name}
                </h3>

                {report.department.description && (
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {report.department.description}
                  </p>
                )}
              </section>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
};

/* =========================
   STATUS BADGE
========================= */

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
    VERIFICATION: "bg-orange-50 text-orange-700",
    CLOSED: "bg-green-50 text-green-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-[11px] font-bold ${
        styles[status] ||
        "bg-slate-100 text-slate-600"
      }`}
    >
      {status}
    </span>
  );
};

/* =========================
   INFO BOX
========================= */

const InfoBox = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-2 text-sm font-semibold text-slate-700">
        {value}
      </p>
    </div>
  );
};

/* =========================
   META ROW
========================= */

const MetaRow = ({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) => {
  return (
    <div className="flex gap-3">
      <div className="mt-0.5 text-slate-400">
        {icon}
      </div>

      <div>
        <p className="text-xs text-slate-400">
          {label}
        </p>

        <p className="mt-0.5 text-sm font-medium text-slate-700">
          {value}
        </p>
      </div>
    </div>
  );
};

/* =========================
   IMAGE PLACEHOLDER
========================= */

const ImagePlaceholder = () => {
  return (
    <div className="flex min-h-[300px] items-center justify-center">
      <div className="text-center">
        <FileText
          size={35}
          className="mx-auto text-slate-300"
        />

        <p className="mt-3 text-sm font-medium text-slate-500">
          No image available
        </p>
      </div>
    </div>
  );
};

/* =========================
   LOADING
========================= */

const LoadingState = () => {
  return (
    <div className="min-h-screen bg-[#f6f8f7] px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl space-y-5">
        <div className="h-5 w-28 animate-pulse rounded bg-slate-200" />

        <div className="h-9 w-2/3 animate-pulse rounded bg-slate-200" />

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="h-[500px] animate-pulse rounded-2xl bg-slate-200" />

          <div className="space-y-5">
            <div className="h-64 animate-pulse rounded-2xl bg-slate-200" />
            <div className="h-52 animate-pulse rounded-2xl bg-slate-200" />
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================
   NOT FOUND
========================= */

const NotFoundState = () => {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-[#f6f8f7] px-5">
      <div className="text-center">
        <FileText
          size={45}
          className="mx-auto text-slate-300"
        />

        <h1 className="mt-4 text-xl font-bold text-slate-800">
          Report not found
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          This report may have been removed or you may not
          have permission to view it.
        </p>

        <Link
          to="/my-reports"
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#143c2e] px-5 py-3 text-sm font-semibold text-white"
        >
          <ArrowLeft size={16} />
          Back to reports
        </Link>
      </div>
    </div>
  );
};

export default ReportDetail;