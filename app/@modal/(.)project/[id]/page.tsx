'use client';

import { useRouter } from 'next/navigation';
import { useEffect, use } from 'react';
import { motion } from 'framer-motion';
import { ModalContent } from '@/components/modal/ModalContent';
import { getProjectById } from '@/lib/data/projects';

export default function ProjectModal({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const project = getProjectById(id);

  useEffect(() => {
    // ESC key handler
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') router.back();
    };
    window.addEventListener('keydown', handleEsc);

    // Prevent body scroll
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [router]);

  if (!project) {
    return null;
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      router.back();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="relative max-w-4xl max-h-[90vh] w-full overflow-auto bg-white p-6 md:p-8 rounded-lg shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`modal-title-${project.id}`}
      >
        <ModalContent project={project} onClose={() => router.back()} />
      </motion.div>
    </motion.div>
  );
}
