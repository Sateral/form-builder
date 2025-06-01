import { create } from "zustand";
import { FormField } from "@/lib/types"; // Assuming FormField is in @/lib/types

// calculateNextFocusTarget would be imported or defined here
// For now, let's assume it's available. You'll need to move or import it.
// import { calculateNextFocusTarget } from "@/utils/formNavigation";

interface FormNavigationState {
  // Navigation actions don't typically hold state themselves but operate on other states.
  // However, if you had navigation-specific state (e.g., history), it would go here.
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

// Placeholder for the actual utility function
const calculateNextFocusTarget = (
  fields: FormField[],
  currentFieldId: string | null,
  currentSubFieldId: string | null,
  direction: "up" | "down"
): { fieldId: string | null; subFieldId: string | null } => {
  // This is a simplified placeholder. Replace with your actual implementation.
  console.warn(
    "calculateNextFocusTarget is a placeholder in navigation-store.ts. Replace with actual implementation."
  );
  if (!fields || fields.length === 0)
    return { fieldId: null, subFieldId: null };
  const currentIndex = fields.findIndex((f) => f.id === currentFieldId);
  if (direction === "down") {
    const nextIndex = currentIndex + 1;
    if (nextIndex < fields.length) {
      return { fieldId: fields[nextIndex].id, subFieldId: null };
    }
  } else {
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      return { fieldId: fields[prevIndex].id, subFieldId: null };
    }
  }
  return { fieldId: currentFieldId, subFieldId: currentSubFieldId }; // No change if at ends
};

export const useFormNavigationStore = create<FormNavigationState>()(
  (set, get) => ({
    selectNextField: (fields, currentFieldId, currentSubFieldId) => {
      // The actual calculateNextFocusTarget function needs to be correctly imported/defined.
      // This function was originally part of the monolithic store's setter.
      // Now, it's a standalone utility or part of this store, and the facade will call it.
      const nextTarget = calculateNextFocusTarget(
        fields,
        currentFieldId,
        currentSubFieldId,
        "down"
      );
      return nextTarget;
    },
    selectPreviousField: (fields, currentFieldId, currentSubFieldId) => {
      const prevTarget = calculateNextFocusTarget(
        fields,
        currentFieldId,
        currentSubFieldId,
        "up"
      );
      return prevTarget;
    },
  })
);
