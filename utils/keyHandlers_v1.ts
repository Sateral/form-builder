import { EditorView } from 'prosemirror-view';

import { useFormBuilder } from '@/lib/store/form-builder-store';
import { isAtStart, isAtEnd, navigateToField } from '@/utils/keyboardHelpers';

export const handleKeyDown = (
  view: EditorView,
  event: KeyboardEvent,
  fieldId: string
) => {
  const addField = useFormBuilder((state) => state.addField);
  const removeField = useFormBuilder((state) => state.removeField);
  const setSelectedField = useFormBuilder((state) => state.setSelectedField);

  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();

    addField({
      type: 'text',
      label: 'New Field',
      required: false,
      placeholder: 'Type something',
    });

    return true;
  } else if (event.key === 'Backspace' && !view.state.doc.textContent) {
    event.preventDefault();

    const index = fields.findIndex((f) => f.id === fieldId);
    const previousFieldId = index > 0 ? fields[index - 1].id : null;
    setSelectedField(previousFieldId);
    removeField(fieldId);

    return true;
  } else if (event.key === 'ArrowUp' && !event.shiftKey) {
    const { state } = view;
    const { selection } = state;
    const { $from } = selection;

    const isAtFirstBlock = $from.index() - 1 <= 0;

    if (isAtFirstBlock || selection.from === 1) {
      event.preventDefault();
      const index = fields.findIndex((f) => f.id === fieldId);
      const previousFieldId = index > 0 ? fields[index - 1].id : null;
      setSelectedField(previousFieldId);
      return true;
    }
  } else if (event.key === 'ArrowDown' && !event.shiftKey) {
    const { state } = view;
    const { selection } = state;
    const { $to } = selection;

    const isAtLastBlock = $to.index() === $to.parent.childCount - 1;

    if (isAtLastBlock || selection.to === state.doc.content.size - 1) {
      event.preventDefault();
      const index = fields.findIndex((f) => f.id === fieldId);
      const nextFieldId =
        index < fields.length - 1 ? fields[index + 1].id : null;
      if (nextFieldId) {
        setSelectedField(nextFieldId);
      }

      return true;
    }
  }
  return false;
};
