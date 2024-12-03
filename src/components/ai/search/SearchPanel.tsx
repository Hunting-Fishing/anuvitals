import React from "react";
import { SearchBar } from "./SearchBar";
import { MessageFilters, FilterType } from "../filters/MessageFilters";

interface SearchPanelProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterType: FilterType;
  onFilterChange: (type: FilterType) => void;
  onClose: () => void;
}

export function SearchPanel({
  searchTerm,
  onSearchChange,
  filterType,
  onFilterChange,
  onClose,
}: SearchPanelProps) {
  return (
    <div className="flex items-center gap-2 p-2 bg-background/95 rounded-lg animate-fade-in">
      <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} />
      <MessageFilters
        filterType={filterType}
        onFilterChange={onFilterChange}
        onClose={onClose}
      />
    </div>
  );
}