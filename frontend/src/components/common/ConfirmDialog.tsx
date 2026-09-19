import React from "react";
import { AlertTriangle, X } from "lucide-react";
import Button from "./Button";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  danger?: boolean;
  loading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  danger = false,
  loading = false,
  onConfirm,
  onClose,
}: ConfirmDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-[2px]">
      <div
        role="dialog"
        aria-modal="true"
        className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <div className="flex justify-end p-3">
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={18} />
          </button>
        </div>
        <div className="px-6 pb-6">
          <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${
            danger ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-600"
          }`}>
            <AlertTriangle size={21} />
          </div>
          <h2 className="text-lg font-bold text-slate-950">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
          <div className="mt-6 flex justify-end gap-2">
            <Button variant="ghost" onClick={onClose}>{cancelText}</Button>
            <Button variant={danger ? "danger" : "primary"} loading={loading} onClick={onConfirm}>
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
