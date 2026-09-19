import React from "react";
import { Crosshair, MapPin, Navigation, Search } from "lucide-react";
import Button from "../common/Button";

export interface LocationValue {
  lat: number;
  lng: number;
  address: string;
  city: string;
  state: string;
}

interface LocationPickerProps {
  value?: LocationValue | null;
  onChange: (location: LocationValue) => void;
}

export default function LocationPicker({
  value,
  onChange,
}: LocationPickerProps) {
  const [locating, setLocating] = React.useState(false);
  const [query, setQuery] = React.useState("");

  const useCurrentLocation = () => {
    if (!navigator.geolocation) return;
    setLocating(true);

    navigator.geolocation.getCurrentPosition(
      position => {
        const next = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          address: "Current selected location",
          city: "Kanpur",
          state: "Uttar Pradesh",
        };
        onChange(next);
        setLocating(false);
      },
      () => setLocating(false),
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Where is the issue?</h3>
          <p className="mt-1 text-xs text-slate-500">
            Use GPS or place the report manually. Location is essential for routing.
          </p>
        </div>
        <Button
          size="sm"
          variant="outline"
          loading={locating}
          onClick={useCurrentLocation}
          leftIcon={<Crosshair size={14} />}
        >
          Use my location
        </Button>
      </div>

      <div className="mt-4 flex h-44 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-[linear-gradient(135deg,#eef2f7_25%,transparent_25%),linear-gradient(315deg,#eef2f7_25%,transparent_25%)] bg-[length:28px_28px]">
        <div className="relative">
          <span className="absolute -inset-5 animate-pulse rounded-full bg-red-500/10" />
          <MapPin className="relative text-red-600" size={32} fill="currentColor" />
        </div>
      </div>

      <div className="mt-3 flex gap-2">
        <div className="flex h-10 flex-1 items-center gap-2 rounded-xl border border-slate-200 px-3">
          <Search size={14} className="text-slate-400" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search street or landmark"
            className="w-full bg-transparent text-xs outline-none"
          />
        </div>
        <Button
          size="sm"
          variant="secondary"
          onClick={() =>
            onChange({
              lat: 26.467,
              lng: 80.35,
              address: query || "Mall Road",
              city: "Kanpur",
              state: "Uttar Pradesh",
            })
          }
          leftIcon={<Navigation size={14} />}
        >
          Pin here
        </Button>
      </div>

      {value && (
        <div className="mt-3 rounded-xl bg-slate-50 p-3">
          <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
            Selected location
          </p>
          <p className="mt-1 text-xs font-bold text-slate-800">{value.address}</p>
          <p className="mt-1 text-[10px] text-slate-400">
            {value.lat.toFixed(5)}, {value.lng.toFixed(5)} · {value.city}, {value.state}
          </p>
        </div>
      )}
    </div>
  );
}
