import Container from '@/components/Container';
import SectionHeading from '@/components/SectionHeading';

export default function AboutPage() {
  return (
    <Container>
      <div className="pt-20 md:pt-24 pb-16 md:pb-24">
        <SectionHeading className="mb-12 md:mb-16">About SIZED</SectionHeading>
        
        <div className="max-w-4xl space-y-12 md:space-y-16">
          <section>
            <p className="text-white text-lg md:text-xl leading-relaxed mb-8">
              Founded by Alexander May, SIZED is a curatorial platform and cultural studio dedicated to staging exhibitions and presenting collectible design.
            </p>
            <p className="text-white text-base md:text-lg leading-relaxed">
              Operating at the intersection of art, design, and commerce, SIZED connects brands, artists, and creative communities through thoughtfully conceived environments and immersive experiences.
            </p>
          </section>

          <section>
            <h2 className="text-white font-black text-xl md:text-2xl uppercase tracking-tight mb-6">Philosophy</h2>
            <p className="text-white text-base md:text-lg leading-relaxed mb-6">
              Working nomadically, SIZED identifies and activates distinctive real estate, historic properties, vacant retail spaces, and architectural landmarks, to create site-specific exhibitions and brand moments that resonate culturally and commercially.
            </p>
            <p className="text-white text-base md:text-lg leading-relaxed">
              Each project foregrounds considered curation and spatial storytelling, with a focus on context, placement, and the evolving role of collectible design in contemporary culture.
            </p>
          </section>

          <section>
            <h2 className="text-white font-black text-xl md:text-2xl uppercase tracking-tight mb-6">History</h2>
            <p className="text-white text-base md:text-lg leading-relaxed mb-6">
              From 2022 to 2024, SIZED operated SIZED STUDIO, a converted 7,000-square-foot theater in Los Angeles that served as a cultural anchor for multidisciplinary exhibitions, collaborations, and brand partnerships.
            </p>
            <p className="text-white text-base md:text-lg leading-relaxed">
              Today, SIZED continues to curate exhibitions and produce cultural activations that bring together innovative brands, influential creatives, and architectural spaces, shaping meaningful narratives around art, design, and objects of lasting value.
            </p>
          </section>
        </div>
      </div>
    </Container>
  );
}
