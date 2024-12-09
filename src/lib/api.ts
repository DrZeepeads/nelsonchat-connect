import { SearchResponse, SearchError } from "../types/search";

const API_URL = "http://localhost:3001";

export async function searchNelson(
  query: string,
  volume?: string
): Promise<SearchResponse> {
  try {
    // Construct query parameters
    const params = new URLSearchParams({
      q: query,
      ...(volume ? { volume } : {}), // Add volume if provided
    });

    // Setup timeout with AbortController
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10_000); // 10-second timeout

    const response = await fetch(`${API_URL}/api/search?${params}`, {
      signal: controller.signal,
    });

    clearTimeout(timeout); // Clear timeout after fetch is complete

    // Handle non-OK responses
    if (!response.ok) {
      const errorData = (await response.json()) as SearchError;
      throw new Error(errorData.error || "Search failed");
    }

    // Parse and return response
    return (await response.json()) as SearchResponse;
  } catch (error: unknown) {
    if (error instanceof DOMException && error.name === "AbortError") {
      console.error("Search API request aborted due to timeout:", { query, volume });
      throw new Error("The search request timed out. Please try again.");
    } else if (error instanceof Error) {
      console.error("Search API error:", {
        message: error.message,
        query,
        volume,
      });
    } else {
      console.error("Unknown error occurred during search:", { query, volume });
    }
    throw error;
  }
}