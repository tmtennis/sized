import { promises as fs } from 'fs';
import path from 'path';
import PressClient from '@/components/PressClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Press",
  description: "Read press coverage and media features about SIZED's exhibitions, curatorial projects, and cultural programming. Stay updated with our latest news and announcements.",
  openGraph: {
    title: "Press - SIZED",
    description: "Read press coverage and media features about SIZED's exhibitions, curatorial projects, and cultural programming.",
  },
};

interface PressItem {
  year: string;
  title: string;
  about: string;
}

async function getPressItems(): Promise<PressItem[]> {
  try {
    const filePath = path.join(process.cwd(), 'data', 'sized-press.csv');
    const fileContents = await fs.readFile(filePath, 'utf8');
    
    const lines = fileContents.split('\n').filter(line => line.trim());
    const pressItems: PressItem[] = [];
    
    // Skip header row
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line) {
        // Parse CSV line - handle quotes properly
        const match = line.match(/^([^,]+),([^,]+),"?(.+?)"?$/);
        if (match) {
          pressItems.push({
            year: match[1],
            title: match[2],
            about: match[3].replace(/"/g, '')
          });
        }
      }
    }
    
    return pressItems;
  } catch (error) {
    console.error('Error reading press data:', error);
    return [];
  }
}

export default async function PressPage() {
  const pressItems = await getPressItems();
  
  return <PressClient pressItems={pressItems} />;
}
