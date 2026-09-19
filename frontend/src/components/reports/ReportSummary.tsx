import React from "react";
import { FileText, MapPin, Send, ShieldCheck } from "lucide-react";
import Badge from "../common/Badge";
import Button from "../common/Button";

interface ReportSummaryProps {
  civicId?: string;
  issueType: string;
  location: string;
  department: string;
  severity: string;
  onEdit?: () => void;
  onSubmit?: () => void;
}

export default function ReportSummary({
  civicId,
  issueType,
  location,
  department,
  severity,
  onEdit,
  onSubmit,
}: ReportSummaryProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="border-b border-slate-100 bg-slate-50/70 p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-white">
            <FileText size={18} />
          </div>
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              Report ready
            </p>
            <h3 className="mt-0.5 text-base font-bold text-slate-950">
              {civicId || "New civic report"}
            </h3>
          </div>
        </div>
      </div>

      <div className="divide-y divide-slate-100">
        <Row label="Issue" value={issueType} />
        <Row label="Location" value={location} icon={<MapPin size={13} />} />
        <Row label="Department" value={department} />
        <Row label="Priority" value={<Badge tone={severity === "Critical" ? "red" : "amber"}>{severity}</Badge>} />
      </div>

      <div className="flex items-center gap-2 bg-emerald-50 p-4 text-[11px] font-semibold text-emerald-700">
        <ShieldCheck size={15} />
        Your report can be tracked from My Reports after submission.
      </div>

      <div className="flex justify-end gap-2 p-4">
        <Button variant="ghost" onClick={onEdit}>Edit</Button>
        <Button onClick={onSubmit} leftIcon={<Send size={14} />}>Submit report</Button>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  icon,
}: {
  label: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-4">
      <span className="text-xs font-semibold text-slate-400">{label}</span>
      <span className="flex items-center gap-1.5 text-right text-xs font-bold text-slate-800">
        {icon}
        {value}
      </span>
    </div>
  );
}
