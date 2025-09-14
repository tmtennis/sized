import Link from 'next/link';

const navigation = [
  { name: 'About', href: '/about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Press', href: '/press' },
  { name: 'Contact', href: '/contact' },
];

export default function Footer() {
  return (
    <footer className="py-4 md:py-6 mt-16">
      <div className="pl-4 md:pl-8 lg:pl-12 pr-4 md:pr-8 lg:pr-12">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 md:gap-8">
          {/* Navigation */}
          <div className="space-y-0">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block font-extrabold text-white text-base md:text-lg transition-colors duration-150 hover:text-neutral-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white leading-tight"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 md:mt-16 pb-[max(env(safe-area-inset-bottom),0.5rem)]">
          <p className="text-[11px] md:text-xs text-neutral-400">© SIZED MMXXV. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  );
}
