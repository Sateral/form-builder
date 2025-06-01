"use client";

import React, { useState, useEffect } from "react";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useFormBuilderFacade } from "@/lib/store/form-builder-facade";

interface Props {
  children?: React.ReactNode;
}

const DnDProvider = ({ children }: Props) => {
  const [mounted, isMounted] = useState(false);

  const { fields, setFields } = useFormBuilderFacade();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = fields.findIndex((field) => field.id === active.id);
      const newIndex = fields.findIndex((field) => field.id === over?.id);

      setFields(arrayMove(fields, oldIndex, newIndex));
    }
  };

  useEffect(() => {
    isMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis]}
    >
      <SortableContext items={fields} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  );
};

export default DnDProvider;
