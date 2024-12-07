// Enum for search relevance levels (could be expanded)
export enum RelevanceLevel {
  Low = 1,
  Medium = 2,
  High = 3
}

export interface SearchResult {
  text: string;           // The text or snippet of the search result
  volume: string;         // The volume in which the result is found (could represent chapter/section)
  relevance: RelevanceLevel;  // Enum value representing relevance of the result
  createdAt?: string;     // Optional timestamp for when the result was created or updated
}

export interface SearchResponse {
  results: SearchResult[];  // Array of search results
  totalCount?: number;       // Optional field to hold the total number of results for pagination
  query?: string;            // Optional field to hold the original search query for reference
}

export interface SearchError {
  error: string;             // Error message
  code?: number;             // Optional error code for more granular error handling
  message?: string;          // Optional detailed message
}