"use client";

import React, { useCallback } from "react";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import {
  GripVerticalIcon,
  PlusIcon,
  TrashIcon,
  ShieldAlertIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useFormBuilder } from "@/lib/store/form-builder-store";
import { useCommandMenu } from "@/lib/store/command-menu-store";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { Toggle } from "../ui/toggle";

interface FieldSidebarProps {
  listeners: SyntheticListenerMap | undefined;
  id: string;
}

const FieldSidebar = ({ listeners, id }: FieldSidebarProps) => {
  const selectedField = useFormBuilder((state) => state.selectedField);
  const { removeField, fields, updateField } = useFormBuilder();
  const { setIsOpen } = useCommandMenu();

  const handleUpdateField = useCallback(
    (value: boolean) => {
      console.log(value);
      updateField(id, { required: value });
    },
    [updateField, id]
  );
  return (
    <div className="flex flex-row items-center flex-shrink-0 flex-nowrap gap-x-1">
      <Button
        size="icon"
        className={`opacity-0 group-hover:opacity-100 bg-transparent shadow-none hover:bg-gray-300 size-7 ${
          selectedField === id ? "opacity-100" : ""
        } transition`}
        onClick={() => setIsOpen(true)}
      >
        <PlusIcon color="grey" />
      </Button>

      <Button
        size="icon"
        className={`opacity-0 group-hover:opacity-100 bg-transparent shadow-none hover:bg-gray-300 size-7 ${
          selectedField === id ? "opacity-100" : ""
        } transition`}
        onClick={() => removeField(id)}
      >
        <TrashIcon color="grey" />
      </Button>

      <HoverCard>
        <HoverCardTrigger>
          <Toggle
            size="icon"
            variant="sidebar"
            className={`opacity-0 group-hover:opacity-100 bg-transparent shadow-none hover:bg-gray-300 size-7 shrink-0 ${
              selectedField === id ? "opacity-100" : ""
            } transition`}
            // pressed={fields.find(field => field.id === id)?.required || false}
            onPressedChange={handleUpdateField}
          >
            <ShieldAlertIcon />
          </Toggle>
        </HoverCardTrigger>
        <HoverCardContent className="w-fit">
          <p className="text-xs">Make this field required</p>
        </HoverCardContent>
      </HoverCard>

      <Button
        size="icon"
        className={`opacity-0 group-hover:opacity-100 bg-transparent shadow-none hover:bg-gray-300 size-7 ${
          selectedField === id ? "opacity-100" : ""
        } transition cursor-grab active:cursor-grabbing`}
        {...listeners}
      >
        <GripVerticalIcon color="grey" />
      </Button>
    </div>
  );
};

export default FieldSidebar;
