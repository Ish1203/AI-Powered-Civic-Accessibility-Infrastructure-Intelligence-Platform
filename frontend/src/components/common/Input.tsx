import React from "react";
import { Search, Eye, EyeOff } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

export default function Input({
  label,
  hint,
  error,
  leadingIcon,
  trailingIcon,
  className = "",
  ...props
}: InputProps) {
  const [show, setShow] = React.useState(false);
  const isPassword = props.type === "password";

  return (
    <label className="block">
      {label && <span className="mb-1.5 block text-xs font-bold text-slate-700">{label}</span>}
      <div className={`group flex h-11 items-center gap-2 rounded-xl border bg-white px-3 transition ${
        error
          ? "border-red-300 ring-4 ring-red-50"
          : "border-slate-200 focus-within:border-slate-400 focus-within:ring-4 focus-within:ring-slate-100"
      }`}>
        {leadingIcon}
        <input
          {...props}
          type={isPassword && show ? "text" : props.type}
          className={`min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 ${className}`}
        />
        {isPassword ? (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShow(v => !v)}
            className="text-slate-400 hover:text-slate-700"
          >
            {show ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        ) : trailingIcon}
      </div>
      {error ? (
        <span className="mt-1.5 block text-[11px] font-medium text-red-600">{error}</span>
      ) : hint ? (
        <span className="mt-1.5 block text-[11px] text-slate-400">{hint}</span>
      ) : null}
    </label>
  );
}

export function SearchInput(props: Omit<InputProps, "leadingIcon">) {
  return <Input {...props} leadingIcon={<Search size={16} className="text-slate-400" />} />;
}
