import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/SiteShell";
import { ProjectDetail } from "@/components/projects/ProjectDetail";
import { getProject, projectsWithPage } from "@/data/projects";
import { openGraphBase, socialImage, titleTemplate } from "../../shared-metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return projectsWithPage.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(props: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) return {};

  const title = project.title.es;
  const description = project.summary.es;
  const url = `/projects/${project.slug}`;
  // openGraph/twitter replace the root ones entirely (shallow merge), so repeat the shared fields.
  const socialTitle = titleTemplate.replace("%s", title);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { ...openGraphBase, title: socialTitle, description, url, images: [socialImage] },
    twitter: { card: "summary_large_image", title: socialTitle, description, images: [socialImage] },
  };
}

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <SiteShell>
      <ProjectDetail project={project} />
    </SiteShell>
  );
}
