"use client";

import {
  useEffect,
  useReducer,
  useRef,
  type DragEvent,
  type KeyboardEvent,
} from "react";

import {
  createInitialEditorState,
  editorReducer,
  type FormEditorState,
} from "@/lib/form-builder/editor-state";
import {
  getNextTarget,
  shouldLeaveInput,
} from "@/lib/form-builder/navigation";
import type { BlockType } from "@/lib/form-builder/types";

export type EditableElement = HTMLInputElement | HTMLTextAreaElement;

export interface BlockEditorActions {
  focusTarget: (targetId: string) => void;
  keyDown: (
    event: KeyboardEvent<EditableElement>,
    blockId: string,
    targetId: string,
  ) => void;
  openMenu: (blockId: string) => void;
  updateLabel: (blockId: string, label: string) => void;
  updatePlaceholder: (blockId: string, placeholder: string) => void;
  updateOption: (blockId: string, optionId: string, label: string) => void;
  addOption: (blockId: string) => void;
  removeOption: (blockId: string, optionId: string) => void;
  toggleRequired: (blockId: string) => void;
  removeBlock: (blockId: string) => void;
  dragStart: (event: DragEvent<HTMLButtonElement>, blockId: string) => void;
  dragEnd: () => void;
}

export interface FormEditorActions extends BlockEditorActions {
  togglePreview: () => void;
  closeMenu: () => void;
  addBlock: (type: BlockType, afterBlockId: string | null) => void;
  dragOver: (event: DragEvent<HTMLDivElement>, blockId: string) => void;
  drop: (event: DragEvent<HTMLDivElement>, targetBlockId: string) => void;
}

export interface FormEditorController {
  state: FormEditorState;
  actions: FormEditorActions;
  registerTarget: (targetId: string, node: EditableElement | null) => void;
}

export function useFormEditor(): FormEditorController {
  const [state, dispatch] = useReducer(
    editorReducer,
    undefined,
    createInitialEditorState,
  );
  const targetRefs = useRef<Record<string, EditableElement | null>>({});

  useEffect(() => {
    if (state.activeTargetId) {
      targetRefs.current[state.activeTargetId]?.focus();
    }
  }, [state.activeTargetId, state.form.blocks.length]);

  function registerTarget(targetId: string, node: EditableElement | null) {
    targetRefs.current[targetId] = node;
  }

  const actions: FormEditorActions = {
    togglePreview() {
      dispatch({ type: "togglePreview" });
    },
    focusTarget(targetId) {
      dispatch({ type: "focusTarget", targetId });
    },
    openMenu(blockId) {
      dispatch({ type: "openMenu", blockId });
    },
    closeMenu() {
      dispatch({ type: "closeMenu" });
    },
    addBlock(blockType, afterBlockId) {
      dispatch({ type: "addBlock", blockType, afterBlockId });
    },
    updateLabel(blockId, label) {
      dispatch({ type: "updateLabel", blockId, label });
    },
    updatePlaceholder(blockId, placeholder) {
      dispatch({ type: "updatePlaceholder", blockId, placeholder });
    },
    updateOption(blockId, optionId, label) {
      dispatch({ type: "updateOption", blockId, optionId, label });
    },
    addOption(blockId) {
      dispatch({ type: "addOption", blockId });
    },
    removeOption(blockId, optionId) {
      dispatch({ type: "removeOption", blockId, optionId });
    },
    toggleRequired(blockId) {
      dispatch({ type: "toggleRequired", blockId });
    },
    removeBlock(blockId) {
      dispatch({ type: "removeBlock", blockId });
    },
    dragStart(event, blockId) {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", blockId);
      dispatch({ type: "startDrag", blockId });
    },
    dragOver(event, blockId) {
      if (!state.draggedBlockId || state.draggedBlockId === blockId) {
        return;
      }

      event.preventDefault();
      event.dataTransfer.dropEffect = "move";

      const bounds = event.currentTarget.getBoundingClientRect();
      const placement =
        event.clientY > bounds.top + bounds.height / 2 ? "after" : "before";

      dispatch({ type: "setDropTarget", dropTarget: { blockId, placement } });
    },
    drop(event, targetBlockId) {
      event.preventDefault();

      dispatch({
        type: "dropBlock",
        sourceBlockId:
          event.dataTransfer.getData("text/plain") || state.draggedBlockId,
        targetBlockId,
      });
    },
    dragEnd() {
      dispatch({ type: "endDrag" });
    },
    keyDown(event, blockId, targetId) {
      if (
        event.key === "/" &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.altKey
      ) {
        event.preventDefault();
        dispatch({ type: "focusTarget", targetId });
        dispatch({ type: "openMenu", blockId });
        return;
      }

      if (event.key === "Escape") {
        dispatch({ type: "closeMenu" });
        return;
      }

      if (event.key !== "ArrowDown" && event.key !== "ArrowUp") {
        return;
      }

      if (
        !shouldLeaveInput({
          key: event.key,
          value: event.currentTarget.value,
          selectionStart: event.currentTarget.selectionStart,
          selectionEnd: event.currentTarget.selectionEnd,
        })
      ) {
        return;
      }

      event.preventDefault();

      const nextTarget = getNextTarget(
        state.form.blocks,
        targetId,
        event.key === "ArrowDown" ? "down" : "up",
      );

      if (nextTarget) {
        dispatch({ type: "focusTarget", targetId: nextTarget.id });
        dispatch({ type: "closeMenu" });
      }
    },
  };

  return {
    state,
    actions,
    registerTarget,
  };
}
