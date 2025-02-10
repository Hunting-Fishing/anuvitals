
import { SearchBar } from "./SearchBar";
import { FilterType, MessageFilters } from "../filters/MessageFilters";

interface AISearchPanelProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterType: FilterType;
  onFilterChange: (type: FilterType) => void;
  onClose: () => void;
}

export function AISearchPanel({
  searchTerm,
  onSearchChange,
  filterType,
  onFilterChange,
  onClose,
}: AISearchPanelProps) {
  return (
    <div className="flex flex-col space-y-4 p-4 bg-background/95 rounded-lg shadow-lg animate-fade-in">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Search Messages</h3>
        <MessageFilters
          filterType={filterType}
          onFilterChange={onFilterChange}
          onClose={onClose}
        />
      </div>
      <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} />
    </div>
  );
}
