import React from "react";
import { Loader2 } from "lucide-react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "success" | "outline";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-slate-950 text-white shadow-sm hover:bg-slate-800 focus-visible:ring-slate-400",
  secondary:
    "bg-slate-100 text-slate-900 hover:bg-slate-200 focus-visible:ring-slate-300",
  ghost:
    "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-950 focus-visible:ring-slate-300",
  danger:
    "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-300",
  success:
    "bg-emerald-600 text-white hover:bg-emerald-700 focus-visible:ring-emerald-300",
  outline:
    "border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 focus-visible:ring-slate-300",
};

const sizes = {
  sm: "h-9 px-3 text-xs rounded-lg",
  md: "h-10 px-4 text-sm rounded-xl",
  lg: "h-12 px-5 text-sm rounded-xl",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={[
        "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-150",
        "focus:outline-none focus-visible:ring-4 disabled:pointer-events-none disabled:opacity-50",
        "active:scale-[0.98]",
        variants[variant],
        sizes[size],
        fullWidth ? "w-full" : "",
        className,
      ].join(" ")}
      {...props}
    >
      {loading ? <Loader2 size={16} className="animate-spin" /> : leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  );
}
