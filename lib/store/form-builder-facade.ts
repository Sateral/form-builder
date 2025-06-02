import { useFields } from "@/hooks/useFieldsStore";
import { useNavigation } from "@/hooks/useNavigationStore";
import { usePreview } from "@/hooks/usePreviewStore";
import { useSelection } from "@/hooks/useSelectionStore";
import { FormField } from "@/lib/types";

export function useFormBuilderFacade() {
  const {
    fields,
    addField: addFieldInternal,
    updateField,
    setFields,
    removeField: removeFieldInternal,
  } = useFields();

  const {
    selectedField,
    selectedSubFieldId,
    setSelectedField: setSelectedFieldInternal,
  } = useSelection();

  const {
    selectNextField: selectNextFieldInternal,
    selectPreviousField: selectPreviousFieldInternal,
  } = useNavigation();

  const { isPreview, togglePreview, setIsPreview } = usePreview();

  // --- Field Actions ---
  const addField = (fieldData: FormField) => {
    const newFieldId = addFieldInternal(fieldData, selectedField);
    setSelectedFieldInternal(newFieldId, null); // Select the new field, clear sub-selection
  };

  const removeField = (id: string) => {
    // removeFieldInternal from fields-store now returns an object:
    // { newFields: FormField[]; newSelectedFieldId: string | null }
    // We don't need to use newFields here as the store is already updated.
    const { newSelectedFieldId } = removeFieldInternal(id, selectedField);
    setSelectedFieldInternal(newSelectedFieldId, null); // Reset subfield selection
  };

  const getField = (id: string): FormField | undefined => {
    return fields.find((field) => field.id === id);
  };

  // --- Selection Actions ---
  const setSelectedField = (id: string | null, subFieldId?: string | null) => {
    setSelectedFieldInternal(id, subFieldId);
    // Logic to clear subFieldId if the selected field type doesn't have subFields
    if (id) {
      const field = fields.find((f) => f.id === id);
      if (
        field &&
        !("subFields" in field || "options" in field || "subField" in field)
      ) {
        // If the field type does not support subfields, ensure subFieldId is null
        setSelectedFieldInternal(id, null);
      }
    }
  };

  // --- Navigation Actions ---
  const selectNextField = () => {
    const nextTarget = selectNextFieldInternal(
      fields,
      selectedField,
      selectedSubFieldId
    );
    if (
      nextTarget.fieldId !== selectedField ||
      nextTarget.subFieldId !== selectedSubFieldId
    ) {
      setSelectedFieldInternal(nextTarget.fieldId, nextTarget.subFieldId);
    }
  };

  const selectPreviousField = () => {
    const prevTarget = selectPreviousFieldInternal(
      fields,
      selectedField,
      selectedSubFieldId
    );
    if (
      prevTarget.fieldId !== selectedField ||
      prevTarget.subFieldId !== selectedSubFieldId
    ) {
      setSelectedFieldInternal(prevTarget.fieldId, prevTarget.subFieldId);
    }
  };

  return {
    // Fields state and actions
    fields,
    addField,
    updateField,
    setFields,
    removeField,
    getField,

    // Selection state and actions
    selectedField,
    selectedSubFieldId,
    setSelectedField,

    // Navigation actions
    selectNextField,
    selectPreviousField,

    // Preview state and actions
    isPreview,
    togglePreview,
    setIsPreview,
  };
}
