import React from "react";

type BadgeTone =
  | "neutral"
  | "blue"
  | "green"
  | "amber"
  | "red"
  | "purple";

interface BadgeProps {
  children: React.ReactNode;
  tone?: BadgeTone;
  dot?: boolean;
  className?: string;
}

const tones: Record<BadgeTone, string> = {
  neutral: "bg-slate-100 text-slate-700 ring-slate-200",
  blue: "bg-blue-50 text-blue-700 ring-blue-100",
  green: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  amber: "bg-amber-50 text-amber-700 ring-amber-100",
  red: "bg-red-50 text-red-700 ring-red-100",
  purple: "bg-violet-50 text-violet-700 ring-violet-100",
};

export default function Badge({
  children,
  tone = "neutral",
  dot = false,
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold ring-1 ring-inset ${tones[tone]} ${className}`}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}
