import Image from 'next/image';
import { promises as fs } from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ProjectGallery from '@/components/ProjectGallery';

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

async function getAllProjects(): Promise<Project[]> {
  try {
    const filePath = path.join(process.cwd(), 'data', 'sized-projects.csv');
    const fileContents = await fs.readFile(filePath, 'utf8');
    
    const lines = fileContents.split('\n').filter(line => line.trim());
    const projects: Project[] = [];
    
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      
      const match = line.match(/^([^,]+),(\d{1,2}\/\d{1,2}\/\d{4}),/);
      if (match) {
        const projectName = match[1];
        const date = match[2];
        const mapping = projectMapping[projectName];
        
        if (mapping) {
          // Extract description from the line
          const descriptionMatch = line.match(/^[^,]+,[^,]+,"(.+)"$/);
          const description = descriptionMatch ? descriptionMatch[1].replace(/""/g, '"') : '';
          
          projects.push({
            project: projectName,
            date: date,
            description: description,
            heroImage: mapping.heroImage,
            title: mapping.title
          });
        }
      }
    }
    
    return projects;
  } catch (error) {
    console.error('Error reading projects:', error);
    return [];
  }
}

async function getProject(slug: string): Promise<Project | null> {
  try {
    const filePath = path.join(process.cwd(), 'data', 'sized-projects.csv');
    const fileContents = await fs.readFile(filePath, 'utf8');
    
    const lines = fileContents.split('\n').filter(line => line.trim());
    
    // Find the project in the CSV
    const projectData: Partial<Project> = {};
    let description = '';
    let isProjectFound = false;
    let isCollectingDescription = false;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Check if this line starts with our project slug
      if (line.startsWith(slug + ',')) {
        const match = line.match(/^([^,]+),(\d{1,2}\/\d{1,2}\/\d{4}),(.*)$/);
        if (match) {
          projectData.project = match[1];
          projectData.date = match[2];
          description = match[3] || '';
          isProjectFound = true;
          isCollectingDescription = true;
          continue;
        }
      }
      
      // If we found our project and we're collecting description
      if (isProjectFound && isCollectingDescription) {
        // Check if this line starts a new project (has the pattern: word,date,)
        const nextProjectMatch = line.match(/^[^,]+,\d{1,2}\/\d{1,2}\/\d{4},/);
        if (nextProjectMatch) {
          // We've hit the next project, stop collecting
          break;
        }
        
        // Continue collecting description
        description += ' ' + line;
      }
    }
    
    if (!isProjectFound) return null;
    
    const mapping = projectMapping[slug];
    if (!mapping) return null;
    
    return {
      project: slug,
      date: projectData.date || '',
      description: description.replace(/"/g, '').trim(),
      heroImage: mapping.heroImage,
      title: mapping.title
    };
  } catch (error) {
    console.error('Error reading project data:', error);
    return null;
  }
}

async function getProjectImages(slug: string): Promise<string[]> {
  try {
    const imagesDir = path.join(process.cwd(), 'public', 'sized-projects', 'project-gallery-images', slug);
    const files = await fs.readdir(imagesDir);
    
    // Filter out .DS_Store and other non-image files, then sort
    const imageFiles = files
      .filter(file => file.match(/\.(jpg|jpeg|png|webp)$/i))
      .sort((a, b) => {
        // Extract number from filename for proper sorting
        const aNum = parseInt(a.match(/-(\d+)\./)?.[1] || '0');
        const bNum = parseInt(b.match(/-(\d+)\./)?.[1] || '0');
        return aNum - bNum;
      });
    
    return imageFiles.map(file => `/sized-projects/project-gallery-images/${slug}/${file}`);
  } catch (error) {
    console.error('Error reading project images:', error);
    return [];
  }
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await getProject(params.slug);
  const images = await getProjectImages(params.slug);
  
  if (!project) {
    notFound();
  }

  // Get all projects to find the next one
  const allProjects = await getAllProjects();
  const currentIndex = allProjects.findIndex(p => p.project === params.slug);
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length]; // Loop back to first if at end
  
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Back Navigation */}
      <div className="fixed bottom-8 right-8 z-50">
        <Link 
          href="/projects"
          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-300 text-sm font-medium"
        >
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
            className="rotate-180"
          >
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
          BACK TO PROJECTS
        </Link>
      </div>
      
      {/* Hero Image */}
      <div className="relative h-screen w-full">
        <Image
          src={project.heroImage}
          alt={project.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center justify-start p-8 md:p-16 lg:p-24">
          <div className="max-w-4xl text-white">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight">
              {project.title}
            </h1>
            <div className="text-lg md:text-xl font-medium opacity-80">
              {new Date(project.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long' 
              })}
            </div>
          </div>
        </div>
      </div>
      
      {/* Project Description */}
      <div className="px-6 md:px-12 py-12 md:py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-sm md:text-base leading-loose text-white/70 font-light tracking-wide">
            {project.description.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-6 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
      
      {/* Project Gallery */}
      <ProjectGallery images={images} projectTitle={project.title} />
      
      {/* View Next Project */}
      <div className="px-6 md:px-12 py-12 md:py-16 border-t border-white/10">
        <div className="max-w-3xl mx-auto">
          <Link 
            href={`/projects/${nextProject.project}`}
            className="group flex items-center justify-between p-6 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-500 rounded-sm"
          >
            <div className="flex-grow">
              <div className="text-xs text-white/60 uppercase tracking-wider font-medium mb-2">
                NEXT PROJECT
              </div>
              <div className="text-lg md:text-xl font-black text-white group-hover:text-white/90 transition-colors duration-300">
                {nextProject.title}
              </div>
              <div className="text-sm text-white/70 mt-1">
                {new Date(nextProject.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long' 
                })}
              </div>
            </div>
            <div className="ml-6 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
