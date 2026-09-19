import React from "react";
import { Edit3, Sparkles, Wand2 } from "lucide-react";
import Button from "../common/Button";

interface ComplaintEditorProps {
  initialValue: string;
  department?: string;
  onChange?: (value: string) => void;
  onRegenerate?: () => void;
  onSubmit?: () => void;
}

export default function ComplaintEditor({
  initialValue,
  department = "Municipal Infrastructure",
  onChange,
  onRegenerate,
  onSubmit,
}: ComplaintEditorProps) {
  const [text, setText] = React.useState(initialValue);

  React.useEffect(() => setText(initialValue), [initialValue]);

  const update = (next: string) => {
    setText(next);
    onChange?.(next);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Edit3 size={16} className="text-slate-500" />
            <h3 className="text-sm font-bold text-slate-900">Review civic complaint</h3>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            AI drafted this complaint. Edit anything before it is submitted.
          </p>
        </div>
        <span className="flex items-center gap-1 rounded-full bg-violet-50 px-2.5 py-1 text-[10px] font-bold text-violet-700">
          <Sparkles size={11} /> AI drafted
        </span>
      </div>

      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
        <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
          Suggested department
        </p>
        <p className="mt-1 text-xs font-bold text-slate-800">{department}</p>
      </div>

      <textarea
        value={text}
        onChange={e => update(e.target.value)}
        rows={7}
        className="mt-4 w-full resize-none rounded-xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-800 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
      />

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <p className="text-[10px] text-slate-400">
          {text.length} characters · Keep descriptions factual and specific.
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={onRegenerate}
          leftIcon={<Wand2 size={13} />}
        >
          Regenerate draft
        </Button>
      </div>

      <Button className="mt-4 w-full" onClick={onSubmit}>
        Submit civic report
      </Button>
    </div>
  );
}
