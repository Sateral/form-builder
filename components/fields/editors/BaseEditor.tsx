'use client';

import React, { useEffect } from 'react';
import { EditorContent, useEditor, BubbleMenu } from '@tiptap/react';

import '@/app/editor.css';
import { getEditorConfig } from '@/utils/editorConfig';
import { FormFieldTypes } from '@/lib/types';
import { useEditorState } from '@/hooks/useEditorState';
import { Toggle } from '@/components/ui/toggle';

export interface BaseEditorProps {
  // Common props
  content?: string;
  fieldId: string;
  onUpdate: (content: string) => void;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;

  // Field-specific props
  placeholder?: string;
  subFieldId?: string;
  parentFieldId?: string;
  type?: FormFieldTypes | 'label' | 'input' | 'choice';
  showToolbar?: boolean;
}

const BaseEditor = React.memo(
  ({
    content,
    fieldId,
    subFieldId,
    parentFieldId,
    placeholder,
    type = 'text',
    onUpdate,
    onClick,
    showToolbar = false,
  }: BaseEditorProps) => {
    // Use the actual field ID based on context
    const actualFieldId = parentFieldId || fieldId;

    // Select appropriate state based on whether this is a subfield
    const { isSelected } = useEditorState(actualFieldId, subFieldId);

    // Get the proper config based on field type
    const editorConfig = getEditorConfig({
      placeholder,
      fieldId: actualFieldId,
      subFieldId,
    });

    // Customize editor props based on type
    const editorProps = React.useMemo(
      () => ({
        ...editorConfig.editorProps,
        attributes: {
          ...editorConfig.editorProps?.attributes,
          // Add specific attributes based on type
          class: `prose prose-sm focus:outline-none ${
            subFieldId ? 'bg-white p-2 shadow-md rounded-lg text-nowrap' : ''
          } ${type === 'email' ? 'email-editor' : ''}`,
        },
      }),
      [editorConfig, subFieldId, type]
    );

    const editor = useEditor(
      {
        ...editorConfig,
        content,
        editorProps,
        onUpdate: ({ editor }) => {
          onUpdate(editor.getHTML());
        },
      },
      [actualFieldId, subFieldId]
    );

    // Focus management logic
    useEffect(() => {
      if (editor && isSelected) {
        editor.chain().focus().run();
      }
    }, [editor, isSelected]);

    return (
      <>
        <EditorContent
          editor={editor}
          onClick={(e) => {
            if (onClick) {
              onClick(e);
            }
          }}
        />

        {/* Only show toolbar for text fields when enabled */}
        {editor && showToolbar && (
          <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
            <div className="flex flex-row bg-white p-2 shadow-lg rounded-lg gap-x-1">
              <Toggle
                onClick={() => editor.chain().focus().toggleBold().run()}
                className="p-2 rounded-lg transition"
              >
                Bold
              </Toggle>
              <Toggle
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className="p-2 rounded-lg transition"
              >
                Italic
              </Toggle>
            </div>
          </BubbleMenu>
        )}
      </>
    );
  }
);

export default BaseEditor;
