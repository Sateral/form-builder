"use client";

import type {
  BlockEditorActions,
  EditableElement,
} from "@/components/form-builder/editor/useFormEditor";
import type { FormBlock } from "@/lib/form-builder/types";

interface BlockLabelFieldProps {
  actions: BlockEditorActions;
  activeTargetId: string | null;
  block: FormBlock;
  registerTarget: (targetId: string, node: EditableElement | null) => void;
  targetId: string;
}

export function BlockLabelField({
  actions,
  activeTargetId,
  block,
  registerTarget,
  targetId,
}: BlockLabelFieldProps) {
  const isActive = targetId === activeTargetId;

  return (
    <div className="flex items-start gap-1">
      <textarea
        aria-label="Block label"
        className={`block min-h-8 w-full resize-none bg-transparent text-lg font-semibold leading-8 tracking-[-0.01em] text-slate-950 outline-none placeholder:text-slate-300 ${
          isActive ? "rounded-md bg-slate-50" : ""
        }`}
        onChange={(event) => actions.updateLabel(block.id, event.target.value)}
        onFocus={() => actions.focusTarget(targetId)}
        onKeyDown={(event) => actions.keyDown(event, block.id, targetId)}
        placeholder="Type a label..."
        ref={(node) => registerTarget(targetId, node)}
        rows={1}
        value={block.label}
      />
      {block.required ? <span className="pt-1 text-rose-500">*</span> : null}
    </div>
  );
}
