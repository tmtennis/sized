import HeroSlideshow from '@/components/HeroSlideshow';

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <div className="pt-20 md:pt-24">
        {/* Content Section */}
        <div className="px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            {/* Hero Slideshow: subtle crossfade, no controls */}
            <div className="mb-8">
              <HeroSlideshow
                images={[
                  { src: '/home-page/home-page-hero.jpg', alt: 'SIZED Exhibition 1' },
                  { src: '/home-page/home-page-hero-2.jpeg', alt: 'SIZED Exhibition 2' },
                  { src: '/home-page/home-page-hero-3.jpeg', alt: 'SIZED Exhibition 3' },
                ]}
                intervalMs={3000}
              />
            </div>

            {/* Bottom Text - Below Image */}
            <div className="pb-16">
              <div className="max-w-lg">
                <p className="text-white text-xs md:text-sm leading-tight font-normal">
                  <span className="font-black">SIZED</span> creates temporary worlds that function like stages, where objects step forward as protagonists and spaces unfold as stories. Each project invites audiences into a fleeting theatre of possibility, transforming how we see, feel, and inhabit the environments around us.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
