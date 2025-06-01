"use client";

import React from "react";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";

import FieldSidebar from "@/components/form/FieldSidebar";
import { useFormBuilderFacade } from "@/lib/store/form-builder-facade";

interface DraggableFieldProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

const DraggableField = ({ id, children, className }: DraggableFieldProps) => {
  const { setSelectedField } = useFormBuilderFacade();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedField(id, null);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={`w-full p-2 group transition-colors duration-300 rounded-md ${className} ${
        isDragging ? "z-50" : ""
      }`}
      onClick={handleClick}
    >
      <div className="flex flex-row items-start gap-x-2">
        <FieldSidebar listeners={listeners} id={id} />
        {children}
      </div>
    </div>
  );
};

export default DraggableField;
