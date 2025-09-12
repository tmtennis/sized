'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const navigation = [
  { name: 'About', href: '/about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Press', href: '/press' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
        setMobileMenuOpen(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', controlNavbar, { passive: true });
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 border-b border-neutral-700 h-16 transition-transform duration-300 ease-in-out bg-black ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className="relative h-16">
        {/* Mobile brand (compact) */}
        <Link
          href="/"
          className="absolute left-4 top-1/2 -translate-y-1/2 md:hidden font-black text-white text-sm leading-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white z-10"
          aria-label="SIZED home"
        >
          SIZED
        </Link>
        {/* Desktop tagline */}
        <Link
          href="/"
          className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 font-normal text-white text-xs leading-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white z-10"
        >
          <span className="font-extrabold">SIZED</span> composes spaces as stories,<br />
          where objects become characters and every encounter feels like a scene unfolding.
        </Link>
        
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center space-x-8">
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-xs transition-colors duration-150 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${pathname === item.href ? 'text-white' : 'text-neutral-400'}`}
                aria-current={pathname === item.href ? 'page' : undefined}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block font-extrabold text-white text-sm">
            ALEXANDER MAY
          </div>

          <button
            type="button"
            className="md:hidden text-xs text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white transition-transform duration-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className={`transform transition-transform duration-200 ${mobileMenuOpen ? 'rotate-180' : ''}`}>
              {mobileMenuOpen ? 'Close' : 'Menu'}
            </span>
          </button>
        </div>
      </div>

      <div
        className={`md:hidden absolute left-0 right-0 top-16 backdrop-blur-sm transition-all duration-300 ease-in-out bg-black/95 ${mobileMenuOpen && isVisible ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'} max-h-[calc(100dvh-64px)] overflow-y-auto`}
      >
        <nav id="mobile-menu" className="border-t border-neutral-700">
          <div className="px-4 py-6 pb-[max(env(safe-area-inset-bottom),1rem)] space-y-4">
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block text-sm font-normal transition-all duration-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white transform hover:translate-x-1 ${pathname === item.href ? 'text-white' : 'text-neutral-400'}`}
                style={{ transitionDelay: mobileMenuOpen ? `${index * 50}ms` : '0ms' }}
                aria-current={pathname === item.href ? 'page' : undefined}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
