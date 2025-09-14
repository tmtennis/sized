'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface AlexanderMayClientProps {
  content: string;
}

export default function AlexanderMayClient({ content }: AlexanderMayClientProps) {
  const [showAlexanderMay, setShowAlexanderMay] = useState(false);
  const [showRestOfText, setShowRestOfText] = useState(false);
  const [showLink, setShowLink] = useState(false);

  useEffect(() => {
    // Step 1: Show ALEXANDER MAY first
    const timer1 = setTimeout(() => setShowAlexanderMay(true), 500);
    // Step 2: Show rest of text after ALEXANDER MAY is visible
    const timer2 = setTimeout(() => setShowRestOfText(true), 2000);
    // Step 3: Show bottom link after all text is visible
    const timer3 = setTimeout(() => setShowLink(true), 4000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="px-8 md:px-16 lg:px-24 pt-20 md:pt-24 pb-12 md:pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Content */}
          <div className="max-w-3xl">
            <div className="text-sm md:text-base leading-loose text-white/90 font-light tracking-wide">
              {content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-6 last:mb-0">
                  {paragraph.split(/(Alexander May)/g).map((part, partIndex) => {
                    if (part === 'Alexander May') {
                      return (
                        <motion.span 
                          key={partIndex} 
                          className="font-extrabold"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: showAlexanderMay ? 1 : 0 }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        >
                          ALEXANDER MAY
                        </motion.span>
                      );
                    }
                    return (
                      <motion.span
                        key={partIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: showRestOfText ? 1 : 0 }}
                        transition={{ 
                          duration: 1.2, 
                          ease: "easeOut",
                          delay: index * 0.2
                        }}
                      >
                        {part}
                      </motion.span>
                    );
                  })}
                </p>
              ))}
            </div>

            {/* Bottom Link */}
            <motion.div
              className="mt-12 pt-8 border-t border-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: showLink ? 1 : 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <a
                href="#" // Will be updated to actual website later
                className="font-extrabold text-white underline decoration-1 underline-offset-4 hover:text-white/80 transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                ALEXANDER MAY
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
