import {
  CheckCircle2,
  Clock3,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import { useState } from "react";

interface VerificationPanelProps {
  reportId: string;
}

const VerificationPanel = ({
  reportId,
}: VerificationPanelProps) => {
  const [selected, setSelected] = useState<
    "verified" | "not_resolved" | null
  >(null);

  const [submitted, setSubmitted] = useState(false);

  const handleVerification = (
    value: "verified" | "not_resolved"
  ) => {
    setSelected(value);
    setSubmitted(false);
  };

  const submitVerification = () => {
    if (!selected) return;

    // Backend API will be connected here later.
    console.log("Verification:", {
      reportId,
      status: selected,
    });

    setSubmitted(true);
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
          <ShieldCheck size={19} />
        </div>

        <div>
          <h2 className="font-semibold text-slate-800">
            Verify resolution
          </h2>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            Check the resolution evidence and tell us whether
            the reported issue has actually been addressed.
          </p>
        </div>
      </div>

      {!submitted ? (
        <>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {/* Resolved */}
            <button
              type="button"
              onClick={() =>
                handleVerification("verified")
              }
              className={`rounded-xl border p-4 text-left transition ${
                selected === "verified"
                  ? "border-emerald-500 bg-emerald-50"
                  : "border-slate-200 bg-white hover:border-emerald-300 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-start gap-3">
                <CheckCircle2
                  size={20}
                  className={
                    selected === "verified"
                      ? "text-emerald-600"
                      : "text-slate-400"
                  }
                />

                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Issue is resolved
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    The resolution evidence matches the
                    reported issue.
                  </p>
                </div>
              </div>
            </button>

            {/* Not resolved */}
            <button
              type="button"
              onClick={() =>
                handleVerification("not_resolved")
              }
              className={`rounded-xl border p-4 text-left transition ${
                selected === "not_resolved"
                  ? "border-red-400 bg-red-50"
                  : "border-slate-200 bg-white hover:border-red-300 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-start gap-3">
                <XCircle
                  size={20}
                  className={
                    selected === "not_resolved"
                      ? "text-red-600"
                      : "text-slate-400"
                  }
                />

                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Still not resolved
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    The issue is still present or the evidence
                    is insufficient.
                  </p>
                </div>
              </div>
            </button>
          </div>

          <button
            type="button"
            disabled={!selected}
            onClick={submitVerification}
            className="mt-5 w-full rounded-xl bg-[#143c2e] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1c513e] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Submit verification
          </button>
        </>
      ) : (
        <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <div className="flex items-start gap-3">
            <CheckCircle2
              size={20}
              className="mt-0.5 text-emerald-600"
            />

            <div>
              <p className="text-sm font-semibold text-emerald-800">
                Verification submitted
              </p>

              <p className="mt-1 text-xs leading-5 text-emerald-700">
                Thank you. Your feedback has been recorded for
                this civic issue.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 flex items-start gap-2 text-[11px] leading-5 text-slate-400">
        <Clock3 size={14} className="mt-0.5 shrink-0" />

        <span>
          Your verification helps maintain an accurate civic
          issue status.
        </span>
      </div>
    </section>
  );
};

export default VerificationPanel;