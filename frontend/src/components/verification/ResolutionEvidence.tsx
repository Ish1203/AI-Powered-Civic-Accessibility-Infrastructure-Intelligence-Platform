import {
  CheckCircle2,
  Image as ImageIcon,
  Upload,
  X,
} from "lucide-react";

import { useEffect, useState } from "react";

interface ResolutionEvidenceProps {
  beforeImage?: string;
  afterImage?: string;
  onUpload?: (file: File) => void;
  onRemove?: () => void;
  disabled?: boolean;
}

export const ResolutionEvidence = ({
  beforeImage,
  afterImage,
  onUpload,
  onRemove,
  disabled = false,
}: ResolutionEvidenceProps) => {
  const [preview, setPreview] = useState<string | null>(
    afterImage || null
  );

  useEffect(() => {
    setPreview(afterImage || null);
  }, [afterImage]);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      return;
    }

    const url = URL.createObjectURL(file);

    setPreview(url);

    onUpload?.(file);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

      {/* Header */}

      <div className="flex items-start justify-between gap-4">

        <div>
          <h3 className="text-sm font-semibold text-white">
            Resolution evidence
          </h3>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            Upload an after-image showing that the reported
            issue has been addressed.
          </p>
        </div>

        {preview && (
          <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-medium text-emerald-300">
            <CheckCircle2 size={12} />
            Evidence added
          </div>
        )}

      </div>

      {/* Before / After */}

      <div className="mt-5 grid gap-4 md:grid-cols-2">

        {/* Before */}

        <div>
          <p className="mb-2 text-xs font-medium text-slate-400">
            Before
          </p>

          <div className="relative aspect-video overflow-hidden rounded-xl border border-slate-800 bg-slate-950">

            {beforeImage ? (
              <img
                src={beforeImage}
                alt="Issue before resolution"
                className="h-full w-full object-cover"
              />
            ) : (
              <EmptyImage
                label="Original issue image"
              />
            )}

          </div>
        </div>

        {/* After */}

        <div>
          <p className="mb-2 text-xs font-medium text-slate-400">
            After
          </p>

          <div className="relative aspect-video overflow-hidden rounded-xl border border-slate-800 bg-slate-950">

            {preview ? (
              <>
                <img
                  src={preview}
                  alt="Resolution evidence"
                  className="h-full w-full object-cover"
                />

                {onRemove && !disabled && (
                  <button
                    type="button"
                    onClick={() => {
                      setPreview(null);
                      onRemove();
                    }}
                    aria-label="Remove resolution evidence"
                    className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-slate-950/90 text-white transition hover:bg-red-500"
                  >
                    <X size={15} />
                  </button>
                )}
              </>
            ) : (
              <label
                className={`flex h-full cursor-pointer flex-col items-center justify-center px-5 text-center transition ${
                  disabled
                    ? "cursor-not-allowed opacity-50"
                    : "hover:bg-slate-900"
                }`}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-slate-500">
                  <Upload size={20} />
                </div>

                <p className="mt-3 text-xs font-medium text-slate-300">
                  Upload after-image
                </p>

                <p className="mt-1 text-[10px] text-slate-600">
                  JPG, PNG or WEBP
                </p>

                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleFileChange}
                  disabled={disabled}
                  className="hidden"
                />
              </label>
            )}

          </div>
        </div>

      </div>

      {/* Verification note */}

      <div className="mt-5 flex gap-3 rounded-xl border border-slate-800 bg-slate-950 p-4">

        <ImageIcon
          size={17}
          className="mt-0.5 shrink-0 text-slate-500"
        />

        <div>
          <p className="text-xs font-medium text-slate-300">
            Why evidence matters
          </p>

          <p className="mt-1 text-[11px] leading-5 text-slate-600">
            Resolution evidence helps the citizen and
            authority compare the reported condition with
            the current state of the location.
          </p>
        </div>

      </div>

    </div>
  );
};


const EmptyImage = ({
  label,
}: {
  label: string;
}) => {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900">
        <ImageIcon
          size={18}
          className="text-slate-600"
        />
      </div>

      <p className="mt-2 text-[11px] text-slate-600">
        {label}
      </p>
    </div>
  );
};

export default ResolutionEvidence;