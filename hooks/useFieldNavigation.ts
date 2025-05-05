import { useCallback } from 'react';
import { useFormBuilder } from '@/lib/store/form-builder-store';

export const useFieldNavigation = (fieldId: string) => {
  const fields = useFormBuilder((state) => state.fields);
  const setSelectedField = useFormBuilder((state) => state.setSelectedField);

  // Memoize field index lookup
  const fieldIndex = fields.findIndex((f) => f.id === fieldId);

  const navigateToNext = useCallback(() => {
    if (fieldIndex < fields.length - 1) {
      setSelectedField(fields[fieldIndex + 1].id);
      return true;
    }
    return false;
  }, [fieldIndex, fields, setSelectedField]);

  const navigateToPrevious = useCallback(() => {
    if (fieldIndex > 0) {
      setSelectedField(fields[fieldIndex - 1].id);
      return true;
    }
    return false;
  }, [fieldIndex, fields, setSelectedField]);

  return { navigateToNext, navigateToPrevious };
};
