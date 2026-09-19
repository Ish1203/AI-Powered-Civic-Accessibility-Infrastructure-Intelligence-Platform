import React from "react";
import { Copy, MapPin, ImageIcon, Clock3 } from "lucide-react";
import Badge from "../common/Badge";
import Button from "../common/Button";

interface DuplicateMatch {
  id: string;
  title: string;
  location: string;
  distance: string;
  similarity: number;
  status: string;
}

interface DuplicateWarningProps {
  match: DuplicateMatch;
  onAttach?: () => void;
  onSeparate?: () => void;
}

export default function DuplicateWarning({
  match,
  onAttach,
  onSeparate,
}: DuplicateWarningProps) {
  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-4">
      <div className="flex gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
          <Copy size={17} />
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-bold text-slate-900">Possible existing issue</h3>
            <Badge tone="amber">{Math.round(match.similarity * 100)}% match</Badge>
          </div>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            We found a nearby report that may describe the same civic problem.
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-amber-100 bg-white p-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              {match.id}
            </p>
            <p className="mt-1 text-xs font-bold text-slate-900">{match.title}</p>
          </div>
          <Badge tone="blue">{match.status}</Badge>
        </div>
        <div className="mt-3 grid gap-2 text-[10px] font-semibold text-slate-500 sm:grid-cols-3">
          <span className="flex items-center gap-1.5"><MapPin size={12} /> {match.distance} away</span>
          <span className="flex items-center gap-1.5"><ImageIcon size={12} /> Image similarity</span>
          <span className="flex items-center gap-1.5"><Clock3 size={12} /> Existing report</span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap justify-end gap-2">
        <Button size="sm" variant="outline" onClick={onSeparate}>
          Create separate report
        </Button>
        <Button size="sm" onClick={onAttach}>
          Add as evidence
        </Button>
      </div>
    </div>
  );
}
