import React from "react";
import { Camera, FileImage, UploadCloud, X } from "lucide-react";
import Button from "../common/Button";

interface ImageUploaderProps {
  value?: File | null;
  previewUrl?: string;
  onChange: (file: File | null) => void;
  disabled?: boolean;
  compact?: boolean;
}

export default function ImageUploader({
  value,
  previewUrl,
  onChange,
  disabled = false,
  compact = false,
}: ImageUploaderProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = React.useState(false);
  const localPreview = React.useMemo(
    () => (value ? URL.createObjectURL(value) : previewUrl),
    [value, previewUrl]
  );

  React.useEffect(() => {
    return () => {
      if (value && localPreview?.startsWith("blob:")) URL.revokeObjectURL(localPreview);
    };
  }, [value, localPreview]);

  const selectFile = (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) return;
    onChange(file);
  };

  if (value || previewUrl) {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
        <img
          src={localPreview}
          alt="Selected civic issue"
          className={`${compact ? "h-40" : "h-64"} w-full object-cover`}
        />
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-slate-950/70 to-transparent p-4 pt-10">
          <div className="flex items-center gap-2 text-white">
            <FileImage size={15} />
            <span className="max-w-[220px] truncate text-xs font-semibold">
              {value?.name || "Uploaded issue image"}
            </span>
          </div>
          <button
            onClick={() => onChange(null)}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15 text-white backdrop-blur hover:bg-white/25"
            aria-label="Remove image"
          >
            <X size={15} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      onDragEnter={e => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragOver={e => e.preventDefault()}
      onDragLeave={() => setDragging(false)}
      onDrop={e => {
        e.preventDefault();
        setDragging(false);
        selectFile(e.dataTransfer.files?.[0]);
      }}
      className={`rounded-2xl border-2 border-dashed p-8 text-center transition ${
        dragging
          ? "border-slate-500 bg-slate-50"
          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={e => selectFile(e.target.files?.[0])}
        disabled={disabled}
      />

      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-600">
        <UploadCloud size={23} />
      </div>
      <h3 className="mt-4 text-sm font-bold text-slate-900">
        Add a photo of the issue
      </h3>
      <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-slate-500">
        Clear photos help the AI identify the issue and estimate its impact.
      </p>

      <div className="mt-5 flex justify-center gap-2">
        <Button
          size="sm"
          onClick={() => inputRef.current?.click()}
          leftIcon={<FileImage size={14} />}
          disabled={disabled}
        >
          Choose photo
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => inputRef.current?.click()}
          leftIcon={<Camera size={14} />}
          disabled={disabled}
        >
          Camera
        </Button>
      </div>
      <p className="mt-3 text-[10px] text-slate-400">JPG, PNG or WEBP · max 10 MB</p>
    </div>
  );
}
