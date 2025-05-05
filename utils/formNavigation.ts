import { useFormBuilder } from '@/lib/store/form-builder-store';
import { FormField } from '@/lib/types';
import { EditorView } from 'prosemirror-view';

// Helper to check if selection is at document start
export const isAtDocumentStart = (view: EditorView): boolean => {
  const { selection } = view.state;
  return selection.from <= 1;
};

// Helper to check if selection is at document end
export const isAtDocumentEnd = (view: EditorView): boolean => {
  const { selection, doc } = view.state;
  return selection.to >= doc.content.size - 1;
};

// Main navigation function
export const navigateFormFields = (
  view: EditorView,
  direction: 'up' | 'down',
  fieldId: string,
  subFieldId: string | null
): boolean => {
  const state = useFormBuilder.getState();
  const { fields, setSelectedField } = state;

  // Current field index in form
  const fieldIndex = fields.findIndex((f) => f.id === fieldId);
  if (fieldIndex === -1) return false; // Field not found

  const currentField = fields[fieldIndex];

  // Handle navigation within subfields
  if (currentField.subFields?.length) {
    const result = navigateWithinSubfields(
      direction,
      currentField,
      fieldId,
      subFieldId,
      setSelectedField
    );
    if (result) return true;
  }

  // At document boundaries, navigate between fields
  const isAtBoundary =
    direction === 'up' ? isAtDocumentStart(view) : isAtDocumentEnd(view);

  if (isAtBoundary) {
    return navigateBetweenFields(
      direction,
      fieldIndex,
      fields,
      setSelectedField
    );
  }

  return false;
};

// Navigate within subfields of a field
function navigateWithinSubfields(
  direction: 'up' | 'down',
  field: FormField,
  fieldId: string,
  subFieldId: string | null,
  setSelectedField: (fieldId: string, subFieldId: string | null) => void
): boolean {
  if (!field.subFields?.length) return false;

  // If we're on the main field and moving down, go to first subfield
  if (!subFieldId && direction === 'down') {
    setSelectedField(fieldId, field.subFields[0].subId);
    return true;
  }

  // If on a subfield, find its index
  const subFieldIndex = subFieldId
    ? field.subFields.findIndex((sf) => sf.subId === subFieldId)
    : -1;

  if (subFieldIndex === -1) return false;

  if (direction === 'up') {
    // Move up to the main field if at the first subfield
    if (subFieldIndex === 0) {
      setSelectedField(fieldId, null);
      return true;
    }

    // Otherwise go to previous subfield
    if (subFieldIndex > 0) {
      setSelectedField(fieldId, field.subFields[subFieldIndex - 1].subId);
      return true;
    }
  } else {
    // Moving down to next subfield if not at the end
    if (subFieldIndex < field.subFields.length - 1) {
      setSelectedField(fieldId, field.subFields[subFieldIndex + 1].subId);
      return true;
    }
  }

  return false;
}

// Navigate between different fields
function navigateBetweenFields(
  direction: 'up' | 'down',
  currentIndex: number,
  fields: FormField[],
  setSelectedField: (fieldId: string, subFieldId: string | null) => void
): boolean {
  if (direction === 'up') {
    // Move to previous field
    if (currentIndex > 0) {
      const prevField = fields[currentIndex - 1];

      // If the previous field has subfields, select the last one
      if (prevField.subFields?.length) {
        const lastSubField =
          prevField.subFields[prevField.subFields.length - 1];
        setSelectedField(prevField.id, lastSubField.subId);
      } else {
        setSelectedField(prevField.id, null);
      }
      return true;
    }
  } else {
    // Move to next field
    if (currentIndex < fields.length - 1) {
      setSelectedField(fields[currentIndex + 1].id, null);
      return true;
    }
  }

  return false;
}
