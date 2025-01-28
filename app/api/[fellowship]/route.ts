import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';
import { FELLOWSHIP_THEMES } from '@/app/config/fellowships';
import type { FellowshipKey } from '@/app/config/fellowships';

export async function GET(
  request: Request,
  { params }: { params: { fellowship: string } }
) {
  const fellowship = params.fellowship as FellowshipKey;

  // Validate fellowship parameter
  if (!FELLOWSHIP_THEMES[fellowship]) {
    return NextResponse.json(
      { error: 'Invalid fellowship' },
      { status: 400 }
    );
  }

  try {
    // For now, if the fellowship-specific file doesn't exist, fall back to EV data
    let filePath = path.resolve(process.cwd() + `/app/data/${FELLOWSHIP_THEMES[fellowship].dataFile}`);
    
    // Check if the file exists, if not use EV data as fallback
    try {
      await fs.access(filePath);
    } catch {
      filePath = path.resolve(process.cwd() + '/app/data/ev-winners-with-embeddings.json');
    }

    const file = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(file);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading data:', error);
    return NextResponse.json(
      { error: 'Failed to load data' },
      { status: 500 }
    );
  }
} 