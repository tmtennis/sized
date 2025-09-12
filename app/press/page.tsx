import Container from '@/components/Container';
import SectionHeading from '@/components/SectionHeading';

const pressItems = [
  {
    title: 'SIZED Launches Cultural Platform for Collectible Design',
    publication: 'Dezeen',
    date: 'March 2024',
    excerpt: 'Alexander May introduces SIZED, a nomadic curatorial platform dedicated to staging exhibitions in distinctive architectural spaces.',
  },
  {
    title: 'The Future of Pop-Up Exhibitions',
    publication: 'Frame Magazine',
    date: 'February 2024',
    excerpt: 'How temporary spaces are reshaping the relationship between collectible design and cultural engagement.',
  },
  {
    title: 'Nomadic Curation in Contemporary Design',
    publication: 'Wallpaper*',
    date: 'January 2024',
    excerpt: 'SIZED\'s approach to activating historic and underutilized spaces for design presentation.',
  },
];

const awards = [
  {
    title: 'Best Cultural Activation',
    organization: 'Design & Culture Awards',
    year: '2024',
    project: 'Material Conversations Exhibition',
  },
  {
    title: 'Emerging Curatorial Practice',
    organization: 'Brooklyn Arts Council',
    year: '2023',
    project: 'Community-Centered Design Initiative',
  },
];

export default function PressPage() {
  return (
    <Container>
      <div className="pt-20 md:pt-24 pb-16 md:pb-24">
        <SectionHeading className="mb-12 md:mb-16">Press</SectionHeading>
        
  <div className="space-y-16 md:space-y-20 text-xs">
          {/* Press Coverage */}
          <section>
            <h2 className="text-white font-black uppercase tracking-tight mb-8 text-sm">Coverage</h2>
            <div className="space-y-12">
              {pressItems.map((item, index) => (
                <article key={index} className="border-b border-white/10 pb-8 last:border-b-0">
                  <div className="mb-3">
                    <span className="text-white font-normal opacity-60">
                      {item.publication} — {item.date}
                    </span>
                  </div>
                  <h3 className="text-white font-black tracking-tight mb-4 text-xs">
                    {item.title}
                  </h3>
                  <p className="text-white leading-relaxed">
                    {item.excerpt}
                  </p>
                </article>
              ))}
            </div>
          </section>

          {/* Awards & Recognition */}
          <section>
            <h2 className="text-white font-black uppercase tracking-tight mb-8 text-sm">Recognition</h2>
            <div className="space-y-8">
              {awards.map((award, index) => (
                <div key={index} className="border-b border-white/10 pb-6 last:border-b-0">
                  <div className="mb-2">
                    <span className="text-white font-normal opacity-60">
                      {award.organization} — {award.year}
                    </span>
                  </div>
                  <h3 className="text-white font-black uppercase tracking-tight mb-2 text-xs">
                    {award.title}
                  </h3>
                  <p className="text-white leading-relaxed opacity-80">
                    {award.project}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Media Kit */}
          <section>
            <h2 className="text-white font-black uppercase tracking-tight mb-8 text-sm">Media Kit</h2>
            <div className="max-w-3xl space-y-6">
              <p className="text-white leading-relaxed">
                For press inquiries, high-resolution images, or additional information about SIZED, please contact our media team.
              </p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-white font-black uppercase tracking-tight mb-2 text-xs">Press Contact</h3>
                  <p className="text-white leading-relaxed">
                    press@sized.studio
                  </p>
                </div>
                
                <div>
                  <h3 className="text-white font-black uppercase tracking-tight mb-2 text-xs">Download Materials</h3>
                  <div className="space-y-2">
                    <p className="text-white leading-relaxed opacity-80">
                      Brand Guidelines (PDF)
                    </p>
                    <p className="text-white leading-relaxed opacity-80">
                      High-Resolution Logos
                    </p>
                    <p className="text-white leading-relaxed opacity-80">
                      Exhibition Photography
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* About SIZED */}
          <section>
            <h2 className="text-white font-black uppercase tracking-tight mb-8 text-sm">About SIZED</h2>
            <div className="max-w-3xl">
              <p className="text-white leading-relaxed mb-6">
                SIZED is a curatorial platform and cultural studio founded by Alexander May. Operating nomadically, SIZED activates distinctive spaces to present collectible design through thoughtfully conceived exhibitions and cultural experiences.
              </p>
              <p className="text-white leading-relaxed">
                The platform connects brands, artists, and creative communities through immersive environments that explore the evolving role of collectible design in contemporary culture.
              </p>
            </div>
          </section>
        </div>
      </div>
    </Container>
  );
}
