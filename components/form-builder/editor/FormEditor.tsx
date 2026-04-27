"use client";

import { EyeIcon, PencilIcon, SparklesIcon } from "lucide-react";

import { EditorCanvas } from "@/components/form-builder/editor/EditorCanvas";
import { useFormEditor } from "@/components/form-builder/editor/useFormEditor";
import { FormPreview } from "@/components/form-builder/preview/FormPreview";

export function FormEditor() {
  const editor = useFormEditor();
  const { actions, state } = editor;

  return (
    <div className="min-h-screen bg-[#fbfcfe] text-slate-950">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-[60px] max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-950 text-white">
              <SparklesIcon className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold tracking-[-0.01em]">
              Noto Forms
            </span>
          </div>

          <button
            className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
            onClick={actions.togglePreview}
            type="button"
          >
            {state.isPreview ? (
              <>
                <PencilIcon className="h-4 w-4" />
                Edit Mode
              </>
            ) : (
              <>
                <EyeIcon className="h-4 w-4" />
                Preview Mode
              </>
            )}
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-0">
        {state.isPreview ? (
          <FormPreview form={state.form} />
        ) : (
          <EditorCanvas editor={editor} />
        )}
      </main>
    </div>
  );
}
