"use client";

import { getOptionBadge } from "@/lib/form-builder/blocks";
import type { FormDocument } from "@/lib/form-builder/types";

interface FormPreviewProps {
  form: FormDocument;
}

const optionColors = [
  "from-pink-500 to-rose-500",
  "from-cyan-500 to-sky-500",
  "from-amber-400 to-orange-500",
  "from-violet-500 to-indigo-500",
  "from-emerald-500 to-teal-500",
];

export function FormPreview({ form }: FormPreviewProps) {
  return (
    <div className="mx-auto max-w-5xl rounded-[2rem] bg-[radial-gradient(circle_at_12%_12%,rgba(14,165,233,0.18),transparent_32%),radial-gradient(circle_at_88%_0%,rgba(16,185,129,0.18),transparent_30%),linear-gradient(135deg,#f8fbff,#eef7ff_52%,#f5fbf7)] p-5 shadow-inner shadow-white md:p-10">
      <form className="mx-auto w-full max-w-2xl rounded-[1.75rem] border border-white/70 bg-white/88 p-7 shadow-2xl shadow-slate-900/10 backdrop-blur md:p-9">
        <div className="mb-8 flex items-center justify-between border-b border-slate-200/80 pb-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">
              Public preview
            </p>
            <p className="mt-1 text-sm text-slate-500">
              This is how the form feels when someone opens it.
            </p>
          </div>
          <div className="h-2.5 w-20 rounded-full bg-gradient-to-r from-sky-400 via-cyan-400 to-emerald-400" />
        </div>

        <div className="space-y-7">
          {form.blocks.map((block) => {
            if (block.type === "statement") {
              return (
                <h1
                  className="rounded-2xl bg-gradient-to-br from-slate-950 to-slate-800 px-5 py-4 text-xl font-semibold tracking-[-0.015em] text-white shadow-lg shadow-slate-900/10"
                  key={block.id}
                >
                  {block.label}
                  {block.required ? (
                    <span className="ml-1 text-rose-300">*</span>
                  ) : null}
                </h1>
              );
            }

            if (block.type === "email") {
              return (
                <div key={block.id}>
                  <label
                    className="block text-base font-semibold tracking-[-0.01em] text-slate-950"
                    htmlFor={`${block.id}-preview`}
                  >
                    {block.label}
                    {block.required ? (
                      <span className="ml-1 text-rose-500">*</span>
                    ) : null}
                  </label>
                  <input
                    className="mt-3 h-11 w-full rounded-xl border border-sky-100 bg-sky-50/65 px-4 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                    id={`${block.id}-preview`}
                    placeholder={block.placeholder}
                    type="email"
                  />
                </div>
              );
            }

            return (
              <fieldset className="space-y-3" key={block.id}>
                <legend className="text-base font-semibold tracking-[-0.01em] text-slate-950">
                  {block.label}
                  {block.required ? (
                    <span className="ml-1 text-rose-500">*</span>
                  ) : null}
                </legend>
                {block.options.map((option, index) => (
                  <label
                    className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md"
                    key={option.id}
                  >
                    <input
                      className="h-4 w-4 accent-sky-600"
                      name={block.id}
                      type="radio"
                    />
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br text-xs font-bold text-white ${
                        optionColors[index % optionColors.length]
                      }`}
                    >
                      {getOptionBadge(index)}
                    </span>
                    {option.label}
                  </label>
                ))}
              </fieldset>
            );
          })}
        </div>

        <button
          className="mt-10 h-11 rounded-xl bg-gradient-to-r from-sky-600 to-cyan-600 px-5 text-sm font-semibold text-white shadow-lg shadow-sky-600/20 transition hover:-translate-y-0.5 hover:from-sky-500 hover:to-cyan-500"
          type="button"
        >
          Submit response
        </button>
      </form>
    </div>
  );
}
