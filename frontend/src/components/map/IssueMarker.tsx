import React from "react";
import { MapPin } from "lucide-react";

export interface MapIssue {
  id: string;
  title: string;
  category: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  status: string;
  lat: number;
  lng: number;
  location: string;
  accessibilityImpact?: boolean;
}

interface IssueMarkerProps {
  issue: MapIssue;
  onClick?: (issue: MapIssue) => void;
}

const markerColor = {
  Critical: "bg-red-600",
  High: "bg-amber-500",
  Medium: "bg-blue-600",
  Low: "bg-emerald-600",
};

export default function IssueMarker({ issue, onClick }: IssueMarkerProps) {
  return (
    <button
      onClick={() => onClick?.(issue)}
      title={`${issue.id}: ${issue.title}`}
      className="group relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-white shadow-lg transition hover:scale-110"
    >
      <span className={`absolute inset-0 rounded-full ${markerColor[issue.severity]}`} />
      <MapPin size={15} className="relative z-10 text-white" fill="currentColor" />
    </button>
  );
}
