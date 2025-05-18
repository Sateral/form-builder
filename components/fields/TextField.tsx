import React, { useState } from "react";
import { FormField } from "@/lib/types";
import { useFormBuilder } from "@/lib/store/form-builder-store";
import TextEditor from "./editors/TextEditor";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

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
        <Label htmlFor={field.id} className="block mb-2 font-medium">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </Label>
        <Input
          id={field.id}
          placeholder={field.placeholder || ""}
          value={previewValue}
          onChange={(e) => setPreviewValue(e.target.value)}
          required={field.required}
          className="w-full"
        />
        {field.placeholder && (
          <p className="mt-1 text-sm text-gray-500">{field.placeholder}</p>
        )}
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
