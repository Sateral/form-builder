"use client";

import {
  GripVerticalIcon,
  PlusIcon,
  ShieldIcon,
  Trash2Icon,
} from "lucide-react";

import type { BlockEditorActions } from "@/components/form-builder/editor/useFormEditor";
import type { FormBlock } from "@/lib/form-builder/types";

interface BlockToolbarProps {
  actions: BlockEditorActions;
  block: FormBlock;
}

export function BlockToolbar({ actions, block }: BlockToolbarProps) {
  return (
    <div className="flex justify-end gap-1 pt-1 opacity-40 transition group-hover:opacity-100 group-focus-within:opacity-100">
      <button
        className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
        onClick={() => actions.openMenu(block.id)}
        type="button"
      >
        <PlusIcon className="h-4 w-4" />
        <span className="sr-only">Add block</span>
      </button>
      <button
        className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 transition hover:bg-slate-100 hover:text-rose-600"
        onClick={() => actions.removeBlock(block.id)}
        type="button"
      >
        <Trash2Icon className="h-4 w-4" />
        <span className="sr-only">Remove block</span>
      </button>
      <button
        className={`flex h-7 w-7 items-center justify-center rounded-md transition ${
          block.required
            ? "bg-blue-50 text-blue-500"
            : "text-slate-400 hover:bg-slate-100 hover:text-slate-700"
        }`}
        onClick={() => actions.toggleRequired(block.id)}
        type="button"
      >
        <ShieldIcon className="h-4 w-4" />
        <span className="sr-only">Toggle required</span>
      </button>
      <button
        className="flex h-7 w-7 cursor-grab items-center justify-center rounded-md text-slate-300 transition hover:bg-slate-100 hover:text-slate-700 active:cursor-grabbing"
        draggable
        onDragEnd={actions.dragEnd}
        onDragStart={(event) => actions.dragStart(event, block.id)}
        type="button"
      >
        <GripVerticalIcon className="h-4 w-4" />
        <span className="sr-only">Drag to reorder</span>
      </button>
    </div>
  );
}
