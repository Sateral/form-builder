import { FormFieldTypes } from "./fields";
import React from "react";

// UI related types
export type CommandMenuItem = {
  icon: React.ReactNode;
  label: string;
  description: string;
  type: FormFieldTypes;
};
