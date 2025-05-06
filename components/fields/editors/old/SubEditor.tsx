'use client';

import React, { useEffect } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';

import { getEditorConfig } from '@/utils/editorConfig';
import { useFormBuilder } from '@/lib/store/form-builder-store';
import { FormSubField } from '@/lib/types';

interface SubEditorProps {
  content?: string;
  subFieldId: string;
  parentFieldId: string;
  type: FormSubField['type'];
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onUpdate: (content: string) => void;
}

const SubEditor = ({
  content,
  subFieldId,
  parentFieldId,
  onClick,
  onUpdate,
}: SubEditorProps) => {
  const selectedField = useFormBuilder((state) => state.selectedField);
  const selectedSubFieldId = useFormBuilder(
    (state) => state.selectedSubFieldId
  );

  const editorConfig = getEditorConfig({ fieldId: parentFieldId, subFieldId });

  const editor = useEditor({
    ...editorConfig,
    content,
    onUpdate: ({ editor }) => {
      onUpdate(editor.getHTML());
    },
    editorProps: {
      ...editorConfig.editorProps,
      attributes: {
        ...editorConfig.editorProps?.attributes,
        class: `bg-white p-2 shadow-md rounded-lg text-nowrap`,
      },
    },
  });

  useEffect(() => {
    if (editor && selectedSubFieldId === subFieldId) {
      editor.chain().focus().run();
    }
  }, [editor, selectedField, selectedSubFieldId]);

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

export default SubEditor;
