import type { FocusKind, FocusTarget, FormBlock } from "./types";

type Direction = "up" | "down";

interface InputBoundary {
  key: string;
  value: string;
  selectionStart: number | null;
  selectionEnd: number | null;
}

export function getTargetId(
  blockId: string,
  kind: FocusKind,
  optionId?: string
): string {
  return optionId ? `${blockId}:${kind}:${optionId}` : `${blockId}:${kind}`;
}

function target(blockId: string, kind: FocusKind, optionId?: string): FocusTarget {
  return {
    id: getTargetId(blockId, kind, optionId),
    blockId,
    kind,
    optionId,
  };
}

export function getFocusTargets(blocks: FormBlock[]): FocusTarget[] {
  return blocks.flatMap((block) => {
    if (block.type === "statement") {
      return [target(block.id, "label")];
    }

    if (block.type === "email") {
      return [target(block.id, "label"), target(block.id, "placeholder")];
    }

    return [
      target(block.id, "label"),
      ...block.options.map((option) => target(block.id, "option", option.id)),
    ];
  });
}

export function getNextTarget(
  blocks: FormBlock[],
  currentTargetId: string | null,
  direction: Direction
): FocusTarget | null {
  const targets = getFocusTargets(blocks);

  if (targets.length === 0) {
    return null;
  }

  const currentIndex = targets.findIndex((target) => target.id === currentTargetId);
  const fallbackIndex = direction === "down" ? 0 : targets.length - 1;

  if (currentIndex === -1) {
    return targets[fallbackIndex];
  }

  const nextIndex = direction === "down" ? currentIndex + 1 : currentIndex - 1;
  return targets[Math.max(0, Math.min(nextIndex, targets.length - 1))];
}

export function shouldLeaveInput(input: InputBoundary): boolean {
  const { key, value, selectionStart, selectionEnd } = input;

  if (selectionStart === null || selectionEnd === null) {
    return false;
  }

  if (selectionStart !== selectionEnd) {
    return false;
  }

  if (key === "ArrowDown") {
    return selectionStart === value.length;
  }

  if (key === "ArrowUp") {
    return selectionStart === 0;
  }

  return false;
}
