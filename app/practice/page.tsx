import Container from '@/components/Container';
import SectionHeading from '@/components/SectionHeading';

export default function PracticePage() {
  return (
    <Container>
      <div className="pt-20 md:pt-24 pb-16 md:pb-24">
        <SectionHeading className="mb-12 md:mb-16">Practice</SectionHeading>
        
        <div className="max-w-4xl space-y-12 md:space-y-16">
          <section>
            <p className="text-white text-lg md:text-xl leading-relaxed mb-8">
              Our practice is built on the belief that collectible design exists at the intersection of art, craft, and cultural narrative.
            </p>
            <p className="text-white text-base md:text-lg leading-relaxed">
              We approach each project as an opportunity to explore how objects carry meaning, how spaces shape experience, and how communities form around shared aesthetic values.
            </p>
          </section>

          <section>
            <h2 className="text-white font-black text-xl md:text-2xl uppercase tracking-tight mb-8">Core Principles</h2>
            <div className="space-y-10">
              <div>
                <h3 className="text-white font-black text-base md:text-lg uppercase tracking-tight mb-3">Context-Driven Curation</h3>
                <p className="text-white text-sm md:text-base leading-relaxed">
                  Every exhibition begins with a deep understanding of place. We believe that the relationship between object and environment is fundamental to creating meaningful encounters with design.
                </p>
              </div>
              
              <div>
                <h3 className="text-white font-black text-base md:text-lg uppercase tracking-tight mb-3">Temporal Engagement</h3>
                <p className="text-white text-sm md:text-base leading-relaxed">
                  Our nomadic approach allows us to respond to moments of opportunity, creating exhibitions that feel urgent and necessary rather than permanent or institutional.
                </p>
              </div>
              
              <div>
                <h3 className="text-white font-black text-base md:text-lg uppercase tracking-tight mb-3">Community Building</h3>
                <p className="text-white text-sm md:text-base leading-relaxed">
                  Each activation serves as a gathering point for diverse communities, fostering connections between makers, collectors, and cultural enthusiasts.
                </p>
              </div>
              
              <div>
                <h3 className="text-white font-black text-base md:text-lg uppercase tracking-tight mb-3">Cultural Advocacy</h3>
                <p className="text-white text-sm md:text-base leading-relaxed">
                  We champion emerging voices while honoring established traditions, creating platforms that support the evolution of contemporary design culture.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-white font-black text-xl md:text-2xl uppercase tracking-tight mb-8">Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div>
                <h3 className="text-white font-black text-sm md:text-base uppercase tracking-tight mb-3">Research & Discovery</h3>
                <p className="text-white text-sm md:text-base leading-relaxed">
                  Identifying spaces, makers, and cultural moments that align with our vision for meaningful design presentation.
                </p>
              </div>
              
              <div>
                <h3 className="text-white font-black text-sm md:text-base uppercase tracking-tight mb-3">Spatial Analysis</h3>
                <p className="text-white text-sm md:text-base leading-relaxed">
                  Understanding the architectural, historical, and social context of each location to inform curatorial decisions.
                </p>
              </div>
              
              <div>
                <h3 className="text-white font-black text-sm md:text-base uppercase tracking-tight mb-3">Collaborative Curation</h3>
                <p className="text-white text-sm md:text-base leading-relaxed">
                  Working closely with designers, artists, and spatial practitioners to develop exhibitions that reflect shared values.
                </p>
              </div>
              
              <div>
                <h3 className="text-white font-black text-sm md:text-base uppercase tracking-tight mb-3">Cultural Activation</h3>
                <p className="text-white text-sm md:text-base leading-relaxed">
                  Creating experiences that extend beyond the exhibition itself to foster ongoing cultural dialogue and community engagement.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Container>
  );
}
