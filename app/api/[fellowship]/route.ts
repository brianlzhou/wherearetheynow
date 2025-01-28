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
    const filePath = path.resolve(process.cwd() + `/app/data/${FELLOWSHIP_THEMES[fellowship].dataFile}`);
    
    try {
      await fs.access(filePath);
    } catch {
      return NextResponse.json([], { status: 200 }); // Return empty array if file doesn't exist
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