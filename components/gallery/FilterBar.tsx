'use client';

import { FilterState, CATEGORIES, SCOPES, YEARS } from '@/lib/types';
import { cn } from '@/lib/utils/cn';

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export function FilterBar({ filters, onFilterChange }: FilterBarProps) {
  const toggleFilter = (
    type: 'categories' | 'scopes' | 'years',
    value: string | number
  ) => {
    const newFilters = { ...filters };
    const filterSet = new Set(newFilters[type]);

    if (filterSet.has(value as never)) {
      filterSet.delete(value as never);
    } else {
      filterSet.add(value as never);
    }

    newFilters[type] = filterSet as any;
    onFilterChange(newFilters);
  };

  const toggleFeatured = () => {
    onFilterChange({
      ...filters,
      featured: !filters.featured,
    });
  };

  const clearAllFilters = () => {
    onFilterChange({
      categories: new Set(),
      scopes: new Set(),
      years: new Set(),
      featured: false,
    });
  };

  const hasActiveFilters =
    filters.categories.size > 0 ||
    filters.scopes.size > 0 ||
    filters.years.size > 0 ||
    filters.featured;

  return (
    <div className="sticky top-16 md:top-20 z-30 bg-white border-b border-border py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-4">
          {/* Featured Toggle & Clear */}
          <div className="flex items-center justify-between">
            <button
              onClick={toggleFeatured}
              className={cn(
                'px-4 py-2 rounded-full border transition-colors text-sm',
                filters.featured
                  ? 'bg-black text-white border-black'
                  : 'border-border hover:border-black'
              )}
            >
              ⭐ Featured
            </button>

            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-sm text-text-secondary hover:text-text-primary transition-colors"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            <span className="text-xs text-text-secondary self-center mr-2">
              Category:
            </span>
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => toggleFilter('categories', category)}
                className={cn(
                  'px-4 py-2 rounded-full border text-sm transition-colors',
                  filters.categories.has(category)
                    ? 'bg-black text-white border-black'
                    : 'border-border hover:border-black'
                )}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Scope Filters */}
          <div className="flex flex-wrap gap-2">
            <span className="text-xs text-text-secondary self-center mr-2">
              Scope:
            </span>
            {SCOPES.map((scope) => (
              <button
                key={scope}
                onClick={() => toggleFilter('scopes', scope)}
                className={cn(
                  'px-4 py-2 rounded-full border text-sm transition-colors',
                  filters.scopes.has(scope)
                    ? 'bg-black text-white border-black'
                    : 'border-border hover:border-black'
                )}
              >
                {scope}
              </button>
            ))}
          </div>

          {/* Year Filters */}
          <div className="flex flex-wrap gap-2">
            <span className="text-xs text-text-secondary self-center mr-2">
              Year:
            </span>
            {YEARS.map((year) => (
              <button
                key={year}
                onClick={() => toggleFilter('years', year)}
                className={cn(
                  'px-4 py-2 rounded-full border text-sm transition-colors',
                  filters.years.has(year)
                    ? 'bg-black text-white border-black'
                    : 'border-border hover:border-black'
                )}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
