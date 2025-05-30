"use client";

import React from "react";
import { Editor } from "@tiptap/react";
import ToolbarButton from "@/components/ui/ToolbarButton";

interface EditorToolbarProps {
  editor: Editor;
}

const EditorToolbar: React.FC<EditorToolbarProps> = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-row bg-white p-2 shadow-lg rounded-lg gap-x-1">
      <ToolbarButton editor={editor} action="toggleBold" label="Bold" />
      <ToolbarButton editor={editor} action="toggleItalic" label="Italic" />
      <ToolbarButton editor={editor} action="toggleStrike" label="Strike" />
      {/* <ToolbarButton
        editor={editor}
        action="toggleUnderline"
        label="Underline"
      /> */}
    </div>
  );
};

export default EditorToolbar;
