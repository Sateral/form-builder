import { describe, expect, test } from "bun:test";

import {
  createInitialEditorState,
  editorReducer,
} from "./editor-state";
import { getTargetId } from "./navigation";

describe("form editor state", () => {
  test("adds a block after the selected block and focuses the new label", () => {
    const state = createInitialEditorState();
    const firstBlockId = state.form.blocks[0].id;

    const nextState = editorReducer(state, {
      type: "addBlock",
      blockType: "email",
      afterBlockId: firstBlockId,
    });
    const insertedBlock = nextState.form.blocks[1];

    expect(nextState.form.blocks).toHaveLength(state.form.blocks.length + 1);
    expect(insertedBlock.type).toBe("email");
    expect(nextState.menuBlockId).toBeNull();
    expect(nextState.activeTargetId).toBe(getTargetId(insertedBlock.id, "label"));
  });

  test("adds an option and focuses it", () => {
    const state = createInitialEditorState();
    const choiceBlock = state.form.blocks.find(
      (block) => block.type === "multipleChoice",
    );

    if (!choiceBlock || choiceBlock.type !== "multipleChoice") {
      throw new Error("Expected initial form to include a multiple choice block");
    }

    const nextState = editorReducer(state, {
      type: "addOption",
      blockId: choiceBlock.id,
    });
    const nextChoiceBlock = nextState.form.blocks.find(
      (block) => block.id === choiceBlock.id,
    );

    if (!nextChoiceBlock || nextChoiceBlock.type !== "multipleChoice") {
      throw new Error("Expected multiple choice block to remain present");
    }

    const insertedOption = nextChoiceBlock.options.at(-1);

    expect(nextChoiceBlock.options).toHaveLength(choiceBlock.options.length + 1);
    expect(insertedOption).toBeDefined();
    expect(nextState.activeTargetId).toBe(
      getTargetId(choiceBlock.id, "option", insertedOption?.id),
    );
  });
});
