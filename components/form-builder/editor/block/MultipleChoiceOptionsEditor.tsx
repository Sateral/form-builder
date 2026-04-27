"use client";

import { PlusIcon, XIcon } from "lucide-react";

import type {
  BlockEditorActions,
  EditableElement,
} from "@/components/form-builder/editor/useFormEditor";
import { getOptionBadge } from "@/lib/form-builder/blocks";
import { getTargetId } from "@/lib/form-builder/navigation";
import type { MultipleChoiceBlock } from "@/lib/form-builder/types";

interface MultipleChoiceOptionsEditorProps {
  actions: BlockEditorActions;
  activeTargetId: string | null;
  block: MultipleChoiceBlock;
  registerTarget: (targetId: string, node: EditableElement | null) => void;
}

const optionColors = [
  "bg-pink-500",
  "bg-cyan-500",
  "bg-amber-500",
  "bg-violet-500",
  "bg-emerald-500",
];

export function MultipleChoiceOptionsEditor({
  actions,
  activeTargetId,
  block,
  registerTarget,
}: MultipleChoiceOptionsEditorProps) {
  return (
    <div className="mt-4 space-y-2">
      {block.options.map((option, index) => {
        const targetId = getTargetId(block.id, "option", option.id);

        return (
          <div className="flex max-w-md items-center gap-2" key={option.id}>
            <div
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-sm font-bold text-white ${
                optionColors[index % optionColors.length]
              }`}
            >
              {getOptionBadge(index)}
            </div>
            <input
              aria-label={`Option ${getOptionBadge(index)}`}
              className={`h-9 min-w-0 flex-1 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:ring-4 focus:ring-slate-950/5 ${
                targetId === activeTargetId ? "border-slate-950" : ""
              }`}
              onChange={(event) =>
                actions.updateOption(block.id, option.id, event.target.value)
              }
              onFocus={() => actions.focusTarget(targetId)}
              onKeyDown={(event) => actions.keyDown(event, block.id, targetId)}
              placeholder={`Option ${getOptionBadge(index)}`}
              ref={(node) => registerTarget(targetId, node)}
              value={option.label}
            />
            <button
              className="flex h-8 w-8 items-center justify-center rounded-md text-slate-300 transition hover:bg-slate-100 hover:text-rose-600"
              onClick={() => actions.removeOption(block.id, option.id)}
              type="button"
            >
              <XIcon className="h-4 w-4" />
              <span className="sr-only">Remove option</span>
            </button>
          </div>
        );
      })}

      <button
        className="ml-9 inline-flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
        onClick={() => actions.addOption(block.id)}
        type="button"
      >
        <PlusIcon className="h-4 w-4" />
        Add option
      </button>
    </div>
  );
}
