import React from "react";
import {
  Accessibility,
  AlertTriangle,
  CheckCircle2,
  Crosshair,
  Layers3,
  ShieldAlert,
} from "lucide-react";
import Card from "../common/Card";
import Badge from "../common/Badge";
import ConfidenceBadge from "./ConfidenceBadge";
import SeverityBadge from "./SeverityBadge";

export interface AnalysisResultData {
  category: string;
  issueType: string;
  confidence: number;
  severity: "Low" | "Medium" | "High" | "Critical";
  severityScore?: number;
  detectedObjects: string[];
  accessibilityImpact: {
    affected: boolean;
    level: "None" | "Low" | "Medium" | "High";
    summary: string;
  };
  safetyRisk: string;
}

interface AnalysisResultProps {
  result: AnalysisResultData;
  onConfirm?: () => void;
  onCorrect?: () => void;
}

export default function AnalysisResult({
  result,
  onConfirm,
  onCorrect,
}: AnalysisResultProps) {
  return (
    <div className="space-y-4">
      <Card
        title="AI assessment"
        subtitle="Structured output from the civic analysis pipeline"
        action={<ConfidenceBadge confidence={result.confidence} />}
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <ResultItem icon={<Layers3 size={16} />} label="Category" value={result.category} />
          <ResultItem icon={<Crosshair size={16} />} label="Issue type" value={result.issueType} />
          <ResultItem
            icon={<AlertTriangle size={16} />}
            label="Severity"
            value={<SeverityBadge severity={result.severity} score={result.severityScore} />}
          />
          <ResultItem
            icon={<Accessibility size={16} />}
            label="Accessibility"
            value={
              <Badge tone={result.accessibilityImpact.affected ? "red" : "green"} dot>
                {result.accessibilityImpact.affected
                  ? `${result.accessibilityImpact.level} impact`
                  : "No visible impact"}
              </Badge>
            }
          />
        </div>
      </Card>

      <Card title="What the model detected">
        <div className="flex flex-wrap gap-2">
          {result.detectedObjects.map(item => (
            <Badge key={item} tone="neutral">{item}</Badge>
          ))}
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-red-100" title="Accessibility impact">
          <div className="flex gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <Accessibility size={17} />
            </div>
            <p className="text-xs leading-5 text-slate-600">
              {result.accessibilityImpact.summary}
            </p>
          </div>
        </Card>

        <Card title="Safety signal">
          <div className="flex gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <ShieldAlert size={17} />
            </div>
            <p className="text-xs leading-5 text-slate-600">{result.safetyRisk}</p>
          </div>
        </Card>
      </div>

      <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <div className="flex items-center gap-2">
          <CheckCircle2 size={17} className="text-emerald-600" />
          <div>
            <p className="text-xs font-bold text-slate-900">Does this look correct?</p>
            <p className="text-[10px] text-slate-400">You can correct the AI classification before submission.</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={onCorrect} className="rounded-lg px-3 py-2 text-[11px] font-bold text-slate-500 hover:bg-white">
            Correct
          </button>
          <button onClick={onConfirm} className="rounded-lg bg-slate-950 px-3 py-2 text-[11px] font-bold text-white hover:bg-slate-800">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

function ResultItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3">
      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
        {icon}
        {label}
      </div>
      <div className="mt-2 text-sm font-bold text-slate-900">{value}</div>
    </div>
  );
}
