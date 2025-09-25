'use client';

import { useEffect, useState } from 'react';
import Container from '@/components/Container';

export default function ContactPage() {
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      
      // Format date as MM/DD/YY
      const date = now.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: '2-digit'
      });
      
      // Format time as HH:MM:SS AM/PM
      const time = now.toLocaleTimeString('en-US', {
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      
      setCurrentDate(date);
      setCurrentTime(time);
    };

    // Update immediately
    updateDateTime();
    
    // Update every second
    const interval = setInterval(updateDateTime, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <div className="pt-20 md:pt-24 min-h-screen">
        <div className="max-w-4xl">
          <div className="mb-12 md:mb-16">
            <h1 className="text-white text-xs font-extrabold tracking-widest">
              CONTACT
            </h1>
            <div className="mt-2 w-12 h-px bg-white/20"></div>
          </div>
        </div>
      
      <div className="mt-12 md:mt-16">
        <div className="max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            
            {/* General Contact */}
            <section className="group">
              <h3 className="text-white font-black text-xs md:text-sm leading-tight mb-3 tracking-wide">
                General
              </h3>
              <div className="space-y-2">
                <a 
                  href="mailto:info@sized.ltd" 
                  className="block text-white/80 text-xs md:text-sm leading-relaxed transition-all duration-300 hover:text-white hover:translate-x-1"
                >
                  info@sized.ltd
                </a>
              </div>
            </section>

            {/* Location & Time */}
            <section className="group">
              <h3 className="text-white font-black text-xs md:text-sm leading-tight mb-3 tracking-wide">
                Location
              </h3>
              <div className="space-y-2">
                <p className="text-white/80 text-xs md:text-sm leading-relaxed">New York City</p>
                <div className="text-white/60 text-xs space-y-1">
                  <p className="font-mono">{currentDate}</p>
                  <p className="font-mono">{currentTime}</p>
                </div>
              </div>
            </section>

            {/* Social */}
            <section className="group">
              <h3 className="text-white font-black text-xs md:text-sm leading-tight mb-3 tracking-wide">
                Social
              </h3>
              <div className="space-y-2">
                <a 
                  href="https://www.instagram.com/sized_ltd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-white/80 text-xs md:text-sm leading-relaxed transition-all duration-300 hover:text-white hover:translate-x-1"
                >
                  Instagram
                </a>
              </div>
            </section>

          </div>

          {/* Subtle decorative line */}
          <div className="mt-16 md:mt-24">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          </div>
        </div>
      </div>
    </div>
    </Container>
  );
}
