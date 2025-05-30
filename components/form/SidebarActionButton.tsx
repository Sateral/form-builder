"use client";

import React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

/**
 * Props for the SidebarActionButton component
 *
 * This component provides a unified way to create sidebar actions with hover card tooltips.
 * It can render either a regular button or a toggle button based on the isToggle prop.
 */
interface SidebarActionButtonProps {
  /** The action to perform when the button is clicked */
  onClick?: () => void;

  /** The tooltip text to display in the hover card */
  tooltip?: string;

  /** Optional aria-label for accessibility */
  ariaLabel?: string;

  /** The Lucide icon component to display inside the button */
  icon: LucideIcon;

  /** Additional class names to apply to the button */
  className?: string;

  /** Whether to use a toggle instead of a button */
  isToggle?: boolean;

  /** dnd-kit listeners for drag functionality */
  listeners?: SyntheticListenerMap;

  /** Toggle-specific props, only used when isToggle is true */
  toggleProps?: {
    /** Whether the toggle is in the pressed state */
    pressed: boolean;

    /** Callback function when the toggle state changes */
    onPressedChange: (pressed: boolean) => void;

    /** Visual variant of the toggle */
    variant?: "default" | "outline" | "sidebar";
  };

  /** Button-specific props, only used when isToggle is false */
  buttonProps?: Omit<React.ComponentPropsWithoutRef<typeof Button>, "onClick">;
}

/**
 * A reusable button component that shows a tooltip on hover
 *
 * This component simplifies creating the sidebar actions in form fields.
 * It provides a consistent look and behavior for all sidebar actions.
 */
const SidebarActionButton: React.FC<SidebarActionButtonProps> = ({
  onClick,
  tooltip,
  ariaLabel,
  icon: Icon,
  className,
  isToggle = false,
  listeners,
  toggleProps,
  buttonProps,
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {isToggle && toggleProps ? (
            <Toggle
              size="icon"
              variant={toggleProps.variant || "sidebar"}
              pressed={toggleProps.pressed}
              onPressedChange={toggleProps.onPressedChange}
              className={cn("shrink-0", className)}
              aria-label={ariaLabel}
            >
              <Icon className="h-4 w-4" />
            </Toggle>
          ) : (
            <Button
              size="icon"
              onClick={onClick}
              className={className}
              aria-label={ariaLabel}
              {...buttonProps}
              {...listeners}
            >
              <Icon className="h-4 w-4" />
            </Button>
          )}
        </TooltipTrigger>
        {tooltip && (
          <TooltipContent className="w-fit">
            <p className="text-xs">{tooltip}</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

export default SidebarActionButton;
