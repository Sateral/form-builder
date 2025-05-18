import { create } from "zustand";
import { FormField } from "@/lib/types";

interface FormBuilderState {
  fields: FormField[];
  selectedField: string | null;
  selectedSubFieldId: string | null;
  isPreview: boolean;
  addField: (field: Omit<FormField, "id">) => void;
  updateField: (id: string, updates: Partial<FormField>) => void;
  setSelectedField: (id: string | null, subFieldId?: string | null) => void;
  setFields: (fields: FormField[]) => void;
  removeField: (id: string) => void;
  togglePreview: () => void;
}

export const useFormBuilder = create<FormBuilderState>()(
  // persist(
  (set, get) => ({
    fields: [
      {
        id: "1",
        type: "text",
        label: "Full Name",
        required: true,
        placeholder: "Type something",
        content: "",
      },
    ],

    selectedField: "1",

    selectedSubFieldId: null,

    isPreview: false,

    addField: (field) => {
      const newId = crypto.randomUUID();
      const newField: FormField = {
        ...field,
        id: newId,
        content: "",
        subFields: field.subFields
          ? field.subFields.map((subField) => ({
              ...subField,
              subId: crypto.randomUUID(),
              parentFieldId: newId,
            }))
          : [],
      };
      set((state) => {
        // Find the index of the currently selected field
        const selectedIndex = state.fields.findIndex(
          (f) => f.id === state.selectedField
        );
        let newFields;
        if (selectedIndex !== -1) {
          newFields = [
            ...state.fields.slice(0, selectedIndex + 1),
            newField,
            ...state.fields.slice(selectedIndex + 1),
          ];
        } else {
          newFields = [...state.fields, newField];
        }
        return {
          fields: newFields,
          selectedField: newField.id, // auto-select the newly added field
        };
      });
    },

    updateField: (id, updates) => {
      set((state) => ({
        fields: state.fields.map((f) =>
          f.id === id ? { ...f, ...updates } : f
        ),
      }));
    },

    setSelectedField: (id, subFieldId) => {
      set({ selectedField: id, selectedSubFieldId: subFieldId });
    },

    setFields: (fields) => set({ fields }),

    removeField: (id) => {
      set((state) => {
        const index = state.fields.findIndex((f) => f.id === id);
        const newFields = state.fields.filter((f) => f.id !== id);
        if (newFields.length === 0) {
          const defaultField: FormField = {
            id: crypto.randomUUID(),
            type: "text",
            label: "New Field",
            required: false,
            content: "",
          };
          newFields.push(defaultField);
          return {
            fields: newFields,
            selectedField: defaultField.id,
          };
        } else if (index === 0) {
          return {
            fields: newFields,
            selectedField: newFields[0].id,
          };
        }
        return { fields: newFields };
      });
    },

    togglePreview: () => {
      set((state) => ({ isPreview: !state.isPreview }));
    },
  })
  // { name: 'form-builder-storage' }
  // )
);
