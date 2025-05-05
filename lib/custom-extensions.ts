import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from 'prosemirror-state';
import { useFormBuilder } from '@/lib/store/form-builder-store';
import { isAtStart, isAtEnd, navigateToField } from '@/utils/keyboardHelpers';

export const CustomKeyboardExtension = Extension.create({
  name: 'customKeyboard',

  addProseMirrorPlugins() {
    const fieldId = this.options.fieldId;
    const subFieldId = this.options.subFieldId;

    return [
      new Plugin({
        key: new PluginKey('customKeyboard'),
        priority: 150,
        props: {
          handleKeyDown: (view, event) => {
            const {
              addField,
              removeField,
              selectedSubFieldId,
              setSelectedField,
              fields,
            } = useFormBuilder.getState();

            // const {addField, removeField, setSelectedField } = useFormBuilder()

            const currentField = fields.find((f) => f.id === fieldId);
            if (!currentField) return false;

            const selectedSubFieldIndex = currentField.subFields?.findIndex(
              (sf) => sf.subId === selectedSubFieldId
            );

            switch (event.key) {
              case 'Enter':
                if (!event.shiftKey) {
                  event.preventDefault();
                  addField({
                    type: 'text',
                    label: 'New Field',
                    required: false,
                    placeholder: 'Type something',
                  });
                  return true;
                }
                break;

              case 'Backspace':
                if (!view.state.doc.textContent) {
                  event.preventDefault();
                  navigateToField(fieldId, 'previous');
                  removeField(fieldId);
                  return true;
                }
                break;

              case 'ArrowUp':
                if (
                  currentField.subFields &&
                  selectedSubFieldId !== null &&
                  selectedSubFieldIndex &&
                  selectedSubFieldIndex > 0
                ) {
                  event.preventDefault();
                  setSelectedField(
                    fieldId,
                    currentField.subFields[selectedSubFieldIndex - 1].subId
                  );
                  return true;
                } else if (
                  currentField.subFields &&
                  selectedSubFieldIndex === 0
                ) {
                  event.preventDefault();
                  setSelectedField(fieldId, null);
                  return true;
                } else if (isAtStart(view)) {
                  event.preventDefault();
                  navigateToField(fieldId, 'previous');
                  return true;
                }
                break;

              case 'ArrowDown':
                if (currentField.subFields && selectedSubFieldIndex === -1) {
                  setSelectedField(fieldId, currentField.subFields[0].subId);
                  return true;
                } else if (
                  currentField.subFields &&
                  selectedSubFieldIndex !== null &&
                  selectedSubFieldIndex &&
                  selectedSubFieldIndex < currentField.subFields.length - 1
                ) {
                  event.preventDefault();

                  setSelectedField(
                    fieldId,
                    currentField.subFields[selectedSubFieldIndex + 1].subId
                  );
                  return true;
                } else if (isAtEnd(view)) {
                  event.preventDefault();

                  navigateToField(fieldId, 'next');
                  return true;
                }
                break;

              default:
                break;
            }

            return false;
          },
        },
      }),
    ];
  },
});
