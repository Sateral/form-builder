'use client';

import React, { MouseEventHandler } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import DnDProvider from '@/providers/DnDProvider';
import TextField from '@/components/fields/TextField';
import EmailField from '@/components/fields/EmailField';
import DraggableField from '@/components/form/DraggableField';
import { useFormBuilder } from '@/lib/store/form-builder-store';
import MultipleChoiceField from '@/components/fields/MultipleChoiceField';

interface Props {}

const FormEditor = ({}: Props) => {
  const { fields, setSelectedField } = useFormBuilder();

  const handleContainerClick = () => {
    setSelectedField(null, null);
  };

  return (
    <DnDProvider>
      <div
        className="flex flex-col gap-4 h-full"
        onClick={handleContainerClick}
      >
        {fields.map((field) => (
          <DraggableField key={field.id} id={field.id}>
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
          </DraggableField>
        ))}
      </div>
    </DnDProvider>
  );
};

export default FormEditor;
