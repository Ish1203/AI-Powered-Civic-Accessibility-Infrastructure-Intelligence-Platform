import React from "react";
import { MapPin, TrendingUp, Users } from "lucide-react";
import Badge from "../common/Badge";

interface HotspotCardProps {
  name: string;
  reports: number;
  unresolved: number;
  category: string;
  trend?: number;
  onClick?: () => void;
}

export default function HotspotCard({
  name,
  reports,
  unresolved,
  category,
  trend,
  onClick,
}: HotspotCardProps) {
  return (
    <button
      onClick={onClick}
      className="group w-full rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600 ring-1 ring-inset ring-red-100">
            <MapPin size={17} />
          </div>
          <div className="min-w-0">
            <h4 className="truncate text-sm font-bold text-slate-900">{name}</h4>
            <p className="mt-0.5 text-[11px] text-slate-400">{category} hotspot</p>
          </div>
        </div>
        {trend !== undefined && (
          <Badge tone="red">
            <TrendingUp size={11} /> +{trend}%
          </Badge>
        )}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-slate-50 px-3 py-2">
          <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Reports</p>
          <p className="mt-1 text-lg font-extrabold text-slate-950">{reports}</p>
        </div>
        <div className="rounded-xl bg-slate-50 px-3 py-2">
          <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Open</p>
          <p className="mt-1 text-lg font-extrabold text-slate-950">{unresolved}</p>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 group-hover:text-slate-600">
        <Users size={12} />
        Multiple citizen reports detected
      </div>
    </button>
  );
}
