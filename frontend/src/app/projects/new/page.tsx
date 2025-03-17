"use client";

import { useState } from "react";
import Link from "next/link";
import { createProject } from "@/utils/api";

export default function NewProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [techStack, setTechStack] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const techsArray = techStack.split(",").map((tech) => tech.trim());
      const project = {
        title,
        description,
        techStack: techsArray,
        githubLink,
        imageUrl, // Now required
      };
      const data = await createProject(project);
      setMessage(`Project "${data.title}" created successfully!`);

      // Clear form fields
      setTitle("");
      setDescription("");
      setTechStack("");
      setGithubLink("");
      setImageUrl("");
    } catch (error) {
      setMessage("Failed to create project.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      {/* Back Button */}
      <div>
        <Link
          href="/"
          className="inline-block border border-gray-800 text-gray-800 px-4 py-2 rounded hover:bg-gray-800 hover:text-white transition"
        >
          ← Back to Home
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gray-800">Add New Project</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-gray-800"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-gray-800"
          required
        />
        <input
          type="text"
          placeholder="Tech Stack (comma separated)"
          value={techStack}
          onChange={(e) => setTechStack(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-gray-800"
          required
        />
        <input
          type="url"
          placeholder="GitHub Link"
          value={githubLink}
          onChange={(e) => setGithubLink(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-gray-800"
          required
        />
        <input
          type="url"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-gray-800"
          required
        />
        <button
          type="submit"
          className="w-full border border-gray-800 text-gray-800 px-4 py-3 rounded hover:bg-gray-800 hover:text-white transition"
        >
          Create Project
        </button>
      </form>
      {message && <p className="mt-4 text-center text-gray-800">{message}</p>}
    </div>
  );
}
