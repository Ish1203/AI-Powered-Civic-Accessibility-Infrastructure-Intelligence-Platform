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

  const [showPassword, setShowPassword] = useState(false);

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
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setError("");

    if (!form.email || !form.password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const user = await login(form);

      if (user.role === "admin") {
        navigate("/admin");
      } else if (user.role === "authority") {
        navigate("/authority");
      } else {
        navigate(from);
      }
    } catch (err: any) {
      setError(
        err?.response?.data?.detail ||
          "Unable to sign in. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">

      {/* Left panel */}

      <div className="hidden lg:flex lg:w-[46%] bg-slate-900 border-r border-slate-800 p-12 flex-col justify-between">

        <div>
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

          <div className="mt-24 max-w-lg">
            <p className="text-sm text-emerald-400 font-medium mb-4">
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
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6">
          <p className="text-xs text-slate-500">
            Built for citizens, civic teams and
            public-space improvement.
          </p>
        </div>
      </div>

      {/* Form */}

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">

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

          <div className="mb-8">
            <h2 className="text-3xl font-semibold">
              Welcome back
            </h2>

            <p className="text-slate-400 mt-2">
              Sign in to continue to your civic workspace.
            </p>
          </div>

          {error && (
            <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* Email */}

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
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
                />
              </div>
            </div>

            {/* Password */}

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
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-10 pr-11 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading
                ? "Signing in..."
                : "Sign in"}

              {!loading && <ArrowRight size={17} />}
            </button>
          </form>

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