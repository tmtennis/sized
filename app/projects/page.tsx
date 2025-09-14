import { promises as fs } from 'fs';
import path from 'path';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore SIZED's curatorial projects and exhibitions, featuring collaborations with contemporary artists, designers, and cultural institutions worldwide.",
  openGraph: {
    title: "Projects - SIZED",
    description: "Explore SIZED's curatorial projects and exhibitions, featuring collaborations with contemporary artists, designers, and cultural institutions worldwide.",
  },
};

interface Project {
  project: string;
  date: string;
  description: string;
  heroImage: string;
  title: string;
}

const projectMapping: Record<string, { heroImage: string; title: string }> = {
  '619-north-western-avenue': {
    heroImage: '/sized-projects/project-heros/619-north-western-avenue.jpg',
    title: '619 NORTH WESTERN AVENUE'
  },
  'antimatiere': {
    heroImage: '/sized-projects/project-heros/antimatiere.jpg',
    title: 'ANTIMATIÈRE'
  },
  'antonio-forteleoni': {
    heroImage: '/sized-projects/project-heros/antonio-forteleoni.jpg',
    title: 'ANTONIO FORTELEONI'
  },
  'dries-van-noten': {
    heroImage: '/sized-projects/project-heros/dries-van-noten.jpg',
    title: 'DRIES VAN NOTEN'
  },
  'frieze-los-angeles': {
    heroImage: '/sized-projects/project-heros/frieze-los-angeles.jpg',
    title: 'FRIEZE LOS ANGELES'
  },
  'industrialism': {
    heroImage: '/sized-projects/project-heros/industrialism.png',
    title: 'INDUSTRIALISM'
  },
  'vessels': {
    heroImage: '/sized-projects/project-heros/vessels.jpg',
    title: 'VESSELS'
  }
};

async function getProjects(): Promise<Project[]> {
  const filePath = path.join(process.cwd(), 'data', 'sized-projects.csv');
  const fileContents = await fs.readFile(filePath, 'utf8');
  
  const lines = fileContents.split('\n').filter(line => line.trim());
  const projects: Project[] = [];
  
  for (let i = 1; i < lines.length; i++) { // Skip header
    const line = lines[i].trim();
    
    // Look for lines that start with a project name (no quotes, followed by comma and date)
    const match = line.match(/^([^,]+),(\d{1,2}\/\d{1,2}\/\d{4}),/);
    if (match) {
      const projectName = match[1];
      const date = match[2];
      const mapping = projectMapping[projectName];
      
      if (mapping) {
        projects.push({
          project: projectName,
          date: date,
          description: '', // We're not using description anymore
          heroImage: mapping.heroImage,
          title: mapping.title
        });
      }
    }
  }
  
  return projects;
}

import ProjectsClient from '@/components/ProjectsClient';

export default async function ProjectsPage() {
  const projects = await getProjects();
  
  return <ProjectsClient projects={projects} />;
}
