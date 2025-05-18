"use client";

import React, { useCallback, useEffect } from "react";
import { EditorContent, useEditor, BubbleMenu } from "@tiptap/react";

import "@/app/editor.css";
import { FormFieldTypes } from "@/lib/types";
import { Toggle } from "@/components/ui/toggle";
import { getEditorConfig } from "@/utils/editorConfig";
import { useEditorState } from "@/hooks/useEditorState";

export interface BaseEditorProps {
  // Common props
  content?: string;
  fieldId: string;
  onUpdate: (content: string) => void;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;

  // Field-specific props
  placeholder?: string;
  subFieldId?: string;
  type?: FormFieldTypes | "label" | "input" | "choice";
  showToolbar?: boolean;
}

const BaseEditor = React.memo(
  ({
    content,
    fieldId,
    subFieldId,
    placeholder,
    type = "text",
    onUpdate,
    onClick,
    showToolbar = false,
  }: BaseEditorProps) => {
    // Select appropriate state based on whether this is a subfield
    const { isSelected } = useEditorState(fieldId, subFieldId);

    // Get the proper config based on field type
    const editorConfig = getEditorConfig({
      placeholder,
      fieldId,
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
            subFieldId ? "bg-white p-2 shadow-md rounded-lg text-nowrap" : ""
          } ${type === "email" ? "email-editor" : ""} ${
            type === "text" ? "text-editor" : ""
          }`,
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
      [fieldId, subFieldId]
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
          <div>
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
          </div>
        )}
      </>
    );
  }
);

export default BaseEditor;
