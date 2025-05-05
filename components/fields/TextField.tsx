import React from 'react';
import { FormField } from '@/lib/types';
import { useFormBuilder } from '@/lib/store/form-builder-store';
import TextEditor from './editors/TextEditor';
import Editor from './editors/old/Editor';

interface TextFieldProps {
  field: FormField;
}

const TextField = React.memo(({ field }: TextFieldProps) => {
  const { updateField } = useFormBuilder();

  const handleUpdate = (content: string) => {
    updateField(field.id, { content });
  };

  return (
    <div className="w-full">
      <TextEditor
        fieldId={field.id}
        onUpdate={handleUpdate}
        content={field.content}
        placeholder={field.placeholder}
      />
    </div>
  );
});

export default TextField;
