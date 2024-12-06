import React, { useState } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Search } from "lucide-react"
import { useToast } from "./ui/use-toast"

export const SearchBox = () => {
  const [query, setQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
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
      // TODO: This will be implemented when we set up the backend
      console.log("Searching for:", query)
      toast({
        title: "Search functionality coming soon",
        description: "Backend integration will be implemented in the next step",
      })
    } catch (error) {
      toast({
        title: "Search failed",
        description: "Please try again later",
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
    </div>
  )
}