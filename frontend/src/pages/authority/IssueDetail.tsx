import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import StatusTimeline from "../../components/reports/StatusTimeline";
import { ResolutionEvidence } from "../../components/verification/ResolutionEvidence";
import useReports from "../../hooks/useReports";
import type { CivicReport } from "../../api/reports.api";

export default function IssueDetail() {
  const { id } = useParams<{ id: string }>();

  const { fetchReport, loading } = useReports({
    autoFetch: false,
  });

  const [report, setReport] = useState<CivicReport | null>(null);

  useEffect(() => {
    if (!id) return;

    const loadReport = async () => {
      const data = await fetchReport(id);
      setReport(data);
    };

    loadReport();
  }, [id, fetchReport]);

  if (loading) {
    return (
      <div className="ap-container ap-section">
        <p className="ap-muted">
          Loading issue...
        </p>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="ap-container ap-section">
        <div className="ap-eyebrow">
          AUTHORITY · ISSUE DETAIL
        </div>

        <h1>Issue not found</h1>

        <p className="ap-muted">
          The requested civic issue could not be loaded.
        </p>

        <Link
          to="/authority/issues"
          className="mt-4 inline-block"
        >
          ← Back to issues
        </Link>
      </div>
    );
  }

  const severity = String(
    report.severity ?? "MEDIUM"
  ).toLowerCase();

  return (
    <div className="ap-container ap-section">

      <div className="ap-eyebrow">
        AUTHORITY · ISSUE DETAIL
      </div>

      <h1>
        {report.civicIssueId || report.id}
      </h1>

      <div className="ap-grid ap-grid-2">

        {/* Issue Information */}
        <div className="ap-card">

          <h3>
            {report.title || "Civic Issue"}
          </h3>

          <p className="ap-muted">
            {report.category || "Other"} ·{" "}
            {severity} priority
          </p>

          {report.description && (
            <p className="mt-4">
              {report.description}
            </p>
          )}

          {report.location && (
            <div className="mt-4">
              <p className="text-sm font-medium">
                Location
              </p>

              <p className="ap-muted">
                {report.location.address ||
                  "Location not available"}
              </p>
            </div>
          )}

          <div className="mt-5">
            <StatusTimeline
              status={
                report.status || "REPORTED"
              }
            />
          </div>

        </div>

        {/* Resolution */}
        <ResolutionEvidence />

      </div>
    </div>
  );
}