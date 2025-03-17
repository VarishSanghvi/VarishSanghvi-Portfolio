/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { fetchProjects } from "@/utils/api";
// deleteProject
import { Project } from "@/types/types";

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const projectList = await fetchProjects();
        setProjects(projectList);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  // const handleDelete = async (id: string) => {
  //   if (!confirm("Are you sure you want to delete this project?")) return;
  //   try {
  //     await deleteProject(id);
  //     setProjects((prev) => prev.filter((proj) => proj._id !== id));
  //   } catch (error) {
  //     alert("Failed to delete project.");
  //   }
  // };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="flex items-center justify-center h-screen bg-gradient-to-r from-white to-gray-100 text-gray-800 font-sans">
        <div className="text-center px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            Hi, I&apos;m Varish Sanghvi
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8">
            A Full-Stack Developer Crafting Timeless Digital Experiences
          </p>
          <Link
            href="#about"
            className="inline-block border border-gray-800 text-gray-800 px-4 sm:px-8 py-2 sm:py-3 rounded-full font-semibold hover:bg-gray-800 hover:text-white transition shadow"
          >
            Learn More About Me
          </Link>
        </div>
      </section>

      {/* About Section */}
      <motion.section
        id="about"
        className="py-20 bg-gradient-to-b from-white to-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        variants={sectionVariants}
      >
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">About Me</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            I&apos;m Varish Sanghvi, a full-stack developer passionate about creating innovative digital solutions. 
            I blend technical expertise with a keen eye for design to build scalable, user-centric web applications.
          </p>
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section
        id="projects"
        className="py-20 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        variants={sectionVariants}
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <h2 className="text-4xl font-bold text-gray-800">Projects</h2>
            <Link
              href="/projects/new"
              className="hidden md:inline-block border border-gray-800 text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-800 hover:text-white transition shadow"
            >
              + Add Project
            </Link>
          </div> */}

          {loading ? (
            <div className="text-center text-lg font-semibold text-gray-700">
              Loading projects...
            </div>
          ) : error ? (
            <div className="text-center text-red-500 text-lg">{error}</div>
          ) : projects.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <div
                  key={project._id}
                  className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition flex flex-col"
                >
                  <h3 className="text-2xl font-semibold text-gray-900">{project.title}</h3>
                  <p className="text-gray-700 mt-3 flex-grow">{project.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.techStack.map((tech, i) => (
                      <span
                        key={`${tech}-${i}`}
                        className="text-sm bg-gray-200 px-3 py-1 rounded-full text-gray-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-800 font-medium hover:underline"
                    >
                      🔗 GitHub Repo
                    </a>
                    {/* <button
                      onClick={() => handleDelete(project._id)}
                      className="border border-gray-800 text-gray-800 px-3 py-1 rounded hover:bg-gray-800 hover:text-white transition"
                    >
                      Delete
                    </button> */}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 text-lg">No projects available</div>
          )}
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        id="contact"
        className="py-20 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
        variants={sectionVariants}
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Get In Touch</h2>
          <p className="text-gray-700 text-lg mb-8">
            Interested in collaborating? Click below to open Gmail with my email prefilled.
          </p>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=varishsanghvi155@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-gray-800 text-gray-800 px-8 py-3 rounded-full font-semibold hover:bg-gray-800 hover:text-white transition shadow"
          >
            Contact Me
          </a>
        </div>
      </motion.section>
    </div>
  );
}
