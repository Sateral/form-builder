import { describe, expect, test } from "bun:test";

import {
  addOption,
  blockRegistry,
  createBlock,
  createInitialForm,
  insertBlockAfter,
  removeBlock,
  reorderBlocks,
  updateBlock,
  updateOption,
} from "./blocks";
import { getFocusTargets, getNextTarget, shouldLeaveInput } from "./navigation";

describe("form block model", () => {
  test("centralizes available slash menu blocks", () => {
    expect(blockRegistry.map((block) => block.type)).toEqual([
      "statement",
      "email",
      "multipleChoice",
    ]);
  });

  test("creates the initial MVP form from real block definitions", () => {
    const form = createInitialForm();

    expect(form.title).toBe("This is my form!");
    expect(form.blocks.map((block) => block.type)).toEqual([
      "statement",
      "email",
      "multipleChoice",
    ]);
  });

  test("inserts blocks after the selected block", () => {
    const first = createBlock("statement");
    const second = createBlock("email");
    const inserted = createBlock("multipleChoice");

    const blocks = insertBlockAfter([first, second], inserted, first.id);

    expect(blocks.map((block) => block.id)).toEqual([
      first.id,
      inserted.id,
      second.id,
    ]);
  });

  test("updates blocks and options immutably", () => {
    const block = createBlock("multipleChoice");
    const option = block.options[0];

    const renamedBlock = updateBlock(block, { label: "Pick one" });
    const renamedOption = updateOption(block, option.id, "Option A");
    const withOption = addOption(block);

    expect(block.label).not.toBe(renamedBlock.label);
    expect(renamedBlock.label).toBe("Pick one");
    expect(renamedOption.options[0].label).toBe("Option A");
    expect(withOption.options).toHaveLength(block.options.length + 1);
  });

  test("keeps at least one block in the document", () => {
    const onlyBlock = createBlock("statement");
    const nextBlocks = removeBlock([onlyBlock], onlyBlock.id);

    expect(nextBlocks).toHaveLength(1);
    expect(nextBlocks[0].type).toBe("statement");
  });

  test("reorders blocks by moving the dragged block before the target block", () => {
    const first = createBlock("statement");
    const second = createBlock("email");
    const third = createBlock("multipleChoice");

    const blocks = reorderBlocks([first, second, third], third.id, first.id);

    expect(blocks.map((block) => block.id)).toEqual([
      third.id,
      first.id,
      second.id,
    ]);
  });

  test("reorders blocks by moving the dragged block after the target block", () => {
    const first = createBlock("statement");
    const second = createBlock("email");
    const third = createBlock("multipleChoice");

    const blocks = reorderBlocks([first, second, third], first.id, third.id, "after");

    expect(blocks.map((block) => block.id)).toEqual([
      second.id,
      third.id,
      first.id,
    ]);
  });
});

describe("form block navigation", () => {
  const form = createInitialForm();

  test("builds focus targets in editor reading order", () => {
    expect(getFocusTargets(form.blocks).map((target) => target.kind)).toEqual([
      "label",
      "label",
      "placeholder",
      "label",
      "option",
      "option",
    ]);
  });

  test("moves between focus targets", () => {
    const targets = getFocusTargets(form.blocks);

    expect(getNextTarget(form.blocks, targets[1].id, "down")?.id).toBe(
      targets[2].id
    );
    expect(getNextTarget(form.blocks, targets[2].id, "up")?.id).toBe(
      targets[1].id
    );
  });

  test("only leaves text inputs at caret boundaries", () => {
    expect(
      shouldLeaveInput({
        key: "ArrowDown",
        value: "test",
        selectionStart: 4,
        selectionEnd: 4,
      })
    ).toBe(true);
    expect(
      shouldLeaveInput({
        key: "ArrowDown",
        value: "test",
        selectionStart: 2,
        selectionEnd: 2,
      })
    ).toBe(false);
  });
});
