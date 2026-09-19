import React from "react";
import type { MapIssue } from "./IssueMarker";

interface HeatmapLayerProps {
  issues: MapIssue[];
  enabled?: boolean;
}

export default function HeatmapLayer({
  issues,
  enabled = true,
}: HeatmapLayerProps) {
  if (!enabled) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-[5] overflow-hidden rounded-2xl">
      {issues.slice(0, 12).map((issue, index) => {
        const left = 12 + ((issue.lng - 80.30) / 0.22) * 76;
        const top = 18 + ((26.48 - issue.lat) / 0.18) * 64;

        return (
          <span
            key={`${issue.id}-${index}`}
            className="absolute h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/10 blur-xl"
            style={{
              left: `${Math.max(5, Math.min(95, left))}%`,
              top: `${Math.max(5, Math.min(95, top))}%`,
            }}
          />
        );
      })}
    </div>
  );
}
