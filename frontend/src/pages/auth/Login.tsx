import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";

import { useState } from "react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import useAuth from "../../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useAuth();

  const [showPassword, setShowPassword] =
    useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const from =
    (location.state as { from?: string } | null)?.from ||
    "/dashboard";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");

    // Validation
    if (!form.email.trim() || !form.password) {
      setError(
        "Please enter your email and password."
      );
      return;
    }

    try {
      setLoading(true);

      // Backend:
      // POST http://127.0.0.1:8000/api/auth/login
      const user = await login({
        email: form.email.trim(),
        password: form.password,
      });

      console.log("Login successful:", user);

      // Backend role is returned as:
      // CITIZEN / AUTHORITY / ADMIN
      const role = user?.role?.toUpperCase();

      if (role === "ADMIN") {
        navigate("/admin", { replace: true });
      } else if (role === "AUTHORITY") {
        navigate("/authority", { replace: true });
      } else {
        navigate(from, { replace: true });
      }

    } catch (err: any) {
      console.error("Login error:", err);

      const detail = err?.response?.data?.detail;

      if (typeof detail === "string") {
        setError(detail);
      } else if (Array.isArray(detail)) {
        setError(
          detail
            .map(
              (item: any) =>
                item?.msg || "Invalid input"
            )
            .join(", ")
        );
      } else if (err?.response?.status === 401) {
        setError(
          "Invalid email or password."
        );
      } else {
        setError(
          "Unable to sign in. Please check your credentials."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">

      {/* ================= LEFT PANEL ================= */}

      <div className="hidden lg:flex lg:w-[46%] bg-slate-900 border-r border-slate-800 p-12 flex-col justify-between">

        <div>

          {/* Logo */}

          <Link
            to="/"
            className="inline-flex items-center gap-3"
          >
            <div className="h-10 w-10 rounded-xl bg-emerald-500 flex items-center justify-center">
              <ShieldCheck
                size={23}
                className="text-slate-950"
              />
            </div>

            <div>
              <p className="font-semibold tracking-tight">
                AccessPath AI
              </p>

              <p className="text-xs text-slate-500">
                Civic Intelligence Platform
              </p>
            </div>
          </Link>

          {/* Hero */}

          <div className="mt-24 max-w-lg">

            <p className="text-sm text-emerald-400 font-medium mb-4 tracking-wide">
              CIVIC ACCESSIBILITY
            </p>

            <h1 className="text-4xl xl:text-5xl font-semibold leading-tight">
              Make every street
              <span className="text-emerald-400">
                {" "}more accessible.
              </span>
            </h1>

            <p className="mt-6 text-slate-400 leading-7">
              Report accessibility barriers, road damage,
              garbage and public-space problems. Turn a
              citizen observation into actionable civic
              intelligence.
            </p>

            {/* Features */}

            <div className="mt-8 space-y-4">

              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <ShieldCheck
                    size={17}
                    className="text-emerald-400"
                  />
                </div>

                <span className="text-sm text-slate-400">
                  Secure civic reporting
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <ArrowRight
                    size={17}
                    className="text-emerald-400"
                  />
                </div>

                <span className="text-sm text-slate-400">
                  Track reported issues
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <ShieldCheck
                    size={17}
                    className="text-emerald-400"
                  />
                </div>

                <span className="text-sm text-slate-400">
                  Connect with civic authorities
                </span>
              </div>

            </div>

          </div>

        </div>

        {/* Footer */}

        <div className="border-t border-slate-800 pt-6">

          <p className="text-xs text-slate-500">
            Built for citizens, civic teams and
            public-space improvement.
          </p>

        </div>

      </div>

      {/* ================= LOGIN FORM ================= */}

      <div className="flex-1 flex items-center justify-center p-6">

        <div className="w-full max-w-md">

          {/* Mobile Logo */}

          <div className="lg:hidden mb-10">

            <Link
              to="/"
              className="flex items-center gap-3"
            >
              <div className="h-10 w-10 rounded-xl bg-emerald-500 flex items-center justify-center">
                <ShieldCheck
                  size={23}
                  className="text-slate-950"
                />
              </div>

              <div>
                <p className="font-semibold">
                  AccessPath AI
                </p>

                <p className="text-xs text-slate-500">
                  Civic Intelligence
                </p>
              </div>
            </Link>

          </div>

          {/* Heading */}

          <div className="mb-8">

            <p className="text-sm text-emerald-400 font-medium mb-2">
              WELCOME BACK
            </p>

            <h2 className="text-3xl font-semibold">
              Sign in
            </h2>

            <p className="text-slate-400 mt-2">
              Continue to your civic workspace.
            </p>

          </div>

          {/* Error */}

          {error && (
            <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          {/* Form */}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* EMAIL */}

            <div>

              <label className="block text-sm font-medium mb-2">
                Email address
              </label>

              <div className="relative">

                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-10 pr-4 text-sm text-white placeholder:text-slate-600 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
                />

              </div>

            </div>

            {/* PASSWORD */}

            <div>

              <div className="flex justify-between mb-2">

                <label className="text-sm font-medium">
                  Password
                </label>

                <Link
                  to="/forgot-password"
                  className="text-xs text-emerald-400 hover:text-emerald-300"
                >
                  Forgot password?
                </Link>

              </div>

              <div className="relative">

                <LockKeyhole
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-10 pr-11 text-sm text-white placeholder:text-slate-600 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

            </div>

            {/* SUBMIT */}

            <button
              disabled={loading}
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/10 disabled:opacity-60 disabled:cursor-not-allowed"
            >

              {loading
                ? "Signing in..."
                : "Sign in"}

              {!loading && (
                <ArrowRight size={17} />
              )}

            </button>

          </form>

          {/* Register */}

          <p className="text-center text-sm text-slate-500 mt-8">

            Don't have an account?{" "}

            <Link
              to="/register"
              className="text-emerald-400 hover:text-emerald-300 font-medium"
            >
              Create one
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
};

export default Login;