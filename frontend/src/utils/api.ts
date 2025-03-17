import { Project } from "@/types/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

/** 🔹 Fetch all projects (GET) */
export async function fetchProjects(): Promise<Project[]> {
  const response = await fetch(`${API_URL}/api/projects`);
  if (!response.ok) throw new Error("Failed to fetch projects");
  
  const data = await response.json();
  console.log("API Response:", data);
  
  return Array.isArray(data) ? data : data.projects || [];
}

/** 🔹 Fetch a single project by ID (GET) */
export async function fetchProjectById(id: string): Promise<Project> {
  const response = await fetch(`${API_URL}/api/projects/${id}`);
  if (!response.ok) throw new Error("Project not found");
  return await response.json();
}

/** 🔹 Create a new project (POST) */
export const createProject = async (project: Omit<Project, "_id">) => {
  try {
    const response = await fetch(`${API_URL}/api/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_ADMIN_API_KEY || "",
      },
      body: JSON.stringify(project),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${await response.text()}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Create project failed:", error);
    throw error;
  }
};

/** 🔹 Update an existing project (PUT) */
export async function updateProject(id: string, project: Partial<Project>) {
  const response = await fetch(`${API_URL}/api/projects/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(project),
  });
  if (!response.ok) throw new Error("Failed to update project");
  return await response.json();
}

/** 🔹 Delete a project (DELETE) */
export async function deleteProject(id: string) {
  const response = await fetch(`${API_URL}/api/projects/${id}`, {
    method: "DELETE",
    headers: {
      "x-api-key": process.env.NEXT_PUBLIC_ADMIN_API_KEY || ""
    }
  });
  if (!response.ok) throw new Error("Failed to delete project");
}
