import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <div className="pt-20 md:pt-24">
        {/* Content Section */}
        <div className="px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            {/* Hero Image with Overlay Effect */}
            <div className="mb-8 relative group">
              <Image
                src="/home-page/home-page-hero.jpg"
                alt="SIZED Exhibition"
                width={1200}
                height={800}
                className="w-full h-auto transition-opacity duration-300"
                sizes="(max-width: 768px) 100vw, 1200px"
                priority
              />
              {/* Dark Overlay that disappears on hover */}
              <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 group-hover:opacity-0 pointer-events-none"></div>
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
