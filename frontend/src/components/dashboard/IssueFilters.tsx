import React from "react";
import { Filter, RotateCcw, Search } from "lucide-react";
import Button from "../common/Button";

export interface IssueFilterState {
  search: string;
  category: string;
  severity: string;
  status: string;
}

interface IssueFiltersProps {
  value: IssueFilterState;
  onChange: (next: IssueFilterState) => void;
  onReset?: () => void;
}

export default function IssueFilters({ value, onChange, onReset }: IssueFiltersProps) {
  const update = (key: keyof IssueFilterState, val: string) =>
    onChange({ ...value, [key]: val });

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex flex-wrap items-end gap-3">
        <div className="min-w-[230px] flex-1">
          <label className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
            Search issues
          </label>
          <div className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 px-3 focus-within:border-slate-400">
            <Search size={15} className="text-slate-400" />
            <input
              value={value.search}
              onChange={e => update("search", e.target.value)}
              placeholder="ID, issue or location..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
          </div>
        </div>

        {[
          ["category", "All categories", ["All", "Accessibility", "Road", "Cleanliness", "Public Space"]],
          ["severity", "All severity", ["All", "Low", "Medium", "High", "Critical"]],
          ["status", "All status", ["All", "Reported", "AI Verified", "Assigned", "In Progress", "Resolved"]],
        ].map(([key, placeholder, options]) => (
          <label key={key as string} className="min-w-[145px]">
            <span className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              {placeholder as string}
            </span>
            <select
              value={value[key as keyof IssueFilterState]}
              onChange={e => update(key as keyof IssueFilterState, e.target.value)}
              className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 outline-none focus:border-slate-400"
            >
              {(options as string[]).map(option => <option key={option}>{option}</option>)}
            </select>
          </label>
        ))}

        <Button
          variant="ghost"
          size="sm"
          leftIcon={<RotateCcw size={14} />}
          onClick={onReset}
        >
          Reset
        </Button>
      </div>

      <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-400">
        <Filter size={13} />
        Filters update the queue instantly.
      </div>
    </div>
  );
}
