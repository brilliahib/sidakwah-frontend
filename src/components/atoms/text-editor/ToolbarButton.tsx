"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ToolbarButtonProps {
  active?: boolean;
  onClick: () => void;
  children: ReactNode;
}

export default function ToolbarButton({
  active,
  onClick,
  children,
}: ToolbarButtonProps) {
  return (
    <Button
      type="button"
      size="icon"
      variant={active ? "secondary" : "ghost"}
      className={cn("h-8 w-8")}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
