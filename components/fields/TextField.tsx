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
    updateField(field.id, { content });
  };

  if (isPreview) {
    return (
      <div className="mb-4">
        <BaseEditor fieldId={field.id} content={field.content} readOnly />
      </div>
    );
  }

  // Editor mode (original code)
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
