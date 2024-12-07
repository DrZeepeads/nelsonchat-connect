import { SearchResponse, SearchError } from '../types/search';

const API_URL = 'http://localhost:3001';

export async function searchNelson(query: string, volume?: string): Promise<SearchResponse> {
  try {
    const params = new URLSearchParams({
      q: query,
      ...(volume && { volume }),
    });

    const response = await fetch(`${API_URL}/api/search?${params}`);
    if (!response.ok) {
      const errorData = await response.json() as SearchError;
      throw new Error(errorData.error || 'Search failed');
    }

    return await response.json() as SearchResponse;
  } catch (error) {
    console.error('Search API error:', error);
    throw error;
  }
}
