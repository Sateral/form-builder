"use client";

import React from "react";
import { Editor } from "@tiptap/react";
import { Toggle } from "@/components/ui/toggle";

interface ToolbarButtonProps {
  editor: Editor;
  action: // 'toggleBold' | 'toggleItalic' | 'toggleStrike' | 'toggleUnderline' etc.
  | "toggleBold"
    | "toggleItalic"
    | "toggleStrike"
    | "toggleUnderline"
    | "toggleHeading"
    | "toggleBulletList"
    | "toggleOrderedList"
    | "toggleCodeBlock"
    | "toggleBlockquote";
  label: string;
  // Optional: for actions like toggleHeading that might need params
  actionParams?: Record<string, any>;
  // Optional: to check active state for actions like toggleHeading
  isActiveParams?: Record<string, any>;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  editor,
  action,
  label,
  actionParams,
  isActiveParams,
}) => {
  const handleAction = () => {
    let command = editor.chain().focus();
    if (actionParams) {
      (command as any)[action](actionParams).run();
    } else {
      (command as any)[action]().run();
    }
  };

  const checkIsActive = () => {
    if (isActiveParams) {
      return editor.isActive(
        action.replace("toggle", "").toLowerCase(),
        isActiveParams
      );
    }
    // Default check for simple toggles like bold, italic
    // TipTap's isActive typically expects the mark name (e.g., 'bold', 'italic')
    // For heading, it might be editor.isActive('heading', { level: 1 })
    // For list, it might be editor.isActive('bulletList')
    const markOrNodeName = action.startsWith("toggle")
      ? action.substring(6).charAt(0).toLowerCase() + action.substring(7)
      : action;
    return editor.isActive(markOrNodeName);
  };

  return (
    <Toggle
      onClick={handleAction}
      className="p-2 rounded-lg transition"
      pressed={checkIsActive()}
      aria-label={label}
    >
      {label}
    </Toggle>
  );
};

export default ToolbarButton;
