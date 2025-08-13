'use client';

import React from 'react';
import BaseEditor from './BaseEditor';

interface TextEditorProps {
  content?: string;
  placeholder?: string;
  fieldId: string;
  onUpdate: (content: string) => void;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const TextEditor = React.memo((props: TextEditorProps) => {
  return <BaseEditor {...props} showToolbar type="text" />;
});

TextEditor.displayName = 'TextEditor';

export default TextEditor;
