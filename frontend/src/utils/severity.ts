import type { Severity } from "../types/reports";

export const severityOrder: Record<Severity, number> = {
  Critical: 4,
  High: 3,
  Medium: 2,
  Low: 1,
};

export const getSeverityColor = (
  severity: Severity
) => {
  switch (severity) {
    case "Critical":
      return "#dc2626";

    case "High":
      return "#ea580c";

    case "Medium":
      return "#d97706";

    case "Low":
      return "#64748b";

    default:
      return "#64748b";
  }
};

export const getSeverityClasses = (
  severity: Severity
) => {
  switch (severity) {
    case "Critical":
      return "bg-red-50 text-red-700 border-red-200";

    case "High":
      return "bg-orange-50 text-orange-700 border-orange-200";

    case "Medium":
      return "bg-amber-50 text-amber-700 border-amber-200";

    case "Low":
      return "bg-slate-50 text-slate-600 border-slate-200";

    default:
      return "bg-slate-50 text-slate-600 border-slate-200";
  }
};

export const getSeverityLabel = (
  severity: Severity
) => {
  return severity;
};

export const isCritical = (
  severity: Severity
) => {
  return severity === "Critical";
};