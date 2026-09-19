import {
  Camera,
  Mail,
  Phone,
  ShieldCheck,
  User,
} from "lucide-react";

import useAuth from "../../hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#f6f8f7] px-4 py-6 md:px-8">
      <div className="mx-auto max-w-4xl">

        <div className="mb-7">
          <p className="text-sm font-medium text-slate-500">
            Account
          </p>

          <h1 className="mt-1 text-2xl font-bold text-[#10231d]">
            Profile
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage your AccessPath AI account information.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* Profile header */}
          <div className="border-b border-slate-100 bg-[#f8faf9] px-6 py-7">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

              <div className="relative">
                <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-[#dcebe4] text-2xl font-bold text-[#21634d]">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    user?.name
                      ?.charAt(0)
                      .toUpperCase() || "U"
                  )}
                </div>

                <button
                  className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-[#143c2e] text-white"
                  aria-label="Change profile photo"
                >
                  <Camera size={13} />
                </button>
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  {user?.name || "Citizen"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Citizen account
                </p>

                <div className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-[#21634d]">
                  <ShieldCheck size={14} />
                  Account verified
                </div>
              </div>
            </div>
          </div>

          {/* Information */}
          <div className="p-6">

            <h3 className="font-semibold text-slate-800">
              Personal information
            </h3>

            <div className="mt-5 grid gap-5 md:grid-cols-2">

              <InfoField
                icon={<User size={17} />}
                label="Full name"
                value={user?.name || "—"}
              />

              <InfoField
                icon={<Mail size={17} />}
                label="Email address"
                value={user?.email || "—"}
              />

              <InfoField
                icon={<Phone size={17} />}
                label="Phone number"
                value={user?.phone || "Not added"}
              />

              <InfoField
                icon={<ShieldCheck size={17} />}
                label="Account role"
                value={user?.role || "CITIZEN"}
              />
            </div>

            <div className="mt-7 border-t border-slate-100 pt-6">
              <button className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                Edit profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoField = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </label>

      <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
        <span className="text-slate-400">
          {icon}
        </span>

        <span className="text-sm font-medium text-slate-700">
          {value}
        </span>
      </div>
    </div>
  );
};

export default Profile;