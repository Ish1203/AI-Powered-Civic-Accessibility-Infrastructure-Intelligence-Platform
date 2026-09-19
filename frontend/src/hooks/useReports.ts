import { useCallback, useEffect, useState } from "react";

import {
  reportsApi,
  type AIAnalysis,
  type CivicReport,
  type CreateReportPayload,
  type ReportFilters,
} from "../api/reports.api";

interface UseReportsOptions {
  filters?: ReportFilters;
  autoFetch?: boolean;
}

export const useReports = ({
  filters,
  autoFetch = true,
}: UseReportsOptions = {}) => {
  const [reports, setReports] = useState<CivicReport[]>([]);
  const [selectedReport, setSelectedReport] =
    useState<CivicReport | null>(null);

  const [analysis, setAnalysis] =
    useState<AIAnalysis | null>(null);

  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [creating, setCreating] = useState(false);

  const [error, setError] = useState<string | null>(null);

  // -------------------------------
  // Fetch all reports
  // -------------------------------

  const fetchReports = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await reportsApi.getAll(filters);

      console.log("REPORTS API RESPONSE:", data);

      // Handle different backend response formats
      let reportList: CivicReport[] = [];

      if (Array.isArray(data)) {
        reportList = data;
      } else if (
        Array.isArray((data as any)?.reports)
      ) {
        reportList = (data as any).reports;
      } else if (
        Array.isArray((data as any)?.data)
      ) {
        reportList = (data as any).data;
      }

      setReports(reportList);
    } catch (err) {
      console.error("Failed to fetch reports:", err);

      setReports([]);

      setError(
        "Unable to load reports. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // -------------------------------
  // Fetch single report
  // -------------------------------

  const fetchReport = useCallback(
    async (id: string) => {
      setLoading(true);
      setError(null);

      try {
        const report = await reportsApi.getById(id);

        setSelectedReport(report);

        return report;
      } catch (err) {
        console.error(
          "Failed to fetch report:",
          err
        );

        setError("Unable to load this report.");

        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // -------------------------------
  // AI analysis
  // -------------------------------

  const analyzeReport = useCallback(
    async (payload: CreateReportPayload) => {
      setAnalyzing(true);
      setError(null);
      setAnalysis(null);

      try {
        const result =
          await reportsApi.analyze(payload);

        setAnalysis(result);

        return result;
      } catch (err) {
        console.error(
          "AI analysis failed:",
          err
        );

        setError(
          "AI analysis failed. Please try again."
        );

        throw err;
      } finally {
        setAnalyzing(false);
      }
    },
    []
  );

  // -------------------------------
  // Create report
  // -------------------------------

  const createReport = useCallback(
    async (payload: CreateReportPayload) => {
      setCreating(true);
      setError(null);

      try {
        const report =
          await reportsApi.create(payload);

        console.log(
          "CREATED REPORT:",
          report
        );

        setReports((previous) => [
          report,
          ...previous,
        ]);

        setSelectedReport(report);

        return report;
      } catch (err) {
        console.error(
          "Failed to create report:",
          err
        );

        setError(
          "Unable to create your report."
        );

        throw err;
      } finally {
        setCreating(false);
      }
    },
    []
  );

  // -------------------------------
  // Submit report
  // -------------------------------

  const submitReport = useCallback(
    async (id: string) => {
      setLoading(true);
      setError(null);

      try {
        const submitted =
          await reportsApi.submit(id);

        setReports((previous) =>
          previous.map((report) =>
            report.id === id
              ? submitted
              : report
          )
        );

        setSelectedReport(submitted);

        return submitted;
      } catch (err) {
        console.error(
          "Failed to submit report:",
          err
        );

        setError(
          "Unable to submit the report."
        );

        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // -------------------------------
  // Update report
  // -------------------------------

  const updateReport = useCallback(
    async (
      id: string,
      payload: Partial<CivicReport>
    ) => {
      setLoading(true);
      setError(null);

      try {
        const updated =
          await reportsApi.update(
            id,
            payload
          );

        setReports((previous) =>
          previous.map((report) =>
            report.id === id
              ? updated
              : report
          )
        );

        setSelectedReport((current) =>
          current?.id === id
            ? updated
            : current
        );

        return updated;
      } catch (err) {
        console.error(
          "Failed to update report:",
          err
        );

        setError(
          "Unable to update the report."
        );

        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // -------------------------------
  // Clear analysis
  // -------------------------------

  const clearAnalysis = useCallback(() => {
    setAnalysis(null);
  }, []);

  // -------------------------------
  // Clear selected report
  // -------------------------------

  const clearSelectedReport = useCallback(() => {
    setSelectedReport(null);
  }, []);

  // -------------------------------
  // Initial fetch
  // -------------------------------

  useEffect(() => {
    if (autoFetch) {
      fetchReports();
    }
  }, [autoFetch, fetchReports]);

  // -------------------------------
  // Derived values
  // -------------------------------

  const totalReports = reports.length;

  const resolvedReports = reports.filter(
    (report) =>
      report.status === "RESOLVED" ||
      report.status === "CLOSED"
  ).length;

  const pendingReports = reports.filter(
    (report) =>
      report.status !== "RESOLVED" &&
      report.status !== "CLOSED"
  ).length;

  const criticalReports = reports.filter(
    (report) =>
      report.severity === "CRITICAL"
  ).length;

  const accessibilityReports =
    reports.filter(
      (report) =>
        report.category
          ?.toLowerCase()
          .includes("accessibility")
    ).length;

  return {
    reports,
    selectedReport,
    analysis,

    loading,
    analyzing,
    creating,

    error,

    fetchReports,
    fetchReport,
    analyzeReport,
    createReport,
    submitReport,
    updateReport,

    clearAnalysis,
    clearSelectedReport,

    totalReports,
    resolvedReports,
    pendingReports,
    criticalReports,
    accessibilityReports,
  };
};

export default useReports;