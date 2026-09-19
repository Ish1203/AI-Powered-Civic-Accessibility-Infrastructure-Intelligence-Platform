import React from "react";
import { Inbox } from "lucide-react";
import Button from "./Button";

interface EmptyStateProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export default function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  icon,
}: EmptyStateProps) {
  return (
    <div className="flex min-h-[240px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 px-6 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-sm ring-1 ring-slate-200">
        {icon || <Inbox size={22} />}
      </div>
      <h3 className="text-sm font-bold text-slate-900">{title}</h3>
      {description && <p className="mt-1 max-w-sm text-xs leading-5 text-slate-500">{description}</p>}
      {actionLabel && onAction && (
        <Button className="mt-4" size="sm" onClick={onAction}>{actionLabel}</Button>
      )}
    </div>
  );
}
