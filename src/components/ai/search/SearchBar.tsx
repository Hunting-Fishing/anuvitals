import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export function SearchBar({ searchTerm, onSearchChange }: SearchBarProps) {
  return (
    <div className="flex items-center gap-2">
      <Search className="w-4 h-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search messages..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="flex-1"
        aria-label="Search messages"
      />
    </div>
  );
}