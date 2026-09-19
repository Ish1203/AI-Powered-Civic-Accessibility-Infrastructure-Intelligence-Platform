import {
  ArrowLeft,
  Mail,
  ShieldCheck,
} from "lucide-react";

import { useState } from "react";
import {
  Link,
} from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] =
    useState(false);

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!email) return;

    /*
      Connect this later with:
      POST /api/auth/forgot-password
    */

    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">

      <div className="w-full max-w-md">

        <Link
          to="/"
          className="flex justify-center items-center gap-3 mb-12"
        >
          <div className="h-11 w-11 rounded-xl bg-emerald-500 flex items-center justify-center">
            <ShieldCheck
              size={24}
              className="text-slate-950"
            />
          </div>

          <div>
            <p className="font-semibold">
              AccessPath AI
            </p>

            <p className="text-xs text-slate-500 text-left">
              Civic Intelligence
            </p>
          </div>
        </Link>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-7">

          {!submitted ? (
            <>
              <div className="mb-7">
                <h1 className="text-2xl font-semibold">
                  Reset your password
                </h1>

                <p className="mt-2 text-sm text-slate-400 leading-6">
                  Enter your account email and we'll
                  send instructions to reset your password.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >
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
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-10 pr-4 text-sm outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-emerald-500 py-3.5 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
                >
                  Send reset instructions
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-5">

              <div className="mx-auto h-14 w-14 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <Mail
                  size={25}
                  className="text-emerald-400"
                />
              </div>

              <h1 className="mt-5 text-2xl font-semibold">
                Check your inbox
              </h1>

              <p className="mt-3 text-sm text-slate-400 leading-6">
                If an account exists for{" "}
                <span className="text-slate-200">
                  {email}
                </span>
                , password reset instructions
                will be sent there.
              </p>
            </div>
          )}

          <Link
            to="/login"
            className="mt-7 flex items-center justify-center gap-2 text-sm text-slate-400 hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to sign in
          </Link>

        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;