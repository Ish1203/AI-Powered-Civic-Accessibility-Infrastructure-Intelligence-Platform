import {
  ArrowRight,
  Eye,
  EyeOff,
  Mail,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.phone.trim() ||
      !form.password ||
      !form.confirmPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!/^\d{10}$/.test(form.phone)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    try {
      setLoading(true);

      // Backend: POST /api/auth/register
      const user = await register({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
        phone: form.phone,
      });

      console.log("Registration successful:", user);

      // Backend currently creates CITIZEN accounts
      navigate("/login", {
        state: {
          message: "Account created successfully. Please sign in.",
        },
      });
    } catch (err: any) {
      console.error("Registration error:", err);

      const detail = err?.response?.data?.detail;

      if (typeof detail === "string") {
        setError(detail);
      } else if (Array.isArray(detail)) {
        setError(
          detail
            .map((item: any) => item?.msg || "Invalid input")
            .join(", ")
        );
      } else {
        setError("Unable to create your account. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">

      {/* LEFT BRANDING */}

      <div className="hidden lg:flex lg:w-[42%] bg-slate-900 border-r border-slate-800 p-12 flex-col justify-between">

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
            <p className="font-semibold text-lg">
              AccessPath AI
            </p>

            <p className="text-xs text-slate-500">
              Civic Intelligence Platform
            </p>
          </div>
        </Link>

        <div className="max-w-md">

          <p className="text-emerald-400 text-sm font-medium tracking-wide">
            JOIN THE CIVIC NETWORK
          </p>

          <h1 className="mt-4 text-4xl font-semibold leading-tight">
            Better streets start
            <br />
            with better reporting.
          </h1>

          <p className="mt-5 text-slate-400 leading-7">
            Help identify accessibility barriers,
            infrastructure problems and public-space
            issues in your community.
          </p>

          <div className="mt-8 space-y-3 text-sm text-slate-400">

            <div className="flex items-center gap-3">
              <div className="h-7 w-7 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <ShieldCheck
                  size={16}
                  className="text-emerald-400"
                />
              </div>

              Secure civic reporting
            </div>

            <div className="flex items-center gap-3">
              <div className="h-7 w-7 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <UserRound
                  size={16}
                  className="text-emerald-400"
                />
              </div>

              Track your reported issues
            </div>

            <div className="flex items-center gap-3">
              <div className="h-7 w-7 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <ArrowRight
                  size={16}
                  className="text-emerald-400"
                />
              </div>

              Connect with civic authorities
            </div>

          </div>
        </div>

        <p className="text-xs text-slate-500">
          Your personal contact information is not
          displayed on the public issue map.
        </p>
      </div>

      {/* REGISTER */}

      <div className="flex-1 flex items-center justify-center p-6">

        <div className="w-full max-w-md">

          {/* MOBILE LOGO */}

          <div className="lg:hidden mb-8">

            <Link
              to="/"
              className="flex items-center gap-3"
            >
              <div className="h-10 w-10 rounded-xl bg-emerald-500 flex items-center justify-center">
                <ShieldCheck
                  size={22}
                  className="text-slate-950"
                />
              </div>

              <span className="font-semibold text-lg">
                AccessPath AI
              </span>
            </Link>

          </div>

          {/* HEADER */}

          <div className="mb-8">

            <p className="text-emerald-400 text-sm font-medium mb-2">
              CREATE ACCOUNT
            </p>

            <h2 className="text-3xl font-semibold">
              Join AccessPath
            </h2>

            <p className="mt-2 text-slate-400">
              Start reporting and tracking civic issues.
            </p>

          </div>

          {/* ERROR */}

          {error && (
            <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* NAME */}

            <div>

              <label className="text-sm font-medium text-slate-200">
                Full name
              </label>

              <div className="relative mt-2">

                <UserRound
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  autoComplete="name"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-10 pr-4 text-sm text-white placeholder:text-slate-600 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
                />

              </div>

            </div>

            {/* EMAIL */}

            <div>

              <label className="text-sm font-medium text-slate-200">
                Email address
              </label>

              <div className="relative mt-2">

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

            {/* PHONE */}

            <div>

              <label className="text-sm font-medium text-slate-200">
                Phone number
              </label>

              <div className="relative mt-2">

                <Phone
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="10-digit phone number"
                  maxLength={10}
                  autoComplete="tel"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-10 pr-4 text-sm text-white placeholder:text-slate-600 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
                />

              </div>

            </div>

            {/* PASSWORD */}

            <div>

              <label className="text-sm font-medium text-slate-200">
                Password
              </label>

              <div className="relative mt-2">

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Minimum 8 characters"
                  autoComplete="new-password"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 px-4 pr-11 text-sm text-white placeholder:text-slate-600 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

            </div>

            {/* CONFIRM PASSWORD */}

            <div>

              <label className="text-sm font-medium text-slate-200">
                Confirm password
              </label>

              <div className="relative mt-2">

                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repeat your password"
                  autoComplete="new-password"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 px-4 pr-11 text-sm text-white placeholder:text-slate-600 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showConfirmPassword ? (
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
              className="mt-2 w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/10 disabled:cursor-not-allowed disabled:opacity-60"
            >

              {loading
                ? "Creating account..."
                : "Create account"}

              {!loading && (
                <ArrowRight size={17} />
              )}

            </button>

          </form>

          {/* LOGIN */}

          <p className="mt-7 text-center text-sm text-slate-500">

            Already have an account?{" "}

            <Link
              to="/login"
              className="text-emerald-400 hover:text-emerald-300 font-medium"
            >
              Sign in
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
};

export default Register;