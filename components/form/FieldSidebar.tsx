"use client";

import React, { useCallback, useMemo } from "react";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import {
  GripVerticalIcon,
  PlusIcon,
  TrashIcon,
  ShieldAlertIcon,
} from "lucide-react";

import { useFormBuilder } from "@/lib/store/form-builder-store";
import { useCommandMenu } from "@/lib/store/command-menu-store";
import { cn } from "@/lib/utils";
import SidebarActionButton from "./SidebarActionButton";

interface FieldSidebarProps {
  listeners: SyntheticListenerMap | undefined;
  id: string;
}

const FieldSidebar = React.memo(({ listeners, id }: FieldSidebarProps) => {
  const selectedField = useFormBuilder((state) => state.selectedField);
  const { removeField, updateField } = useFormBuilder();
  const field = useFormBuilder(
    useCallback((state) => state.fields.find((field) => field.id === id), [id])
  );
  const { setIsOpen } = useCommandMenu();

  // Memoize whether this field is selected
  const isSelected = useMemo(() => selectedField === id, [selectedField, id]);

  // Memoize whether this field is required
  const isRequired = useMemo(() => field?.required || false, [field]);

  // Common class names for buttons
  const baseButtonClasses = useMemo(
    () =>
      cn(
        "opacity-0 group-hover:opacity-100 text-gray-500/70 hover:text-white hover:bg-gray-200 bg-transparent shadow-none size-7",
        isSelected && "opacity-100",
        "transition"
      ),
    [isSelected]
  );

  const handleUpdateField = useCallback(
    (value: boolean) => {
      updateField(id, { required: value });
    },
    [updateField, id]
  );

  const handleAddField = useCallback(() => setIsOpen(true), [setIsOpen]);

  const handleRemoveField = useCallback(
    () => removeField(id),
    [removeField, id]
  );

  return (
    <div className="flex flex-row items-center flex-shrink-0 flex-nowrap gap-x-1">
      <SidebarActionButton
        icon={PlusIcon}
        onClick={handleAddField}
        tooltip="Add new field"
        ariaLabel="Add field"
        className={cn(baseButtonClasses)}
      />

      <SidebarActionButton
        icon={TrashIcon}
        onClick={handleRemoveField}
        tooltip="Delete this field"
        ariaLabel="Remove field"
        className={cn(baseButtonClasses, "hover:bg-destructive/90")}
        buttonProps={{ variant: "destructive" }}
      />

      <SidebarActionButton
        icon={ShieldAlertIcon}
        isToggle
        toggleProps={{
          pressed: isRequired,
          onPressedChange: handleUpdateField,
          variant: "sidebar",
        }}
        tooltip={isRequired ? "Mark as optional" : "Mark as required"}
        ariaLabel={isRequired ? "Mark as optional" : "Mark as required"}
        className={cn(
          baseButtonClasses,
          `${
            isRequired ? "bg-blue-200 text-blue-500 hover:bg-blue-200/70" : ""
          }`
        )}
      />

      <SidebarActionButton
        icon={GripVerticalIcon}
        ariaLabel="Drag to reorder"
        className={cn(baseButtonClasses, "cursor-grab active:cursor-grabbing")}
        listeners={listeners}
      />
    </div>
  );
});

FieldSidebar.displayName = "FieldSidebar";

export default FieldSidebar;
