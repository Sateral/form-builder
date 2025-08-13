'use client';

import React from 'react';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { useCommandMenu } from '@/lib/store/command-menu-store';
import { CommandMenuItems } from '@/lib/constants/CommandMenuItems';
import { FormFieldTypes } from '@/lib/types';
import { useFormBuilder } from '@/lib/store/form-builder-store';
import { DialogTitle } from '../ui/dialog';

const CommandMenu = () => {
  const { isOpen, onClose } = useCommandMenu();
  const { addField } = useFormBuilder();

  const handleClick = (type: FormFieldTypes) => {
    console.log('Adding field:', type);
    const newId = crypto.randomUUID();
    switch (type) {
      case 'email':
        addField({
          id: newId,
          label: '',
          required: true,
          type: 'email',
          subField: {
            parentFieldId: newId,
            subId: crypto.randomUUID(),
            type: 'input',
            content: '',
          },
        });
        break;

      case 'text':
        addField({
          id: newId,
          label: '',
          required: false,
          type: 'text',
        });
        break;
      case 'multipleChoice':
        const mcFieldId = newId;
        addField({
          id: mcFieldId,
          label: '',
          required: false,
          type: 'multipleChoice',
          subFields: [
            {
              subId: crypto.randomUUID(),
              parentFieldId: mcFieldId,
              type: 'choice',
              content: '',
              label: 'A',
              colour: '#FF69B4',
            },
            {
              subId: crypto.randomUUID(),
              parentFieldId: mcFieldId,
              type: 'choice',
              content: '',
              label: 'B',
              colour: '#00CED1',
            },
          ],
        });
        break;

      default:
        break;
    }
    onClose();
  };

  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <DialogTitle />
      <CommandInput placeholder="Search for a form field..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Form Fields">
          {CommandMenuItems.map((item) => (
            <CommandItem
              key={item.label}
              onSelect={() => handleClick(item.type)}
            >
              {item.icon}
              <div>
                <div className="font-bold">{item.label}</div>
                <div className="text-sm text-gray-500">{item.description}</div>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default CommandMenu;
