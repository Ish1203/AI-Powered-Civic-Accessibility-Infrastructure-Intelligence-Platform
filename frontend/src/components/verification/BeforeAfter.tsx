import { ArrowRight, ImageIcon } from "lucide-react";

interface BeforeAfterProps {
  beforeImage?: string;
  afterImage?: string;
}

const BeforeAfter = ({
  beforeImage,
  afterImage,
}: BeforeAfterProps) => {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h2 className="font-semibold text-slate-800">
          Resolution evidence
        </h2>

        <p className="mt-1 text-xs text-slate-500">
          Compare the reported condition with the resolution evidence.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {/* Before */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Before
            </span>

            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-500">
              Original
            </span>
          </div>

          <div className="flex min-h-[220px] items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
            {beforeImage ? (
              <img
                src={beforeImage}
                alt="Original issue"
                className="h-[260px] w-full object-cover"
              />
            ) : (
              <EmptyImage label="Original image unavailable" />
            )}
          </div>
        </div>

        {/* Arrow */}
        <div className="relative md:hidden">
          <div className="absolute left-1/2 -translate-x-1/2 rounded-full border border-slate-200 bg-white p-2 shadow-sm">
            <ArrowRight
              size={15}
              className="rotate-90 text-slate-400"
            />
          </div>
        </div>

        {/* After */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              After
            </span>

            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
              Resolution
            </span>
          </div>

          <div className="flex min-h-[220px] items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
            {afterImage ? (
              <img
                src={afterImage}
                alt="Resolution evidence"
                className="h-[260px] w-full object-cover"
              />
            ) : (
              <EmptyImage label="Resolution image unavailable" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const EmptyImage = ({
  label,
}: {
  label: string;
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-slate-300 shadow-sm">
        <ImageIcon size={20} />
      </div>

      <p className="mt-3 text-xs font-medium text-slate-500">
        {label}
      </p>
    </div>
  );
};

export default BeforeAfter;