'use client';

import React, { useCallback, useEffect, useMemo } from 'react';
import { FormField } from '@/lib/types';
import { useFormBuilder } from '@/lib/store/form-builder-store';
import TextEditor from './editors/TextEditor';
import SubEditor from './editors/SubEditor';
import { PlusCircle } from 'lucide-react';
import { Button } from '../ui/button';

// Move labels array outside component to prevent recreation
const OPTION_LABELS = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
];

interface MultipleChoiceFieldProps {
  field: FormField;
}

const MultipleChoiceField = React.memo(
  ({ field }: MultipleChoiceFieldProps) => {
    const { updateField, setSelectedField } = useFormBuilder();
    const selectedSubFieldId = useFormBuilder(
      (state) => state.selectedSubFieldId
    );

    // Initialize with options A and B if no subFields exist
    useEffect(() => {
      if (!field.subFields || field.subFields.length === 0) {
        updateField(field.id, {
          subFields: [
            {
              subId: crypto.randomUUID(),
              parentFieldId: field.id,
              type: 'choice',
              content: '',
              label: 'A)',
            },
            {
              subId: crypto.randomUUID(),
              parentFieldId: field.id,
              type: 'choice',
              content: '',
              label: 'B)',
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

    // Handle main field click
    const handleMainClick = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setSelectedField(field.id);
      },
      [setSelectedField, field.id]
    );

    // Handle option click
    const handleOptionClick = useCallback(
      (subFieldId: string, e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setSelectedField(field.id, subFieldId);
      },
      [setSelectedField, field.id]
    );

    // Add new option
    const addOption = useCallback(() => {
      const currentOptions =
        field.subFields?.filter((sub) => sub.type === 'choice') || [];
      const nextLabelIndex = currentOptions.length % OPTION_LABELS.length;
      const nextLabel =
        OPTION_LABELS[nextLabelIndex] || `Option ${currentOptions.length + 1}`;

      const newSubFieldId = crypto.randomUUID();

      updateField(field.id, {
        subFields: [
          ...(field.subFields || []),
          {
            subId: newSubFieldId,
            parentFieldId: field.id,
            type: 'choice',
            content: '',
            label: `${nextLabel})`,
          },
        ],
      });

      // Auto-select the new option after it's created
      setTimeout(() => {
        setSelectedField(field.id, newSubFieldId);
      }, 0);
    }, [field.id, field.subFields, updateField, setSelectedField]);


    // Memoize options rendering
    const optionsElements = useMemo(() => {
      return (
        field.subFields?.filter((sub) => sub.type === 'choice') || []
      ).map((option) => (
        <div
          key={option.subId}
          className={`flex items-center gap-2 ${
            selectedSubFieldId === option.subId ? 'bg-gray-100 p-1 rounded' : ''
          }`}
        >
          <div className="font-semibold min-w-[30px]">{option.label}</div>
          <SubEditor
            subFieldId={option.subId}
            parentFieldId={field.id}
            type="choice"
            onUpdate={(content) => handleOptionUpdate(option.subId, content)}
            content={option.content}
            onClick={(e) => handleOptionClick(option.subId, e)}
          />
        </div>
      ));
    }, [
      field.subFields,
      selectedSubFieldId,
      field.id,
      handleOptionUpdate,
      handleOptionClick,
    ]);

    return (
      <div className="w-full">
        {/* Label editor */}
        <div className="mb-4">
          <TextEditor
            fieldId={field.id}
            onUpdate={handleLabelUpdate}
            content={field.label}
            placeholder="Enter question"
            onClick={handleMainClick}
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
