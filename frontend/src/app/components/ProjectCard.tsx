// app/components/ProjectCard.tsx
import { Project } from "@/types/types";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="p-6 border rounded-lg shadow hover:shadow-lg transition-shadow bg-white">
      <h3 className="text-xl font-semibold">{project.title}</h3>
      <p className="text-gray-600 mt-2">{project.description}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <span key={tech} className="text-sm bg-gray-100 px-2 py-1 rounded-full">
            {tech}
          </span>
        ))}
      </div>
      <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-blue-600 hover:underline">
        GitHub Repo
      </a>
    </div>
  );
}
