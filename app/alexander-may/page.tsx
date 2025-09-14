import { promises as fs } from 'fs';
import path from 'path';
import AlexanderMayClient from '@/components/AlexanderMayClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Alexander May Studio",
  description: "Defined by a precise and architectural approach to design. Alexander May Studio operates at the meeting point of space, object, and image, where every project is treated as a structure, measured, intentional, and complete.",
  openGraph: {
    title: "Alexander May Studio",
    description: "Defined by a precise and architectural approach to design. Alexander May Studio operates at the meeting point of space, object, and image.",
  },
};

async function getAlexanderMayContent(): Promise<string> {
  try {
    const filePath = path.join(process.cwd(), 'data', 'am-preview.csv');
    const fileContents = await fs.readFile(filePath, 'utf8');
    
    const lines = fileContents.split('\n').filter(line => line.trim());
    
    // Skip the title line and get the content
    if (lines.length > 1) {
      // Remove quotes and clean up the content
      return lines[1].replace(/^"|"$/g, '').replace(/""/g, '"');
    }
    
    return '';
  } catch (error) {
    console.error('Error reading Alexander May content:', error);
    return '';
  }
}

export default async function AlexanderMayPage() {
  const content = await getAlexanderMayContent();
  
  return <AlexanderMayClient content={content} />;
}
