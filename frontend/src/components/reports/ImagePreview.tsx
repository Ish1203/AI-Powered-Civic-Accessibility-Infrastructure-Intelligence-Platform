import { X, Image as ImageIcon } from "lucide-react";

interface ImagePreviewProps {
  src: string;
  fileName?: string;
  onRemove?: () => void;
}

const ImagePreview = ({
  src,
  fileName,
  onRemove,
}: ImagePreviewProps) => {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="relative">

        <img
          src={src}
          alt={fileName || "Selected civic issue"}
          className="h-80 w-full object-cover"
        />

        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            aria-label="Remove image"
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-700 shadow-md transition hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        )}

      </div>

      <div className="flex items-center gap-3 px-4 py-3">

        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100">
          <ImageIcon
            size={17}
            className="text-slate-500"
          />
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-slate-800">
            {fileName || "Selected image"}
          </p>

          <p className="text-xs text-slate-400">
            Image ready for analysis
          </p>
        </div>

      </div>
    </div>
  );
};

export default ImagePreview;