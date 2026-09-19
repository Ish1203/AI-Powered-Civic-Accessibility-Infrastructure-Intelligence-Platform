import React from "react";
import { Bell, Menu, Search, MapPin } from "lucide-react";

interface NavbarProps {
  onMenuClick?: () => void;
  title?: string;
  location?: string;
}

export default function Navbar({
  onMenuClick,
  title = "AccessPath AI",
  location = "Kanpur, Uttar Pradesh",
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
      <button
        onClick={onMenuClick}
        className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
        aria-label="Open navigation"
      >
        <Menu size={20} />
      </button>

      <div className="hidden items-center gap-2 text-xs font-semibold text-slate-400 sm:flex">
        <MapPin size={14} />
        {location}
      </div>

      <div className="ml-auto flex items-center gap-2">
        <div className="hidden h-9 w-64 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 md:flex">
          <Search size={15} className="text-slate-400" />
          <input
            placeholder="Search issues, IDs, places..."
            className="w-full bg-transparent text-xs outline-none placeholder:text-slate-400"
          />
          <kbd className="rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[9px] font-bold text-slate-400">
            /
          </kbd>
        </div>

        <button
          aria-label="Notifications"
          className="relative flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100"
        >
          <Bell size={18} />
          <span className="absolute right-2 top-1.5 h-1.5 w-1.5 rounded-full bg-red-500 ring-2 ring-white" />
        </button>

        <div className="ml-1 hidden h-9 items-center gap-2 rounded-xl border border-slate-200 px-2 sm:flex">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-950 text-[9px] font-extrabold text-white">
            AG
          </div>
          <span className="text-xs font-bold text-slate-700">{title}</span>
        </div>
      </div>
    </header>
  );
}
