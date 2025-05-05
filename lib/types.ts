export type FormFieldTypes =
  | 'text'
  | 'email'
  | 'number'
  | 'select'
  | 'multipleChoice';

export type ChoiceOption = {
  optionId: string;
  parentFieldId: string;
  label: string;
  content: string;
};

export type FormField = {
  id: string;
  type: FormFieldTypes;
  label: string;
  required: boolean;
  placeholder?: string;
  content?: string;
  subFields?: FormSubField[];
};

export type FormSubField = {
  subId: string;
  parentFieldId: string;
  type: 'label' | 'input' | 'choice';
  content?: string;
  label?: string;
};

export type CommandMenuItem = {
  icon: React.ReactNode;
  label: string;
  description: string;
  type: FormFieldTypes;
};
