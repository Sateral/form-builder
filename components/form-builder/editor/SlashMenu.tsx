"use client";

import { blockRegistry } from "@/lib/form-builder/blocks";
import type { BlockType } from "@/lib/form-builder/types";

interface SlashMenuProps {
  open: boolean;
  onSelect: (type: BlockType) => void;
  onClose: () => void;
}

export function SlashMenu({ open, onSelect, onClose }: SlashMenuProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="absolute left-12 top-full z-30 mt-2 w-80 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10">
      <div className="border-b border-slate-100 px-3 py-2">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
          Blocks
        </p>
      </div>
      <div className="p-1.5">
        {blockRegistry.map((block) => (
          <button
            className="flex w-full items-start justify-between gap-4 rounded-lg px-3 py-2.5 text-left transition hover:bg-slate-50 focus:bg-slate-50 focus:outline-none"
            key={block.type}
            onClick={() => onSelect(block.type)}
            type="button"
          >
            <span>
              <span className="block text-sm font-medium text-slate-950">
                {block.label}
              </span>
              <span className="mt-0.5 block text-xs leading-5 text-slate-500">
                {block.description}
              </span>
            </span>
            <kbd className="rounded-md border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[11px] text-slate-500">
              {block.command}
            </kbd>
          </button>
        ))}
      </div>
      <button
        className="w-full border-t border-slate-100 px-3 py-2 text-left text-xs text-slate-400 transition hover:text-slate-700"
        onClick={onClose}
        type="button"
      >
        Press escape or click to close
      </button>
    </div>
  );
}
