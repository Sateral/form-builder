"use client";

import React, { useCallback, useEffect, useMemo } from "react";
import type {
  FormField,
  MultipleChoiceField as MCFieldType,
} from "@/lib/types";
import { useFormBuilderFacade } from "@/lib/store/form-builder-facade";
import { PlusCircle } from "lucide-react";
import { Button } from "../ui/button";
import BaseEditor from "./editors/BaseEditor";
import { Input } from "../ui/input";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import OPTION_LABELS from "@/lib/constants/MultipleChoiceOptions";
import PreviewMode from "./MC Field/MCPreview";
import OptionElement from "./MC Field/OptionElement";
import LabelEditor from "./editors/LabelEditor";

interface MultipleChoiceFieldProps {
  field: MCFieldType;
}

type ChoiceOption = {
  subId: string;
  parentFieldId: string;
  type: "choice";
  content: string;
  label: string;
  colour: string;
};

// Utility function to create a choice option
const createChoiceOption = (
  parentFieldId: string,
  labelObj: { label: string; colour: string }
): ChoiceOption => ({
  subId: crypto.randomUUID(),
  parentFieldId,
  type: "choice",
  content: "",
  label: labelObj.label,
  colour: labelObj.colour,
});

const MultipleChoiceField = React.memo(
  ({ field }: MultipleChoiceFieldProps) => {
    const { updateField, setSelectedField, isPreview, selectedSubFieldId } =
      useFormBuilderFacade();

    const choiceOptions = useMemo(() => {
      return field.subFields?.filter((sub) => sub.type === "choice") || [];
    }, [field.subFields]); // Initialize with default options if none exist
    useEffect(() => {
      if (!field.subFields || field.subFields.length === 0) {
        updateField(field.id, {
          subFields: [
            createChoiceOption(field.id, OPTION_LABELS[0]),
            createChoiceOption(field.id, OPTION_LABELS[1]),
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
    ); // Add new option
    const addOption = useCallback(() => {
      const nextLabelIndex = choiceOptions.length % OPTION_LABELS.length;
      const nextLabelObj = OPTION_LABELS[nextLabelIndex] || {
        label: `Option ${choiceOptions.length + 1}`,
        colour: "#808080",
      };

      updateField(field.id, {
        subFields: [
          ...(field.subFields || []),
          createChoiceOption(field.id, nextLabelObj),
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
          };

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

    const handleOptionClick = useCallback(
      (subId: string, e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setSelectedField(field.id, subId);
      },
      [setSelectedField, field.id]
    );
    const optionsElements = useMemo(() => {
      return choiceOptions.map((option) => (
        <OptionElement
          key={option.subId}
          option={option as ChoiceOption}
          isSelected={selectedSubFieldId === option.subId}
          onUpdate={handleOptionUpdate}
          onKeyDown={handleOptionKeyDown}
          onClick={handleOptionClick}
        />
      ));
    }, [
      choiceOptions,
      selectedSubFieldId,
      handleOptionUpdate,
      handleOptionKeyDown,
      handleOptionClick,
    ]);
    if (isPreview) {
      return <PreviewMode field={field} />;
    }

    return (
      <div className="w-full">
        {" "}
        {/* Label editor */}
        <div className="flex flex-row gap-2 mb-4">
          <LabelEditor
            fieldId={field.id}
            onUpdate={handleLabelUpdate}
            content={field.label}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedField(field.id);
            }}
          />
          {field.required && <span className="text-rose-500">*</span>}
        </div>
        {/* Options */}
        <div className="space-y-2">
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

MultipleChoiceField.displayName = "MultipleChoiceField";

export default MultipleChoiceField;
