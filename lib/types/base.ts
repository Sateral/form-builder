// Base types for form fields

// Base properties common to all fields
export interface BaseField {
  id: string;
  label: string;
  required: boolean;
  placeholder?: string; // Optional placeholder for the field
}

// FormSubField: Defines parts of a field, like choices in multipleChoice or editable parts of an email field.
export type FormSubField = {
  subId: string;
  parentFieldId: string;
  type: "label" | "input" | "choice"; // 'choice' for multiple choice options, 'input' for editable parts
  content?: string; // For 'input' type (e.g., placeholder text), or 'choice' (option display text)
};

// Enhanced SubField with choice properties (used in MultipleChoice)
export type ChoiceOption = FormSubField & {
  type: "choice";
  label: string;
  colour: string;
  content: string;
};
