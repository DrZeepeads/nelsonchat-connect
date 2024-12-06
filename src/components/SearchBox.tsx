import React, { useState } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Search } from "lucide-react"
import { useToast } from "./ui/use-toast"

interface SearchResult {
  page_number: number;
  title: string;
  excerpt: string;
}

export const SearchBox = () => {
  const [query, setQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [results, setResults] = useState<SearchResult[]>([])
  const { toast } = useToast()

  const handleSearch = async () => {
    if (!query.trim()) {
      toast({
        title: "Please enter a search term",
        variant: "destructive",
      })
      return
    }

    setIsSearching(true)
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Search failed')
      }
      
      setResults(data.results)
      
      if (data.results.length === 0) {
        toast({
          title: "No results found",
          description: "Try different search terms",
        })
      }
    } catch (error) {
      toast({
        title: "Search failed",
        description: error instanceof Error ? error.message : "Please try again later",
        variant: "destructive",
      })
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Search Nelson Textbook of Pediatrics..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1"
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <Button onClick={handleSearch} disabled={isSearching}>
          <Search className="mr-2 h-4 w-4" />
          {isSearching ? "Searching..." : "Search"}
        </Button>
      </div>
      
      {results.length > 0 && (
        <div className="mt-6 space-y-4">
          {results.map((result, index) => (
            <div key={index} className="p-4 border rounded-lg bg-white shadow-sm">
              <div className="flex justify-between items-start">
                <h3 className="font-medium">{result.title}</h3>
                <span className="text-sm text-gray-500">Page {result.page_number}</span>
              </div>
              <p className="mt-2 text-gray-700" dangerouslySetInnerHTML={{ __html: result.excerpt }} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}