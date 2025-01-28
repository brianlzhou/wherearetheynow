import { NextResponse } from 'next/server';
import { pipeline } from '@xenova/transformers';

let pipelineInstance: any = null;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  try {
    // Initialize the pipeline if it hasn't been initialized yet
    if (!pipelineInstance) {
      pipelineInstance = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
    }

    // Generate embeddings for the query
    const output = await pipelineInstance(query, {
      pooling: 'mean',
      normalize: true,
    });

    // Convert the embedding to a regular array
    const embedding = Array.from(output.data);

    return NextResponse.json({ message: embedding });
  } catch (error) {
    console.error('Error generating embeddings:', error);
    return NextResponse.json(
      { error: 'Failed to generate embeddings' },
      { status: 500 }
    );
  }
}