"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, X, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <div className="space-y-6">
      {/* Results count */}
      <div className="pb-4 border-b border-border">
        <p className="text-sm text-text-muted">
          Showing{" "}
          <span className="font-semibold text-text-primary">{totalResults}</span>{" "}
          {resultsLabel}
        </p>
      </div>

      {/* Filter sections */}
      {sections.map((section) => (
        <div key={section.id} className="border-b border-border pb-4">
          <button
            onClick={() => toggleSection(section.id)}
            className="flex items-center justify-between w-full text-left mb-3"
          >
            <span className="font-medium text-text-primary">{section.title}</span>
            <ChevronDown
              className={`w-4 h-4 text-text-muted transition-transform ${
                expandedSections.includes(section.id) ? "rotate-180" : ""
              }`}
            />
          </button>

          <AnimatePresence>
            {expandedSections.includes(section.id) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="space-y-2">
                  {section.options.map((option) => {
                    const isSelected = (
                      selectedFilters[section.id] || []
                    ).includes(option.value);

                    return (
                      <button
                        key={option.value}
                        onClick={() => toggleOption(section.id, option.value)}
                        className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm transition-colors ${
                          isSelected
                            ? "bg-primary-100 text-primary-dark border border-primary"
                            : "bg-surface hover:bg-surface-hover text-text-secondary"
                        }`}
                      >
                        <span>{option.label}</span>
                        {option.count !== undefined && (
                          <span className="text-xs text-text-muted">
                            {option.count}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}

      {/* Clear all button */}
      {hasActiveFilters && (
        <Button
          variant="outline"
          size="sm"
          onClick={onClearAll}
          className="w-full"
        >
          <X className="w-4 h-4 mr-2" />
          Clear all filters ({totalActiveFilters})
        </Button>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile filter button */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          onClick={() => setMobileOpen(true)}
          className="w-full"
        >
          <SlidersHorizontal className="w-4 h-4 mr-2" />
          Filters
          {totalActiveFilters > 0 && (
            <span className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-primary text-white">
              {totalActiveFilters}
            </span>
          )}
        </Button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 w-80 bg-background-pure z-50 overflow-y-auto p-6 lg:hidden"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Filters</h2>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-lg hover:bg-surface"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <FilterContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 flex-shrink-0">
        <div className="sticky top-24 bg-background-pure rounded-xl border border-border p-5">
          <FilterContent />
        </div>
      </aside>
    </>
  );
}
