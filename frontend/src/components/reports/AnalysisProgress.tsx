import React from "react";
import {
  BrainCircuit,
  Check,
  Circle,
  Loader2,
  MapPin,
  ScanSearch,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export type AnalysisStage =
  | "received"
  | "detection"
  | "classification"
  | "accessibility"
  | "severity"
  | "location"
  | "report";

interface AnalysisProgressProps {
  currentStage: AnalysisStage;
  compact?: boolean;
}

const stages: {
  id: AnalysisStage;
  label: string;
  icon: React.ElementType;
}[] = [
  { id: "received", label: "Image received", icon: Check },
  { id: "detection", label: "Object detection", icon: ScanSearch },
  { id: "classification", label: "Issue classification", icon: BrainCircuit },
  { id: "accessibility", label: "Accessibility assessment", icon: AccessibilityIcon },
  { id: "severity", label: "Severity analysis", icon: ShieldCheck },
  { id: "location", label: "Location processing", icon: MapPin },
  { id: "report", label: "Report generation", icon: Sparkles },
];

function AccessibilityIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <circle cx="12" cy="5" r="2" />
      <path d="M5 9h14M12 9v10M8 19l4-4 4 4" />
    </svg>
  );
}

export default function AnalysisProgress({
  currentStage,
  compact = false,
}: AnalysisProgressProps) {
  const currentIndex = stages.findIndex(s => s.id === currentStage);

  return (
    <div className={`rounded-2xl border border-slate-200 bg-white ${compact ? "p-4" : "p-5"}`}>
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-white">
          <Loader2 size={17} className="animate-spin" />
        </div>
        <div>
          <p className="text-sm font-bold text-slate-900">AI assessment in progress</p>
          <p className="text-[11px] text-slate-400">Running the civic analysis pipeline</p>
        </div>
      </div>

      <div className="mt-5 space-y-2">
        {stages.map((stage, index) => {
          const done = index < currentIndex;
          const active = index === currentIndex;
          const Icon = stage.icon;

          return (
            <div
              key={stage.id}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 ${
                active ? "bg-slate-50" : ""
              }`}
            >
              <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                done
                  ? "bg-emerald-50 text-emerald-600"
                  : active
                  ? "bg-slate-950 text-white"
                  : "bg-slate-100 text-slate-400"
              }`}>
                {done ? <Check size={14} /> : active ? <Loader2 size={14} className="animate-spin" /> : <Icon size={14} />}
              </div>
              <span className={`text-xs font-semibold ${
                active || done ? "text-slate-800" : "text-slate-400"
              }`}>
                {stage.label}
              </span>
              {active && <span className="ml-auto text-[10px] font-bold text-slate-400">Running</span>}
              {done && <span className="ml-auto text-[10px] font-bold text-emerald-600">Done</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
