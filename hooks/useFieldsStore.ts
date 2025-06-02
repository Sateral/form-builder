import { useFormFieldsStore } from "@/lib/store/fields-store";
import { useShallow } from "zustand/shallow";

export const useFields = () =>
  useFormFieldsStore(
    useShallow((state) => ({
      fields: state.fields,
      addField: state.addField,
      updateField: state.updateField,
      setFields: state.setFields,
      removeField: state.removeField,
    }))
  );
