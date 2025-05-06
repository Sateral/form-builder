'use client';

import React, { useEffect } from 'react';

import '@/app/editor.css';
import { BubbleMenu, EditorContent, useEditor } from '@tiptap/react';
import { useFormBuilder } from '@/lib/store/form-builder-store';
import { getEditorConfig } from '@/utils/editorConfig';

interface EditorProps {
  content?: string;
  placeholder?: string;
  fieldId: string;
  onUpdate: (content: string) => void;
}

const Editor = ({ content, placeholder, fieldId, onUpdate }: EditorProps) => {
  const selectedField = useFormBuilder((state) => state.selectedField);

  const editor = useEditor({
    ...getEditorConfig({ placeholder, fieldId }),
    content,
    onUpdate: ({ editor }) => {
      onUpdate(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && selectedField === fieldId) {
      editor.chain().focus().run();
    }
  }, [editor, selectedField, fieldId]);

  return (
    <>
      <EditorContent editor={editor} />
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="bg-white p-2 shadow-lg rounded-lg">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`p-2 rounded-lg transition
                ${editor.isActive('bold') ? 'is-active' : 'hover:bg-gray-200'}`}
            >
              Test
            </button>
          </div>
        </BubbleMenu>
      )}
    </>
  );
};

export default Editor;
