import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

interface SearchFiltersProps {
  filters: Record<string, string | undefined>;
  onFiltersChange: (filters: Record<string, string | undefined>) => void;
  loading?: boolean;
  fields: Array<{
    key: string;
    label: string;
    placeholder?: string;
    maxLength?: number;
  }>;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  filters,
  onFiltersChange,
  loading = false,
  fields,
}) => {
  const [localFilters, setLocalFilters] = useState(filters);

  // Sincroniza filtros locais com os filtros externos
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleFilterChange = (key: string, value: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSearch = () => {
    onFiltersChange(localFilters);
  };

  const handleClear = () => {
    const clearedFilters = Object.keys(localFilters).reduce((acc, key) => {
      acc[key] = "";
      return acc;
    }, {} as Record<string, string>);

    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const hasActiveFilters = Object.values(localFilters).some(
    (value) => value && value.trim() !== ""
  );

  return (
    <div className="space-y-4">
      {/* Campos de filtro */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {fields.map((field) => (
          <div key={field.key}>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">
              {field.label}
            </label>
            <Input
              placeholder={
                field.placeholder || `Filtrar por ${field.label.toLowerCase()}`
              }
              value={localFilters[field.key] || ""}
              onChange={(e) => handleFilterChange(field.key, e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
              maxLength={field.maxLength}
            />
          </div>
        ))}
      </div>

      {/* Botões de ação */}
      <div className="flex items-center gap-2">
        <Button onClick={handleSearch} disabled={loading} className="gap-2">
          <Search className="w-4 h-4" />
          Buscar
        </Button>

        {hasActiveFilters && (
          <Button
            variant="outline"
            onClick={handleClear}
            disabled={loading}
            className="gap-2"
          >
            <X className="w-4 h-4" />
            Limpar Filtros
          </Button>
        )}
      </div>
    </div>
  );
};
