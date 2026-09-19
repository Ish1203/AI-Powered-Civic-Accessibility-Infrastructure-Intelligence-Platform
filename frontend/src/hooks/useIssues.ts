import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  issuesApi,
  type IssueFilters,
} from "../api/issues.api";

import type {
  CivicReport,
  ReportStatus,
} from "../api/reports.api";

export const useIssues = (
  filters?: IssueFilters
) => {
  const [issues, setIssues] =
    useState<CivicReport[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const fetchIssues = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data =
        await issuesApi.getAll(filters);

      setIssues(data);
    } catch {
      setError(
        "Unable to load civic issues."
      );
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(filters)]);

  useEffect(() => {
    fetchIssues();
  }, [fetchIssues]);

  const assignIssue = async (
    id: string,
    departmentId: string,
    officerId?: string
  ) => {
    const result =
      await issuesApi.assign(id, {
        departmentId,
        officerId,
      });

    await fetchIssues();

    return result;
  };

  const updateStatus = async (
    id: string,
    status: ReportStatus
  ) => {
    const result =
      await issuesApi.updateStatus(
        id,
        status
      );

    await fetchIssues();

    return result;
  };

  const resolveIssue = async (
    id: string,
    description: string,
    evidence?: File
  ) => {
    const result =
      await issuesApi.addResolution(id, {
        description,
        evidence,
      });

    await fetchIssues();

    return result;
  };

  return {
    issues,
    loading,
    error,
    refetch: fetchIssues,
    assignIssue,
    updateStatus,
    resolveIssue,
  };
};

export default useIssues;