import { Project } from '@/lib/types';
import { ProjectCard } from './ProjectCard';

interface GalleryProps {
  projects: Project[];
}

export function Gallery({ projects }: GalleryProps) {
  if (projects.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-text-secondary text-lg">
          No projects found matching your filters.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
