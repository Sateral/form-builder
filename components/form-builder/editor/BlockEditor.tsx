"use client";

import { BlockLabelField } from "@/components/form-builder/editor/block/BlockLabelField";
import { BlockToolbar } from "@/components/form-builder/editor/block/BlockToolbar";
import { EmailPlaceholderField } from "@/components/form-builder/editor/block/EmailPlaceholderField";
import { MultipleChoiceOptionsEditor } from "@/components/form-builder/editor/block/MultipleChoiceOptionsEditor";
import type {
  BlockEditorActions,
  EditableElement,
} from "@/components/form-builder/editor/useFormEditor";
import { getTargetId } from "@/lib/form-builder/navigation";
import type { FormBlock } from "@/lib/form-builder/types";

interface BlockEditorProps {
  block: FormBlock;
  activeTargetId: string | null;
  isDragging: boolean;
  registerTarget: (targetId: string, node: EditableElement | null) => void;
  actions: BlockEditorActions;
}

export function BlockEditor({
  actions,
  block,
  activeTargetId,
  isDragging,
  registerTarget,
}: BlockEditorProps) {
  const labelTargetId = getTargetId(block.id, "label");
  const placeholderTargetId = getTargetId(block.id, "placeholder");

  return (
    <div
      className={`group relative grid grid-cols-[6.5rem_minmax(0,1fr)] gap-2 py-3 transition ${
        isDragging ? "scale-[0.995]" : ""
      }`}
    >
      <BlockToolbar actions={actions} block={block} />

      <div className="min-w-0">
        <BlockLabelField
          actions={actions}
          activeTargetId={activeTargetId}
          block={block}
          registerTarget={registerTarget}
          targetId={labelTargetId}
        />

        {block.type === "email" ? (
          <EmailPlaceholderField
            actions={actions}
            activeTargetId={activeTargetId}
            block={block}
            registerTarget={registerTarget}
            targetId={placeholderTargetId}
          />
        ) : null}

        {block.type === "multipleChoice" ? (
          <MultipleChoiceOptionsEditor
            actions={actions}
            activeTargetId={activeTargetId}
            block={block}
            registerTarget={registerTarget}
          />
        ) : null}
      </div>
    </div>
  );
}
