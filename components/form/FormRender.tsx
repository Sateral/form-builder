"use client";

import React from "react";

import { useFormBuilder } from "@/lib/store/form-builder-store";
import TextField from "../fields/TextField";
import EmailField from "../fields/EmailField";
import MultipleChoiceField from "../fields/MultipleChoiceField";

const FormRender = () => {
  const fields = useFormBuilder((state) => state.fields);

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
