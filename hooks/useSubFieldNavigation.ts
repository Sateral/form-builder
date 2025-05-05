import { useCallback } from 'react';
import { useFormBuilder } from '@/lib/store/form-builder-store';

export const useSubFieldNavigation = (fieldId: string, subFieldId?: string) => {
  const field = useFormBuilder((state) =>
    state.fields.find((f) => f.id === fieldId)
  );

  const setSelectedField = useFormBuilder((state) => state.setSelectedField);

  // Navigate to previous subfield or main field
  const navigateUp = useCallback(() => {
    if (!field?.subFields?.length) return false;

    const subFieldIndex = field.subFields.findIndex(
      (sf) => sf.subId === subFieldId
    );

    if (subFieldIndex > 0) {
      // Go to previous subfield
      setSelectedField(fieldId, field.subFields[subFieldIndex - 1].subId);
      return true;
    } else if (subFieldIndex === 0) {
      // Go to main field
      setSelectedField(fieldId, null);
      return true;
    }

    return false;
  }, [field, fieldId, subFieldId, setSelectedField]);

  // Similar implementation for navigateDown...
  const navigateDown = useCallback(() => {
    if (!field?.subFields?.length) return false;

    const subFieldIndex = field.subFields.findIndex(
      (sf) => sf.subId === subFieldId
    );

    if (subFieldIndex < field.subFields.length - 1) {
      // Go to next subfield
      setSelectedField(fieldId, field.subFields[subFieldIndex + 1].subId);
      return true;
    }

    return false;
  }, [field, fieldId, subFieldId, setSelectedField]);

  return { navigateUp, navigateDown };
};
