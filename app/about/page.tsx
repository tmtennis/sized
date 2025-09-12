import Container from '@/components/Container';
import CollaboratorsList from '@/components/CollaboratorsList';
import DescriptionWithHighlights from '@/components/DescriptionWithHighlights';
import fs from 'fs/promises';
import path from 'path';

type AboutData = {
  description: string[]; // paragraphs
  collaborators: string[];
};

function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let current: string[] = [];
  let field = '';
  let inQuotes = false;

  // Normalize newlines
  const s = text.replace(/\r\n/g, '\n');
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    const next = s[i + 1];

    if (inQuotes) {
      if (char === '"') {
        if (next === '"') {
          // Escaped quote
          field += '"';
          i++; // skip next
        } else {
          inQuotes = false;
        }
      } else {
        field += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ',') {
        current.push(field);
        field = '';
      } else if (char === '\n') {
        current.push(field);
        rows.push(current);
        current = [];
        field = '';
      } else {
        field += char;
      }
    }
  }
  // Push last field/row if any
  if (inQuotes) {
    // Close any dangling quote for robustness
    inQuotes = false;
  }
  if (field.length > 0 || current.length > 0) {
    current.push(field);
    rows.push(current);
  }
  return rows;
}

async function loadAboutData(): Promise<AboutData> {
  const filePath = path.join(process.cwd(), 'data', 'sized-about.csv');
  const raw = await fs.readFile(filePath, 'utf8');
  const rows = parseCSV(raw);
  if (!rows.length) return { description: [], collaborators: [] };

  const header = rows[0].map(h => h.trim());
  const aboutIdx = header.findIndex(h => /sized-about/i.test(h));
  const collabIdx = header.findIndex(h => /sized-collaborators/i.test(h));

  const bodyRows = rows.slice(1);
  // Get the first non-empty about cell as the full description
  const aboutCell = bodyRows.find(r => (r[aboutIdx]?.trim().length ?? 0) > 0)?.[aboutIdx] ?? '';
  const normalized = aboutCell.replace(/\r\n/g, '\n');
  const paragraphs = normalized
    .split(/\n\s*\n/) // blank line separated
    .map(p => p.trim())
    .filter(Boolean);

  const collaborators = Array.from(
    new Set(
      bodyRows
        .map(r => (r[collabIdx] ?? '').trim())
        .filter(v => v.length > 0)
    )
  );

  return { description: paragraphs, collaborators };
}

export default async function AboutPage() {
  const { description, collaborators } = await loadAboutData();

  return (
    <Container>
  <div className="pt-28 md:pt-32 lg:pt-36 pb-16 md:pb-24 md:h-[calc(100vh-6rem)] md:overflow-hidden">
        <div className="grid md:grid-cols-12 gap-12 md:gap-16 md:h-full md:min-h-0">
          {/* Left column: Title + description */}
          <section className="md:col-span-6 lg:col-span-6 max-w-prose">
            <h1 className="text-white font-extrabold tracking-tight text-sm mb-4">ABOUT</h1>
            {description.length === 0 ? (
              <p className="text-white/70">Content coming soon.</p>
            ) : (
              <div className="pr-2 md:pr-4">
                <DescriptionWithHighlights paragraphs={description} />
              </div>
            )}
          </section>

          {/* Right column: Title + collaborators */}
          <aside className="md:col-span-6 lg:col-span-6 md:border-l md:border-white/10 md:pl-6 lg:pl-8 mt-24 sm:mt-16 md:mt-0 md:h-full md:min-h-0 md:flex md:flex-col">
            <h2 className="text-white/80 font-black uppercase tracking-tight mb-4 text-sm">Collaborators</h2>
            <div className="md:flex-1 md:min-h-0">
              <CollaboratorsList collaborators={collaborators} />
            </div>
          </aside>
        </div>
      </div>
    </Container>
  );
}
