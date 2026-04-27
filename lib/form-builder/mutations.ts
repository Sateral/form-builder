import { createBlock, createOption } from "./factories";
import type { FormBlock, MultipleChoiceBlock } from "./types";

export function insertBlockAfter(
  blocks: FormBlock[],
  block: FormBlock,
  afterBlockId: string | null,
): FormBlock[] {
  const index = blocks.findIndex((item) => item.id === afterBlockId);

  if (index === -1) {
    return [...blocks, block];
  }

  return [...blocks.slice(0, index + 1), block, ...blocks.slice(index + 1)];
}

export function updateBlock<TBlock extends FormBlock>(
  block: TBlock,
  updates: Partial<TBlock>,
): TBlock {
  return { ...block, ...updates };
}

export function updateOption(
  block: MultipleChoiceBlock,
  optionId: string,
  label: string,
): MultipleChoiceBlock {
  return {
    ...block,
    options: block.options.map((option) =>
      option.id === optionId ? { ...option, label } : option,
    ),
  };
}

export function addOption(block: MultipleChoiceBlock): MultipleChoiceBlock {
  return {
    ...block,
    options: [...block.options, createOption(`Option ${block.options.length + 1}`)],
  };
}

export function removeOption(
  block: MultipleChoiceBlock,
  optionId: string,
): MultipleChoiceBlock {
  if (block.options.length <= 1) {
    return block;
  }

  return {
    ...block,
    options: block.options.filter((option) => option.id !== optionId),
  };
}

export function removeBlock(blocks: FormBlock[], blockId: string): FormBlock[] {
  const nextBlocks = blocks.filter((block) => block.id !== blockId);
  return nextBlocks.length > 0 ? nextBlocks : [createBlock("statement")];
}

export function reorderBlocks(
  blocks: FormBlock[],
  sourceBlockId: string,
  targetBlockId: string,
  placement: "before" | "after" = "before",
): FormBlock[] {
  if (sourceBlockId === targetBlockId) {
    return blocks;
  }

  const sourceIndex = blocks.findIndex((block) => block.id === sourceBlockId);
  const targetIndex = blocks.findIndex((block) => block.id === targetBlockId);

  if (sourceIndex === -1 || targetIndex === -1) {
    return blocks;
  }

  const nextBlocks = [...blocks];
  const [sourceBlock] = nextBlocks.splice(sourceIndex, 1);
  const adjustedTargetIndex = nextBlocks.findIndex(
    (block) => block.id === targetBlockId,
  );

  const insertIndex =
    placement === "after" ? adjustedTargetIndex + 1 : adjustedTargetIndex;

  nextBlocks.splice(insertIndex, 0, sourceBlock);
  return nextBlocks;
}
