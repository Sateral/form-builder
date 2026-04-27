"use client";

import { getOptionBadge } from "@/lib/form-builder/blocks";
import type { FormDocument } from "@/lib/form-builder/types";

interface FormPreviewProps {
  form: FormDocument;
}

const optionColors = [
  "bg-pink-500",
  "bg-cyan-500",
  "bg-amber-500",
  "bg-violet-500",
  "bg-emerald-500",
];

export function FormPreview({ form }: FormPreviewProps) {
  return (
    <div className="py-10 md:py-14">
      <form className="mx-auto w-full max-w-3xl rounded-2xl border border-slate-200 bg-white px-8 py-10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] md:px-14 md:py-12">
        <div className="mb-8 flex items-center justify-between border-b border-slate-200 pb-5">
          <h1 className="text-xl font-semibold tracking-[-0.01em] text-slate-950">
            {form.title}
          </h1>
          <span className="rounded-md bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-600">
            Preview
          </span>
        </div>

        <div className="space-y-7">
          {form.blocks.map((block) => {
            if (block.type === "statement") {
              return (
                <p
                  className="text-lg font-semibold tracking-[-0.01em] text-slate-950"
                  key={block.id}
                >
                  {block.label}
                  {block.required ? (
                    <span className="ml-1 text-rose-500">*</span>
                  ) : null}
                </p>
              );
            }

            if (block.type === "email") {
              return (
                <div key={block.id}>
                  <label
                    className="block text-lg font-semibold tracking-[-0.01em] text-slate-950"
                    htmlFor={`${block.id}-preview`}
                  >
                    {block.label}
                    {block.required ? (
                      <span className="ml-1 text-rose-500">*</span>
                    ) : null}
                  </label>
                  <input
                    className="mt-2 h-9 w-full max-w-sm rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:ring-4 focus:ring-slate-950/5"
                    id={`${block.id}-preview`}
                    placeholder={block.placeholder}
                    type="email"
                  />
                </div>
              );
            }

            return (
              <fieldset key={block.id}>
                <legend className="text-lg font-semibold tracking-[-0.01em] text-slate-950">
                  {block.label}
                  {block.required ? (
                    <span className="ml-1 text-rose-500">*</span>
                  ) : null}
                </legend>
                <div className="mt-3 space-y-2">
                  {block.options.map((option, index) => (
                    <label
                      className="group flex max-w-md cursor-pointer items-center gap-2 rounded-md border border-slate-200 bg-white px-2 py-1.5 transition-colors hover:border-slate-300 has-[:checked]:border-slate-950 has-[:checked]:bg-slate-50"
                      key={option.id}
                    >
                      <input
                        className="sr-only"
                        name={block.id}
                        type="radio"
                      />
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-sm font-bold text-white ${
                          optionColors[index % optionColors.length]
                        }`}
                      >
                        {getOptionBadge(index)}
                      </span>
                      <span className="text-sm text-slate-700">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
            );
          })}
        </div>

        <button
          className="mt-10 inline-flex h-10 items-center justify-center gap-1.5 rounded-lg bg-slate-950 px-5 text-sm font-medium text-white transition-colors hover:bg-slate-800"
          type="button"
        >
          Submit response
        </button>
      </form>
    </div>
  );
}
