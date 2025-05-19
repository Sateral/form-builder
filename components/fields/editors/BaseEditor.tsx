"use client";

import React, { useEffect } from "react";
import { EditorContent, useEditor, BubbleMenu } from "@tiptap/react";

import "@/app/editor.css";
import { getEditorConfig } from "@/utils/editorConfig";
import { useEditorState } from "@/hooks/useEditorState";
import { useFormBuilder } from "@/lib/store/form-builder-store";
import EditorToolbar from "@/components/ui/EditorToolbar";

export interface BaseEditorProps {
  // Common props
  content?: string;
  fieldId: string;
  onUpdate?: (content: string) => void;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  readOnly?: boolean;

  // Field-specific props
  placeholder?: string;
  type?: "text" | "label";
  showToolbar?: boolean;
}

const BaseEditor = React.memo(
  ({
    content,
    fieldId,
    placeholder,
    type = "text",
    onUpdate,
    onClick,
    readOnly = false,
    showToolbar = false,
  }: BaseEditorProps) => {
    // Select appropriate state based on whether this is a subfield
    const { isSelected } = useEditorState(fieldId);
    const { isPreview } = useFormBuilder();

    // Get the proper config based on field type
    const editorConfig = getEditorConfig({
      placeholder,
      fieldId,
    });

    // Customize editor props based on type
    const editorProps = React.useMemo(
      () => ({
        ...editorConfig.editorProps,
        attributes: {
          ...editorConfig.editorProps?.attributes,
          // Add specific attributes based on type
          class: `prose prose-sm focus:outline-none ${
            type === "text" ? "text-editor" : ""
          }`,
        },
      }),
      [editorConfig, type]
    );

    const editor = useEditor(
      {
        ...editorConfig,
        content,
        editorProps,
        editable: !readOnly,
        onUpdate: ({ editor }) => {
          if (onUpdate) {
            onUpdate(editor.getHTML());
          }
        },
      },
      [fieldId]
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
            <EditorToolbar editor={editor} />
          </BubbleMenu>
        )}
      </>
    );
  }
);

export default BaseEditor;
