import React from 'react';

import { FormField } from '@/lib/types';
import { useFormBuilder } from '@/lib/store/form-builder-store';
import EmailEditor from '@/components/fields/editors/EmailEditor';
import SubEditor from '@/components/fields/editors/SubEditor';

interface EmailFieldProps {
  field: FormField;
}

const EmailField = React.memo(({ field }: EmailFieldProps) => {
  const { updateField, setSelectedField } = useFormBuilder();
  const selectedSubFieldId = useFormBuilder(
    (state) => state.selectedSubFieldId
  );

  // Function to handle updates to the label editor content
  const handleUpdate = (content: string) => {
    updateField(field.id, { ...field, label: content });
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

  return (
    <div className="w-full">
      {/* Label area rendered by TipTap */}
      <div className="mb-2">
        <EmailEditor
          fieldId={field.id}
          onUpdate={handleUpdate}
          onClick={(e) => handleMainClick(e)}
        />
      </div>
      {/* Render the input field */}
      <div>
        {field.subFields?.map((subField) => (
          <SubEditor
            subFieldId={subField.subId}
            parentFieldId={field.id}
            onUpdate={() => {}}
            type={subField.type}
            key={subField.subId}
            onClick={(e) => handleSubClick(subField.subId, e)}
          />
        ))}
      </div>
    </div>
  );
});

export default EmailField;
