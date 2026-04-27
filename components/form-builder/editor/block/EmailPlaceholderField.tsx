"use client";

import type {
  BlockEditorActions,
  EditableElement,
} from "@/components/form-builder/editor/useFormEditor";
import type { EmailBlock } from "@/lib/form-builder/types";

interface EmailPlaceholderFieldProps {
  actions: BlockEditorActions;
  activeTargetId: string | null;
  block: EmailBlock;
  registerTarget: (targetId: string, node: EditableElement | null) => void;
  targetId: string;
}

export function EmailPlaceholderField({
  actions,
  activeTargetId,
  block,
  registerTarget,
  targetId,
}: EmailPlaceholderFieldProps) {
  return (
    <input
      aria-label="Email placeholder"
      className={`mt-2 h-9 w-full max-w-sm rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:ring-4 focus:ring-slate-950/5 ${
        targetId === activeTargetId ? "border-slate-950" : ""
      }`}
      onChange={(event) =>
        actions.updatePlaceholder(block.id, event.target.value)
      }
      onFocus={() => actions.focusTarget(targetId)}
      onKeyDown={(event) => actions.keyDown(event, block.id, targetId)}
      placeholder="placeholder@mail.com"
      ref={(node) => registerTarget(targetId, node)}
      type="email"
      value={block.placeholder}
    />
  );
}
