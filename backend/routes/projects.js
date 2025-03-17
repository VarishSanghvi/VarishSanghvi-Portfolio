const express = require("express");
const Project = require("../models/Project");
const router = express.Router();

// Create project with validation
router.post("/", async (req, res) => {
  // Log request headers for debugging
  console.log("Received Headers:", req.headers);

  // Check for a secret API key in the request headers
  const apiKey = req.headers["x-api-key"];
  if (apiKey !== process.env.ADMIN_API_KEY) {
    console.log("Unauthorized access attempt!");
    return res.status(403).json({ error: "Not authorized" });
  }

  try {
    const { title, description, techStack, githubLink, imageUrl } = req.body;

    if (!title || !description || !techStack || !githubLink || !imageUrl) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newProject = new Project({
      title,
      description,
      techStack,
      githubLink,
      imageUrl, // Now required
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (err) {
    console.error("Error creating project:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Get all projects with pagination
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const options = {
      limit: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit),
    };

    const [projects, total] = await Promise.all([
      Project.find({}, null, options),
      Project.countDocuments(),
    ]);

    res.json({
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
      limit: parseInt(limit),
      projects,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single project
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update project
router.put("/:id", async (req, res) => {
  try {
    const { title, description, techStack, githubLink, imageUrl } = req.body;

    if (!title || !description || !techStack || !githubLink || !imageUrl) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json(updatedProject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete project (restricted to admin)
router.delete("/:id", async (req, res) => {
  // Log headers for debugging (optional)
  console.log("Delete Headers:", req.headers);

  // Check for a secret API key in the request headers.
  const apiKey = req.headers["x-api-key"];
  if (apiKey !== process.env.ADMIN_API_KEY) {
    console.log("Unauthorized delete attempt!");
    return res.status(403).json({ error: "Not authorized" });
  }

  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
