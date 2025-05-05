import { create } from 'zustand';

interface CommandMenuState {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onClose: () => void;
}

export const useCommandMenu = create<CommandMenuState>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
  onClose: () => set({ isOpen: false }),
}));
