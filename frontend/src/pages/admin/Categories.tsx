import {
  Accessibility,
  AlertTriangle,
  Check,
  Edit3,
  Plus,
  Route,
  Trash2,
  Trees,
  Trash,
} from "lucide-react";
import { useState } from "react";

type Category = {
  id: number;
  name: string;
  description: string;
  issues: number;
  enabled: boolean;
};

const initialCategories: Category[] = [
  {
    id: 1,
    name: "Accessibility",
    description:
      "Barriers affecting wheelchair and pedestrian access.",
    issues: 426,
    enabled: true,
  },
  {
    id: 2,
    name: "Road & Infrastructure",
    description:
      "Potholes, damaged roads, curbs and public infrastructure.",
    issues: 982,
    enabled: true,
  },
  {
    id: 3,
    name: "Cleanliness",
    description:
      "Garbage accumulation, dumping and overflowing bins.",
    issues: 741,
    enabled: true,
  },
  {
    id: 4,
    name: "Public Space",
    description:
      "Parks, public facilities and shared spaces.",
    issues: 318,
    enabled: true,
  },
  {
    id: 5,
    name: "Pedestrian Safety",
    description:
      "Unsafe crossings, obstructions and pedestrian hazards.",
    issues: 289,
    enabled: true,
  },
];

const Categories = () => {
  const [categories, setCategories] =
    useState(initialCategories);

  const toggle = (id: number) => {
    setCategories((items) =>
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              enabled: !item.enabled,
            }
          : item
      )
    );
  };

  const remove = (id: number) => {
    setCategories((items) =>
      items.filter((item) => item.id !== id)
    );
  };

  return (
    <div className="min-h-screen bg-[#f5f7f6] px-4 py-6 md:px-8">
      <div className="mx-auto max-w-[1250px]">

        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-[#21634d]">
              Administration
            </p>

            <h1 className="mt-1 text-3xl font-bold text-[#14251f]">
              Issue categories
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Manage the civic issue taxonomy used by AI
              analysis, reporting and department routing.
            </p>
          </div>

          <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#143c2e] px-4 py-2.5 text-sm font-semibold text-white">
            <Plus size={16} />
            Add category
          </button>
        </div>

        {/* Notice */}
        <div className="mt-6 rounded-2xl border border-[#c9ded4] bg-[#eef7f2] p-4">
          <div className="flex gap-3">
            <AlertTriangle
              size={18}
              className="mt-0.5 shrink-0 text-[#21634d]"
            />

            <div>
              <p className="text-sm font-semibold text-[#173c30]">
                Taxonomy affects AI routing
              </p>

              <p className="mt-1 text-xs leading-5 text-[#507265]">
                Changes to categories should be reflected in
                the AI analysis schema and department routing
                configuration before production deployment.
              </p>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="mt-6 space-y-3">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onToggle={toggle}
              onDelete={remove}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const CategoryCard = ({
  category,
  onToggle,
  onDelete,
}: {
  category: Category;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}) => {
  const Icon =
  category.name === "Accessibility"
    ? Accessibility
    : category.name === "Road & Infrastructure"
    ? Route
    : category.name === "Cleanliness"
    ? Trash
    : category.name === "Public Space"
    ? Trees
    : AlertTriangle;

  return (
    <div
      className={`rounded-2xl border bg-white p-5 shadow-sm transition ${
        category.enabled
          ? "border-slate-200"
          : "border-slate-100 opacity-65"
      }`}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center">

        <div className="flex flex-1 items-start gap-4">

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#e8f2ed] text-[#21634d]">
            <Icon size={21} />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-semibold text-slate-800">
                {category.name}
              </h2>

              {category.enabled && (
                <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-700">
                  <Check size={11} />
                  Enabled
                </span>
              )}
            </div>

            <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
              {category.description}
            </p>

            <p className="mt-2 text-xs text-slate-400">
              {category.issues.toLocaleString()} reports
              associated with this category
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">

          <button
            className="rounded-lg border border-slate-200 p-2.5 text-slate-500 hover:bg-slate-50"
            title="Edit category"
          >
            <Edit3 size={16} />
          </button>

          <button
            onClick={() =>
              onToggle(category.id)
            }
            className="rounded-lg border border-slate-200 px-3 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50"
          >
            {category.enabled
              ? "Disable"
              : "Enable"}
          </button>

          <button
            onClick={() =>
              onDelete(category.id)
            }
            className="rounded-lg p-2.5 text-red-500 hover:bg-red-50"
            title="Delete category"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Categories;