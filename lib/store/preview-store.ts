import { create } from "zustand";

interface FormPreviewState {
  isPreview: boolean;
  togglePreview: () => void;
  setIsPreview: (isPreview: boolean) => void; // Added for more direct control if needed
}

export const useFormPreviewStore = create<FormPreviewState>()((set) => ({
  isPreview: false,
  togglePreview: () => set((state) => ({ isPreview: !state.isPreview })),
  setIsPreview: (isPreview) => set({ isPreview }),
}));
