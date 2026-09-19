import React from "react";
import {
  AlertTriangle,
  CircleCheck,
  Flame,
  ShieldAlert,
} from "lucide-react";
import Badge from "../common/Badge";

type Severity =
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "CRITICAL";

const config: Record<
  Severity,
  {
    tone: "green" | "blue" | "amber" | "red";
    icon: React.ElementType;
  }
> = {
  LOW: {
    tone: "green",
    icon: CircleCheck,
  },

  MEDIUM: {
    tone: "blue",
    icon: ShieldAlert,
  },

  HIGH: {
    tone: "amber",
    icon: AlertTriangle,
  },

  CRITICAL: {
    tone: "red",
    icon: Flame,
  },
};

export default function SeverityBadge({
  severity,
  score,
}: {
  severity?: string;
  score?: number;
}) {
  const normalizedSeverity = String(
    severity ?? "MEDIUM"
  ).toUpperCase() as Severity;

  const safeSeverity: Severity =
    normalizedSeverity in config
      ? normalizedSeverity
      : "MEDIUM";

  const Icon = config[safeSeverity].icon;

  return (
    <Badge tone={config[safeSeverity].tone} dot>
      <Icon size={12} />

      {safeSeverity}

      {score !== undefined && ` · ${score}/100`}
    </Badge>
  );
}