import { useMemo, useState } from "react";
import {
  Accessibility,
  AlertTriangle,
  CalendarDays,
  Filter,
  Layers3,
  MapPin,
  Navigation,
  RotateCcw,
  Search,
  ShieldAlert,
  Trash2,
  X,
} from "lucide-react";

import {
  CircleMarker,
  MapContainer,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

type Severity = "Critical" | "High" | "Medium" | "Low";

type IssueCategory =
  | "Accessibility"
  | "Road"
  | "Cleanliness"
  | "Public Space"
  | "Pedestrian Safety";

type IssueStatus =
  | "Reported"
  | "AI Verified"
  | "Assigned"
  | "In Progress"
  | "Resolved";

interface CivicIssue {
  id: string;
  title: string;
  category: IssueCategory;
  severity: Severity;
  status: IssueStatus;
  latitude: number;
  longitude: number;
  location: string;
  description: string;
  accessibilityImpact: boolean;
  createdAt: string;
  confidence: number;
}

/*
  Demo map data.

  Replace this array with:
  GET /api/map/issues
  once your FastAPI backend is connected.
*/

const issues: CivicIssue[] = [
  {
    id: "KAN-2048",
    title: "Blocked footpath",
    category: "Accessibility",
    severity: "High",
    status: "AI Verified",
    latitude: 26.4499,
    longitude: 80.3319,
    location: "Mall Road, Kanpur",
    description:
      "Pedestrian route appears blocked by roadside material.",
    accessibilityImpact: true,
    createdAt: "Today",
    confidence: 94,
  },
  {
    id: "KAN-2047",
    title: "Large road pothole",
    category: "Road",
    severity: "Critical",
    status: "Assigned",
    latitude: 26.4608,
    longitude: 80.3218,
    location: "Swaroop Nagar, Kanpur",
    description:
      "Large pothole creating a potential hazard for vehicles and pedestrians.",
    accessibilityImpact: false,
    createdAt: "Today",
    confidence: 97,
  },
  {
    id: "KAN-2046",
    title: "Garbage accumulation",
    category: "Cleanliness",
    severity: "Medium",
    status: "Reported",
    latitude: 26.4701,
    longitude: 80.3497,
    location: "Arya Nagar, Kanpur",
    description:
      "Waste accumulation detected near a public walkway.",
    accessibilityImpact: true,
    createdAt: "Yesterday",
    confidence: 91,
  },
  {
    id: "KAN-2045",
    title: "Missing accessible ramp",
    category: "Accessibility",
    severity: "High",
    status: "In Progress",
    latitude: 26.4352,
    longitude: 80.3462,
    location: "Civil Lines, Kanpur",
    description:
      "Public facility entrance appears to lack an accessible ramp.",
    accessibilityImpact: true,
    createdAt: "2 days ago",
    confidence: 89,
  },
  {
    id: "KAN-2044",
    title: "Open drain",
    category: "Pedestrian Safety",
    severity: "Critical",
    status: "AI Verified",
    latitude: 26.4514,
    longitude: 80.3114,
    location: "Harsh Nagar, Kanpur",
    description:
      "Open drainage section creates a pedestrian safety risk.",
    accessibilityImpact: true,
    createdAt: "2 days ago",
    confidence: 95,
  },
  {
    id: "KAN-2043",
    title: "Damaged park path",
    category: "Public Space",
    severity: "Medium",
    status: "Resolved",
    latitude: 26.4822,
    longitude: 80.3009,
    location: "Moti Jheel, Kanpur",
    description:
      "Uneven park pathway reported by a citizen.",
    accessibilityImpact: true,
    createdAt: "4 days ago",
    confidence: 87,
  },
  {
    id: "KAN-2042",
    title: "Vehicle blocking pedestrian route",
    category: "Pedestrian Safety",
    severity: "High",
    status: "Assigned",
    latitude: 26.4289,
    longitude: 80.3624,
    location: "Kidwai Nagar, Kanpur",
    description:
      "Vehicle appears to be blocking the pedestrian route.",
    accessibilityImpact: true,
    createdAt: "5 days ago",
    confidence: 92,
  },
];

const categoryOptions: Array<"All" | IssueCategory> = [
  "All",
  "Accessibility",
  "Road",
  "Cleanliness",
  "Public Space",
  "Pedestrian Safety",
];

const severityOptions: Array<"All" | Severity> = [
  "All",
  "Critical",
  "High",
  "Medium",
  "Low",
];

const statusOptions: Array<"All" | IssueStatus> = [
  "All",
  "Reported",
  "AI Verified",
  "Assigned",
  "In Progress",
  "Resolved",
];

function getSeverityClasses(severity: Severity) {
  switch (severity) {
    case "Critical":
      return {
        badge: "border-red-500/20 bg-red-500/10 text-red-300",
        dot: "#ef4444",
      };

    case "High":
      return {
        badge: "border-orange-500/20 bg-orange-500/10 text-orange-300",
        dot: "#f97316",
      };

    case "Medium":
      return {
        badge: "border-amber-500/20 bg-amber-500/10 text-amber-300",
        dot: "#f59e0b",
      };

    default:
      return {
        badge: "border-slate-700 bg-slate-800 text-slate-300",
        dot: "#94a3b8",
      };
  }
}

function getCategoryIcon(category: IssueCategory) {
  switch (category) {
    case "Accessibility":
      return Accessibility;

    case "Cleanliness":
      return Trash2;

    case "Pedestrian Safety":
      return ShieldAlert;

    default:
      return AlertTriangle;
  }
}

/* -------------------------------------------------------
   Map controls
------------------------------------------------------- */

function RecenterMap({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) {
  const map = useMap();

  const recenter = () => {
    map.flyTo([latitude, longitude], 14, {
      duration: 0.8,
    });
  };

  return (
    <button
      type="button"
      onClick={recenter}
      className="absolute bottom-5 right-5 z-[1000] flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-950/95 text-slate-300 shadow-xl backdrop-blur transition hover:border-slate-500 hover:text-white"
      title="Recenter map"
    >
      <Navigation size={17} />
    </button>
  );
}

/* -------------------------------------------------------
   Main component
------------------------------------------------------- */

export const ExploreMap = () => {
  const [category, setCategory] =
    useState<"All" | IssueCategory>("All");

  const [severity, setSeverity] =
    useState<"All" | Severity>("All");

  const [status, setStatus] =
    useState<"All" | IssueStatus>("All");

  const [accessibilityOnly, setAccessibilityOnly] =
    useState(false);

  const [search, setSearch] = useState("");

  const [selectedIssue, setSelectedIssue] =
    useState<CivicIssue | null>(null);

  const [showFilters, setShowFilters] = useState(true);

  const filteredIssues = useMemo(() => {
    const query = search.trim().toLowerCase();

    return issues.filter((issue) => {
      const categoryMatch =
        category === "All" || issue.category === category;

      const severityMatch =
        severity === "All" || issue.severity === severity;

      const statusMatch =
        status === "All" || issue.status === status;

      const accessibilityMatch =
        !accessibilityOnly || issue.accessibilityImpact;

      const searchMatch =
        !query ||
        issue.title.toLowerCase().includes(query) ||
        issue.location.toLowerCase().includes(query) ||
        issue.id.toLowerCase().includes(query) ||
        issue.category.toLowerCase().includes(query);

      return (
        categoryMatch &&
        severityMatch &&
        statusMatch &&
        accessibilityMatch &&
        searchMatch
      );
    });
  }, [
    category,
    severity,
    status,
    accessibilityOnly,
    search,
  ]);

  const stats = useMemo(() => {
    return {
      total: filteredIssues.length,

      critical: filteredIssues.filter(
        (item) => item.severity === "Critical"
      ).length,

      accessibility: filteredIssues.filter(
        (item) => item.accessibilityImpact
      ).length,

      resolved: filteredIssues.filter(
        (item) => item.status === "Resolved"
      ).length,
    };
  }, [filteredIssues]);

  const resetFilters = () => {
    setCategory("All");
    setSeverity("All");
    setStatus("All");
    setAccessibilityOnly(false);
    setSearch("");
  };

  const hasActiveFilters =
    category !== "All" ||
    severity !== "All" ||
    status !== "All" ||
    accessibilityOnly ||
    search.length > 0;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900">

      {/* ------------------------------------------------
          Header
      ------------------------------------------------ */}

      <header className="border-b border-slate-200 bg-white">

        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-5 px-5 py-5 lg:px-8">

          <div>
            <div className="flex items-center gap-2">

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-950 text-emerald-400">
                <MapPin size={18} />
              </div>

              <span className="text-sm font-bold tracking-tight text-slate-950">
                AccessPath AI
              </span>

            </div>

            <h1 className="mt-5 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Explore Civic Map
            </h1>

            <p className="mt-1 max-w-2xl text-sm text-slate-500">
              Explore reported accessibility, infrastructure,
              cleanliness and pedestrian safety issues.
            </p>
          </div>

          <a
            href="/report"
            className="hidden rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 sm:block"
          >
            Report an Issue
          </a>

        </div>

      </header>

      {/* ------------------------------------------------
          Main
      ------------------------------------------------ */}

      <main className="mx-auto max-w-[1500px] px-5 py-6 lg:px-8">

        {/* Stats */}

        <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">

          <Stat
            label="Visible issues"
            value={stats.total}
            icon={<MapPin size={17} />}
          />

          <Stat
            label="Critical"
            value={stats.critical}
            icon={<AlertTriangle size={17} />}
          />

          <Stat
            label="Accessibility impact"
            value={stats.accessibility}
            icon={<Accessibility size={17} />}
          />

          <Stat
            label="Resolved"
            value={stats.resolved}
            icon={<CheckIcon />}
          />

        </div>

        {/* Search / filter bar */}

        <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">

          <div className="flex flex-col gap-3 lg:flex-row">

            {/* Search */}

            <div className="relative flex-1">

              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search issue, location or civic ID..."
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  <X size={15} />
                </button>
              )}

            </div>

            <button
              type="button"
              onClick={() => setShowFilters((value) => !value)}
              className={`flex h-11 items-center justify-center gap-2 rounded-xl border px-4 text-sm font-medium transition ${
                showFilters
                  ? "border-slate-900 bg-slate-950 text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
              }`}
            >
              <Filter size={16} />
              Filters
            </button>

          </div>

          {/* Filters */}

          {showFilters && (
            <div className="mt-3 grid gap-3 border-t border-slate-100 pt-3 sm:grid-cols-2 lg:grid-cols-4">

              <FilterSelect
                label="Category"
                value={category}
                options={categoryOptions}
                onChange={(value) =>
                  setCategory(value as typeof category)
                }
              />

              <FilterSelect
                label="Severity"
                value={severity}
                options={severityOptions}
                onChange={(value) =>
                  setSeverity(value as typeof severity)
                }
              />

              <FilterSelect
                label="Status"
                value={status}
                options={statusOptions}
                onChange={(value) =>
                  setStatus(value as typeof status)
                }
              />

              <button
                type="button"
                onClick={() =>
                  setAccessibilityOnly(
                    (value) => !value
                  )
                }
                className={`flex h-10 items-center justify-center gap-2 self-end rounded-lg border px-3 text-xs font-semibold transition ${
                  accessibilityOnly
                    ? "border-emerald-500/30 bg-emerald-50 text-emerald-700"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                }`}
              >
                <Accessibility size={15} />
                Accessibility impact only
              </button>

            </div>
          )}

          {hasActiveFilters && (
            <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">

              <p className="text-xs text-slate-500">
                Showing{" "}
                <span className="font-semibold text-slate-800">
                  {filteredIssues.length}
                </span>{" "}
                matching issues
              </p>

              <button
                type="button"
                onClick={resetFilters}
                className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-900"
              >
                <RotateCcw size={13} />
                Reset filters
              </button>

            </div>
          )}

        </div>

        {/* ------------------------------------------------
            Map + issue list
        ------------------------------------------------ */}

        <div className="grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:grid-cols-[1fr_380px]">

          {/* Map */}

          <div className="relative h-[620px] lg:h-[700px]">

            <MapContainer
              center={[26.4499, 80.3319]}
              zoom={13}
              scrollWheelZoom
              className="h-full w-full"
            >

              <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {filteredIssues.map((issue) => {
                const severityConfig =
                  getSeverityClasses(issue.severity);

                return (
                  <CircleMarker
                    key={issue.id}
                    center={[
                      issue.latitude,
                      issue.longitude,
                    ]}
                    radius={
                      issue.severity === "Critical"
                        ? 11
                        : issue.severity === "High"
                          ? 9
                          : 8
                    }
                    pathOptions={{
                      color: severityConfig.dot,
                      fillColor: severityConfig.dot,
                      fillOpacity: 0.8,
                      weight: 2,
                    }}
                    eventHandlers={{
                      click: () =>
                        setSelectedIssue(issue),
                    }}
                  >
                    <Popup>

                      <div className="min-w-[210px]">

                        <div className="flex items-start justify-between gap-3">

                          <div>
                            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                              {issue.id}
                            </p>

                            <p className="mt-1 text-sm font-bold text-slate-900">
                              {issue.title}
                            </p>
                          </div>

                          <span
                            className="rounded-full px-2 py-1 text-[10px] font-semibold"
                            style={{
                              background:
                                `${severityConfig.dot}18`,
                              color:
                                severityConfig.dot,
                            }}
                          >
                            {issue.severity}
                          </span>

                        </div>

                        <p className="mt-3 text-xs leading-5 text-slate-600">
                          {issue.description}
                        </p>

                        <div className="mt-3 flex items-center gap-2 text-[10px] text-slate-500">
                          <MapPin size={12} />
                          {issue.location}
                        </div>

                        {issue.accessibilityImpact && (
                          <div className="mt-3 flex items-center gap-1.5 text-[10px] font-medium text-emerald-700">
                            <Accessibility size={12} />
                            Accessibility impact
                          </div>
                        )}

                      </div>

                    </Popup>
                  </CircleMarker>
                );
              })}

              <RecenterMap
                latitude={26.4499}
                longitude={80.3319}
              />

            </MapContainer>

            {/* Map legend */}

            <div className="absolute bottom-5 left-5 z-[1000] hidden rounded-xl border border-slate-200 bg-white/95 p-3 shadow-lg backdrop-blur sm:block">

              <div className="flex items-center gap-2">
                <Layers3
                  size={14}
                  className="text-slate-500"
                />

                <span className="text-[11px] font-semibold text-slate-700">
                  Severity
                </span>
              </div>

              <div className="mt-2 space-y-1.5">

                <LegendDot
                  color="#ef4444"
                  label="Critical"
                />

                <LegendDot
                  color="#f97316"
                  label="High"
                />

                <LegendDot
                  color="#f59e0b"
                  label="Medium"
                />

                <LegendDot
                  color="#94a3b8"
                  label="Low"
                />

              </div>

            </div>

          </div>

          {/* ------------------------------------------------
              Issue list
          ------------------------------------------------ */}

          <aside className="border-t border-slate-200 lg:border-l lg:border-t-0">

            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">

              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  Civic issues
                </h2>

                <p className="mt-0.5 text-[11px] text-slate-500">
                  {filteredIssues.length} visible on map
                </p>
              </div>

              <CalendarDays
                size={17}
                className="text-slate-400"
              />

            </div>

            <div className="max-h-[650px] overflow-y-auto">

              {filteredIssues.length === 0 ? (
                <EmptyResults
                  onReset={resetFilters}
                />
              ) : (
                filteredIssues.map((issue) => {
                  const Icon =
                    getCategoryIcon(issue.category);

                  const severityConfig =
                    getSeverityClasses(issue.severity);

                  const selected =
                    selectedIssue?.id === issue.id;

                  return (
                    <button
                      type="button"
                      key={issue.id}
                      onClick={() =>
                        setSelectedIssue(issue)
                      }
                      className={`w-full border-b border-slate-100 p-4 text-left transition hover:bg-slate-50 ${
                        selected
                          ? "bg-slate-50"
                          : "bg-white"
                      }`}
                    >

                      <div className="flex gap-3">

                        <div
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                          style={{
                            background:
                              `${severityConfig.dot}12`,
                            color:
                              severityConfig.dot,
                          }}
                        >
                          <Icon size={17} />
                        </div>

                        <div className="min-w-0 flex-1">

                          <div className="flex items-start justify-between gap-2">

                            <div className="min-w-0">

                              <p className="truncate text-sm font-semibold text-slate-900">
                                {issue.title}
                              </p>

                              <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wide text-slate-400">
                                {issue.id}
                              </p>

                            </div>

                            <span
                              className={`shrink-0 rounded-full border px-2 py-1 text-[9px] font-semibold ${severityConfig.badge}`}
                            >
                              {issue.severity}
                            </span>

                          </div>

                          <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500">
                            {issue.description}
                          </p>

                          <div className="mt-3 flex flex-wrap items-center gap-2">

                            <span className="flex items-center gap-1 text-[10px] text-slate-400">
                              <MapPin size={11} />
                              {issue.location}
                            </span>

                            <span className="text-slate-300">
                              •
                            </span>

                            <span className="text-[10px] text-slate-400">
                              {issue.status}
                            </span>

                          </div>

                          {issue.accessibilityImpact && (
                            <div className="mt-2 flex items-center gap-1.5 text-[10px] font-semibold text-emerald-600">
                              <Accessibility size={11} />
                              Accessibility impact
                            </div>
                          )}

                        </div>

                      </div>

                    </button>
                  );
                })
              )}

            </div>

          </aside>

        </div>

      </main>

      {/* Selected issue detail drawer */}

      {selectedIssue && (
        <div className="fixed inset-0 z-[2000] flex items-end justify-center bg-slate-950/30 p-4 backdrop-blur-[2px] sm:items-center">

          <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl">

            <div className="flex items-start justify-between">

              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {selectedIssue.id}
                </p>

                <h3 className="mt-1 text-lg font-bold text-slate-950">
                  {selectedIssue.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setSelectedIssue(null)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-800"
              >
                <X size={17} />
              </button>

            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">

              <DetailItem
                label="Category"
                value={selectedIssue.category}
              />

              <DetailItem
                label="Severity"
                value={selectedIssue.severity}
              />

              <DetailItem
                label="Status"
                value={selectedIssue.status}
              />

              <DetailItem
                label="AI confidence"
                value={`${selectedIssue.confidence}%`}
              />

            </div>

            <div className="mt-4 rounded-xl bg-slate-50 p-4">

              <p className="text-xs font-semibold text-slate-700">
                Location
              </p>

              <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                <MapPin size={14} />
                {selectedIssue.location}
              </div>

            </div>

            <p className="mt-4 text-sm leading-6 text-slate-600">
              {selectedIssue.description}
            </p>

            {selectedIssue.accessibilityImpact && (
              <div className="mt-4 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">

                <Accessibility
                  size={18}
                  className="mt-0.5 shrink-0 text-emerald-600"
                />

                <div>
                  <p className="text-xs font-semibold text-emerald-800">
                    Accessibility impact detected
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-emerald-700">
                    This issue may affect pedestrian or
                    wheelchair accessibility.
                  </p>
                </div>

              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
};

/* -------------------------------------------------------
   Small components
------------------------------------------------------- */

function Stat({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">

      <div className="flex items-center justify-between">

        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
          {icon}
        </div>

        <span className="text-xl font-bold text-slate-950">
          {value}
        </span>

      </div>

      <p className="mt-3 text-xs font-medium text-slate-500">
        {label}
      </p>

    </div>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">

      <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </span>

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-xs font-medium text-slate-700 outline-none focus:border-slate-400"
      >
        {options.map((option) => (
          <option
            value={option}
            key={option}
          >
            {option}
          </option>
        ))}
      </select>

    </label>
  );
}

function LegendDot({
  color,
  label,
}: {
  color: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2">

      <span
        className="h-2.5 w-2.5 rounded-full"
        style={{
          backgroundColor: color,
        }}
      />

      <span className="text-[10px] text-slate-500">
        {label}
      </span>

    </div>
  );
}

function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">

      <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-xs font-semibold text-slate-800">
        {value}
      </p>

    </div>
  );
}

function EmptyResults({
  onReset,
}: {
  onReset: () => void;
}) {
  return (
    <div className="flex min-h-[350px] flex-col items-center justify-center px-6 text-center">

      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
        <Search size={20} />
      </div>

      <h3 className="mt-4 text-sm font-semibold text-slate-800">
        No civic issues found
      </h3>

      <p className="mt-1 max-w-xs text-xs leading-5 text-slate-500">
        Try changing your search or filters to find
        reported issues.
      </p>

      <button
        type="button"
        onClick={onReset}
        className="mt-4 rounded-lg bg-slate-950 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800"
      >
        Reset filters
      </button>

    </div>
  );
}

function CheckIcon() {
  return <span className="text-emerald-600">✓</span>;
}

export default ExploreMap;