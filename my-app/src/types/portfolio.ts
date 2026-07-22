export type Skill = {
  name: string;
  description: string;
  level: number;
  years?: string;
  category: string;
};

export type Project = {
  slug: string;
  featured?: boolean;
  name: string;
  description: string;
  technologies: string[];
  demo: string;
};
