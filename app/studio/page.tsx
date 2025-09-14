import Container from '@/components/Container';
import SectionHeading from '@/components/SectionHeading';

export default function StudioPage() {
  return (
    <Container>
      <div className="pt-20 md:pt-24 pb-16 md:pb-24">
        <SectionHeading className="mb-12 md:mb-16">Studio</SectionHeading>
        
        <div className="max-w-4xl space-y-12 md:space-y-16">
          <section>
            <p className="text-white text-lg md:text-xl leading-relaxed mb-8">
              SIZED operates as a nomadic cultural studio, identifying and activating distinctive spaces to create meaningful encounters between art, design, and community.
            </p>
            <p className="text-white text-base md:text-lg leading-relaxed">
              Our approach centers on spatial storytelling, where each location becomes a canvas for exploring the evolving role of collectible design in contemporary culture.
            </p>
          </section>

          <section>
            <h2 className="text-white font-black text-xl md:text-2xl uppercase tracking-tight mb-6">Methodology</h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-white font-black text-sm md:text-base uppercase tracking-tight mb-2">Site Analysis</h3>
                <p className="text-white text-sm md:text-base leading-relaxed">
                  We begin each project by deeply understanding the historical, architectural, and cultural context of a space, allowing us to craft exhibitions that respond to and enhance the existing narrative.
                </p>
              </div>
              <div>
                <h3 className="text-white font-black text-sm md:text-base uppercase tracking-tight mb-2">Curatorial Vision</h3>
                <p className="text-white text-sm md:text-base leading-relaxed">
                  Our exhibitions create dialogue between objects, space, and audience, presenting collectible design as both cultural artifact and living practice.
                </p>
              </div>
              <div>
                <h3 className="text-white font-black text-sm md:text-base uppercase tracking-tight mb-2">Community Engagement</h3>
                <p className="text-white text-sm md:text-base leading-relaxed">
                  Each activation serves as a catalyst for bringing together diverse creative communities, fostering connections between artists, designers, collectors, and cultural enthusiasts.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-white font-black text-xl md:text-2xl uppercase tracking-tight mb-6">Collaborations</h2>
            <p className="text-white text-base md:text-lg leading-relaxed mb-6">
              We work with a network of established and emerging talents across disciplines, from furniture designers and ceramicists to architects and spatial designers.
            </p>
            <p className="text-white text-base md:text-lg leading-relaxed">
              Our collaborative approach ensures each project benefits from diverse perspectives while maintaining a cohesive vision that reflects SIZED&apos;s commitment to excellence and innovation.
            </p>
          </section>
        </div>
      </div>
    </Container>
  );
}
