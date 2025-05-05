import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { handleKeyDown } from './keyHandlers';
import { EditorView } from '@tiptap/pm/view';
import { FormFieldTypes } from '@/lib/types';
import { CustomKeyboardExtension } from '@/lib/custom-extensions';

interface EditorConfigProps {
  placeholder?: string;
  fieldId: string;
  subFieldId?: string;
}

export const getEditorConfig = ({
  placeholder,
  fieldId,
  subFieldId,
}: EditorConfigProps) => ({
  editorProps: {
    attributes: {
      class:
        'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none font-medium',
    },
  },
  extensions: [
    StarterKit,
    Placeholder.configure({
      placeholder: placeholder ?? 'Type something...',
    }),
    CustomKeyboardExtension.configure({
      fieldId,
      subFieldId,
    }),
  ],
  immediatelyRender: false,
});
