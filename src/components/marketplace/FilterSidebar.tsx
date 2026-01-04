"use client";

import { useState } from "react";
import { ChevronDown, X, SlidersHorizontal } from "lucide-react";

interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

interface FilterSection {
  id: string;
  title: string;
  options: FilterOption[];
  type: "multi" | "single" | "range";
}

interface FilterSidebarProps {
  sections: FilterSection[];
  selectedFilters: Record<string, string[]>;
  onFilterChange: (sectionId: string, values: string[]) => void;
  onClearAll: () => void;
  totalResults: number;
  resultsLabel?: string;
}

export function FilterSidebar({
  sections,
  selectedFilters,
  onFilterChange,
  onClearAll,
  totalResults,
  resultsLabel = "results",
}: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(
    sections.map((s) => s.id)
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const toggleOption = (sectionId: string, value: string) => {
    const current = selectedFilters[sectionId] || [];
    const section = sections.find((s) => s.id === sectionId);

    if (section?.type === "single") {
      onFilterChange(sectionId, current.includes(value) ? [] : [value]);
    } else {
      onFilterChange(
        sectionId,
        current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value]
      );
    }
  };

  const hasActiveFilters = Object.values(selectedFilters).some(
    (arr) => arr.length > 0
  );

  const totalActiveFilters = Object.values(selectedFilters).reduce(
    (acc, arr) => acc + arr.length,
    0
  );

  const FilterContent = () => (
    <div className="space-y-4">
      {/* Results count */}
      <div className="pb-3 border-b border-border">
        <p className="text-sm text-text-muted">
          <span className="font-medium text-text-primary">{totalResults}</span>{" "}
          {resultsLabel}
        </p>
      </div>

      {/* Filter sections */}
      {sections.map((section) => (
        <div key={section.id} className="border-b border-border pb-3">
          <button
            onClick={() => toggleSection(section.id)}
            className="flex items-center justify-between w-full text-left mb-2"
          >
            <span className="text-sm font-medium text-text-primary">{section.title}</span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-text-muted ${
                expandedSections.includes(section.id) ? "rotate-180" : ""
              }`}
            />
          </button>

          {expandedSections.includes(section.id) && (
            <div className="space-y-1">
              {section.options.map((option) => {
                const isSelected = (
                  selectedFilters[section.id] || []
                ).includes(option.value);

                return (
                  <label
                    key={option.value}
                    className="flex items-center gap-2 px-1 py-1 text-sm cursor-pointer hover:bg-surface rounded"
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleOption(section.id, option.value)}
                      className="w-3.5 h-3.5 rounded border-border text-primary focus:ring-primary"
                    />
                    <span className={isSelected ? "text-text-primary" : "text-text-secondary"}>
                      {option.label}
                    </span>
                    {option.count !== undefined && (
                      <span className="text-xs text-text-muted ml-auto">
                        {option.count}
                      </span>
                    )}
                  </label>
                );
              })}
            </div>
          )}
        </div>
      ))}

      {/* Clear all button */}
      {hasActiveFilters && (
        <button
          onClick={onClearAll}
          className="w-full text-sm text-primary hover:underline"
        >
          Clear all ({totalActiveFilters})
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile filter button */}
      <div className="lg:hidden mb-3">
        <button
          onClick={() => setMobileOpen(true)}
          className="flex items-center gap-2 px-3 py-2 text-sm border border-border rounded bg-background-pure hover:bg-surface"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {totalActiveFilters > 0 && (
            <span className="px-1.5 py-0.5 text-xs bg-primary text-white rounded">
              {totalActiveFilters}
            </span>
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/30 z-40 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed left-0 top-0 bottom-0 w-72 bg-background-pure z-50 overflow-y-auto p-4 lg:hidden border-r border-border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold">Filters</h2>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1 hover:bg-surface rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <FilterContent />
          </div>
        </>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-56 flex-shrink-0">
        <div className="sticky top-16 bg-background-pure border border-border rounded p-4">
          <FilterContent />
        </div>
      </aside>
    </>
  );
}
