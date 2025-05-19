// Base properties common to all fields
export interface BaseField {
  id: string;
  label: string;
  required: boolean;
  placeholder?: string; // Optional placeholder for the field
}

// Specific properties for each field type
export interface TextField extends BaseField {
  type: "text";
  value?: string; // The actual text value
}

export interface EmailField extends BaseField {
  type: "email";
  subField: FormSubField & { type: "input" };
}

// For MultipleChoiceField, options are FormSubField with type 'choice'
export interface MultipleChoiceField extends BaseField {
  type: "multipleChoice";
  subFields: (FormSubField & {
    type: "choice";
    label: string;
    colour?: string;
  })[];
}

// The discriminated union for FormField
export type FormField = TextField | EmailField | MultipleChoiceField;

// FormFieldTypes is now derived from the FormField union for better type safety
export type FormFieldTypes = FormField["type"];

// FormSubField: Defines parts of a field, like choices in multipleChoice or editable parts of an email field.
export type FormSubField = {
  subId: string;
  parentFieldId: string;
  type: "label" | "input" | "choice"; // 'choice' for multiple choice options, 'input' for editable parts
  content?: string; // For 'input' type (e.g., placeholder text), or 'choice' (option display text)
  // `label` property on FormSubField is removed as `content` should store the display text.
};

// CommandMenuItem remains the same, but its `type` property will now correctly
// align with the more robust FormFieldTypes
export type CommandMenuItem = {
  icon: React.ReactNode;
  label: string;
  description: string;
  type: FormFieldTypes;
};
