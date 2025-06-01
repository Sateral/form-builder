import { create } from "zustand";

interface FormSelectionState {
  selectedField: string | null;
  selectedSubFieldId: string | null;
  setSelectedField: (id: string | null, subFieldId?: string | null) => void;
}

export const useFormSelectionStore = create<FormSelectionState>()((set) => ({
  selectedField: null, // Initialized to null, or a default ID if appropriate
  selectedSubFieldId: null,
  setSelectedField: (id, subFieldId) => {
    set({ selectedField: id, selectedSubFieldId: subFieldId ?? null });
  },
}));
