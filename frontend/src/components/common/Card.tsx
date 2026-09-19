import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  padding?: "none" | "sm" | "md" | "lg";
}

const padding = {
  none: "p-0",
  sm: "p-4",
  md: "p-5",
  lg: "p-6",
};

export default function Card({
  children,
  className = "",
  title,
  subtitle,
  action,
  padding: pad = "md",
}: CardProps) {
  return (
    <section
      className={`overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,.04)] ${className}`}
    >
      {(title || subtitle || action) && (
        <header className="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-4">
          <div>
            {title && <h3 className="text-sm font-bold text-slate-950">{title}</h3>}
            {subtitle && <p className="mt-1 text-xs text-slate-500">{subtitle}</p>}
          </div>
          {action}
        </header>
      )}
      <div className={padding[pad]}>{children}</div>
    </section>
  );
}
