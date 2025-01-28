import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

export async function GET() {
  try {
    const file = await fs.readFile(path.resolve(process.cwd() + '/app/data/ev-winners-with-embeddings.json'), 'utf8');
    const data = JSON.parse(file);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading data:', error);
    return NextResponse.json({ error: 'Failed to load data' }, { status: 500 });
  }
} 