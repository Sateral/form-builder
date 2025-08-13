'use client';

import React from 'react';
import BaseEditor from './BaseEditor';

interface LabelEditorProps {
  content?: string;
  fieldId: string;
  onUpdate: (content: string) => void;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const LabelEditor = React.memo((props: LabelEditorProps) => {
  return <BaseEditor {...props} type="label" />;
});

LabelEditor.displayName = 'LabelEditor';

export default LabelEditor;
