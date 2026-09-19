import {
  CheckCircle2,
  CircleAlert,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

interface VerificationPanelProps {
  status?: "pending" | "verified" | "rejected";
  citizenConfirmed?: boolean;
  onVerify?: () => void;
  onReject?: () => void;
  loading?: boolean;
}

export const VerificationPanel = ({
  status = "pending",
  citizenConfirmed = false,
  onVerify,
  onReject,
  loading = false,
}: VerificationPanelProps) => {
  const statusConfig = {
    pending: {
      label: "Awaiting verification",
      description:
        "The resolution evidence is ready to be reviewed.",
      className:
        "bg-amber-500/10 text-amber-300 border-amber-500/20",
    },

    verified: {
      label: "Resolution verified",
      description:
        "The submitted evidence has been verified.",
      className:
        "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    },

    rejected: {
      label: "Verification rejected",
      description:
        "The submitted evidence needs further review.",
      className:
        "bg-red-500/10 text-red-300 border-red-500/20",
    },
  };

  const current = statusConfig[status];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

      {/* Header */}

      <div className="flex items-start justify-between gap-4">

        <div className="flex gap-3">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-emerald-400">
            <ShieldCheck size={21} />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">
              Resolution verification
            </h3>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Review the resolution evidence before closing
              this civic issue.
            </p>
          </div>

        </div>

        <span
          className={`rounded-full border px-2.5 py-1 text-[10px] font-medium ${current.className}`}
        >
          {current.label}
        </span>

      </div>

      {/* Status */}

      <div className="mt-5 rounded-xl border border-slate-800 bg-slate-950 p-4">

        <div className="flex items-start gap-3">

          {status === "verified" ? (
            <CheckCircle2
              size={18}
              className="mt-0.5 shrink-0 text-emerald-400"
            />
          ) : status === "rejected" ? (
            <CircleAlert
              size={18}
              className="mt-0.5 shrink-0 text-red-400"
            />
          ) : (
            <CircleAlert
              size={18}
              className="mt-0.5 shrink-0 text-amber-400"
            />
          )}

          <div>
            <p className="text-sm font-medium text-slate-200">
              {current.label}
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              {current.description}
            </p>
          </div>

        </div>

      </div>

      {/* Citizen confirmation */}

      <div className="mt-4 flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-4">

        <div className="flex items-center gap-3">

          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900">
            <UserCheck
              size={17}
              className={
                citizenConfirmed
                  ? "text-emerald-400"
                  : "text-slate-500"
              }
            />
          </div>

          <div>
            <p className="text-xs font-medium text-slate-300">
              Citizen confirmation
            </p>

            <p className="mt-1 text-[11px] text-slate-600">
              {citizenConfirmed
                ? "Citizen confirmed the resolution."
                : "Waiting for citizen confirmation."}
            </p>
          </div>

        </div>

        {citizenConfirmed && (
          <CheckCircle2
            size={18}
            className="text-emerald-400"
          />
        )}

      </div>

      {/* Actions */}

      {status === "pending" && (
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">

          {onVerify && (
            <button
              type="button"
              onClick={onVerify}
              disabled={loading}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <CheckCircle2 size={17} />

              {loading
                ? "Verifying..."
                : "Verify resolution"}
            </button>
          )}

          {onReject && (
            <button
              type="button"
              onClick={onReject}
              disabled={loading}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-700 px-4 py-3 text-sm font-medium text-slate-300 transition hover:border-red-500/40 hover:bg-red-500/5 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <CircleAlert size={17} />
              Request further action
            </button>
          )}

        </div>
      )}

      {/* Footer */}

      <p className="mt-4 text-[10px] leading-5 text-slate-600">
        Verification is based on the submitted resolution
        evidence and citizen confirmation. It does not
        represent an official government certification.
      </p>

    </div>
  );
};

export default VerificationPanel;