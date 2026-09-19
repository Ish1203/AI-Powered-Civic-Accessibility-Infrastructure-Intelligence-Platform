import React from "react";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  onClose: () => void;
  size?: "sm" | "md" | "lg" | "xl";
}

export default function Modal({
  open,
  title,
  subtitle,
  children,
  onClose,
  size = "md",
}: ModalProps) {
  if (!open) return null;

  const widths = {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm">
      <div className={`max-h-[90vh] w-full overflow-hidden rounded-2xl bg-white shadow-2xl ${widths[size]}`}>
        <div className="flex items-start justify-between border-b border-slate-100 px-5 py-4">
          <div>
            <h2 className="text-base font-bold text-slate-950">{title}</h2>
            {subtitle && <p className="mt-1 text-xs text-slate-500">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>
        <div className="max-h-[calc(90vh-76px)] overflow-y-auto p-5">{children}</div>
      </div>
    </div>
  );
}
