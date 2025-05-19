import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "prosemirror-state";
import { useFormBuilder } from "@/lib/store/form-builder-store";
import { calculateNextFocusTarget } from "@/utils/formNavigation";

export const CustomKeyboardExtension = Extension.create({
  name: "customKeyboard",

  addProseMirrorPlugins() {
    const fieldId = this.options.fieldId;

    return [
      new Plugin({
        key: new PluginKey("customKeyboard"),
        priority: 150,
        props: {
          handleKeyDown: (view, event) => {
            const {
              addField,
              removeField,
              selectedSubFieldId,
              setSelectedField,
              fields,
            } = useFormBuilder.getState();

            // Handle Enter Key
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              addField({
                type: "text",
                label: "New Field",
                required: false,
                placeholder: "Type something...",
              });
              return true;
            }

            // Handle Backspace Key
            if (event.key === "Backspace" && !view.state.doc.textContent) {
              event.preventDefault();

              // Find current field index
              const fieldIndex = fields.findIndex((f) => f.id === fieldId);
              if (fieldIndex > 0) {
                setSelectedField(fields[fieldIndex - 1].id, null);
              }

              removeField(fieldId);
              return true;
            }

            // Handle Arrow Keys
            if (event.key === "ArrowUp") {
              return calculateNextFocusTarget(
                view,
                "up",
                fieldId,
                selectedSubFieldId
              );
            }

            if (event.key === "ArrowDown") {
              return navigateFormFields(
                view,
                "down",
                fieldId,
                selectedSubFieldId
              );
            }

            return false;
          },
        },
      }),
    ];
  },
});
