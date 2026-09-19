import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  CheckCircle2,
  FileImage,
  MapPin,
  RefreshCw,
  Sparkles,
  Upload,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

type Step = 1 | 2 | 3;

interface LocationData {
  latitude: number;
  longitude: number;
  address: string;
}

const ReportIssue = () => {
  const [step, setStep] = useState<Step>(1);

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  const [location, setLocation] =
    useState<LocationData | null>(null);

  const [description, setDescription] =
    useState("");

  const [analyzing, setAnalyzing] =
    useState(false);

  const [analysisComplete, setAnalysisComplete] =
    useState(false);

  const [submitted, setSubmitted] =
    useState(false);

  const [dragActive, setDragActive] =
    useState(false);

  const [error, setError] =
    useState("");

  /* ---------------- IMAGE ---------------- */

  const handleImage = (file: File) => {
    setError("");

    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Image must be smaller than 10 MB.");
      return;
    }

    setImage(file);

    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      handleImage(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setPreview("");
    setAnalysisComplete(false);
  };

  /* ---------------- LOCATION ---------------- */

  const detectLocation = () => {
    setError("");

    if (!navigator.geolocation) {
      setError(
        "Geolocation is not supported by this browser."
      );
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          address: "Current detected location",
        });
      },
      () => {
        setError(
          "Location permission was denied. You can continue without GPS."
        );
      }
    );
  };

  /* ---------------- AI ANALYSIS ---------------- */

  const runAnalysis = () => {
    if (!image) {
      setError("Please upload an image first.");
      return;
    }

    setError("");
    setAnalyzing(true);

    setTimeout(() => {
      setAnalyzing(false);
      setAnalysisComplete(true);
    }, 1800);
  };

  /* ---------------- SUBMIT ---------------- */

  const submitReport = () => {
    setSubmitted(true);
  };

  /* ---------------- CLEANUP ---------------- */

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  /* ---------------- SUCCESS ---------------- */

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 px-6 py-12">
        <div className="mx-auto max-w-2xl">

          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
              <CheckCircle2
                size={34}
                className="text-emerald-600"
              />
            </div>

            <h1 className="mt-6 text-2xl font-bold text-slate-900">
              Report Submitted
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
              Your civic issue has been successfully
              submitted for review.
            </p>

            <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5 text-left">

              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Civic Issue ID
              </p>

              <p className="mt-1 text-lg font-bold text-slate-900">
                KAN-{Math.floor(
                  1000 + Math.random() * 9000
                )}
              </p>

              <p className="mt-3 text-xs text-slate-500">
                You can track the status from My Reports.
              </p>

            </div>

            <div className="mt-7 flex justify-center gap-3">

              <Link
                to="/my-reports"
                className="rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
              >
                View My Reports
              </Link>

              <Link
                to="/dashboard"
                className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Dashboard
              </Link>

            </div>

          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* HEADER */}

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">

          <div>
            <Link
              to="/dashboard"
              className="mb-2 flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900"
            >
              <ArrowLeft size={16} />
              Back to dashboard
            </Link>

            <h1 className="text-2xl font-bold text-slate-950">
              Report a Civic Issue
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Help improve accessibility and public
              infrastructure in your area.
            </p>
          </div>

          <div className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 md:flex">
            <Sparkles
              size={16}
              className="text-emerald-600"
            />

            <span className="text-xs font-medium text-slate-600">
              AI-assisted reporting
            </span>
          </div>

        </div>
      </header>

      {/* CONTENT */}

      <main className="mx-auto max-w-6xl px-6 py-8">

        {/* STEPS */}

        <div className="mb-8 flex items-center">

          <StepIndicator
            number="01"
            title="Photo"
            active={step === 1}
            completed={step > 1}
          />

          <div className="h-px flex-1 bg-slate-200" />

          <StepIndicator
            number="02"
            title="Location"
            active={step === 2}
            completed={step > 2}
          />

          <div className="h-px flex-1 bg-slate-200" />

          <StepIndicator
            number="03"
            title="Review"
            active={step === 3}
            completed={false}
          />

        </div>

        {/* ERROR */}

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* STEP 1 */}

        {step === 1 && (
          <div className="grid gap-6 lg:grid-cols-[1fr_360px]">

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <div className="mb-6">
                <p className="text-sm font-semibold text-slate-900">
                  Add a photo
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Take a clear photo of the problem or
                  upload one from your device.
                </p>
              </div>

              {!preview ? (
                <label
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragActive(true);
                  }}
                  onDragLeave={() =>
                    setDragActive(false)
                  }
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragActive(false);

                    const file =
                      e.dataTransfer.files?.[0];

                    if (file) {
                      handleImage(file);
                    }
                  }}
                  className={`flex min-h-[360px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition ${
                    dragActive
                      ? "border-emerald-500 bg-emerald-50"
                      : "border-slate-300 bg-slate-50 hover:border-slate-400 hover:bg-slate-100"
                  }`}
                >

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />

                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm">
                    <FileImage
                      size={30}
                      className="text-slate-500"
                    />
                  </div>

                  <p className="mt-5 text-sm font-semibold text-slate-800">
                    Drop an image here
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    or choose a file from your device
                  </p>

                  <div className="mt-5 flex gap-3">

                    <span className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white">
                      <Upload size={16} />
                      Upload Photo
                    </span>

                    <span className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700">
                      <Camera size={16} />
                      Camera
                    </span>

                  </div>

                  <p className="mt-5 text-xs text-slate-400">
                    JPG, PNG or WEBP · Maximum 10 MB
                  </p>

                </label>
              ) : (
                <div className="relative overflow-hidden rounded-xl border border-slate-200">

                  <img
                    src={preview}
                    alt="Selected civic issue"
                    className="h-[360px] w-full object-cover"
                  />

                  <button
                    onClick={removeImage}
                    className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-700 shadow-md hover:bg-slate-100"
                  >
                    <X size={18} />
                  </button>

                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-5 pt-12">

                    <p className="truncate text-sm font-medium text-white">
                      {image?.name}
                    </p>

                    <p className="mt-1 text-xs text-white/70">
                      Ready for AI analysis
                    </p>

                  </div>

                </div>
              )}

            </div>

            {/* SIDE INFO */}

            <div className="space-y-4">

              <InfoCard
                title="What can you report?"
                items={[
                  "Blocked footpaths",
                  "Missing or damaged ramps",
                  "Potholes and broken roads",
                  "Garbage accumulation",
                  "Open drains",
                  "Unsafe public spaces",
                ]}
              />

              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">

                <div className="flex gap-3">

                  <Sparkles
                    size={20}
                    className="mt-0.5 text-emerald-700"
                  />

                  <div>

                    <p className="text-sm font-semibold text-emerald-900">
                      AI analysis
                    </p>

                    <p className="mt-1 text-xs leading-5 text-emerald-800">
                      The system will analyze your photo
                      for issue type, severity and
                      accessibility impact.
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>
        )}

        {/* STEP 2 */}

        {step === 2 && (
          <div className="grid gap-6 lg:grid-cols-[1fr_360px]">

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <div className="mb-6">

                <p className="text-sm font-semibold text-slate-900">
                  Where did this happen?
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Add the location so the issue can be
                  routed to the appropriate department.
                </p>

              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">

                <div className="flex min-h-[280px] flex-col items-center justify-center text-center">

                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
                    <MapPin
                      size={25}
                      className="text-emerald-600"
                    />
                  </div>

                  {!location ? (
                    <>
                      <h3 className="mt-5 text-base font-semibold text-slate-900">
                        Add your location
                      </h3>

                      <p className="mt-2 max-w-sm text-sm text-slate-500">
                        Allow location access to automatically
                        attach your current coordinates.
                      </p>

                      <button
                        onClick={detectLocation}
                        className="mt-5 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
                      >
                        <MapPin size={16} />
                        Detect My Location
                      </button>
                    </>
                  ) : (
                    <>
                      <h3 className="mt-5 text-base font-semibold text-slate-900">
                        Location detected
                      </h3>

                      <p className="mt-2 text-sm text-slate-500">
                        {location.address}
                      </p>

                      <div className="mt-4 rounded-lg bg-white px-4 py-3 text-xs text-slate-500">
                        {location.latitude.toFixed(6)},{" "}
                        {location.longitude.toFixed(6)}
                      </div>
                    </>
                  )}

                </div>

              </div>

              <div className="mt-6">

                <label className="text-sm font-medium text-slate-800">
                  Additional description
                </label>

                <textarea
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
                  placeholder="Describe anything important that may not be visible in the photo..."
                  rows={5}
                  className="mt-2 w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-100"
                />

                <p className="mt-1 text-right text-xs text-slate-400">
                  {description.length}/1000
                </p>

              </div>

            </div>

            <div>

              <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

                {preview && (
                  <img
                    src={preview}
                    alt="Issue preview"
                    className="h-52 w-full object-cover"
                  />
                )}

                <div className="p-5">

                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Selected evidence
                  </p>

                  <p className="mt-2 truncate text-sm font-semibold text-slate-800">
                    {image?.name}
                  </p>

                  <button
                    onClick={() => setStep(1)}
                    className="mt-4 text-sm font-semibold text-slate-600 hover:text-slate-900"
                  >
                    Change photo
                  </button>

                </div>

              </div>

            </div>

          </div>
        )}

        {/* STEP 3 */}

        {step === 3 && (
          <div className="grid gap-6 lg:grid-cols-[1fr_380px]">

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <div className="mb-6 flex items-center justify-between">

                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    AI analysis
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Review the detected issue before
                    submitting.
                  </p>
                </div>

                <Sparkles
                  size={20}
                  className="text-emerald-600"
                />

              </div>

              {!analysisComplete ? (
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-8 text-center">

                  {analyzing ? (
                    <>
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white">
                        <RefreshCw
                          size={25}
                          className="animate-spin text-emerald-600"
                        />
                      </div>

                      <h3 className="mt-5 text-base font-semibold text-slate-900">
                        Analyzing your photo
                      </h3>

                      <p className="mt-2 text-sm text-slate-500">
                        Detecting civic issues and
                        accessibility impact...
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
                        <Sparkles
                          size={25}
                          className="text-emerald-600"
                        />
                      </div>

                      <h3 className="mt-5 text-base font-semibold text-slate-900">
                        Ready for analysis
                      </h3>

                      <p className="mt-2 text-sm text-slate-500">
                        Run AI analysis to identify the
                        civic issue.
                      </p>

                      <button
                        onClick={runAnalysis}
                        className="mt-5 rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
                      >
                        Analyze Photo
                      </button>
                    </>
                  )}

                </div>
              ) : (
                <div className="space-y-4">

                  <ResultRow
                    label="Detected issue"
                    value="Blocked footpath"
                  />

                  <ResultRow
                    label="Category"
                    value="Accessibility"
                  />

                  <ResultRow
                    label="Confidence"
                    value="92%"
                  />

                  <ResultRow
                    label="Severity"
                    value="High"
                  />

                  <ResultRow
                    label="Accessibility impact"
                    value="Pedestrian / wheelchair route affected"
                  />

                  <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">

                    <p className="text-xs font-semibold text-amber-800">
                      AI assessment
                    </p>

                    <p className="mt-1 text-sm leading-5 text-amber-900">
                      The visible obstruction appears to
                      restrict pedestrian movement on the
                      footpath.
                    </p>

                  </div>

                </div>
              )}

            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <p className="text-sm font-semibold text-slate-900">
                Report summary
              </p>

              <div className="mt-5 space-y-4">

                <SummaryItem
                  label="Photo"
                  value={image?.name || "Not selected"}
                />

                <SummaryItem
                  label="Location"
                  value={
                    location
                      ? `${location.latitude.toFixed(
                          4
                        )}, ${location.longitude.toFixed(4)}`
                      : "Not provided"
                  }
                />

                <SummaryItem
                  label="Description"
                  value={
                    description ||
                    "No additional description"
                  }
                />

              </div>

              {analysisComplete && (
                <button
                  onClick={submitReport}
                  className="mt-7 flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
                >
                  Submit Civic Report
                  <ArrowRight size={17} />
                </button>
              )}

            </div>

          </div>
        )}

        {/* NAVIGATION */}

        <div className="mt-8 flex justify-between">

          {step > 1 ? (
            <button
              onClick={() =>
                setStep((step - 1) as Step)
              }
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              <ArrowLeft size={16} />
              Back
            </button>
          ) : (
            <div />
          )}

          {step === 1 && image && (
            <button
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Continue
              <ArrowRight size={16} />
            </button>
          )}

          {step === 2 && (
            <button
              onClick={() => setStep(3)}
              className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Review Report
              <ArrowRight size={16} />
            </button>
          )}

        </div>

      </main>

    </div>
  );
};

/* =====================================================
   COMPONENTS
===================================================== */

interface StepIndicatorProps {
  number: string;
  title: string;
  active: boolean;
  completed: boolean;
}

const StepIndicator = ({
  number,
  title,
  active,
  completed,
}: StepIndicatorProps) => {
  return (
    <div className="flex items-center gap-3 px-3">

      <div
        className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold ${
          completed
            ? "bg-emerald-600 text-white"
            : active
            ? "bg-slate-900 text-white"
            : "bg-slate-100 text-slate-400"
        }`}
      >
        {completed ? (
          <CheckCircle2 size={17} />
        ) : (
          number
        )}
      </div>

      <span
        className={`hidden text-sm font-medium sm:block ${
          active
            ? "text-slate-900"
            : "text-slate-400"
        }`}
      >
        {title}
      </span>

    </div>
  );
};

const InfoCard = ({
  title,
  items,
}: {
  title: string;
  items: string[];
}) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

      <p className="text-sm font-semibold text-slate-900">
        {title}
      </p>

      <div className="mt-4 space-y-3">

        {items.map((item) => (
          <div
            key={item}
            className="flex items-center gap-3"
          >
            <CheckCircle2
              size={16}
              className="shrink-0 text-emerald-600"
            />

            <span className="text-sm text-slate-600">
              {item}
            </span>
          </div>
        ))}

      </div>

    </div>
  );
};

const ResultRow = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <div className="flex items-start justify-between gap-6 rounded-lg border border-slate-200 p-4">

      <span className="text-sm text-slate-500">
        {label}
      </span>

      <span className="text-right text-sm font-semibold text-slate-900">
        {value}
      </span>

    </div>
  );
};

const SummaryItem = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <div>

      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 truncate text-sm text-slate-700">
        {value}
      </p>

    </div>
  );
};

export default ReportIssue;