import Link from "next/link";
import { ArrowRightIcon, GripVerticalIcon } from "lucide-react";

import { blockRegistry } from "@/lib/form-builder/blocks";

const optionPalette = ["bg-pink-500", "bg-cyan-500", "bg-amber-500"];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <header className="border-b border-slate-200/70">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <Link className="flex items-center gap-2" href="/">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-950 text-sm font-bold text-white">
              N
            </span>
            <span className="text-[15px] font-semibold tracking-[-0.01em]">
              Noto
            </span>
          </Link>
          <Link
            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-slate-950 px-3.5 text-sm font-medium text-white transition-colors hover:bg-slate-800"
            href="/editor"
          >
            Open editor
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 pt-20 pb-16 sm:pt-28">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Now with slash commands
          </span>
          <h1 className="mt-6 text-5xl font-semibold leading-[1.05] tracking-[-0.04em] text-slate-950 sm:text-6xl">
            Forms feel better
            <br />
            as <span className="text-pink-500">blocks</span>.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[17px] leading-[1.6] text-slate-600">
            A block editor for forms. Type to label, slash to add a field,
            preview the exact thing your respondents see. No drag-drop ceremony,
            no template gallery.
          </p>

          <div className="mt-8 flex justify-center gap-3">
            <Link
              className="inline-flex h-11 items-center justify-center gap-1.5 rounded-lg bg-slate-950 px-5 text-sm font-medium text-white transition-colors hover:bg-slate-800"
              href="/editor"
            >
              Start building
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <a
              className="inline-flex h-11 items-center justify-center rounded-lg border border-slate-200 bg-white px-5 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-50"
              href="#blocks"
            >
              See the blocks
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-24">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
              <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
              <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
            </div>
            <span className="rounded-md bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-600">
              Edit mode
            </span>
          </div>
          <div className="px-8 py-10 md:px-14">
            <div className="space-y-5">
              <DemoBlock>
                <p className="text-lg font-semibold tracking-[-0.01em] text-slate-950">
                  Customer feedback{" "}
                  <span className="text-rose-500">*</span>
                </p>
              </DemoBlock>

              <DemoBlock>
                <p className="text-lg font-semibold tracking-[-0.01em] text-slate-950">
                  Email <span className="text-rose-500">*</span>
                </p>
                <div className="mt-2 flex h-9 w-full max-w-sm items-center rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-400">
                  you@company.com
                </div>
              </DemoBlock>

              <DemoBlock>
                <p className="text-lg font-semibold tracking-[-0.01em] text-slate-950">
                  Pick a vibe
                </p>
                <div className="mt-3 space-y-2">
                  {[
                    { label: "Designer" },
                    { label: "Engineer" },
                    { label: "Product manager" },
                  ].map((option, index) => (
                    <div
                      className="flex max-w-md items-center gap-2"
                      key={option.label}
                    >
                      <div
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-sm font-bold text-white ${optionPalette[index]}`}
                      >
                        {String.fromCharCode(65 + index)}
                      </div>
                      <div className="flex h-9 min-w-0 flex-1 items-center rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-700">
                        {option.label}
                      </div>
                    </div>
                  ))}
                </div>
              </DemoBlock>

              <div className="ml-2 flex items-center gap-2 pt-2 text-sm text-slate-400">
                <span className="rounded-md border border-dashed border-slate-300 px-2 py-1 font-mono text-xs text-slate-500">
                  /
                </span>
                Type to add a block
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="mx-auto max-w-5xl border-t border-slate-200/70 px-6 py-20"
        id="blocks"
      >
        <div className="mb-12 max-w-xl">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
            Blocks
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.025em] text-slate-950">
            Building blocks for your form.
          </h2>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {blockRegistry.map((block, index) => (
            <div
              className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-5 transition-colors hover:border-slate-300"
              key={block.type}
            >
              <div
                className={`mb-4 inline-flex h-8 w-8 items-center justify-center rounded-md text-sm font-bold text-white ${optionPalette[index % optionPalette.length]}`}
              >
                {String.fromCharCode(65 + index)}
              </div>
              <p className="font-mono text-xs text-slate-500">
                {block.command}
              </p>
              <h3 className="mt-1.5 text-base font-semibold text-slate-950">
                {block.label}
              </h3>
              <p className="mt-1.5 text-sm leading-[1.55] text-slate-600">
                {block.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-slate-200/70">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8 text-xs text-slate-500">
          <span>Noto Forms</span>
          <span>Built with Next.js</span>
        </div>
      </footer>
    </main>
  );
}

function DemoBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="group relative grid grid-cols-[2.5rem_minmax(0,1fr)] items-start gap-2 py-1">
      <div className="flex h-9 items-center justify-end pr-1 text-slate-300">
        <GripVerticalIcon className="h-4 w-4" />
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
