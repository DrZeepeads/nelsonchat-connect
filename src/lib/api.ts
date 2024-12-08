import { SearchResponse, SearchError } from '../types/search';

const API_URL = 'http://localhost:3001';

export async function searchNelson(query: string, volume?: string): Promise<SearchResponse> {
<<<<<<< main
  try {
    const params = new URLSearchParams({
      q: query,
      ...(volume && { volume }), // Add volume parameter if provided
    });

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10_000); // 10-second timeout

    const response = await fetch(`${API_URL}/api/search?${params}`, {
      signal: controller.signal,
    });

    clearTimeout(timeout);

=======
  const params = new URLSearchParams({ q: query });
  if (volume) {
    params.append('volume', volume);
  }

  try {
    const response = await fetch(`${API_URL}/api/search?${params}`);
    
>>>>>>> origin/main
    if (!response.ok) {
      const errorData = await response.json() as SearchError;
      throw new Error(errorData.error || 'Search failed');
    }

<<<<<<< main
    console.error('Search API error:', error);
    throw new Error(
      error instanceof Error ? error.message : 'An unexpected error occurred.'
    );
=======
    return await response.json() as SearchResponse;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Search API error:', {
        message: error.message,
        query,
        volume,
      });
    } else {
      console.error('Unknown error occurred during search');
    }
    throw error;
>>>>>>> origin/main
  }
}