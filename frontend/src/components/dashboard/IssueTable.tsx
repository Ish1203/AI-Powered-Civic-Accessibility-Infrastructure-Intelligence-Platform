import React from "react";
import { ArrowUpRight, MoreHorizontal, MapPin } from "lucide-react";
import Badge from "../common/Badge";

export interface IssueRow {
  id: string;
  title: string;
  category: string;
  location: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  status: "Reported" | "AI Verified" | "Assigned" | "In Progress" | "Resolved";
  date: string;
}

interface IssueTableProps {
  issues: IssueRow[];
  onOpen?: (issue: IssueRow) => void;
}

const severityTone = {
  Low: "green",
  Medium: "blue",
  High: "amber",
  Critical: "red",
} as const;

const statusTone = {
  Reported: "neutral",
  "AI Verified": "blue",
  Assigned: "purple",
  "In Progress": "amber",
  Resolved: "green",
} as const;

export default function IssueTable({ issues, onOpen }: IssueTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left">
          <thead className="border-b border-slate-100 bg-slate-50/70">
            <tr>
              {["Issue", "Location", "Severity", "Status", "Reported", ""].map(h => (
                <th key={h} className="px-5 py-3 text-[10px] font-extrabold uppercase tracking-[0.08em] text-slate-400">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {issues.map(issue => (
              <tr key={issue.id} className="group transition hover:bg-slate-50/70">
                <td className="px-5 py-4">
                  <button onClick={() => onOpen?.(issue)} className="text-left">
                    <p className="text-sm font-bold text-slate-900 group-hover:text-blue-700">{issue.title}</p>
                    <p className="mt-1 text-[11px] font-medium text-slate-400">
                      {issue.id} · {issue.category}
                    </p>
                  </button>
                </td>
                <td className="px-5 py-4">
                  <div className="flex max-w-[210px] items-center gap-1.5 text-xs text-slate-500">
                    <MapPin size={13} className="shrink-0 text-slate-400" />
                    <span className="truncate">{issue.location}</span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <Badge tone={severityTone[issue.severity]} dot>{issue.severity}</Badge>
                </td>
                <td className="px-5 py-4">
                  <Badge tone={statusTone[issue.status]}>{issue.status}</Badge>
                </td>
                <td className="px-5 py-4 text-xs font-medium text-slate-500">{issue.date}</td>
                <td className="px-5 py-4">
                  <button
                    onClick={() => onOpen?.(issue)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-white hover:text-slate-800 hover:shadow-sm"
                    aria-label={`Open ${issue.id}`}
                  >
                    <ArrowUpRight size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!issues.length && (
        <div className="p-10 text-center text-sm text-slate-400">No issues match the current filters.</div>
      )}
    </div>
  );
}
