import { CommandMenuItem } from '@/lib/types';
import { AtSignIcon, CaseUpper, TextIcon } from 'lucide-react';

export const CommandMenuItems: CommandMenuItem[] = [
  {
    icon: <AtSignIcon />,
    label: 'Email',
    description: 'Add an email field to your form.',
    type: 'email',
  },
  {
    icon: <TextIcon />,
    label: 'Text',
    description: 'Add a text field to your form.',
    type: 'text',
  },
  {
    icon: <CaseUpper />,
    label: 'Multiple Choice',
    description: 'Add a multiple choice field to your form.',
    type: 'multipleChoice',
  },
];
