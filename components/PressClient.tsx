'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface PressItem {
  year: string;
  title: string;
  about: string;
}

interface PressClientProps {
  pressItems: PressItem[];
}

export default function PressClient({ pressItems }: PressClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Create a reading progress indicator
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  


  const groupedItems = Object.entries(
    pressItems.reduce((acc, item) => {
      const year = new Date(item.year).getFullYear().toString();
      if (!acc[year]) acc[year] = [];
      acc[year].push(item);
      return acc;
    }, {} as Record<string, PressItem[]>)
  ).sort(([a], [b]) => parseInt(b) - parseInt(a));

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white relative">
      {/* Reading progress line */}
      <motion.div 
        className="fixed top-0 left-0 h-px bg-white/30 z-50"
        style={{ width: progressWidth }}
      />
      
      {/* Floating year indicator */}
      <motion.div 
        className="fixed right-8 md:right-16 lg:right-24 top-1/2 -translate-y-1/2 text-right z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1 }}
      >
        {groupedItems.map(([year]) => (
          <motion.div
            key={year}
            className="text-xs font-mono text-white/20 mb-2"
            whileInView={{ 
              color: "rgba(255, 255, 255, 0.6)",
              scale: 1.1
            }}
            viewport={{ margin: "-40%" }}
            transition={{ duration: 0.3 }}
          >
            {year}
          </motion.div>
        ))}
      </motion.div>

      <div className="px-8 md:px-16 lg:px-24 pt-12 md:pt-16 pb-6 md:pb-8">
        <motion.h1 
          className="text-xl md:text-2xl font-black mb-4 tracking-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          PRESS
        </motion.h1>
        <div className="w-full h-px bg-white/20" />
      </div>
      
      <div className="px-8 md:px-16 lg:px-24 pb-12 md:pb-16">
        <div className="space-y-8">
          {groupedItems.map(([year, items]) => (
            <div key={year} className="space-y-3">
              <motion.h2 
                className="text-lg font-black text-white/40 sticky top-4 z-30 bg-black py-2"
                whileInView={{ 
                  color: "rgba(255, 255, 255, 1)",
                  letterSpacing: "0.05em"
                }}
                viewport={{ margin: "-20%" }}
                transition={{ duration: 0.4 }}
              >
                {year}
              </motion.h2>
              
              <div className="space-y-0">
                {items.map((item, index) => (
                  <motion.div 
                    key={index}
                    className="cursor-pointer py-3 border-b border-white/[0.03]"
                    whileHover={{
                      scale: 1.01,
                      transition: { duration: 0.2, ease: "easeOut" }
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-grow space-y-1">
                        <motion.div 
                          className="text-sm font-medium text-white"
                          whileHover={{ 
                            color: "rgba(255, 255, 255, 0.6)",
                            transition: { duration: 0.2 }
                          }}
                        >
                          {item.title}
                        </motion.div>
                        <motion.div 
                          className="text-sm text-white leading-relaxed max-w-4xl"
                          whileHover={{ 
                            color: "rgba(255, 255, 255, 0.6)",
                            transition: { duration: 0.2 }
                          }}
                        >
                          {item.about}
                        </motion.div>
                      </div>
                      
                      <motion.div 
                        className="text-right ml-8 flex-shrink-0"
                        whileHover={{ 
                          color: "rgba(255, 255, 255, 0.6)",
                          transition: { duration: 0.2 }
                        }}
                      >
                        <span className="text-xs text-white uppercase tracking-wider font-mono">
                          {new Date(item.year).toLocaleDateString('en-US', { month: 'short' })}
                        </span>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
