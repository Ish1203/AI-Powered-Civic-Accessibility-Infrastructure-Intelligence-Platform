import {
  ArrowRight,
  Eye,
  EyeOff,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import useAuth from "../../hooks/useAuth";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [showPassword, setShowPassword] =
    useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "citizen" as "citizen" | "authority",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
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

    if (
      !form.name ||
      !form.email ||
      !form.password
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (form.password.length < 8) {
      setError(
        "Password must contain at least 8 characters."
      );
      return;
    }

    if (
      form.password !== form.confirmPassword
    ) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const user = await register({
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
      });

      if (user.role === "authority") {
        navigate("/authority");
      } else {
        navigate("/dashboard");
      }
    } catch (err: any) {
      setError(
        err?.response?.data?.detail ||
          "Unable to create your account."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">

      {/* Branding */}

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
            <p className="font-semibold">
              AccessPath AI
            </p>

            <p className="text-xs text-slate-500">
              Civic Intelligence Platform
            </p>
          </div>
        </Link>

        <div className="max-w-md">
          <p className="text-emerald-400 text-sm font-medium">
            JOIN THE CIVIC NETWORK
          </p>

          <h1 className="mt-4 text-4xl font-semibold leading-tight">
            Better streets start
            with better reporting.
          </h1>

          <p className="mt-5 text-slate-400 leading-7">
            Help identify accessibility barriers,
            infrastructure problems and public-space
            issues in your community.
          </p>
        </div>

        <p className="text-xs text-slate-500">
          Your personal contact information is not
          displayed on the public issue map.
        </p>
      </div>

      {/* Register */}

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">

          <div className="mb-8">
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

                <span className="font-semibold">
                  AccessPath AI
                </span>
              </Link>
            </div>

            <h2 className="text-3xl font-semibold">
              Create your account
            </h2>

            <p className="mt-2 text-slate-400">
              Start reporting and tracking civic issues.
            </p>
          </div>

          {error && (
            <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            {/* Name */}

            <div>
              <label className="text-sm font-medium">
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
                  placeholder="Your name"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-10 pr-4 text-sm outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Email */}

            <div>
              <label className="text-sm font-medium">
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
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-10 pr-4 text-sm outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Role */}

            <div>
              <label className="text-sm font-medium">
                Account type
              </label>

              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm outline-none focus:border-emerald-500"
              >
                <option value="citizen">
                  Citizen
                </option>

                <option value="authority">
                  Authority
                </option>
              </select>
            </div>

            {/* Password */}

            <div>
              <label className="text-sm font-medium">
                Password
              </label>

              <div className="relative mt-2">
                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Minimum 8 characters"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 pr-11 text-sm outline-none focus:border-emerald-500"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm */}

            <div>
              <label className="text-sm font-medium">
                Confirm password
              </label>

              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Repeat your password"
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm outline-none focus:border-emerald-500"
              />
            </div>

            <button
              disabled={loading}
              type="submit"
              className="mt-2 w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3.5 text-sm font-semibold text-slate-950 hover:bg-emerald-400 disabled:opacity-60"
            >
              {loading
                ? "Creating account..."
                : "Create account"}

              {!loading && (
                <ArrowRight size={17} />
              )}
            </button>

          </form>

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