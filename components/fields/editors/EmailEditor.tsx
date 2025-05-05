'use client';

import React from 'react';
import BaseEditor from './BaseEditor';

interface EmailEditorProps {
  content?: string;
  fieldId: string;
  onUpdate: (content: string) => void;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const EmailEditor = React.memo((props: EmailEditorProps) => {
  return <BaseEditor {...props} type="email" />;
});

export default EmailEditor;
