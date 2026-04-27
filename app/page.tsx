import Link from "next/link";
import { ArrowRightIcon, CheckIcon } from "lucide-react";

import { blockRegistry } from "@/lib/form-builder/blocks";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <section className="mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-6 py-10 lg:grid-cols-[1fr_520px]">
        <div>
          <nav className="mb-24 flex items-center justify-between lg:justify-start">
            <Link className="text-sm font-semibold" href="/">
              Noto Forms
            </Link>
          </nav>

          <p className="mb-5 inline-flex rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-500">
            Block form builder
          </p>
          <h1 className="max-w-2xl text-5xl font-semibold tracking-[-0.055em] text-slate-950 sm:text-6xl">
            Build forms from clean document blocks.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            A modern block editor for forms. Type labels, tune placeholders,
            add email and multiple choice blocks with slash commands, then
            preview exactly what respondents will see.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 text-sm font-medium text-white transition hover:bg-slate-800"
              href="/editor"
            >
              Open editor
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <a
              className="inline-flex h-11 items-center justify-center rounded-lg border border-slate-200 px-5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              href="#blocks"
            >
              View blocks
            </a>
          </div>

          <div className="mt-10 grid max-w-xl gap-3 sm:grid-cols-3">
            {["Slash commands", "Keyboard flow", "Real preview"].map((item) => (
              <div
                className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600"
                key={item}
              >
                <CheckIcon className="h-4 w-4 text-emerald-500" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-sky-50/60 to-emerald-50/70 p-5 shadow-2xl shadow-slate-900/10">
          <div className="mb-4 flex justify-end gap-2 border-b border-slate-200 pb-4">
            <div className="h-9 w-9 rounded-lg border border-slate-200 bg-white" />
            <div className="flex h-9 items-center gap-2 rounded-lg border border-slate-200 px-3 text-sm font-medium">
              Preview Mode
            </div>
          </div>
          <div className="space-y-6 px-8 py-4">
            <h2 className="text-xl font-semibold">
              This is my form! <span className="text-rose-500">*</span>
            </h2>
            <div>
              <p className="text-lg font-semibold">
                Enter email <span className="text-rose-500">*</span>
              </p>
              <div className="mt-2 h-10 w-56 rounded-md border border-sky-200 bg-white/80 px-3 py-2 text-sm text-slate-400 shadow-sm">
                test@mail.com
              </div>
            </div>
            <div>
              <p className="text-lg font-semibold">Choose an option</p>
              <div className="mt-4 space-y-2">
                {["Option A", "Option B"].map((option, index) => (
                  <div
                    className="flex h-10 w-64 items-center gap-3 rounded-md border border-slate-200 bg-white/85 px-2 text-sm text-slate-500 shadow-sm"
                    key={option}
                  >
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-md text-sm font-bold text-white ${
                        index === 0 ? "bg-pink-500" : "bg-cyan-500"
                      }`}
                    >
                      {index === 0 ? "A" : "B"}
                    </span>
                    {option}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="mx-auto grid max-w-7xl gap-4 px-6 pb-20 md:grid-cols-3"
        id="blocks"
      >
        {blockRegistry.map((block) => (
          <div className="rounded-xl border border-slate-200 p-5" key={block.type}>
            <p className="text-xs font-medium text-slate-400">{block.command}</p>
            <h2 className="mt-3 text-lg font-semibold">{block.label}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              {block.description}
            </p>
          </div>
        ))}
      </section>
    </main>
  );
}
