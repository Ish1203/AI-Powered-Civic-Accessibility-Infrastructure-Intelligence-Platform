import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface AnalyticsChartProps {
  data?: { day: string; reports: number; resolved: number }[];
}

const fallback = [
  { day: "Mon", reports: 34, resolved: 21 },
  { day: "Tue", reports: 48, resolved: 27 },
  { day: "Wed", reports: 41, resolved: 31 },
  { day: "Thu", reports: 57, resolved: 35 },
  { day: "Fri", reports: 51, resolved: 43 },
  { day: "Sat", reports: 64, resolved: 49 },
  { day: "Sun", reports: 46, resolved: 38 },
];

export default function AnalyticsChart({ data = fallback }: AnalyticsChartProps) {
  return (
    <div className="h-[285px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 12, right: 8, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="reportsFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0f172a" stopOpacity={0.14} />
              <stop offset="100%" stopColor="#0f172a" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="resolvedFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#059669" stopOpacity={0.14} />
              <stop offset="100%" stopColor="#059669" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#94a3b8" }} />
          <Tooltip
            cursor={{ stroke: "#cbd5e1" }}
            contentStyle={{
              borderRadius: 12,
              border: "1px solid #e2e8f0",
              boxShadow: "0 10px 30px rgba(15,23,42,.08)",
              fontSize: 12,
            }}
          />
          <Area type="monotone" dataKey="reports" stroke="#0f172a" strokeWidth={2} fill="url(#reportsFill)" />
          <Area type="monotone" dataKey="resolved" stroke="#059669" strokeWidth={2} fill="url(#resolvedFill)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
