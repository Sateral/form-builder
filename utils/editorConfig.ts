import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { CustomKeyboardExtension } from "@/lib/custom-extensions";

interface EditorConfigProps {
  placeholder?: string;
  fieldId: string;
  subFieldId?: string;
}

export const getEditorConfig = ({
  placeholder,
  fieldId,
}: EditorConfigProps) => ({
  editorProps: {
    attributes: {
      class:
        "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none font-medium",
    },
  },
  extensions: [
    StarterKit,
    Placeholder.configure({
      placeholder: placeholder ?? "Type something...",
    }),
    // CustomKeyboardExtension.configure({
    //   fieldId,
    // }),
  ],
  immediatelyRender: false,
});
