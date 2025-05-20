import { create } from "zustand";
import {
  FormField,
  FormFieldTypes,
  TextField,
  EmailField,
  MultipleChoiceField,
  FormSubField,
  BaseField,
} from "@/lib/types";

interface FormBuilderState {
  fields: FormField[];
  selectedField: string | null;
  selectedSubFieldId: string | null;
  isPreview: boolean;
  addField: (fieldData: FormField) => void;
  updateField: (id: string, updates: Partial<FormField>) => void;
  setSelectedField: (id: string | null, subFieldId?: string | null) => void;
  setFields: (fields: FormField[]) => void;
  removeField: (id: string) => void;
  togglePreview: () => void;
  selectNextField: () => void;
  selectPreviousField: () => void;
}

const createDefaultMCSubField = (
  parentFieldId: string,
  label: string = "Option",
  colour: string
): FormSubField & { type: "choice"; label: string; colour: string } => ({
  subId: crypto.randomUUID(),
  parentFieldId,
  type: "choice",
  label,
  colour,
});

export const useFormBuilder = create<FormBuilderState>()((set, get) => ({
  fields: [
    {
      id: "1",
      type: "text",
      label: "",
      required: true,
      value: "",
    } as TextField,
  ],
  selectedField: "1",
  selectedSubFieldId: null,
  isPreview: false,

  addField: (fieldData) => {
    const newId = crypto.randomUUID();
    let newCompleteField: FormField;

    const baseData: BaseField = {
      id: newId,
      label: "",
      required: false,
      placeholder: "Type something",
    };

    switch (fieldData.type) {
      case "text":
        newCompleteField = {
          ...baseData,
          ...(fieldData as Partial<TextField>),
          type: "text",
          value: (fieldData as Partial<TextField>).value || "",
        };
        break;

      case "email":
        newCompleteField = {
          ...baseData,
          ...(fieldData as Partial<EmailField>),
          type: "email",
          subField: (fieldData as Partial<EmailField>).subField || {
            parentFieldId: newId,
            subId: crypto.randomUUID(),
            type: "input",
            content: "",
          },
        };
        break;

      case "multipleChoice":
        newCompleteField = {
          ...baseData,
          ...(fieldData as Partial<MultipleChoiceField>),
          type: "multipleChoice",
          subFields: [
            createDefaultMCSubField(newId, "A", "#FF69B4"),
            createDefaultMCSubField(newId, "B", "#00CED1"),
          ],
        };
        break;

      default:
        const _exhaustiveCheck: never = fieldData;
        throw new Error(`Unhandled field type: ${_exhaustiveCheck}`);
    }

    set((state) => {
      const selectedIndex = state.fields.findIndex(
        (f) => f.id === state.selectedField
      );
      let newFieldsArray;
      if (selectedIndex !== -1) {
        newFieldsArray = [
          ...state.fields.slice(0, selectedIndex + 1),
          newCompleteField,
          ...state.fields.slice(selectedIndex + 1),
        ];
      } else {
        newFieldsArray = [...state.fields, newCompleteField];
      }
      return {
        fields: newFieldsArray,
        selectedField: newCompleteField.id,
        selectedSubFieldId: null,
      };
    });
  },

  updateField: (id, updates) => {
    set((state) => {
      const newFields = state.fields.map((field) => {
        if (field.id === id) {
          return { ...field, ...updates } as FormField;
        }
        return field;
      });
      return { ...state, fields: newFields };
    });
  },

  setSelectedField: (id, subFieldId) => {
    set({ selectedField: id, selectedSubFieldId: subFieldId ?? null });
  },

  setFields: (fields) => set({ fields }),

  removeField: (id) => {
    set((state) => {
      const currentFields = state.fields;
      const fieldToRemoveIndex = currentFields.findIndex((f) => f.id === id);

      if (fieldToRemoveIndex === -1) return {};

      const newFields = currentFields.filter((f) => f.id !== id);

      if (newFields.length === 0) {
        const defaultField: TextField = {
          id: crypto.randomUUID(),
          type: "text",
          label: "",
          required: false,
          value: "",
        };
        return {
          fields: [defaultField],
          selectedField: defaultField.id,
          selectedSubFieldId: null,
        };
      }

      let newSelectedId: string | null = state.selectedField;
      if (state.selectedField === id) {
        if (fieldToRemoveIndex > 0 && newFields[fieldToRemoveIndex - 1]) {
          newSelectedId = newFields[fieldToRemoveIndex - 1].id;
        } else if (newFields.length > 0) {
          newSelectedId = newFields[0].id;
        }
      }

      const newSelectedFieldInstance = newFields.find(
        (f) => f.id === newSelectedId
      );
      let newSelectedSubFieldId = state.selectedSubFieldId;

      if (newSelectedFieldInstance) {
        const hasSubFieldsProperty =
          "subFields" in newSelectedFieldInstance ||
          "options" in newSelectedFieldInstance;
        if (!hasSubFieldsProperty) {
          newSelectedSubFieldId = null;
        }
      } else {
        newSelectedSubFieldId = null;
      }

      return {
        fields: newFields,
        selectedField: newSelectedId,
        selectedSubFieldId: newSelectedSubFieldId,
      };
    });
  },

  togglePreview: () => {
    set((state) => ({ isPreview: !state.isPreview }));
  },
  selectNextField: () => {
    set((state) => {
      const { fields, selectedField, selectedSubFieldId } = state;

      // Import the calculation function from the utility file
      const { calculateNextFocusTarget } = require("@/utils/formNavigation");

      // Use the utility function to calculate the next focus target
      const nextTarget = calculateNextFocusTarget(
        fields,
        selectedField,
        selectedSubFieldId,
        "down"
      );

      // If there's no change, return empty object to prevent unnecessary re-renders
      if (
        nextTarget.fieldId === selectedField &&
        nextTarget.subFieldId === selectedSubFieldId
      ) {
        return {};
      }

      // Return the new selection state
      return {
        selectedField: nextTarget.fieldId,
        selectedSubFieldId: nextTarget.subFieldId,
      };
    });
  },
  selectPreviousField: () => {
    set((state) => {
      const { fields, selectedField, selectedSubFieldId } = state;

      // Import the calculation function from the utility file
      const { calculateNextFocusTarget } = require("@/utils/formNavigation");

      // Use the utility function to calculate the previous focus target
      const prevTarget = calculateNextFocusTarget(
        fields,
        selectedField,
        selectedSubFieldId,
        "up"
      );

      // If there's no change, return empty object to prevent unnecessary re-renders
      if (
        prevTarget.fieldId === selectedField &&
        prevTarget.subFieldId === selectedSubFieldId
      ) {
        return {};
      }

      // Return the new selection state
      return {
        selectedField: prevTarget.fieldId,
        selectedSubFieldId: prevTarget.subFieldId,
      };
    });
  },
}));
