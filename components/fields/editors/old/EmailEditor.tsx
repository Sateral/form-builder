'use client';

import React, { useEffect } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';

import { getEditorConfig } from '@/utils/editorConfig';
import { useFormBuilder } from '@/lib/store/form-builder-store';

interface EmailEditorProps {
  content?: string;
  fieldId: string;
  onUpdate: (content: string) => void;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const EmailEditor = ({
  content,
  fieldId,
  onUpdate,
  onClick,
}: EmailEditorProps) => {
  const selectedField = useFormBuilder((state) => state.selectedField);
  const selectedSubFieldId = useFormBuilder(
    (state) => state.selectedSubFieldId
  );

  const editor = useEditor({
    ...getEditorConfig({ fieldId }),
    content,
    onUpdate: ({ editor }) => {
      onUpdate(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && selectedField === fieldId && !selectedSubFieldId) {
      editor.chain().focus().run();
    }
  }, [editor, selectedField, fieldId, selectedSubFieldId]);

  return (
    <EditorContent
      editor={editor}
      onClick={(e) => {
        if (onClick) {
          onClick(e);
        }
      }}
    />
  );
};

export default EmailEditor;
