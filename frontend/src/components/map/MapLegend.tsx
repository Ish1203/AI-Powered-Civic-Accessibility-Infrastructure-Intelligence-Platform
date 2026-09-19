import React from "react";
import { CircleAlert, CircleCheck, Clock3, ShieldAlert } from "lucide-react";

export default function MapLegend() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white/95 p-3 shadow-sm backdrop-blur">
      <p className="mb-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
        Severity
      </p>
      <div className="space-y-2">
        <LegendItem color="bg-red-500" icon={<ShieldAlert size={12} />} label="Critical" />
        <LegendItem color="bg-amber-500" icon={<CircleAlert size={12} />} label="High" />
        <LegendItem color="bg-blue-500" icon={<Clock3 size={12} />} label="Medium" />
        <LegendItem color="bg-emerald-500" icon={<CircleCheck size={12} />} label="Low" />
      </div>
    </div>
  );
}

function LegendItem({
  color,
  icon,
  label,
}: {
  color: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-600">
      <span className={`flex h-5 w-5 items-center justify-center rounded-full text-white ${color}`}>
        {icon}
      </span>
      {label}
    </div>
  );
}
