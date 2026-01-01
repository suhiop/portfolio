'use client';

import { useState, useMemo } from 'react';
import { Gallery } from '@/components/gallery/Gallery';
import { FilterBar } from '@/components/gallery/FilterBar';
import { projects } from '@/lib/data/projects';
import { filterProjects } from '@/lib/utils/filtering';
import { FilterState } from '@/lib/types';

export default function HomePage() {
  const [filters, setFilters] = useState<FilterState>({
    categories: new Set(),
    scopes: new Set(),
    years: new Set(),
    featured: false,
  });

  const filteredProjects = useMemo(
    () => filterProjects(projects, filters),
    [filters]
  );

  return (
    <div className="min-h-screen">
      <FilterBar filters={filters} onFilterChange={setFilters} />
      <Gallery projects={filteredProjects} />
    </div>
  );
}
