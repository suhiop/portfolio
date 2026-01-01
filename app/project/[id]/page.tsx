import { Metadata } from 'next';
import { ModalContent } from '@/components/modal/ModalContent';
import { getProjectById, projects } from '@/lib/data/projects';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const project = getProjectById(params.id);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      images: [project.thumbnail],
      title: project.title,
      description: project.description,
    },
  };
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  const project = getProjectById(params.id);

  if (!project) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <ModalContent project={project} />
    </div>
  );
}
