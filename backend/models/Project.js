const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  techStack: { type: [String], required: true },
  githubLink: { type: String, required: true },
  imageUrl: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Project", ProjectSchema);
