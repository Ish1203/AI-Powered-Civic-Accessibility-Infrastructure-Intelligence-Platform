import React from "react";
import { ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white px-6 py-6">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-3 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck size={14} />
          <span>AccessPath AI · Civic accessibility intelligence</span>
        </div>
        <span>Citizen data is kept private by default.</span>
      </div>
    </footer>
  );
}
