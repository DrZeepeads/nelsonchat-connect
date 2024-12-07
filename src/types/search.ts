export interface SearchResult {
  text: string;
  volume: string;
  relevance: number;
}

export interface SearchResponse {
  results: SearchResult[];
}

export interface SearchError {
  error: string;
}