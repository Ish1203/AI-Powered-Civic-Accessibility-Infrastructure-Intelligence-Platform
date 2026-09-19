import React from "react";
import { Info } from "lucide-react";
import Badge from "../common/Badge";

interface ConfidenceBadgeProps {
  confidence: number;
  label?: string;
}

export default function ConfidenceBadge({
  confidence,
  label = "AI confidence",
}: ConfidenceBadgeProps) {
  const tone = confidence >= 0.8 ? "green" : confidence >= 0.6 ? "amber" : "red";

  return (
    <div className="inline-flex items-center gap-2">
      <Badge tone={tone} dot>
        {Math.round(confidence * 100)}% {label}
      </Badge>
      <span title="Model confidence is an estimate, not a calibrated probability.">
        <Info size={12} className="text-slate-400" />
      </span>
    </div>
  );
}
