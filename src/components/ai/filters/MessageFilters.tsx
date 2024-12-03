import React from "react";
import { Filter, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export type FilterType = "all" | "user" | "ai";

interface MessageFiltersProps {
  filterType: FilterType;
  onFilterChange: (type: FilterType) => void;
  onClose: () => void;
}

export function MessageFilters({ filterType, onFilterChange, onClose }: MessageFiltersProps) {
  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-8 w-8",
              filterType !== "all" && "text-primary"
            )}
            aria-label="Filter messages"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onFilterChange("all")}>
            All Messages
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onFilterChange("user")}>
            User Messages
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onFilterChange("ai")}>
            AI Responses
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        aria-label="Close search"
      >
        <Filter className="w-4 h-4" />
      </Button>
    </div>
  );
}