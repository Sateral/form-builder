import { useCallback, useMemo } from "react";
import { shallow, useShallow } from "zustand/shallow";
import { useFormBuilderFacade } from "@/lib/store/form-builder-facade";

export function useEditorState(fieldId: string, subFieldId?: string) {
  // Get the selected state directly from the facade
  const { selectedField, selectedSubFieldId } = useFormBuilderFacade();

  const state = { selectedField, selectedSubFieldId };

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
