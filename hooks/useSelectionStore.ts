import { useFormSelectionStore } from "@/lib/store/selection-store";
import { useShallow } from "zustand/shallow";

export const useSelection = () =>
  useFormSelectionStore(
    useShallow((state) => ({
      selectedField: state.selectedField,
      selectedSubFieldId: state.selectedSubFieldId,
      setSelectedField: state.setSelectedField,
    }))
  );

// Optimized selector for components that only need to know if they're selected
export const useIsSelected = (fieldId: string, subFieldId?: string) =>
  useFormSelectionStore(
    useShallow((state) => {
      if (subFieldId) {
        return state.selectedSubFieldId === subFieldId;
      }
      return state.selectedField === fieldId && !state.selectedSubFieldId;
    })
  );
