import Container from '@/components/Container';
import SectionHeading from '@/components/SectionHeading';

const projects = [
  {
    title: 'Cultural Activations',
    description: 'Site-specific exhibitions that transform architectural spaces into cultural anchors.',
    year: '2024',
  },
  {
    title: 'Brand Collaborations',
    description: 'Strategic partnerships bridging commerce, creativity, and cultural engagement.',
    year: '2023',
  },
  {
    title: 'Collectible Design',
    description: 'Curated presentations exploring the evolving role of objects in contemporary culture.',
    year: '2023',
  },
  {
    title: 'Spatial Storytelling',
    description: 'Immersive environments that foreground context, placement, and narrative.',
    year: '2022',
  },
];

export default function ProjectsPage() {
  return (
    <Container>
      <div className="pt-20 md:pt-24 pb-16 md:pb-24">
        <SectionHeading className="mb-12 md:mb-16">Projects</SectionHeading>
        
        <div className="space-y-12 md:space-y-16">
          <p className="text-white text-lg md:text-xl leading-relaxed max-w-3xl">
            A selection of cultural activations, brand collaborations, and curatorial projects that demonstrate our approach to spatial storytelling and cultural engagement.
          </p>

          <div className="grid gap-8 md:gap-12">
            {projects.map((project, index) => (
              <div key={index} className="border-t border-white/20 pt-8">
                <div className="grid md:grid-cols-4 gap-4 md:gap-8">
                  <div className="md:col-span-1">
                    <span className="text-white text-sm font-normal opacity-60">
                      {project.year}
                    </span>
                  </div>
                  <div className="md:col-span-2">
                    <h3 className="text-white font-black text-xl md:text-2xl uppercase tracking-tight mb-4">
                      {project.title}
                    </h3>
                    <p className="text-white text-base md:text-lg leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
