// Enum for search relevance levels, scalable for additional levels
export enum RelevanceLevel {
  Low = 1,
  Medium = 2,
  High = 3,
  Critical = 4 // Example: Add higher relevance levels if needed
}

// Interface for individual search result
export interface SearchResult {
  /** The text or snippet of the search result */
  text: string;
  
  /** The volume, chapter, or section where the result is found */
  volume: string;

  /** Enum value indicating the relevance of the result */
  relevance: RelevanceLevel;

  /** Timestamp for when the result was created or last updated (ISO format recommended) */
  createdAt?: string;
  
  /** Additional metadata for future extensibility (e.g., tags, sources) */
  metadata?: Record<string, string | number>;
}

// Interface for the full search response
export interface SearchResponse {
  /** Array of search results */
  results: SearchResult[];
  
  /** Total number of results for pagination or analytics */
  totalCount?: number;
  
  /** The original search query for reference */
  query?: string;
  
  /** Indicates if there are more pages of results */
  hasMore?: boolean;
}

// Interface for handling search errors
export interface SearchError {
  /** Short error message */
  error: string;
  
  /** Optional error code for programmatic handling */
  code?: number;
  
  /** Detailed error message for debugging or user feedback */
  message?: string;
  
  /** Additional error metadata for extensibility */
  metadata?: Record<string, any>;
}