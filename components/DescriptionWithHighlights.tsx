"use client";

import { motion } from "framer-motion";
import { Fragment } from "react";

interface DescriptionWithHighlightsProps {
  paragraphs: string[];
  paragraphClassName?: string;
}

function HighlightedSized({ text }: { text: string }) {
  return (
    <motion.span
  className="font-extrabold text-white inline-block"
      initial={{ opacity: 0.85 }}
      whileInView={{ opacity: 1 }}
      whileHover={{ scale: 1.02 }}
      viewport={{ once: true, amount: 0.2, margin: "-10% 0% -10% 0%" }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {text}
    </motion.span>
  );
}

function renderWithHighlights(paragraph: string) {
  const parts = paragraph.split(/(\bSIZED\b)/gi);
  return parts.map((part, idx) => {
    if (/^\bSIZED\b$/i.test(part)) {
      return <HighlightedSized key={`sized-${idx}`} text={part} />;
    }
    return <Fragment key={idx}>{part}</Fragment>;
  });
}

export default function DescriptionWithHighlights({ paragraphs, paragraphClassName = "text-white leading-relaxed opacity-90" }: DescriptionWithHighlightsProps) {
  if (!paragraphs || paragraphs.length === 0) return null;
  return (
    <div className="space-y-6">
      {paragraphs.map((p, i) => (
        <p key={i} className={paragraphClassName}>
          {renderWithHighlights(p)}
        </p>
      ))}
    </div>
  );
}
