import React from "react";
import type { MultipleChoiceField } from "@/lib/types";
import { useFormBuilder } from "@/lib/store/form-builder-store";
import BaseEditor from "../editors/BaseEditor";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface MultipleChoiceFieldProps {
  field: MultipleChoiceField;
}

const PreviewMode = React.memo(({ field }: MultipleChoiceFieldProps) => {
  const { fields } = useFormBuilder();
  const mcField = fields.find((f) => f.id === field.id) as
    | MultipleChoiceField
    | undefined;

  if (!mcField) return null;

  return (
    <div>
      <BaseEditor
        fieldId={mcField.id}
        content={mcField.label}
        readOnly
        placeholder="Enter question"
      />
      <ToggleGroup
        type="single"
        className="mt-2 flex flex-col items-start space-y-2"
      >
        {(mcField.subFields || []).map((item) => (
          <ToggleGroupItem key={item.subId} value={item.subId}>
            <div
              className="flex justify-center items-center font-semibold size-6 text-md shrink-0 rounded-md"
              style={{
                backgroundColor: item.colour || "#FFFFFF",
                color: "#FFFFFF",
              }}
            >
              {item.label}
            </div>
            <span>{item.content}</span>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
});

PreviewMode.displayName = "PreviewMode";

export default PreviewMode;
