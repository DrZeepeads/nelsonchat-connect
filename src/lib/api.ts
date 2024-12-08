import { SearchResponse, SearchError } from '../types/search';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

/**
 * Performs a search on the Nelson Textbook API.
 *
 * @param query - The search term.
 * @param volume - (Optional) Specific volume to search within.
 * @returns A promise resolving to the search response.
 * @throws Error if the request fails or the API returns an error.
 */
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
      const errorData = (await response.json()) as SearchError;
      throw new Error(errorData.error || `HTTP Error: ${response.status}`);
    }

    const data = (await response.json()) as SearchResponse;
    return data;
  } catch (error: unknown) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      console.error('Search API timeout: The request took too long.');
      throw new Error('Search request timed out. Please try again.');
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