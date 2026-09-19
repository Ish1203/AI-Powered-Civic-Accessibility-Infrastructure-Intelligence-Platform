import React from "react";
import { Check, Circle, Clock3, Loader2 } from "lucide-react";

export type ReportStatus =
  | "REPORTED"
  | "AI VERIFIED"
  | "ASSIGNED"
  | "IN PROGRESS"
  | "RESOLVED"
  | "VERIFICATION"
  | "CLOSED";

interface StatusTimelineProps {
  current: ReportStatus;
  compact?: boolean;
}

const statuses: { id: ReportStatus; label: string; description: string }[] = [
  { id: "REPORTED", label: "Reported", description: "Citizen submitted the issue" },
  { id: "AI VERIFIED", label: "AI verified", description: "Issue analysis completed" },
  { id: "ASSIGNED", label: "Assigned", description: "Department accepted the issue" },
  { id: "IN PROGRESS", label: "In progress", description: "Work has started" },
  { id: "RESOLVED", label: "Resolved", description: "Authority marked it resolved" },
  { id: "VERIFICATION", label: "Verification", description: "Evidence is being checked" },
  { id: "CLOSED", label: "Closed", description: "Issue lifecycle completed" },
];

export default function StatusTimeline({
  current,
  compact = false,
}: StatusTimelineProps) {
  const currentIndex = statuses.findIndex(s => s.id === current);

  return (
    <div className={compact ? "space-y-3" : "space-y-0"}>
      {statuses.map((status, index) => {
        const done = index < currentIndex;
        const active = index === currentIndex;

        return (
          <div key={status.id} className="relative flex gap-3">
            {index < statuses.length - 1 && (
              <span
                className={`absolute left-[13px] top-7 h-[calc(100%-4px)] w-px ${
                  index < currentIndex ? "bg-emerald-300" : "bg-slate-200"
                }`}
              />
            )}

            <div className={`relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
              done
                ? "bg-emerald-600 text-white"
                : active
                ? "bg-slate-950 text-white"
                : "bg-white text-slate-300 ring-1 ring-slate-200"
            }`}>
              {done ? <Check size={13} /> : active ? <Loader2 size={13} className="animate-spin" /> : <Circle size={10} />}
            </div>

            <div className={compact ? "pb-2" : "pb-6"}>
              <p className={`text-xs font-bold ${active || done ? "text-slate-900" : "text-slate-400"}`}>
                {status.label}
              </p>
              {!compact && (
                <p className="mt-1 text-[11px] leading-5 text-slate-400">
                  {status.description}
                </p>
              )}
            </div>

            {active && !compact && (
              <span className="ml-auto flex items-center gap-1 text-[10px] font-bold text-blue-600">
                <Clock3 size={11} /> Current
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
