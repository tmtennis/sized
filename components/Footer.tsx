import Container from './Container';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      <Container>
        <div className="py-12 md:py-16">
          <div className="flex flex-col space-y-8 md:flex-row md:justify-between md:space-y-0">
            {/* Navigation */}
            <nav className="flex flex-wrap gap-6 text-sm">
              <a
                href="/about"
                className="text-white font-normal transition-opacity duration-200 hover:opacity-60"
              >
                About
              </a>
              <a
                href="/projects"
                className="text-white font-normal transition-opacity duration-200 hover:opacity-60"
              >
                Projects
              </a>
              <a
                href="/press"
                className="text-white font-normal transition-opacity duration-200 hover:opacity-60"
              >
                Press
              </a>
              <a
                href="/contact"
                className="text-white font-normal transition-opacity duration-200 hover:opacity-60"
              >
                Contact
              </a>
            </nav>
            
            {/* Copyright */}
            <div className="text-sm text-white/60">
              <p>&copy; 2025 SIZED. All rights reserved.</p>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
