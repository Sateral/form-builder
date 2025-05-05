'use client';

import React from 'react';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { GripVerticalIcon, PlusIcon, TrashIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useFormBuilder } from '@/lib/store/form-builder-store';
import { useCommandMenu } from '@/lib/store/command-menu-store';

interface FieldSidebarProps {
  listeners: SyntheticListenerMap | undefined;
  id: string;
}

const FieldSidebar = ({ listeners, id }: FieldSidebarProps) => {
  const selectedField = useFormBuilder((state) => state.selectedField);
  const { removeField } = useFormBuilder();
  const { setIsOpen } = useCommandMenu();

  return (
    <div className="flex flex-row items-center flex-shrink-0 flex-nowrap gap-x-1">
      <Button
        size="icon"
        className={`opacity-0 group-hover:opacity-100 bg-transparent shadow-none hover:bg-gray-300 size-7 ${
          selectedField === id ? 'opacity-100' : ''
        } transition`}
        onClick={() => setIsOpen(true)}
      >
        <PlusIcon color="grey" />
      </Button>

      <Button
        size="icon"
        className={`opacity-0 group-hover:opacity-100 bg-transparent shadow-none hover:bg-gray-300 size-7 ${
          selectedField === id ? 'opacity-100' : ''
        } transition`}
        onClick={() => removeField(id)}
      >
        <TrashIcon color="grey" />
      </Button>

      <Button
        size="icon"
        className={`opacity-0 group-hover:opacity-100 bg-transparent shadow-none hover:bg-gray-300 size-7 ${
          selectedField === id ? 'opacity-100' : ''
        } transition cursor-grab active:cursor-grabbing`}
        {...listeners}
      >
        <GripVerticalIcon color="grey" />
      </Button>
    </div>
  );
};

export default FieldSidebar;
