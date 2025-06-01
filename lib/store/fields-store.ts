import { create } from "zustand";
import {
  FormField,
  TextField,
  EmailField,
  MultipleChoiceField,
  FormSubField,
  BaseField,
} from "@/lib/types";

// Helper function from the original store
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

interface FormFieldsState {
  fields: FormField[];
  addField: (fieldData: FormField, selectedFieldId?: string | null) => string; // Returns new field ID
  updateField: (id: string, updates: Partial<FormField>) => void;
  setFields: (fields: FormField[]) => void;
  removeField: (
    id: string,
    selectedFieldId?: string | null
  ) => { newFields: FormField[]; newSelectedFieldId: string | null }; // Returns new fields and new selected ID
}

export const useFormFieldsStore = create<FormFieldsState>()((set, get) => ({
  fields: [
    {
      id: "1",
      type: "text",
      label: "",
      required: true,
      value: "",
    } as TextField,
  ],
  addField: (fieldData, selectedFieldId) => {
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
        // This ensures all cases are handled at compile time
        const _exhaustiveCheck: never = fieldData;
        throw new Error(`Unhandled field type: ${_exhaustiveCheck}`);
    }

    set((state) => {
      const selectedIndex = state.fields.findIndex(
        (f) => f.id === selectedFieldId
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
      return { fields: newFieldsArray };
    });
    return newCompleteField.id; // Return the new field's ID
  },
  updateField: (id, updates) => {
    set((state) => {
      const newFields = state.fields.map((field) => {
        if (field.id === id) {
          return { ...field, ...updates } as FormField;
        }
        return field;
      });
      return { fields: newFields }; // Only update fields, not the whole state
    });
  },
  setFields: (fields) => set({ fields }),
  removeField: (id, selectedFieldId) => {
    let newSelectedId: string | null = selectedFieldId ?? null;
    const currentFields = get().fields;
    const fieldToRemoveIndex = currentFields.findIndex((f) => f.id === id);

    if (fieldToRemoveIndex === -1) {
      // Field not found, return current state
      return { newFields: currentFields, newSelectedFieldId: newSelectedId };
    }

    let newFields = currentFields.filter((f) => f.id !== id);

    if (newFields.length === 0) {
      // If all fields are removed, create a default text field
      const defaultField: TextField = {
        id: crypto.randomUUID(),
        type: "text",
        label: "",
        required: false,
        value: "",
      };
      newFields = [defaultField];
      newSelectedId = defaultField.id;
    } else if (selectedFieldId === id) {
      // If the removed field was selected, select the previous or first field
      if (fieldToRemoveIndex > 0 && newFields[fieldToRemoveIndex - 1]) {
        newSelectedId = newFields[fieldToRemoveIndex - 1].id;
      } else if (newFields.length > 0) {
        newSelectedId = newFields[0].id;
      }
    }

    set({ fields: newFields });
    return { newFields, newSelectedFieldId: newSelectedId };
  },
}));
