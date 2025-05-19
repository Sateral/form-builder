"use client";

import React, { use, useCallback, useEffect, useMemo } from "react";
import type {
  FormField,
  MultipleChoiceField as MCFieldType,
} from "@/lib/types";
import { useFormBuilder } from "@/lib/store/form-builder-store";
import { PlusCircle } from "lucide-react";
import { Button } from "../ui/button";
import BaseEditor from "./editors/BaseEditor";
import { Input } from "../ui/input";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import OPTION_LABELS from "@/lib/constants/MultipleChoiceOptions";

interface MultipleChoiceFieldProps {
  field: MCFieldType;
}

const MultipleChoiceField = React.memo(
  ({ field }: MultipleChoiceFieldProps) => {
    const { updateField, isPreview } = useFormBuilder();
    const selectedSubFieldId = useFormBuilder(
      (state) => state.selectedSubFieldId
    );

    // Memoize the filtered choice options
    const choiceOptions = useMemo(() => {
      return field.subFields?.filter((sub) => sub.type === "choice") || [];
    }, [field.subFields]);

    useEffect(() => {
      if (!field.subFields || field.subFields.length === 0) {
        updateField(field.id, {
          subFields: [
            {
              subId: crypto.randomUUID(),
              parentFieldId: field.id,
              type: "choice",
              content: "",
              label: OPTION_LABELS[0].label,
              colour: OPTION_LABELS[0].colour,
            },
            {
              subId: crypto.randomUUID(),
              parentFieldId: field.id,
              type: "choice",
              content: "",
              label: OPTION_LABELS[1].label,
              colour: OPTION_LABELS[1].colour,
            },
          ],
        });
      }
    }, [field.id, field.subFields, updateField]);

    // Function to handle updates to the label
    const handleLabelUpdate = useCallback(
      (content: string) => {
        updateField(field.id, { label: content });
      },
      [updateField, field.id]
    );

    // Function to handle updates to an option
    const handleOptionUpdate = useCallback(
      (subFieldId: string, content: string) => {
        updateField(field.id, {
          subFields: field.subFields?.map((sub) =>
            sub.subId === subFieldId ? { ...sub, content } : sub
          ),
        });
      },
      [updateField, field.id, field.subFields]
    );

    // Add new option
    const addOption = useCallback(() => {
      const nextLabelIndex = choiceOptions.length % OPTION_LABELS.length;
      const nextLabelObj = OPTION_LABELS[nextLabelIndex] || {
        label: `Option ${choiceOptions.length + 1}`,
        colour: "#808080",
      }; // Default grey color

      const newSubFieldId = crypto.randomUUID();

      updateField(field.id, {
        subFields: [
          ...(field.subFields || []),
          {
            subId: newSubFieldId,
            parentFieldId: field.id,
            type: "choice",
            content: "",
            label: nextLabelObj.label,
            colour: nextLabelObj.colour,
          },
        ],
      });
    }, [field.id, field.subFields, updateField, choiceOptions]);

    const removeOption = useCallback(
      (subFieldIdToRemove: string) => {
        const currentSubFields = field.subFields || [];
        const updatedSubFields = currentSubFields.filter(
          (sub) => sub.subId !== subFieldIdToRemove
        );

        // Re-label the remaining options
        const reLabeledSubFields = updatedSubFields.map((sub, index) => {
          const optionLabel = OPTION_LABELS[index] || {
            label: `Option ${index + 1}`,
            colour: "#808080",
          }; // Default grey color

          return {
            ...sub,
            label: optionLabel.label,
            colour: optionLabel.colour,
          };
        });

        updateField(field.id, {
          subFields: reLabeledSubFields,
        });
      },
      [field.id, field.subFields, updateField]
    );

    const handleOptionKeyDown = useCallback(
      (
        event: React.KeyboardEvent<HTMLInputElement>,
        option: { subId: string; content?: string; label?: string }
      ) => {
        if (
          event.key === "Backspace" &&
          (option.content === "" || option.content === undefined) &&
          option.label !== OPTION_LABELS[0].label // Don't delete option A
        ) {
          event.preventDefault();
          removeOption(option.subId);
        }
      },
      [removeOption]
    );

    // Memoize options rendering
    const optionsElements = useMemo(() => {
      return choiceOptions.map((option) => (
        <div
          key={option.subId}
          className={`flex items-center gap-0 border-2 rounded-md px-[6px] ${
            selectedSubFieldId === option.subId ? "bg-gray-100 p-1 rounded" : ""
          }`}
        >
          <div
            className="flex justify-center items-center font-semibold size-6 text-md shrink-0 rounded-md"
            style={{
              backgroundColor: option.colour || "#FFFFFF",
              color: "#FFFFFF",
            }}
          >
            {option.label}
          </div>
          <Input
            type="text"
            variant="mc"
            value={option.content || ""} // Ensure value is always a string
            onChange={(e) => {
              handleOptionUpdate(option.subId, e.target.value);
            }}
            onKeyDown={(e) =>
              handleOptionKeyDown(e, {
                subId: option.subId,
                content: option.content,
                label: option.label,
              })
            }
          />
        </div>
      ));
    }, [
      choiceOptions,
      selectedSubFieldId,
      handleOptionUpdate,
      handleOptionKeyDown,
    ]);

    if (isPreview) {
      const { fields } = useFormBuilder();

      const mcField = fields.find((f) => f.id === field.id);

      if (!mcField) {
        return null;
      }

      const typedField = mcField as MCFieldType;

      return (
        <div>
          <BaseEditor
            fieldId={typedField.id || field.id}
            content={typedField.label || field.label}
            readOnly
            placeholder="Enter question"
          />
          <ToggleGroup type="single" className="mt-2 flex flex-col space-y-2">
            {(typedField.subFields || []).map((item) => (
              <ToggleGroupItem
                key={item.subId}
                value={item.subId}
                className="flex items-center gap-2 border rounded-md px-3 py-2 data-[state=on]:border-primary"
              >
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
    }

    return (
      <div className="w-full">
        {/* Label editor */}
        <div className="mb-4">
          <BaseEditor
            fieldId={field.id}
            onUpdate={handleLabelUpdate}
            content={field.label}
            placeholder="Enter question"
            onClick={() => {}}
          />
        </div>

        {/* Options */}
        <div className="space-y-2 ml-4">
          {optionsElements}

          <Button
            onClick={addOption}
            variant="ghost"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <PlusCircle className="h-4 w-4" />
            Add option
          </Button>
        </div>
      </div>
    );
  }
);

export default MultipleChoiceField;
