import React from 'react';

import { Input } from '../ui/input';
import BaseEditor from './editors/BaseEditor';
import { EmailField as EmailFieldType } from '@/lib/types';
import { useFormBuilder } from '@/lib/store/form-builder-store';
import LabelEditor from '@/components/fields/editors/LabelEditor';

interface EmailFieldProps {
  field: EmailFieldType;
}

const EmailField = React.memo(({ field }: EmailFieldProps) => {
  const { updateField, setSelectedField, isPreview } = useFormBuilder();

  // Function to handle updates to the label editor content
  const handleUpdateMain = (content: string) => {
    updateField(field.id, { ...field, label: content });
  };

  const handleUpdateSub = (content: string) => {
    updateField(field.id, {
      subField: { ...field.subField, content },
    });
  };

  const handleMainClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setSelectedField(field.id);
  };

  const handleSubClick = (
    subfieldId: string,
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    e.stopPropagation();
    setSelectedField(field.id, subfieldId);
  };

  if (isPreview) {
    return (
      <div>
        <BaseEditor fieldId={field.id} content={field.label} readOnly />
        <Input
          type="email"
          variant="email"
          placeholder={field.subField.content}
          className="mt-2"
        />
      </div>
    );
  }
  return (
    <div className="w-full">
      {/* Label area rendered by TipTap */}
      <div className="flex flex-row gap-2 mb-2">
        <LabelEditor
          fieldId={field.id}
          onUpdate={handleUpdateMain}
          content={field.label}
          onClick={(e) => handleMainClick(e)}
        />
        {field.required && <span className="text-rose-500">*</span>}
      </div>
      {/* Render the input field */}
      <div>
        {' '}
        <Input
          id={`field-${field.id}-sub-${field.subField.subId}`}
          type="email"
          variant="email"
          value={field.subField.content || ''}
          onChange={(e) => handleUpdateSub(e.target.value)}
          onClick={(e) => handleSubClick(field.subField.subId, e)}
        />
      </div>
    </div>
  );
});

EmailField.displayName = 'EmailField';

export default EmailField;
