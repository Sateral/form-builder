export type BlockType = "statement" | "email" | "multipleChoice";

export interface ChoiceOption {
  id: string;
  label: string;
}

interface BaseBlock {
  id: string;
  type: BlockType;
  label: string;
  placeholder: string;
  required: boolean;
}

export interface StatementBlock extends BaseBlock {
  type: "statement";
}

export interface EmailBlock extends BaseBlock {
  type: "email";
}

export interface MultipleChoiceBlock extends BaseBlock {
  type: "multipleChoice";
  options: ChoiceOption[];
}

export type FormBlock = StatementBlock | EmailBlock | MultipleChoiceBlock;

export interface FormDocument {
  title: string;
  blocks: FormBlock[];
}

export type FocusKind = "label" | "placeholder" | "option";

export interface FocusTarget {
  id: string;
  blockId: string;
  kind: FocusKind;
  optionId?: string;
}
