import React from "react";
import { Filter, Layers3, X } from "lucide-react";
import Button from "../common/Button";

export interface MapFilterState {
  category: string;
  severity: string;
  status: string;
  accessibilityOnly: boolean;
}

interface MapFiltersProps {
  value: MapFilterState;
  onChange: (value: MapFilterState) => void;
}

export default function MapFilters({ value, onChange }: MapFiltersProps) {
  const update = (key: keyof MapFilterState, next: string | boolean) =>
    onChange({ ...value, [key]: next });

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter size={15} className="text-slate-500" />
          <span className="text-xs font-bold text-slate-900">Map filters</span>
        </div>
        <button
          onClick={() =>
            onChange({
              category: "All",
              severity: "All",
              status: "All",
              accessibilityOnly: false,
            })
          }
          className="text-[10px] font-bold text-slate-400 hover:text-slate-800"
        >
          Clear
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
        {[
          ["category", "Category", ["All", "Accessibility", "Road", "Cleanliness", "Public Space"]],
          ["severity", "Severity", ["All", "Critical", "High", "Medium", "Low"]],
          ["status", "Status", ["All", "Reported", "Assigned", "In Progress", "Resolved"]],
        ].map(([key, label, options]) => (
          <label key={key as string} className="block">
            <span className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              {label as string}
            </span>
            <select
              value={value[key as keyof MapFilterState] as string}
              onChange={e => update(key as keyof MapFilterState, e.target.value)}
              className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 outline-none focus:border-slate-400"
            >
              {(options as string[]).map(o => <option key={o}>{o}</option>)}
            </select>
          </label>
        ))}
      </div>

      <button
        onClick={() => update("accessibilityOnly", !value.accessibilityOnly)}
        className={`mt-3 flex w-full items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-xs font-bold transition ${
          value.accessibilityOnly
            ? "border-blue-200 bg-blue-50 text-blue-700"
            : "border-slate-200 text-slate-500 hover:bg-slate-50"
        }`}
      >
        <Layers3 size={14} />
        Accessibility-impacting issues only
        {value.accessibilityOnly && <X size={13} className="ml-auto" />}
      </button>

      <Button className="mt-3 w-full" size="sm">
        Apply filters
      </Button>
    </div>
  );
}
