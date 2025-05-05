import { EditorView } from 'prosemirror-view';
import { useFormBuilder } from '@/lib/store/form-builder-store';

// Returns true if the selection is at the start of the document block.
export const isAtStart = (view: EditorView): boolean => {
  const { selection } = view.state;
  const { $from } = selection;
  // Checks if we're at the very beginning of the first block.
  return $from.index() - 1 <= 0 || selection.from === 1;
};

// Returns true if the selection is at the end of the document block.
export const isAtEnd = (view: EditorView): boolean => {
  const { selection } = view.state;
  const { $to } = selection;
  // Checks if we're at the end of the last child in the current block.
  return (
    $to.index() === $to.parent.childCount - 1 ||
    selection.to === view.state.doc.content.size - 1
  );
};

// Helper to navigate to a previous or next field based on the current fieldId.
export const navigateToField = (
  fieldId: string,
  direction: 'previous' | 'next'
): boolean => {
  const { fields, setSelectedField } = useFormBuilder.getState();
  const index = fields.findIndex((f) => f.id === fieldId);
  let newFieldId: string | null = null;

  if (direction === 'previous' && index > 0) {
    newFieldId = fields[index - 1].id;
  } else if (direction === 'next' && index < fields.length - 1) {
    newFieldId = fields[index + 1].id;
  }

  if (newFieldId) {
    setSelectedField(newFieldId);
    return true;
  }
  return false;
};
