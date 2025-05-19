import { FormField, FormSubField } from '@/lib/types';

interface NextFocusTarget {
  fieldId: string | null;
  subFieldId: string | null;
}

// Helper to get subfields of a field, accommodating different field types
const getSubFields = (field: FormField | undefined): FormSubField[] => {
  if (!field) return [];
  if (field.type === 'multipleChoice' && field.subFields) {
    return field.subFields;
  }
  // Assuming EmailField's single subField is what we treat as a list of one for navigation
  if (field.type === 'email' && field.subField) {
    return [field.subField];
  }
  return [];
};

export function calculateNextFocusTarget(
  fields: FormField[],
  currentFieldId: string | null,
  currentSubFieldId: string | null,
  direction: 'up' | 'down'
): NextFocusTarget {
  if (fields.length === 0) return { fieldId: null, subFieldId: null };

  if (!currentFieldId) { // Nothing currently selected
    if (direction === 'down') {
      return { fieldId: fields[0].id, subFieldId: null }; // Focus first field's label
    } else { // direction === 'up'
      const lastField = fields[fields.length - 1];
      const lastFieldSubFields = getSubFields(lastField);
      if (lastFieldSubFields.length > 0) {
        // Focus last subfield of the last field
        return { fieldId: lastField.id, subFieldId: lastFieldSubFields[lastFieldSubFields.length - 1].subId };
      }
      return { fieldId: lastField.id, subFieldId: null }; // Focus last field's label
    }
  }

  const currentFieldIndex = fields.findIndex(f => f.id === currentFieldId);
  if (currentFieldIndex === -1) return { fieldId: currentFieldId, subFieldId: currentSubFieldId }; // Should not happen

  const currentField = fields[currentFieldIndex];
  const currentFieldSubFields = getSubFields(currentField);

  if (direction === 'down') {
    if (currentSubFieldId) { // Currently on a subfield
      const subFieldIndex = currentFieldSubFields.findIndex(sf => sf.subId === currentSubFieldId);
      if (subFieldIndex !== -1 && subFieldIndex < currentFieldSubFields.length - 1) {
        // Next subfield in current field
        return { fieldId: currentFieldId, subFieldId: currentFieldSubFields[subFieldIndex + 1].subId };
      } else {
        // Last subfield, move to next field's label
        if (currentFieldIndex < fields.length - 1) {
          return { fieldId: fields[currentFieldIndex + 1].id, subFieldId: null };
        }
      }
    } else { // Currently on main field's label
      if (currentFieldSubFields.length > 0) {
        // First subfield of current field
        return { fieldId: currentFieldId, subFieldId: currentFieldSubFields[0].subId };
      } else {
        // No subfields, move to next field's label
        if (currentFieldIndex < fields.length - 1) {
          return { fieldId: fields[currentFieldIndex + 1].id, subFieldId: null };
        }
      }
    }
  } else { // direction === 'up'
    if (currentSubFieldId) { // Currently on a subfield
      const subFieldIndex = currentFieldSubFields.findIndex(sf => sf.subId === currentSubFieldId);
      if (subFieldIndex > 0) {
        // Previous subfield in current field
        return { fieldId: currentFieldId, subFieldId: currentFieldSubFields[subFieldIndex - 1].subId };
      } else {
        // First subfield (or only subfield), move to current field's label
        return { fieldId: currentFieldId, subFieldId: null };
      }
    } else { // Currently on main field's label
      if (currentFieldIndex > 0) {
        const prevField = fields[currentFieldIndex - 1];
        const prevFieldSubFields = getSubFields(prevField);
        if (prevFieldSubFields.length > 0) {
          // Last subfield of previous field
          return { fieldId: prevField.id, subFieldId: prevFieldSubFields[prevFieldSubFields.length - 1].subId };
        } else {
          // Previous field's label (no subfields)
          return { fieldId: prevField.id, subFieldId: null };
        }
      }
    }
  }
  // No change if at the very start or end and trying to navigate further
  return { fieldId: currentFieldId, subFieldId: currentSubFieldId };
}
