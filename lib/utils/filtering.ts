import { Project, FilterState } from '@/lib/types';

export function filterProjects(
  projects: Project[],
  filters: FilterState
): Project[] {
  return projects.filter(project => {
    // Featured filter (if active, only show featured)
    if (filters.featured && !project.featured) return false;

    // Category filter (OR logic within category)
    const categoryMatch = filters.categories.size === 0 ||
                         filters.categories.has(project.category);

    // Scope filter (OR logic within scope)
    const scopeMatch = filters.scopes.size === 0 ||
                      project.scope.some(s => filters.scopes.has(s));

    // Year filter (OR logic within year)
    const yearMatch = filters.years.size === 0 ||
                     filters.years.has(project.year);

    // AND logic between different filter categories
    return categoryMatch && scopeMatch && yearMatch;
  });
}
