import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapPin, Maximize2 } from "lucide-react";
import IssueMarker, { MapIssue } from "./IssueMarker";
import MapLegend from "./MapLegend";
import MapFilters, { MapFilterState } from "./MapFilters";

const issues: MapIssue[] = [
  {
    id: "KAN-2048",
    title: "Footpath blocked by construction debris",
    category: "Accessibility",
    severity: "Critical",
    status: "AI Verified",
    lat: 26.4671,
    lng: 80.3492,
    location: "Mall Road",
    accessibilityImpact: true,
  },
  {
    id: "KAN-2043",
    title: "Large pothole near crossing",
    category: "Road",
    severity: "High",
    status: "Assigned",
    lat: 26.4761,
    lng: 80.3288,
    location: "Swaroop Nagar",
  },
  {
    id: "KAN-2038",
    title: "Overflowing waste bin",
    category: "Cleanliness",
    severity: "Medium",
    status: "In Progress",
    lat: 26.4588,
    lng: 80.342,
    location: "Civil Lines",
  },
];

const defaultIcon = L.divIcon({
  className: "accesspath-map-marker",
  html: `<div style="width:30px;height:30px;border-radius:50%;background:#0f172a;border:3px solid white;box-shadow:0 4px 12px rgba(15,23,42,.25);display:flex;align-items:center;justify-content:center;color:white;font-size:13px">●</div>`,
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

function Recenter({ center }: { center: [number, number] }) {
  const map = useMap();
  React.useEffect(() => {
    map.setView(center, map.getZoom(), { animate: true });
  }, [center, map]);
  return null;
}

interface CivicMapProps {
  className?: string;
  fullPage?: boolean;
  showFilters?: boolean;
  showLegend?: boolean;
  onIssueSelect?: (issue: MapIssue) => void;
}

export default function CivicMap({
  className = "",
  fullPage = false,
  showFilters = true,
  showLegend = true,
  onIssueSelect,
}: CivicMapProps) {
  const [filters, setFilters] = React.useState<MapFilterState>({
    category: "All",
    severity: "All",
    status: "All",
    accessibilityOnly: false,
  });

  const [selected, setSelected] = React.useState<MapIssue | null>(null);
  const [center, setCenter] = React.useState<[number, number]>([26.467, 80.35]);

  const filtered = issues.filter(issue => {
    if (filters.category !== "All" && issue.category !== filters.category) return false;
    if (filters.severity !== "All" && issue.severity !== filters.severity) return false;
    if (filters.status !== "All" && issue.status !== filters.status) return false;
    if (filters.accessibilityOnly && !issue.accessibilityImpact) return false;
    return true;
  });

  return (
    <div className={`grid gap-4 ${fullPage ? "lg:grid-cols-[260px_1fr]" : ""} ${className}`}>
      {showFilters && (
        <div className={fullPage ? "" : "hidden lg:block"}>
          <MapFilters value={filters} onChange={setFilters} />
        </div>
      )}

      <div className={`relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 ${
        fullPage ? "min-h-[620px]" : "h-[520px]"
      }`}>
        <MapContainer
          center={center}
          zoom={13}
          scrollWheelZoom
          className="h-full min-h-[520px] w-full"
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Recenter center={center} />

          {filtered.map(issue => (
            <Marker
              key={issue.id}
              position={[issue.lat, issue.lng]}
              icon={defaultIcon}
              eventHandlers={{
                click: () => {
                  setSelected(issue);
                  setCenter([issue.lat, issue.lng]);
                  onIssueSelect?.(issue);
                },
              }}
            >
              <Popup>
                <div className="min-w-[210px]">
                  <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    {issue.id}
                  </p>
                  <h3 className="mt-1 text-sm font-bold text-slate-900">{issue.title}</h3>
                  <p className="mt-1 text-xs text-slate-500">{issue.location}</p>
                  <div className="mt-3 flex gap-2 text-[10px] font-bold">
                    <span>{issue.category}</span>
                    <span>·</span>
                    <span>{issue.severity}</span>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        <div className="pointer-events-none absolute inset-x-0 top-0 z-[500] flex items-start justify-between p-3">
          <div className="pointer-events-auto rounded-xl border border-slate-200 bg-white/95 px-3 py-2 shadow-sm backdrop-blur">
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-slate-700" />
              <span className="text-xs font-bold text-slate-900">
                {filtered.length} issues visible
              </span>
            </div>
          </div>

          {showLegend && <MapLegend />}
        </div>

        <button
          onClick={() => setCenter([26.467, 80.35])}
          className="absolute bottom-4 right-4 z-[500] flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-md hover:bg-slate-50"
          aria-label="Reset map view"
        >
          <Maximize2 size={16} />
        </button>

        {selected && (
          <div className="absolute bottom-4 left-4 z-[500] max-w-[300px] rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              Selected issue
            </p>
            <h3 className="mt-1 text-sm font-bold text-slate-950">{selected.title}</h3>
            <p className="mt-1 text-xs text-slate-500">{selected.location}</p>
            <button
              onClick={() => setSelected(null)}
              className="mt-3 text-[11px] font-bold text-slate-500 hover:text-slate-900"
            >
              Dismiss
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
