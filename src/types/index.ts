export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  longDescription: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  highlights: string[];
  themeColor: string;
}

export interface SkillCategory {
  name: string;
  color: string;
  skills: string[];
}
