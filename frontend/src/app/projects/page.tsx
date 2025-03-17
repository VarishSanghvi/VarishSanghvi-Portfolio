"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
// import { Project } from "../../../../types";
import { Project } from "@/types/types"; // Correct import path

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`);
        const data = await res.json();
        setProjects(data.projects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  if (loading) return <p>Loading projects...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Projects</h1>
      <Link
        href="/dashboard/projects/new"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Add New Project
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {projects.map((project) => (
          <div key={project._id} className="border p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">{project.title}</h2>
            <p className="text-gray-600">{project.description}</p>
            <div className="flex gap-4 mt-2">
              <Link href={`/dashboard/projects/${project._id}/edit`} className="text-blue-600 hover:underline">
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
