import React from "react";
import { AlertTriangle, CircleCheck, Flame, ShieldAlert } from "lucide-react";
import Badge from "../common/Badge";

type Severity = "Low" | "Medium" | "High" | "Critical";

const config: Record<Severity, {
  tone: "green" | "blue" | "amber" | "red";
  icon: React.ElementType;
}> = {
  Low: { tone: "green", icon: CircleCheck },
  Medium: { tone: "blue", icon: ShieldAlert },
  High: { tone: "amber", icon: AlertTriangle },
  Critical: { tone: "red", icon: Flame },
};

export default function SeverityBadge({
  severity,
  score,
}: {
  severity: Severity;
  score?: number;
}) {
  const Icon = config[severity].icon;
  return (
    <Badge tone={config[severity].tone} dot>
      <Icon size={12} />
      {severity}
      {score !== undefined && ` · ${score}/100`}
    </Badge>
  );
}
