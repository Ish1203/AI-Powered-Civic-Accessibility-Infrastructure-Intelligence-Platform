import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  Footprints,
  MapPin,
  Menu,
  ShieldCheck,
  Sparkles,
  Trash2,
  TriangleAlert,
  X,
} from "lucide-react";
import { useState, type ReactNode } from "react";

import { Link } from "react-router-dom";

const Landing = () => {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* ================= NAVBAR ================= */}

      <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">

          {/* Logo */}

          <Link
            to="/"
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400">
              <ShieldCheck
                size={23}
                className="text-slate-950"
              />
            </div>

            <div>
              <div className="font-semibold tracking-tight">
                AccessPath AI
              </div>

              <div className="hidden text-[11px] text-slate-500 sm:block">
                Civic Intelligence Platform
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}

          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#how-it-works"
              className="text-sm text-slate-400 transition hover:text-white"
            >
              How it works
            </a>

            <a
              href="#issues"
              className="text-sm text-slate-400 transition hover:text-white"
            >
              Issues
            </a>

            <a
              href="#map"
              className="text-sm text-slate-400 transition hover:text-white"
            >
              Civic map
            </a>

            <a
              href="#mission"
              className="text-sm text-slate-400 transition hover:text-white"
            >
              Our mission
            </a>
          </nav>

          {/* Desktop Actions */}

          <div className="hidden items-center gap-3 md:flex">
            <Link
              to="/login"
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-900 hover:text-white"
            >
              Sign in
            </Link>

            <Link
              to="/register"
              className="flex items-center gap-2 rounded-lg bg-emerald-400 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
            >
              Report an issue
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* Mobile button */}

          <button
            type="button"
            onClick={() => setMobileMenu(!mobileMenu)}
            className="rounded-lg p-2 text-slate-300 hover:bg-slate-900 md:hidden"
          >
            {mobileMenu ? (
              <X size={22} />
            ) : (
              <Menu size={22} />
            )}
          </button>
        </div>

        {/* Mobile menu */}

        {mobileMenu && (
          <div className="border-t border-slate-800 bg-slate-950 px-5 py-5 md:hidden">

            <div className="flex flex-col gap-1">

              <a
                href="#how-it-works"
                onClick={() => setMobileMenu(false)}
                className="rounded-lg px-3 py-3 text-sm text-slate-300 hover:bg-slate-900"
              >
                How it works
              </a>

              <a
                href="#issues"
                onClick={() => setMobileMenu(false)}
                className="rounded-lg px-3 py-3 text-sm text-slate-300 hover:bg-slate-900"
              >
                Issues
              </a>

              <a
                href="#map"
                onClick={() => setMobileMenu(false)}
                className="rounded-lg px-3 py-3 text-sm text-slate-300 hover:bg-slate-900"
              >
                Civic map
              </a>

              <Link
                to="/login"
                className="mt-3 rounded-lg border border-slate-700 px-4 py-3 text-center text-sm"
              >
                Sign in
              </Link>

              <Link
                to="/register"
                className="rounded-lg bg-emerald-400 px-4 py-3 text-center text-sm font-semibold text-slate-950"
              >
                Report an issue
              </Link>

            </div>
          </div>
        )}
      </header>

      {/* ================= HERO ================= */}

      <main>

        <section className="relative overflow-hidden border-b border-slate-800">

          {/* Background grid */}

          <div className="pointer-events-none absolute inset-0 opacity-[0.08]">
            <div
              className="h-full w-full"
              style={{
                backgroundImage:
                  "linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />
          </div>

          <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 sm:px-6 md:py-28 lg:grid-cols-[1.05fr_.95fr] lg:px-8">

            {/* Hero text */}

            <div>

              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1.5 text-xs font-medium text-emerald-300">
                <Sparkles size={13} />
                AI-powered civic reporting
              </div>

              <h1 className="max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                Make every street
                <span className="block text-emerald-400">
                  more accessible.
                </span>
              </h1>

              <p className="mt-7 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
                Report accessibility barriers, potholes,
                garbage and civic hazards using a photo.
                AccessPath AI turns citizen observations
                into structured, actionable civic reports.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">

                <Link
                  to="/register"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-400 px-6 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
                >
                  Report a civic issue
                  <ArrowRight size={17} />
                </Link>

                <a
                  href="#map"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 px-6 py-3.5 text-sm font-medium text-slate-200 transition hover:border-slate-500 hover:bg-slate-900"
                >
                  Explore civic map
                  <MapPin size={17} />
                </a>

              </div>

              {/* Trust points */}

              <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-xs text-slate-500">

                <div className="flex items-center gap-2">
                  <CheckCircle2
                    size={15}
                    className="text-emerald-400"
                  />
                  Photo-based reporting
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2
                    size={15}
                    className="text-emerald-400"
                  />
                  Location aware
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2
                    size={15}
                    className="text-emerald-400"
                  />
                  Transparent priority
                </div>

              </div>
            </div>

            {/* Hero dashboard mockup */}

            <div className="relative">

              <div className="absolute -inset-5 rounded-[2rem] bg-emerald-400/5 blur-3xl" />

              <div className="relative overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl">

                {/* Browser top */}

                <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">

                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />
                  </div>

                  <div className="text-[10px] text-slate-600">
                    civic-map / live
                  </div>

                </div>

                {/* Map */}

                <div className="relative h-[330px] overflow-hidden bg-[#172334]">

                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage:
                        "linear-gradient(35deg, transparent 47%, #64748b 48%, #64748b 49%, transparent 50%), linear-gradient(125deg, transparent 47%, #64748b 48%, #64748b 49%, transparent 50%)",
                      backgroundSize: "110px 90px",
                    }}
                  />

                  <div className="absolute left-[18%] top-[24%] h-3 w-3 rounded-full bg-red-400 ring-4 ring-red-400/20" />

                  <div className="absolute left-[57%] top-[38%] h-3 w-3 rounded-full bg-amber-400 ring-4 ring-amber-400/20" />

                  <div className="absolute left-[40%] top-[63%] h-3 w-3 rounded-full bg-emerald-400 ring-4 ring-emerald-400/20" />

                  <div className="absolute right-[18%] top-[20%] h-3 w-3 rounded-full bg-red-400 ring-4 ring-red-400/20" />

                  {/* Selected issue */}

                  <div className="absolute left-[43%] top-[40%]">

                    <div className="relative">

                      <div className="absolute -inset-2 animate-pulse rounded-full bg-emerald-400/20" />

                      <div className="relative flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-emerald-400 text-slate-950 shadow-lg">
                        <MapPin size={17} />
                      </div>

                    </div>

                  </div>

                  {/* Map label */}

                  <div className="absolute left-4 top-4 rounded-lg border border-slate-700 bg-slate-950/90 px-3 py-2">
                    <p className="text-[10px] text-slate-500">
                      CURRENT AREA
                    </p>
                    <p className="mt-0.5 text-xs font-medium">
                      Civic issue map
                    </p>
                  </div>

                  {/* Selected issue card */}

                  <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-slate-700 bg-slate-950/95 p-4">

                    <div className="flex items-start justify-between">

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="rounded-md bg-red-500/10 px-2 py-1 text-[10px] font-semibold text-red-300">
                            HIGH PRIORITY
                          </span>

                          <span className="text-[10px] text-slate-500">
                            KAN-2048
                          </span>
                        </div>

                        <p className="mt-2 text-sm font-medium">
                          Blocked pedestrian route
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Accessibility • AI verified
                        </p>
                      </div>

                      <ChevronRight
                        size={17}
                        className="text-slate-500"
                      />

                    </div>

                  </div>

                </div>

                {/* Bottom stats */}

                <div className="grid grid-cols-3 divide-x divide-slate-800 border-t border-slate-800">

                  <div className="p-4">
                    <p className="text-lg font-semibold">
                      128
                    </p>
                    <p className="mt-1 text-[10px] text-slate-500">
                      OPEN ISSUES
                    </p>
                  </div>

                  <div className="p-4">
                    <p className="text-lg font-semibold">
                      34
                    </p>
                    <p className="mt-1 text-[10px] text-slate-500">
                      ACCESSIBILITY
                    </p>
                  </div>

                  <div className="p-4">
                    <p className="text-lg font-semibold text-emerald-400">
                      76%
                    </p>
                    <p className="mt-1 text-[10px] text-slate-500">
                      RESOLVED
                    </p>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </section>

        {/* ================= HOW IT WORKS ================= */}

        <section
          id="how-it-works"
          className="border-b border-slate-800 bg-slate-900/30"
        >
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8">

            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400">
                Simple reporting
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                From observation to action.
              </h2>

              <p className="mt-4 text-slate-400">
                A civic issue should not disappear after
                someone takes a photograph. AccessPath AI
                connects the complete workflow.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-3">

              <StepCard
                number="01"
                icon={<CircleAlert size={20} />}
                title="Capture the problem"
                description="Take a photo, add the location and tell us what you observed."
              />

              <StepCard
                number="02"
                icon={<Sparkles size={20} />}
                title="AI understands it"
                description="The analysis pipeline identifies the issue, impact, severity and relevant category."
              />

              <StepCard
                number="03"
                icon={<CheckCircle2 size={20} />}
                title="Route the action"
                description="Generate a structured report, route it to the responsible team and track resolution."
              />

            </div>
          </div>
        </section>

        {/* ================= ISSUES ================= */}

        <section
          id="issues"
          className="border-b border-slate-800"
        >
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8">

            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400">
                  What you can report
                </p>

                <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                  Everyday problems deserve visibility.
                </h2>
              </div>

              <p className="max-w-md text-sm leading-6 text-slate-500">
                Start with the problems people encounter
                every day while walking, commuting or using
                public spaces.
              </p>

            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

              <IssueCard
                icon={<Footprints size={22} />}
                title="Accessibility"
                items={[
                  "Blocked footpaths",
                  "Missing ramps",
                  "Uneven pavement",
                  "Dangerous obstacles",
                ]}
              />

              <IssueCard
                icon={<TriangleAlert size={22} />}
                title="Road & infrastructure"
                items={[
                  "Potholes",
                  "Damaged curbs",
                  "Unsafe crossings",
                  "Broken infrastructure",
                ]}
              />

              <IssueCard
                icon={<Trash2 size={22} />}
                title="Cleanliness"
                items={[
                  "Garbage accumulation",
                  "Illegal dumping",
                  "Overflowing bins",
                  "Scattered waste",
                ]}
              />

              <IssueCard
                icon={<ShieldCheck size={22} />}
                title="Public safety"
                items={[
                  "Open drains",
                  "Unsafe routes",
                  "Road hazards",
                  "Public-space risks",
                ]}
              />

            </div>
          </div>
        </section>

        {/* ================= ACCESSIBILITY ================= */}

        <section
          id="mission"
          className="border-b border-slate-800 bg-slate-900/30"
        >
          <div className="mx-auto grid max-w-7xl gap-14 px-5 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400">
                Accessibility first
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Public spaces should work for everyone.
              </h2>

              <p className="mt-5 max-w-xl leading-7 text-slate-400">
                AccessPath AI gives accessibility problems
                dedicated visibility instead of treating them
                as ordinary infrastructure complaints.
              </p>

              <div className="mt-8 space-y-4">

                <Feature
                  title="Pedestrian route analysis"
                  description="Identify visible obstructions and blocked walking paths."
                />

                <Feature
                  title="Accessibility impact"
                  description="Highlight potential barriers affecting wheelchair and pedestrian access."
                />

                <Feature
                  title="Priority based on impact"
                  description="Combine visible severity, accessibility and safety factors into a transparent priority estimate."
                />

              </div>
            </div>

            {/* Accessibility visual */}

            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">

              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">
                    AI accessibility assessment
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Example analysis
                  </p>
                </div>

                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-[10px] font-medium text-emerald-300">
                  ANALYZED
                </span>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">

                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                    <Footprints size={23} />
                  </div>

                  <div>
                    <p className="font-medium">
                      Blocked pedestrian route
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Accessibility impact detected
                    </p>
                  </div>

                </div>

                <div className="mt-6 space-y-4">

                  <Assessment
                    label="Issue confidence"
                    value="92%"
                  />

                  <Assessment
                    label="Safety concern"
                    value="High"
                  />

                  <Assessment
                    label="Accessibility impact"
                    value="Significant"
                  />

                </div>

                <div className="mt-6 rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
                  <p className="text-xs leading-5 text-amber-200/80">
                    AI assessment is an assistive estimate based
                    on visible evidence. Citizens can review and
                    correct the result before submission.
                  </p>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* ================= MAP ================= */}

        <section
          id="map"
          className="border-b border-slate-800"
        >
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8">

            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400">
                  Civic map
                </p>

                <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                  See what is happening around you.
                </h2>
              </div>

              <Link
                to="/login"
                className="inline-flex w-fit items-center gap-2 rounded-lg border border-slate-700 px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-900"
              >
                Open map
                <ArrowRight size={15} />
              </Link>

            </div>

            {/* Fake visual map for landing page */}

            <div className="relative mt-10 h-[400px] overflow-hidden rounded-2xl border border-slate-800 bg-[#172334]">

              <div
                className="absolute inset-0 opacity-25"
                style={{
                  backgroundImage:
                    "linear-gradient(35deg, transparent 47%, #94a3b8 48%, #94a3b8 49%, transparent 50%), linear-gradient(125deg, transparent 47%, #94a3b8 48%, #94a3b8 49%, transparent 50%)",
                  backgroundSize: "130px 100px",
                }}
              />

              {/* roads */}

              <div className="absolute left-[20%] top-[-20%] h-[150%] w-5 rotate-[35deg] bg-slate-700/50" />

              <div className="absolute left-[55%] top-[-20%] h-[150%] w-4 rotate-[-25deg] bg-slate-700/50" />

              <div className="absolute left-[-10%] top-[50%] h-5 w-[120%] rotate-[8deg] bg-slate-700/50" />

              {/* markers */}

              <MapMarker
                left="18%"
                top="30%"
                type="critical"
              />

              <MapMarker
                left="47%"
                top="25%"
                type="warning"
              />

              <MapMarker
                left="66%"
                top="57%"
                type="success"
              />

              <MapMarker
                left="36%"
                top="70%"
                type="warning"
              />

              <MapMarker
                left="79%"
                top="32%"
                type="critical"
              />

              {/* legend */}

              <div className="absolute bottom-5 left-5 rounded-xl border border-slate-700 bg-slate-950/95 p-4">

                <p className="text-xs font-medium">
                  Issue severity
                </p>

                <div className="mt-3 flex gap-5 text-[10px] text-slate-500">

                  <span className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                    Critical
                  </span>

                  <span className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                    Medium
                  </span>

                  <span className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    Resolved
                  </span>

                </div>

              </div>

              {/* map info */}

              <div className="absolute right-5 top-5 rounded-xl border border-slate-700 bg-slate-950/95 p-4">

                <div className="flex items-center gap-2">
                  <MapPin
                    size={15}
                    className="text-emerald-400"
                  />

                  <span className="text-xs font-medium">
                    Civic issue density
                  </span>
                </div>

                <p className="mt-2 text-2xl font-semibold">
                  128
                </p>

                <p className="text-[10px] text-slate-500">
                  issues in visible area
                </p>

              </div>

            </div>
          </div>
        </section>

        {/* ================= CTA ================= */}

        <section>
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8">

            <div className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.06] px-7 py-12 sm:px-12">

              <div className="relative z-10 max-w-2xl">

                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400">
                  Your observation matters
                </p>

                <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                  See a problem?
                  <span className="text-emerald-400">
                    {" "}Report it.
                  </span>
                </h2>

                <p className="mt-4 max-w-xl leading-7 text-slate-400">
                  One photo can help create a structured
                  civic report, identify the right action and
                  make an issue visible to the people
                  responsible for resolving it.
                </p>

                <Link
                  to="/register"
                  className="mt-7 inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-6 py-3.5 text-sm font-semibold text-slate-950 hover:bg-emerald-300"
                >
                  Start a report
                  <ArrowRight size={17} />
                </Link>

              </div>

            </div>

          </div>
        </section>

      </main>

      {/* ================= FOOTER ================= */}

      <footer className="border-t border-slate-800">

        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">

          <div className="flex items-center gap-3">

            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-400">
              <ShieldCheck
                size={17}
                className="text-slate-950"
              />
            </div>

            <div>
              <p className="text-sm font-medium">
                AccessPath AI
              </p>

              <p className="text-[10px] text-slate-600">
                Civic Intelligence Platform
              </p>
            </div>

          </div>

          <p className="text-xs text-slate-600">
            Turn everyday civic problems into actionable intelligence.
          </p>

        </div>

      </footer>

    </div>
  );
};


/* =========================================================
   COMPONENTS
========================================================= */

interface StepCardProps {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const StepCard = ({
  number,
  icon,
  title,
  description,
}: StepCardProps) => {
  return (
    <div className="group rounded-2xl border border-slate-800 bg-slate-950 p-6 transition hover:border-slate-700">

      <div className="flex items-start justify-between">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-emerald-400">
          {icon}
        </div>

        <span className="text-xs font-medium text-slate-700">
          {number}
        </span>

      </div>

      <h3 className="mt-7 text-lg font-semibold">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {description}
      </p>

    </div>
  );
};


interface IssueCardProps {
  icon: React.ReactNode;
  title: string;
  items: string[];
}

const IssueCard = ({
  icon,
  title,
  items,
}: IssueCardProps) => {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">

      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-emerald-400">
        {icon}
      </div>

      <h3 className="mt-5 font-semibold">
        {title}
      </h3>

      <div className="mt-4 space-y-2">

        {items.map((item) => (
          <div
            key={item}
            className="flex items-center gap-2 text-xs text-slate-500"
          >
            <span className="h-1 w-1 rounded-full bg-slate-600" />
            {item}
          </div>
        ))}

      </div>

    </div>
  );
};


const Feature = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex gap-3">

      <CheckCircle2
        size={19}
        className="mt-0.5 shrink-0 text-emerald-400"
      />

      <div>
        <p className="text-sm font-medium">
          {title}
        </p>

        <p className="mt-1 text-sm leading-6 text-slate-500">
          {description}
        </p>
      </div>

    </div>
  );
};


const Assessment = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <div className="flex items-center justify-between border-b border-slate-800 pb-3 last:border-0 last:pb-0">

      <span className="text-xs text-slate-500">
        {label}
      </span>

      <span className="text-xs font-medium text-slate-200">
        {value}
      </span>

    </div>
  );
};


const MapMarker = ({
  left,
  top,
  type,
}: {
  left: string;
  top: string;
  type: "critical" | "warning" | "success";
}) => {

  const classes = {
    critical: "bg-red-400 ring-red-400/20",
    warning: "bg-amber-400 ring-amber-400/20",
    success: "bg-emerald-400 ring-emerald-400/20",
  };

  return (
    <div
      className="absolute"
      style={{
        left,
        top,
      }}
    >
      <div
        className={`h-4 w-4 rounded-full ring-4 ${classes[type]}`}
      />
    </div>
  );
};

export default Landing;