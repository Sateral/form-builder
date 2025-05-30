import { useCallback, useEffect } from "react";
import { useFormBuilder } from "@/lib/store/form-builder-store";
import { FormField, MultipleChoiceField, EmailField } from "@/lib/types";

/**
 * Hook that enables keyboard navigation through form fields and their subfields
 * using arrow keys (up/down).
 *
 * @returns Object with functions to handle keyboard events
 */
export const useFieldNavigation = () => {
  const {
    fields,
    selectedField,
    selectedSubFieldId,
    setSelectedField,
    selectNextField,
    selectPreviousField,
    isPreview,
  } = useFormBuilder();

  /**
   * Handles keyboard navigation events
   * @param e - Keyboard event
   */
  const handleKeyNavigation = useCallback(
    (e: KeyboardEvent) => {
      // Skip navigation in preview mode
      if (isPreview) {
        return;
      }

      // Only handle arrow keys
      if (e.key !== "ArrowDown" && e.key !== "ArrowUp") {
        return;
      }

      // Skip if modifier keys are pressed
      if (e.ctrlKey || e.altKey || e.metaKey || e.shiftKey) {
        return;
      }

      // Get the active element
      const element = document.activeElement;

      // Skip if user is in the middle of typing in a multiline editor
      if (element instanceof HTMLTextAreaElement) {
        const value = element.value || "";

        // If cursor is not at beginning/end when pressing up/down, let the default behavior work
        if (e.key === "ArrowDown" && element.selectionStart !== value.length) {
          return;
        }
        if (e.key === "ArrowUp" && element.selectionStart !== 0) {
          return;
        }
      }

      // Skip if in a content editable div and not at boundaries
      if (element instanceof HTMLElement && element.isContentEditable) {
        const selection = window.getSelection();
        if (!selection || !selection.rangeCount) return;

        const range = selection.getRangeAt(0);
        const isAtStart = range.startOffset === 0;
        const isAtEnd =
          range.endOffset === range.endContainer.textContent?.length;

        // Only navigate if at boundaries
        if (e.key === "ArrowUp" && !isAtStart) return;
        if (e.key === "ArrowDown" && !isAtEnd) return;
      }

      // Navigate through fields
      e.preventDefault(); // Prevent default scrolling

      if (e.key === "ArrowDown") {
        selectNextField();
      } else if (e.key === "ArrowUp") {
        selectPreviousField();
      }
    },
    [selectNextField, selectPreviousField, isPreview]
  );

  // Focus the currently selected field or subfield
  const focusSelectedField = useCallback(() => {
    // Skip focusing in preview mode
    if (isPreview) return;

    setTimeout(() => {
      if (!selectedField) return;

      // Find the current field
      const currentField = fields.find((field) => field.id === selectedField);
      if (!currentField) return;

      // If a subfield is selected, focus it
      if (selectedSubFieldId) {
        const elementId = `field-${selectedField}-sub-${selectedSubFieldId}`;
        const subElement = document.getElementById(elementId);
        if (subElement) {
          subElement.focus();
          return;
        }
      }

      // Otherwise focus the main field
      const elementId = `field-${selectedField}`;
      const mainElement = document.getElementById(elementId);
      if (mainElement) {
        mainElement.focus();
      }
    }, 0);
  }, [fields, selectedField, selectedSubFieldId, isPreview]);
  // Add the keyboard event listener
  useEffect(() => {
    document.addEventListener("keydown", handleKeyNavigation);

    // Cleanup event listener
    return () => {
      document.removeEventListener("keydown", handleKeyNavigation);
    };
  }, [handleKeyNavigation]);

  // Listen for selected field changes to focus automatically
  useEffect(() => {
    focusSelectedField();
  }, [selectedField, selectedSubFieldId, focusSelectedField]);

  return {
    handleKeyNavigation,
    focusSelectedField,
  };
};

export default useFieldNavigation;
