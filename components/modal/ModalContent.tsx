'use client';

import Image from 'next/image';
import { Project } from '@/lib/types';
import { useState } from 'react';

interface ModalContentProps {
  project: Project;
  onClose?: () => void;
}

export function ModalContent({ project, onClose }: ModalContentProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="w-full">
      {/* Close Button */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white hover:bg-gray-100 transition-colors z-10"
          aria-label="Close modal"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      )}

      {/* Image Slideshow */}
      {project.images.length > 0 && (
        <div className="relative aspect-video md:aspect-[16/10] overflow-hidden rounded-lg bg-gray-100 mb-6">
          <Image
            src={project.images[currentImageIndex]}
            alt={`${project.title} - Image ${currentImageIndex + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 90vw, 800px"
            quality={90}
          />

          {/* Navigation Arrows */}
          {project.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 hover:bg-white transition-colors"
                aria-label="Previous image"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 hover:bg-white transition-colors"
                aria-label="Next image"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/70 text-white text-sm rounded-full">
                {currentImageIndex + 1} / {project.images.length}
              </div>
            </>
          )}
        </div>
      )}

      {/* Project Details */}
      <div className="space-y-6">
        {/* Title & Year */}
        <div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-2">
            {project.title}
          </h2>
          <p className="text-text-secondary">{project.year}</p>
        </div>

        {/* Category & Scope */}
        <div className="flex flex-wrap gap-2">
          <span className="px-4 py-2 bg-black text-white text-sm rounded-full">
            {project.category}
          </span>
          {project.scope.map((scope) => (
            <span
              key={scope}
              className="px-4 py-2 border border-border text-sm rounded-full"
            >
              {scope}
            </span>
          ))}
          {project.featured && (
            <span className="px-4 py-2 bg-gray-100 text-sm rounded-full">
              ⭐ Featured
            </span>
          )}
        </div>

        {/* Description */}
        <div>
          <h3 className="font-heading text-lg font-semibold mb-2">About</h3>
          <p className="text-text-secondary leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Tags */}
        <div>
          <h3 className="font-heading text-lg font-semibold mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-sm text-text-secondary"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
