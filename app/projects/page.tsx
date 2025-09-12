import Image from 'next/image';

export default function ProjectsPage() {
  return (
    <div className="relative min-h-screen bg-black">
      <Image
        src="/home-page/home-page-hero.jpg"
        alt="SIZED Project Hero"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
    </div>
  );
}
