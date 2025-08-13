'use client';

import React from 'react';
import BaseEditor from '../BaseEditor';

interface OptionEditorProps {
  fieldId: string;
  parentFieldId: string;
  content?: string;
  onUpdate: (content: string) => void;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const OptionEditor = React.memo((props: OptionEditorProps) => {
  return (
    <BaseEditor
      {...props}
      type="label"
      // subFieldId={props.fieldId}
      showToolbar
    />
  );
});

OptionEditor.displayName = 'OptionEditor';

export default OptionEditor;
