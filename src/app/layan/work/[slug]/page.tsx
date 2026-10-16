import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, nextProject, projects } from "@/lib/layan-projects";
import { ProjectView } from "@/components/layan/project-view";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title.en} — ${project.location.en}`,
    description: project.summary.en,
    alternates: { canonical: `/layan/work/${project.slug}` },
    openGraph: {
      title: `${project.title.en} — Layan Interiors`,
      description: project.summary.en,
      images: [{ url: project.images[0] }],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return <ProjectView project={project} next={nextProject(slug)} />;
}
