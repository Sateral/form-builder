import React from "react";

import { FormField } from "@/lib/types";
import { useFormBuilder } from "@/lib/store/form-builder-store";
import EmailEditor from "@/components/fields/editors/EmailEditor";
import SubEditor from "@/components/fields/editors/SubEditor";
import BaseEditor from "./editors/BaseEditor";
import { Input } from "../ui/input";
import { htmlToPlain } from "@/lib/htmlToPlain";

interface EmailFieldProps {
  field: FormField;
}

const EmailField = React.memo(({ field }: EmailFieldProps) => {
  const { updateField, setSelectedField, isPreview } = useFormBuilder();
  const selectedSubFieldId = useFormBuilder(
    (state) => state.selectedSubFieldId
  );

  // Function to handle updates to the label editor content
  const handleUpdateMain = (content: string) => {
    updateField(field.id, { ...field, label: content });
  };

  const handleUpdateSub = (subFieldId: string, htmlContent: string) => {
    const textContent = htmlToPlain(htmlContent);

    updateField(field.id, {
      subFields: field.subFields?.map((sf) =>
        sf.subId === subFieldId ? { ...sf, content: textContent } : sf
      ),
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
          placeholder={field.subFields![0].content}
          className="mt-2"
        />
      </div>
    );
  }
  return (
    <div className="w-full">
      {/* Label area rendered by TipTap */}
      <div className="mb-2">
        <EmailEditor
          fieldId={field.id}
          onUpdate={handleUpdateMain}
          content={field.label}
          onClick={(e) => handleMainClick(e)}
        />
      </div>
      {/* Render the input field */}
      <div>
        {field.subFields?.map((subField) => (
          <SubEditor
            subFieldId={subField.subId}
            parentFieldId={field.id}
            onUpdate={(newContent) => {
              handleUpdateSub(subField.subId, newContent);
            }}
            type={subField.type}
            key={subField.subId}
            content={subField.content}
            onClick={(e) => handleSubClick(subField.subId, e)}
          />
        ))}
      </div>
    </div>
  );
});

export default EmailField;
