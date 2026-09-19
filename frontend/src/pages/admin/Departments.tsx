import {
  Building2,
  ChevronRight,
  MapPin,
  Plus,
  Settings2,
  Users,
} from "lucide-react";
import { useState } from "react";

type Department = {
  id: string;
  name: string;
  code: string;
  description: string;
  teamSize: number;
  activeIssues: number;
  status: string;
};

const initialDepartments: Department[] = [
  {
    id: "DEP-001",
    name: "Public Works Department",
    code: "PWD",
    description:
      "Roads, pavements, crossings and public infrastructure.",
    teamSize: 42,
    activeIssues: 184,
    status: "Active",
  },
  {
    id: "DEP-002",
    name: "Accessibility Services",
    code: "ACS",
    description:
      "Accessibility barriers and pedestrian mobility.",
    teamSize: 18,
    activeIssues: 67,
    status: "Active",
  },
  {
    id: "DEP-003",
    name: "Sanitation Department",
    code: "SAN",
    description:
      "Garbage, dumping and public cleanliness.",
    teamSize: 31,
    activeIssues: 126,
    status: "Active",
  },
  {
    id: "DEP-004",
    name: "Parks & Recreation",
    code: "PAR",
    description:
      "Public parks, paths and recreational facilities.",
    teamSize: 15,
    activeIssues: 41,
    status: "Active",
  },
];

const Departments = () => {
  const [departments, setDepartments] =
    useState(initialDepartments);

  const [showForm, setShowForm] =
    useState(false);

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] =
    useState("");

  const addDepartment = () => {
    if (!name.trim() || !code.trim()) return;

    const department: Department = {
      id: `DEP-${String(
        departments.length + 1
      ).padStart(3, "0")}`,
      name,
      code: code.toUpperCase(),
      description:
        description ||
        "Operational civic department.",
      teamSize: 0,
      activeIssues: 0,
      status: "Active",
    };

    setDepartments([
      ...departments,
      department,
    ]);

    setName("");
    setCode("");
    setDescription("");
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-[#f5f7f6] px-4 py-6 md:px-8">
      <div className="mx-auto max-w-[1350px]">

        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-[#21634d]">
              Administration
            </p>

            <h1 className="mt-1 text-3xl font-bold text-[#14251f]">
              Departments
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Configure departments used by the civic issue
              routing engine.
            </p>
          </div>

          <button
            onClick={() =>
              setShowForm(!showForm)
            }
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#143c2e] px-4 py-2.5 text-sm font-semibold text-white"
          >
            <Plus size={16} />
            Add department
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <section className="mt-6 rounded-2xl border border-[#c9ded4] bg-white p-5 shadow-sm">

            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e8f2ed] text-[#21634d]">
                <Building2 size={18} />
              </div>

              <div>
                <h2 className="font-semibold text-slate-800">
                  New department
                </h2>

                <p className="text-xs text-slate-400">
                  Add an operational routing destination.
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <input
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="Department name"
                className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-[#4c8c72] focus:bg-white"
              />

              <input
                value={code}
                onChange={(e) =>
                  setCode(e.target.value)
                }
                placeholder="Short code"
                className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm uppercase outline-none focus:border-[#4c8c72] focus:bg-white"
              />

              <textarea
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
                placeholder="Description"
                rows={3}
                className="resize-none rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none focus:border-[#4c8c72] focus:bg-white md:col-span-2"
              />
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() =>
                  setShowForm(false)
                }
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600"
              >
                Cancel
              </button>

              <button
                onClick={addDepartment}
                className="rounded-lg bg-[#143c2e] px-4 py-2 text-sm font-semibold text-white"
              >
                Create department
              </button>
            </div>
          </section>
        )}

        {/* Departments */}
        <div className="mt-6 grid gap-4 lg:grid-cols-2">

          {departments.map((department) => (
            <DepartmentCard
              key={department.id}
              department={department}
            />
          ))}
        </div>

        {/* Routing note */}
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-start gap-3">
            <Settings2
              size={19}
              className="mt-0.5 text-[#21634d]"
            />

            <div>
              <h2 className="font-semibold text-slate-800">
                Routing configuration
              </h2>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Departments should be configurable rather than
                hard-coded to a specific city. The backend can
                use category, location and issue type to
                recommend the responsible department.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const DepartmentCard = ({
  department,
}: {
  department: Department;
}) => (
  <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md">

    <div className="flex items-start justify-between">
      <div className="flex gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8f2ed] text-[#21634d]">
          <Building2 size={20} />
        </div>

        <div>
          <h2 className="font-semibold text-slate-800">
            {department.name}
          </h2>

          <div className="mt-1 flex items-center gap-2">
            <span className="font-mono text-[10px] text-slate-400">
              {department.id}
            </span>

            <span className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] font-bold text-slate-500">
              {department.code}
            </span>
          </div>
        </div>
      </div>

      <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
        {department.status}
      </span>
    </div>

    <p className="mt-4 text-sm leading-6 text-slate-500">
      {department.description}
    </p>

    <div className="mt-5 grid grid-cols-2 gap-3">
      <Info
        icon={<Users size={15} />}
        label="Team size"
        value={department.teamSize}
      />

      <Info
        icon={<MapPin size={15} />}
        label="Active issues"
        value={department.activeIssues}
      />
    </div>

    <button className="mt-5 flex w-full items-center justify-between rounded-lg border border-slate-200 px-3 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50">
      Configure department

      <ChevronRight size={15} />
    </button>
  </div>
);

const Info = ({
  icon,
  label,
  value,
}: any) => (
  <div className="rounded-xl bg-slate-50 p-3">
    <div className="flex items-center gap-2 text-slate-400">
      {icon}

      <span className="text-[11px]">
        {label}
      </span>
    </div>

    <p className="mt-1 text-lg font-bold text-slate-700">
      {value}
    </p>
  </div>
);

export default Departments;