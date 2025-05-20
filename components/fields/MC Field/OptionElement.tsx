"use client";

import { Input } from "@/components/ui/input";
import React, { useEffect, useRef } from "react";
import { ChoiceOption } from "@/lib/types/base";

interface OptionElementProps {
  option: ChoiceOption;
  isSelected: boolean;
  onUpdate: (id: string, content: string) => void;
  onKeyDown: (
    event: React.KeyboardEvent<HTMLInputElement>,
    option: Pick<ChoiceOption, "subId" | "content" | "label">
  ) => void;
}

const OptionElement = React.memo(
  ({ option, isSelected, onUpdate, onKeyDown }: OptionElementProps) => {
    const editorRef = useRef<HTMLDivElement>(null);

    // Effect to handle focusing when selected programmatically
    useEffect(() => {
      // Add this effect to make the element focusable by id
      if (
        document.activeElement?.id !== option.subId &&
        document.getElementById(option.subId) === editorRef.current
      ) {
        editorRef.current?.focus();
      }
    }, [option.subId]);
    return (
      <div
        key={option.subId}
        className={`flex items-center gap-0 border-2 rounded-md px-[6px] ${
          isSelected ? "bg-gray-100 p-1 rounded" : ""
        }`}
      >
        <div
          className="flex justify-center items-center font-semibold size-6 text-md shrink-0 rounded-md"
          style={{
            backgroundColor: option.colour || "#FFFFFF",
            color: "#FFFFFF",
          }}
        >
          {option.label}
        </div>{" "}
        <Input
          id={`field-${option.parentFieldId}-sub-${option.subId}`}
          type="text"
          variant="mc"
          value={option.content || ""} // Ensure value is always a string
          onChange={(e) => onUpdate(option.subId, e.target.value)}
          onKeyDown={(e) =>
            onKeyDown(e, {
              subId: option.subId,
              content: option.content,
              label: option.label,
            })
          }
        />
      </div>
    );
  }
);

OptionElement.displayName = "OptionElement";

export default OptionElement;
