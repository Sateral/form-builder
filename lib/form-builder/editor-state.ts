import {
  addOption,
  createBlock,
  createInitialForm,
  insertBlockAfter,
  removeBlock,
  removeOption,
  reorderBlocks,
  updateBlock,
  updateOption,
} from "./blocks";
import { getTargetId } from "./navigation";
import type {
  BlockType,
  FormBlock,
  FormDocument,
  MultipleChoiceBlock,
} from "./types";

export type DropPlacement = "before" | "after";
export type DropTarget = { blockId: string; placement: DropPlacement } | null;

export interface FormEditorState {
  form: FormDocument;
  isPreview: boolean;
  activeTargetId: string | null;
  menuBlockId: string | null;
  draggedBlockId: string | null;
  dropTarget: DropTarget;
}

export type FormEditorAction =
  | { type: "togglePreview" }
  | { type: "focusTarget"; targetId: string | null }
  | { type: "openMenu"; blockId: string }
  | { type: "closeMenu" }
  | { type: "addBlock"; blockType: BlockType; afterBlockId: string | null }
  | { type: "updateLabel"; blockId: string; label: string }
  | { type: "updatePlaceholder"; blockId: string; placeholder: string }
  | { type: "toggleRequired"; blockId: string }
  | { type: "updateOption"; blockId: string; optionId: string; label: string }
  | { type: "addOption"; blockId: string }
  | { type: "removeOption"; blockId: string; optionId: string }
  | { type: "removeBlock"; blockId: string }
  | { type: "startDrag"; blockId: string }
  | { type: "setDropTarget"; dropTarget: DropTarget }
  | {
      type: "dropBlock";
      sourceBlockId: string | null;
      targetBlockId: string;
      placement?: DropPlacement;
    }
  | { type: "endDrag" };

function isMultipleChoice(block: FormBlock): block is MultipleChoiceBlock {
  return block.type === "multipleChoice";
}

function withBlocks(
  state: FormEditorState,
  updater: (blocks: FormBlock[]) => FormBlock[],
): FormEditorState {
  return {
    ...state,
    form: {
      ...state.form,
      blocks: updater(state.form.blocks),
    },
  };
}

export function createInitialEditorState(): FormEditorState {
  return {
    form: createInitialForm(),
    isPreview: false,
    activeTargetId: null,
    menuBlockId: null,
    draggedBlockId: null,
    dropTarget: null,
  };
}

export function editorReducer(
  state: FormEditorState,
  action: FormEditorAction,
): FormEditorState {
  switch (action.type) {
    case "togglePreview":
      return {
        ...state,
        isPreview: !state.isPreview,
        menuBlockId: null,
      };

    case "focusTarget":
      return {
        ...state,
        activeTargetId: action.targetId,
      };

    case "openMenu":
      return {
        ...state,
        menuBlockId: action.blockId,
      };

    case "closeMenu":
      return {
        ...state,
        menuBlockId: null,
      };

    case "addBlock": {
      const block = createBlock(action.blockType);

      return {
        ...withBlocks(state, (blocks) =>
          insertBlockAfter(blocks, block, action.afterBlockId),
        ),
        menuBlockId: null,
        activeTargetId: getTargetId(block.id, "label"),
      };
    }

    case "updateLabel":
      return withBlocks(state, (blocks) =>
        blocks.map((block) =>
          block.id === action.blockId
            ? updateBlock(block, { label: action.label })
            : block,
        ),
      );

    case "updatePlaceholder":
      return withBlocks(state, (blocks) =>
        blocks.map((block) =>
          block.id === action.blockId
            ? updateBlock(block, { placeholder: action.placeholder })
            : block,
        ),
      );

    case "toggleRequired":
      return withBlocks(state, (blocks) =>
        blocks.map((block) =>
          block.id === action.blockId
            ? updateBlock(block, { required: !block.required })
            : block,
        ),
      );

    case "updateOption":
      return withBlocks(state, (blocks) =>
        blocks.map((block) =>
          block.id === action.blockId && isMultipleChoice(block)
            ? updateOption(block, action.optionId, action.label)
            : block,
        ),
      );

    case "addOption": {
      let nextOptionId: string | null = null;
      const nextState = withBlocks(state, (blocks) =>
        blocks.map((block) => {
          if (block.id !== action.blockId || !isMultipleChoice(block)) {
            return block;
          }

          const nextBlock = addOption(block);
          nextOptionId = nextBlock.options.at(-1)?.id ?? null;
          return nextBlock;
        }),
      );

      return nextOptionId
        ? {
            ...nextState,
            activeTargetId: getTargetId(action.blockId, "option", nextOptionId),
          }
        : nextState;
    }

    case "removeOption":
      return {
        ...withBlocks(state, (blocks) =>
          blocks.map((block) =>
            block.id === action.blockId && isMultipleChoice(block)
              ? removeOption(block, action.optionId)
              : block,
          ),
        ),
        activeTargetId: getTargetId(action.blockId, "label"),
      };

    case "removeBlock":
      return {
        ...withBlocks(state, (blocks) => removeBlock(blocks, action.blockId)),
        activeTargetId: null,
        menuBlockId: null,
      };

    case "startDrag":
      return {
        ...state,
        draggedBlockId: action.blockId,
        menuBlockId: null,
      };

    case "setDropTarget":
      return {
        ...state,
        dropTarget: action.dropTarget,
      };

    case "dropBlock": {
      const sourceBlockId = action.sourceBlockId;

      if (!sourceBlockId || sourceBlockId === action.targetBlockId) {
        return {
          ...state,
          draggedBlockId: null,
          dropTarget: null,
        };
      }

      return {
        ...withBlocks(state, (blocks) =>
          reorderBlocks(
            blocks,
            sourceBlockId,
            action.targetBlockId,
            action.placement ?? state.dropTarget?.placement ?? "before",
          ),
        ),
        draggedBlockId: null,
        dropTarget: null,
      };
    }

    case "endDrag":
      return {
        ...state,
        draggedBlockId: null,
        dropTarget: null,
      };
  }
}
