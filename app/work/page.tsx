import Container from '@/components/Container';
import SectionHeading from '@/components/SectionHeading';

const exhibitions = [
  {
    title: 'Material Conversations',
    location: 'Historic Brownstone, Brooklyn',
    year: '2024',
    description: 'A dialogue between contemporary ceramics and mid-century furniture in an intimate residential setting.',
  },
  {
    title: 'Spatial Narratives',
    location: 'Former Industrial Space, Queens',
    year: '2024',
    description: 'Exploring the relationship between architectural heritage and contemporary design interventions.',
  },
  {
    title: 'Collectible Futures',
    location: 'Pop-up Gallery, Manhattan',
    year: '2023',
    description: 'Presenting emerging designers alongside established names in a curated marketplace experience.',
  },
  {
    title: 'Cultural Commons',
    location: 'Community Center, Brooklyn',
    year: '2023',
    description: 'A collaborative exhibition bringing together local artists and international design talents.',
  },
];

export default function WorkPage() {
  return (
    <Container>
      <div className="pt-20 md:pt-24 pb-16 md:pb-24">
        <SectionHeading className="mb-12 md:mb-16">Work</SectionHeading>
        
        <div className="space-y-12 md:space-y-16">
          <p className="text-white text-lg md:text-xl leading-relaxed max-w-3xl">
            A selection of recent exhibitions, installations, and cultural activations that demonstrate our commitment to presenting collectible design in meaningful contexts.
          </p>

          <div className="space-y-16 md:space-y-20">
            {exhibitions.map((exhibition, index) => (
              <article key={index} className="border-t border-white/10 pt-12 md:pt-16 first:border-t-0 first:pt-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
                  <div className="lg:col-span-2">
                    <div className="mb-4">
                      <span className="text-white text-sm font-normal opacity-60">
                        {exhibition.year} — {exhibition.location}
                      </span>
                    </div>
                    <h3 className="text-white font-black text-xl md:text-2xl uppercase tracking-tight mb-4">
                      {exhibition.title}
                    </h3>
                    <p className="text-white text-base md:text-lg leading-relaxed">
                      {exhibition.description}
                    </p>
                  </div>
                  
                  <div className="lg:col-span-1">
                    <div className="aspect-square bg-white/5 rounded-sm"></div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <section className="border-t border-white/10 pt-16 md:pt-20">
            <h2 className="text-white font-black text-xl md:text-2xl uppercase tracking-tight mb-8">Upcoming</h2>
            <p className="text-white text-base md:text-lg leading-relaxed mb-6">
              We are currently developing several new exhibitions for 2025, including collaborations with emerging furniture designers and established ceramics studios.
            </p>
            <p className="text-white text-sm md:text-base leading-relaxed opacity-60">
              Stay updated on upcoming activations through our contact channels.
            </p>
          </section>
        </div>
      </div>
    </Container>
  );
}
