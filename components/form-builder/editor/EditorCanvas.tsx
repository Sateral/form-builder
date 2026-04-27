"use client";

import { BlockEditor } from "@/components/form-builder/editor/BlockEditor";
import { SlashMenu } from "@/components/form-builder/editor/SlashMenu";
import type { FormEditorController } from "@/components/form-builder/editor/useFormEditor";

interface EditorCanvasProps {
  editor: FormEditorController;
}

export function EditorCanvas({ editor }: EditorCanvasProps) {
  const { actions, registerTarget, state } = editor;

  return (
    <section className="mx-auto w-full max-w-5xl">
      <div className="pt-5">
        {state.form.blocks.map((block) => (
          <div
            className={`relative transition ${
              state.draggedBlockId === block.id ? "opacity-40" : ""
            }`}
            key={block.id}
            onDragOver={(event) => actions.dragOver(event, block.id)}
            onDrop={(event) => actions.drop(event, block.id)}
          >
            {state.dropTarget?.blockId === block.id &&
            state.dropTarget.placement === "before" ? (
              <div className="absolute left-[7.25rem] right-0 top-0 z-10 h-0.5 rounded-full bg-blue-500" />
            ) : null}
            <BlockEditor
              actions={actions}
              activeTargetId={state.activeTargetId}
              block={block}
              isDragging={state.draggedBlockId === block.id}
              registerTarget={registerTarget}
            />
            {state.dropTarget?.blockId === block.id &&
            state.dropTarget.placement === "after" ? (
              <div className="absolute bottom-0 left-[7.25rem] right-0 z-10 h-0.5 rounded-full bg-blue-500" />
            ) : null}
            <SlashMenu
              onClose={actions.closeMenu}
              onSelect={(type) => actions.addBlock(type, block.id)}
              open={state.menuBlockId === block.id}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
