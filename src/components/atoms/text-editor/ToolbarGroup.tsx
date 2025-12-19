"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ToolbarGroupProps {
  children: ReactNode;
  className?: string;
}

export default function ToolbarGroup({
  children,
  className,
}: ToolbarGroupProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-1 rounded-md border bg-background p-1 control-group",
        className
      )}
    >
      {children}
    </div>
  );
}
