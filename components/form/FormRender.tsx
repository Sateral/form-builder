"use client";

import React from "react";

import TextField from "../fields/TextField";
import EmailField from "../fields/EmailField";
import MultipleChoiceField from "../fields/MultipleChoiceField";
import { useFormBuilderFacade } from "@/lib/store/form-builder-facade";

const FormRender = () => {
  const { fields } = useFormBuilderFacade();
  return (
    <div className="flex flex-col space-y-4">
      {fields.map((field) => {
        switch (field.type) {
          case "text":
            return <TextField key={field.id} field={field} />;
          case "email":
            return <EmailField key={field.id} field={field} />;
          case "multipleChoice":
            return <MultipleChoiceField key={field.id} field={field} />;
          default:
            return null;
        }
      })}
    </div>
  );
};

export default FormRender;
