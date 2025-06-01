import { create } from "zustand";
import { FormField } from "@/lib/types";
import { calculateNextFocusTarget } from "@/utils/formNavigation"; // Import the correct function

interface FormNavigationState {
  selectNextField: (
    fields: FormField[],
    currentFieldId: string | null,
    currentSubFieldId: string | null
  ) => { fieldId: string | null; subFieldId: string | null };
  selectPreviousField: (
    fields: FormField[],
    currentFieldId: string | null,
    currentSubFieldId: string | null
  ) => { fieldId: string | null; subFieldId: string | null };
}

export const useFormNavigationStore = create<FormNavigationState>()(
  (set, get) => ({
    selectNextField: (fields, currentFieldId, currentSubFieldId) => {
      const nextTarget = calculateNextFocusTarget(
        // Now uses the imported function
        fields,
        currentFieldId,
        currentSubFieldId,
        "down"
      );
      return nextTarget;
    },
    selectPreviousField: (fields, currentFieldId, currentSubFieldId) => {
      const prevTarget = calculateNextFocusTarget(
        // Now uses the imported function
        fields,
        currentFieldId,
        currentSubFieldId,
        "up"
      );
      return prevTarget;
    },
  })
);
