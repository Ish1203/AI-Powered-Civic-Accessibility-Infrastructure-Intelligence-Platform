import React from "react";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  helper?: string;
  trend?: number;
  icon: React.ReactNode;
  iconClassName?: string;
  accent?: "blue" | "green" | "amber" | "red" | "slate";
}

const accents = {
  blue: "bg-blue-50 text-blue-700 ring-blue-100",
  green: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  amber: "bg-amber-50 text-amber-700 ring-amber-100",
  red: "bg-red-50 text-red-700 ring-red-100",
  slate: "bg-slate-100 text-slate-700 ring-slate-200",
};

export default function StatCard({
  label,
  value,
  helper,
  trend,
  icon,
  iconClassName = "",
  accent = "slate",
}: StatCardProps) {
  const positive = trend !== undefined && trend > 0;
  const negative = trend !== undefined && trend < 0;

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,.04)] transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500">{label}</p>
          <p className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950">{value}</p>
        </div>
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ring-1 ring-inset ${accents[accent]} ${iconClassName}`}>
          {icon}
        </div>
      </div>

      {(helper || trend !== undefined) && (
        <div className="mt-4 flex items-center gap-2 text-[11px]">
          {trend !== undefined && (
            <span className={`inline-flex items-center gap-0.5 font-bold ${
              positive ? "text-emerald-600" : negative ? "text-red-600" : "text-slate-500"
            }`}>
              {positive ? <ArrowUpRight size={13} /> : negative ? <ArrowDownRight size={13} /> : <Minus size={13} />}
              {Math.abs(trend)}%
            </span>
          )}
          {helper && <span className="text-slate-400">{helper}</span>}
        </div>
      )}
      <div className="pointer-events-none absolute -bottom-7 -right-7 h-20 w-20 rounded-full bg-slate-50 transition group-hover:scale-125" />
    </article>
  );
}
