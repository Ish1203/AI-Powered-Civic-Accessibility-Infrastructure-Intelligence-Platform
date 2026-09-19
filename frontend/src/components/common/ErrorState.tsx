import React from "react";
import { CircleAlert, RefreshCw } from "lucide-react";
import Button from "./Button";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({
  title = "Something went wrong",
  message = "We couldn't load this information. Please try again.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex min-h-[220px] flex-col items-center justify-center rounded-2xl border border-red-100 bg-red-50/40 px-6 text-center">
      <CircleAlert className="text-red-500" size={26} />
      <h3 className="mt-3 text-sm font-bold text-slate-900">{title}</h3>
      <p className="mt-1 max-w-md text-xs leading-5 text-slate-500">{message}</p>
      {onRetry && (
        <Button variant="outline" size="sm" className="mt-4" onClick={onRetry} leftIcon={<RefreshCw size={14} />}>
          Try again
        </Button>
      )}
    </div>
  );
}
