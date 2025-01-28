import { promises as fs } from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import type { ThielFellow } from '../app/types/fellowships';

function extractDateFromLink(link: string): string {
  const match = link.match(/(\d{8})/);
  if (match) {
    const dateStr = match[1];
    const year = dateStr.slice(0, 4);
    const month = dateStr.slice(4, 6);
    const day = dateStr.slice(6, 8);
    return `${year}-${month}-${day}`;
  }
  return "";
}

function cleanProjectArea(type: string): string {
  // Standardize project areas
  const areaMap: { [key: string]: string } = {
    'Biotech': 'Biotechnology',
    'Information Technology': 'Software & Technology',
    'Economics & Finance': 'Finance',
    'Career Development': 'Career Tech',
  };
  return areaMap[type] || type;
}

async function convertThielData() {
  try {
    // Read the CSV file
    const csvData = await fs.readFile(
      path.resolve(process.cwd(), 'app/data/Thiel Fellowship Winners- Complete.csv'),
      'utf-8'
    );

    // Parse CSV
    const records = parse(csvData, {
      columns: true,
      skip_empty_lines: true
    });

    // Convert to our format
    const fellows: ThielFellow[] = records.map((record: any) => ({
      id: parseInt(record.ID),
      name: record.name,
      batch: record.batch,
      date_announced: record.link ? extractDateFromLink(record.link) : "",
      description: record.description,
      link: record.link || null,
      school: null, // These fields aren't in the CSV yet
      graduation_year: null,
      project_area: record.type ? cleanProjectArea(record.type) : null,
      company_name: record.company || null,
      funding_raised: null,
      linkedin: null,
      twitter: null,
      embedding_description: [] // We'll generate these later
    }));

    // Write the JSON file
    await fs.writeFile(
      path.resolve(process.cwd(), 'app/data/thiel-fellows.json'),
      JSON.stringify(fellows, null, 2)
    );

    // Print some stats
    const projectAreas = new Set(fellows.map(f => f.project_area).filter(Boolean));
    const companiesCount = fellows.filter(f => f.company_name).length;
    
    console.log(`Converted ${fellows.length} Thiel Fellows to JSON format`);
    console.log(`Project Areas: ${Array.from(projectAreas).join(', ')}`);
    console.log(`Fellows with companies: ${companiesCount}`);
  } catch (error) {
    console.error('Error converting data:', error);
  }
}

convertThielData(); 