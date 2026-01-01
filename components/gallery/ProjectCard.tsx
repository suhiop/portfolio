import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/project/${project.id}`}
      className="group block"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100 mb-4">
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority={project.featured}
          quality={85}
        />

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 left-4 px-3 py-1 bg-black text-white text-xs rounded-full">
            Featured
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
      </div>

      {/* Project Info */}
      <div className="space-y-2">
        <h3 className="font-heading text-lg md:text-xl font-semibold text-text-primary group-hover:opacity-70 transition-opacity">
          {project.title}
        </h3>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs md:text-sm text-text-secondary"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Category & Year */}
        <div className="flex items-center gap-2 text-xs text-text-secondary">
          <span>{project.category}</span>
          <span>•</span>
          <span>{project.year}</span>
        </div>
      </div>
    </Link>
  );
}
