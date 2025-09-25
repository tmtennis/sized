'use client';

import Image from 'next/image';
import Link from 'next/link';

interface Project {
  project: string;
  date: string;
  description: string;
  heroImage: string;
  title: string;
}

interface ProjectsClientProps {
  projects: Project[];
}

export default function ProjectsClient({ projects }: ProjectsClientProps) {
  const handleHover = (index: number) => {
    const element = document.getElementById(`project-${index}`);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <div className="bg-black scroll-smooth snap-y snap-mandatory overflow-y-scroll">
      {projects.map((project, index) => (
        <Link 
          href={`/projects/${project.project}`}
          key={project.project}
        >
          <div 
            id={`project-${index}`}
            className="relative h-screen w-full snap-start snap-always group cursor-pointer"
            onMouseEnter={() => handleHover(index)}
          >
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            priority={index < 2}
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50 md:bg-black/80 md:group-hover:bg-black/0 transition-all duration-500 ease-out" />
          
          {/* Project Information Overlay */}
          <div className="absolute top-20 left-8 md:top-24 md:left-12 lg:top-28 lg:left-16">
            <div className="text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 ease-out">
              {/* Project Title */}
              <h1 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-black mb-2 tracking-tight whitespace-nowrap">
                {project.title}
              </h1>
              
              {/* Project Date */}
              <div className="text-sm md:text-base font-medium opacity-80">
                {new Date(project.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long' 
                })}
              </div>
            </div>
          </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
