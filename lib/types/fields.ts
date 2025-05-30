import type { BaseField, FormSubField, ChoiceOption } from "./base";

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
  subFields: ChoiceOption[];
}

// The discriminated union for FormField
export type FormField = TextField | EmailField | MultipleChoiceField;

// FormFieldTypes is derived from the FormField union for better type safety
export type FormFieldTypes = FormField["type"];
