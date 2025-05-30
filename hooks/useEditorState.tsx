import { useCallback, useMemo } from "react";
import { useFormBuilder } from "@/lib/store/form-builder-store";
import { shallow, useShallow } from "zustand/shallow";

export function useEditorState(fieldId: string, subFieldId?: string) {
  // Create a stable selector that doesn't change between renders.
  // Note: This selector still returns a new object on every call.
  // Get the selected state with shallow equality.
  const state = useFormBuilder(
    useShallow(
      useCallback(
        (state) => ({
          selectedField: state.selectedField,
          selectedSubFieldId: state.selectedSubFieldId,
        }),
        []
      )
    )
  );

  // Cache the snapshot so that if state hasn't changed,
  // the same object reference is returned.
  const cachedState = useMemo(
    () => state,
    [state.selectedField, state.selectedSubFieldId]
  );

  // Compute derived state with memoization.
  const isSelected = useMemo(
    () =>
      subFieldId
        ? cachedState.selectedSubFieldId === subFieldId
        : cachedState.selectedField === fieldId &&
          !cachedState.selectedSubFieldId,
    [cachedState, fieldId, subFieldId]
  );

  return {
    ...cachedState,
    isSelected,
  };
}
