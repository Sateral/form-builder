import type { BlockType } from "./types";

interface BlockDefinition {
  type: BlockType;
  label: string;
  description: string;
  command: string;
}

export const blockRegistry: BlockDefinition[] = [
  {
    type: "statement",
    label: "Text block",
    description: "A prompt or question without a typed response.",
    command: "/text",
  },
  {
    type: "email",
    label: "Email input",
    description: "A question with an email placeholder.",
    command: "/email",
  },
  {
    type: "multipleChoice",
    label: "Multiple choice",
    description: "A question with selectable options.",
    command: "/choice",
  },
];

const optionBadges = ["A", "B", "C", "D", "E"];

export function getOptionBadge(index: number): string {
  return optionBadges[index] ?? `${index + 1}`;
}
