import {
  Ban,
  CheckCircle2,
  MoreHorizontal,
  Search,
  Shield,
  UserPlus,
  Users as UsersIcon,
} from "lucide-react";
import { useMemo, useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  joined: string;
};

const initialUsers: User[] = [
  {
    id: "USR-1001",
    name: "Rahul Sharma",
    email: "rahul@example.com",
    role: "Citizen",
    status: "Active",
    joined: "12 Sep 2026",
  },
  {
    id: "USR-1002",
    name: "Priya Verma",
    email: "priya@example.com",
    role: "Authority",
    status: "Active",
    joined: "10 Sep 2026",
  },
  {
    id: "USR-1003",
    name: "Amit Singh",
    email: "amit@example.com",
    role: "Citizen",
    status: "Active",
    joined: "08 Sep 2026",
  },
  {
    id: "USR-1004",
    name: "Operations Admin",
    email: "admin@accesspath.ai",
    role: "Admin",
    status: "Active",
    joined: "01 Sep 2026",
  },
];

const Users = () => {
  const [users, setUsers] =
    useState(initialUsers);

  const [search, setSearch] = useState("");
  const [role, setRole] = useState("ALL");

  const filtered = useMemo(() => {
    return users.filter((user) => {
      const query = search.toLowerCase();

      const matchSearch =
        !query ||
        user.name
          .toLowerCase()
          .includes(query) ||
        user.email
          .toLowerCase()
          .includes(query) ||
        user.id
          .toLowerCase()
          .includes(query);

      const matchRole =
        role === "ALL" ||
        user.role === role;

      return matchSearch && matchRole;
    });
  }, [users, search, role]);

  const toggleUser = (id: string) => {
    setUsers((current) =>
      current.map((user) =>
        user.id === id
          ? {
              ...user,
              status:
                user.status === "Active"
                  ? "Suspended"
                  : "Active",
            }
          : user
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#f5f7f6] px-4 py-6 md:px-8">
      <div className="mx-auto max-w-[1400px]">

        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-[#21634d]">
              Administration
            </p>

            <h1 className="mt-1 text-3xl font-bold text-[#14251f]">
              Users
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Manage citizen, authority and administrator accounts.
            </p>
          </div>

          <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#143c2e] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#0e3025]">
            <UserPlus size={16} />
            Add user
          </button>
        </div>

        {/* Stats */}
        <div className="mt-7 grid gap-4 sm:grid-cols-3">
          <MiniStat
            label="Total users"
            value={users.length}
            icon={<UsersIcon size={18} />}
          />

          <MiniStat
            label="Active"
            value={
              users.filter(
                (x) => x.status === "Active"
              ).length
            }
            icon={<CheckCircle2 size={18} />}
          />

          <MiniStat
            label="Authorities"
            value={
              users.filter(
                (x) => x.role === "Authority"
              ).length
            }
            icon={<Shield size={18} />}
          />
        </div>

        {/* Toolbar */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row">

            <div className="relative flex-1">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search by name, email or user ID..."
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none focus:border-[#4c8c72] focus:bg-white"
              />
            </div>

            <select
              value={role}
              onChange={(e) =>
                setRole(e.target.value)
              }
              className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-600 outline-none"
            >
              <option value="ALL">
                All roles
              </option>
              <option value="Citizen">
                Citizen
              </option>
              <option value="Authority">
                Authority
              </option>
              <option value="Admin">
                Admin
              </option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px]">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50 text-left">
                  <th className="px-5 py-4 text-xs font-bold uppercase text-slate-400">
                    User
                  </th>
                  <th className="px-5 py-4 text-xs font-bold uppercase text-slate-400">
                    Role
                  </th>
                  <th className="px-5 py-4 text-xs font-bold uppercase text-slate-400">
                    Status
                  </th>
                  <th className="px-5 py-4 text-xs font-bold uppercase text-slate-400">
                    Joined
                  </th>
                  <th className="px-5 py-4 text-xs font-bold uppercase text-slate-400">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e8f2ed] text-sm font-bold text-[#21634d]">
                          {user.name
                            .slice(0, 1)
                            .toUpperCase()}
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-slate-700">
                            {user.name}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {user.email}
                          </p>

                          <p className="mt-0.5 font-mono text-[10px] text-slate-300">
                            {user.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <RoleBadge role={user.role} />
                    </td>

                    <td className="px-5 py-4">
                      <StatusBadge status={user.status} />
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-500">
                      {user.joined}
                    </td>

                    <td className="px-5 py-4">
                      <button
                        onClick={() =>
                          toggleUser(user.id)
                        }
                        className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold ${
                          user.status ===
                          "Active"
                            ? "text-red-600 hover:bg-red-50"
                            : "text-emerald-700 hover:bg-emerald-50"
                        }`}
                      >
                        {user.status ===
                        "Active" ? (
                          <>
                            <Ban size={14} />
                            Suspend
                          </>
                        ) : (
                          <>
                            <CheckCircle2
                              size={14}
                            />
                            Activate
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="p-14 text-center">
              <UsersIcon
                size={30}
                className="mx-auto text-slate-300"
              />

              <p className="mt-3 font-semibold text-slate-700">
                No users found
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const MiniStat = ({
  label,
  value,
  icon,
}: any) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e8f2ed] text-[#21634d]">
        {icon}
      </div>

      <div>
        <p className="text-xs text-slate-400">
          {label}
        </p>

        <p className="text-xl font-bold text-slate-800">
          {value}
        </p>
      </div>
    </div>
  </div>
);

const RoleBadge = ({
  role,
}: {
  role: string;
}) => {
  const style =
    role === "Admin"
      ? "bg-purple-50 text-purple-700"
      : role === "Authority"
      ? "bg-blue-50 text-blue-700"
      : "bg-slate-100 text-slate-600";

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${style}`}
    >
      {role}
    </span>
  );
};

const StatusBadge = ({
  status,
}: {
  status: string;
}) => (
  <span
    className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
      status === "Active"
        ? "bg-emerald-50 text-emerald-700"
        : "bg-red-50 text-red-700"
    }`}
  >
    {status}
  </span>
);

export default Users;