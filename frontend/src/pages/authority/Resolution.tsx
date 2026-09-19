import {
  ArrowLeft,
  CheckCircle2,
  FileImage,
  Loader2,
  MapPin,
  UploadCloud,
} from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import useIssues from "../../hooks/useIssues";

const Resolution = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    selectedIssue,
    loading,
    fetchIssue,
    updateIssue,
  } = useIssues();

  const [file, setFile] = useState<File | null>(
    null
  );

  const [preview, setPreview] = useState<
    string | null
  >(null);

  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] =
    useState(false);

  useEffect(() => {
    if (id) fetchIssue(id);
  }, [id, fetchIssue]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f7f6] p-8">
        <div className="mx-auto max-w-5xl">
          <div className="h-9 w-72 animate-pulse rounded bg-slate-200" />
          <div className="mt-6 h-[500px] animate-pulse rounded-2xl bg-slate-200" />
        </div>
      </div>
    );
  }

  if (!selectedIssue) {
    return null;
  }

  const issue: any = selectedIssue;

  const handleFile = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selected =
      event.target.files?.[0];

    if (!selected) return;

    setFile(selected);
    setPreview(
      URL.createObjectURL(selected)
    );
  };

  const submitResolution = async () => {
    if (!id || !file) return;

    setSubmitting(true);

    try {
      /*
       * Backend integration point:
       *
       * await resolutionApi.createResolution(id, {
       *   image: file,
       *   notes
       * })
       *
       * For now update status through existing issue API.
       */

      await updateIssue(id, {
        status: "VERIFICATION",
        resolutionNotes: notes,
      });

      navigate(
        `/authority/issues/${id}`
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7f6] px-4 py-6 md:px-8">
      <div className="mx-auto max-w-6xl">

        <Link
          to={`/authority/issues/${id}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-[#21634d]"
        >
          <ArrowLeft size={16} />
          Back to issue
        </Link>

        <div className="mt-5">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-[#e8f2ed] px-3 py-1 font-mono text-xs font-bold text-[#21634d]">
              {issue.civicIssueId ||
                issue.id}
            </span>

            <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
              Resolution
            </span>
          </div>

          <h1 className="mt-3 text-3xl font-bold text-[#14251f]">
            Submit resolution evidence
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Add a clear after-photo and a short note
            describing the work completed.
          </p>
        </div>

        <div className="mt-7 grid gap-6 lg:grid-cols-2">

          {/* Before */}
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-100 p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                Before
              </p>

              <h2 className="mt-1 font-semibold text-slate-800">
                Original evidence
              </h2>
            </div>

            <div className="bg-slate-50">
              {issue.imageUrl ? (
                <img
                  src={issue.imageUrl}
                  alt="Original issue"
                  className="h-[400px] w-full object-contain"
                />
              ) : (
                <div className="flex h-[400px] items-center justify-center text-slate-400">
                  No original image
                </div>
              )}
            </div>
          </section>

          {/* After */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                After
              </p>

              <h2 className="mt-1 font-semibold text-slate-800">
                Resolution evidence
              </h2>
            </div>

            {!preview ? (
              <label className="mt-5 flex h-[400px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 transition hover:border-[#91bda9] hover:bg-[#f6faf8]">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#21634d] shadow-sm">
                  <UploadCloud size={25} />
                </div>

                <p className="mt-4 text-sm font-semibold text-slate-700">
                  Upload after-photo
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  JPG, PNG or WebP
                </p>

                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleFile}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="mt-5 overflow-hidden rounded-xl bg-slate-50">
                <img
                  src={preview}
                  alt="Resolution preview"
                  className="h-[400px] w-full object-contain"
                />
              </div>
            )}
          </section>
        </div>

        {/* Details */}
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center gap-3">
            <FileImage
              size={19}
              className="text-[#21634d]"
            />

            <div>
              <h2 className="font-semibold text-slate-800">
                Resolution details
              </h2>

              <p className="text-xs text-slate-500">
                Give citizens and reviewers useful context.
              </p>
            </div>
          </div>

          <textarea
            value={notes}
            onChange={(e) =>
              setNotes(e.target.value)
            }
            rows={5}
            placeholder="Example: Damaged pavement was repaired and the pedestrian path was cleared..."
            className="mt-5 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none focus:border-[#4c8c72] focus:bg-white"
          />

          <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
            <MapPin size={14} />
            {issue.location?.address ||
              "Issue location"}
          </div>
        </section>

        {/* Submit */}
        <div className="mt-6 flex justify-end">

          <button
            disabled={!file || submitting}
            onClick={submitResolution}
            className="inline-flex items-center gap-2 rounded-xl bg-[#143c2e] px-6 py-3 text-sm font-semibold text-white shadow-sm disabled:cursor-not-allowed disabled:opacity-40"
          >
            {submitting ? (
              <>
                <Loader2
                  size={17}
                  className="animate-spin"
                />
                Saving resolution...
              </>
            ) : (
              <>
                <CheckCircle2 size={17} />
                Submit for verification
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Resolution;