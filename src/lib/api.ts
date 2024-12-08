import { SearchResponse, SearchError } from '../types/search';

const API_URL = 'http://localhost:3001';

export async function searchNelson(query: string, volume?: string): Promise<SearchResponse> {
  const params = new URLSearchParams({ q: query });
  if (volume) {
    params.append('volume', volume);
  }

  try {
    const response = await fetch(`${API_URL}/api/search?${params}`);
    
    if (!response.ok) {
      const errorData = await response.json() as SearchError;
      throw new Error(errorData.error || 'Search failed');
    }

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
  }
}