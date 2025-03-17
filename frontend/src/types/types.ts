export interface Project {
  _id: string;
  title: string;
  description: string;
  techStack: string[];
  githubLink: string;
  imageUrl?: string;
}