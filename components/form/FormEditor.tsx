'use client';

import React, { useEffect } from 'react';

import DnDProvider from '@/providers/DnDProvider';
import TextField from '@/components/fields/TextField';
import EmailField from '@/components/fields/EmailField';
import DraggableField from '@/components/form/DraggableField';
import MultipleChoiceField from '@/components/fields/MultipleChoiceField';
import { EyeIcon, PencilIcon } from 'lucide-react';
import { Button } from '../ui/button';
import FormRender from './FormRender';
import useFieldNavigation from '@/hooks/useFieldNavigation';
import { ModeToggle } from '../ThemeToggle';
import { useFormBuilderFacade } from '@/lib/store/form-builder-facade';

const FormEditor = () => {
  const {
    setSelectedField,
    selectedField,
    selectedSubFieldId,
    togglePreview,
    isPreview,
    fields,
  } = useFormBuilderFacade();
  const { focusSelectedField } = useFieldNavigation();

  const handleContainerClick = () => {
    setSelectedField(null, null);
  };

  useEffect(() => {
    // Focus the selected field when it changes
    if (selectedField || selectedSubFieldId) {
      focusSelectedField();
    }
  }, [selectedField, selectedSubFieldId, focusSelectedField]);

  return (
    <div className="flex flex-col h-full font-medium">
      <div className="p-4 border-b flex justify-end items-center gap-2">
        <ModeToggle />
        <Button
          onClick={() => {
            togglePreview();
            handleContainerClick();
          }}
          variant="outline"
          size="sm"
        >
          {isPreview ? (
            <>
              <PencilIcon className="mr-2 h-4 w-4" /> Edit Mode
            </>
          ) : (
            <>
              <EyeIcon className="mr-2 h-4 w-4" /> Preview Mode
            </>
          )}
        </Button>
      </div>
      <div className="flex-grow p-4 overflow-y-auto">
        {isPreview ? (
          <FormRender />
        ) : (
          <DnDProvider>
            <div
              className="flex flex-col  h-full"
              onClick={handleContainerClick}
            >
              {fields.map((field) => (
                <DraggableField key={field.id} id={field.id}>
                  <div className="flex flex-row items-center gap-2">
                    {(() => {
                      switch (field.type) {
                        case 'text':
                          return <TextField field={field} />;
                        case 'email':
                          return <EmailField field={field} />;
                        case 'multipleChoice':
                          return <MultipleChoiceField field={field} />;
                        default:
                          return null;
                      }
                    })()}
                  </div>
                </DraggableField>
              ))}
            </div>
          </DnDProvider>
        )}
      </div>
    </div>
  );
};

export default FormEditor;
