import React, { useState } from "react";
import { FormField } from "@/lib/types";
import { useFormBuilder } from "@/lib/store/form-builder-store";
import TextEditor from "./editors/TextEditor";
import { Label } from "../ui/label";
import BaseEditor from "./editors/BaseEditor";

interface TextFieldProps {
  field: FormField;
}

const TextField = React.memo(({ field }: TextFieldProps) => {
  const { updateField, isPreview } = useFormBuilder();
  const [previewValue, setPreviewValue] = useState("");

  const handleUpdate = (content: string) => {
    updateField(field.id, { label: content });
  };

  if (isPreview) {
    return (
      <div className="">
        <BaseEditor fieldId={field.id} content={field.label} readOnly />
      </div>
    );
  }

  // Editor mode (original code)
  return (
    <div className="flex flex-row gap-2">
      <TextEditor
        fieldId={field.id}
        onUpdate={handleUpdate}
        content={field.label}
        placeholder={field.placeholder}
      />
      {field.required && <span className="text-rose-500">*</span>}
    </div>
  );
});

export default TextField;
