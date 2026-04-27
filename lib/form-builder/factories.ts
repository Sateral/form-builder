import type { BlockType, ChoiceOption, FormBlock, FormDocument } from "./types";

function createId(prefix: string): string {
  return `${prefix}-${crypto.randomUUID()}`;
}

export function createOption(label: string): ChoiceOption {
  return {
    id: createId("option"),
    label,
  };
}

export function createBlock(type: BlockType): FormBlock {
  const id = createId("block");

  switch (type) {
    case "statement":
      return {
        id,
        type,
        label: "This is my form!",
        placeholder: "",
        required: true,
      };
    case "email":
      return {
        id,
        type,
        label: "Enter email",
        placeholder: "test@mail.com",
        required: true,
      };
    case "multipleChoice":
      return {
        id,
        type,
        label: "Choose an option",
        placeholder: "",
        required: false,
        options: [createOption("Option A"), createOption("Option B")],
      };
  }
}

export function createInitialForm(): FormDocument {
  return {
    title: "This is my form!",
    blocks: [
      createBlock("statement"),
      createBlock("email"),
      createBlock("multipleChoice"),
    ],
  };
}
