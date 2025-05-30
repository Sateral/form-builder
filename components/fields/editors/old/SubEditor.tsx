"use client";

import React from "react";
import BaseEditor from "../BaseEditor";
import { FormSubField } from "@/lib/types";

interface SubEditorProps {
  content?: string;
  subFieldId: string;
  parentFieldId: string;
  type: FormSubField["type"];
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onUpdate: (content: string) => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

const SubEditor = React.memo((props: SubEditorProps) => {
  return <BaseEditor fieldId={props.parentFieldId} {...props} />;
});

export default SubEditor;
