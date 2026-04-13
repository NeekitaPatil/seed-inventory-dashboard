"use client"

import { Search, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { MobileNav } from "./mobile-nav"

interface TopHeaderProps {
  onAddSeed: () => void
  searchQuery: string
  onSearchChange: (query: string) => void
  sortBy: string
  onSortChange: (value: string) => void
}

export function TopHeader({
  onAddSeed,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
}: TopHeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-card/80 backdrop-blur-sm">
      <div className="flex h-16 items-center gap-4 px-4 lg:px-6">
        <MobileNav />

        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search seeds..."
            className="pl-10 bg-background"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Filter/Sort */}
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-[180px] bg-background hidden sm:flex">
            <SelectValue placeholder="Sort by Plant Family" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Families</SelectItem>
            <SelectItem value="solanaceae">Solanaceae</SelectItem>
            <SelectItem value="brassicaceae">Brassicaceae</SelectItem>
            <SelectItem value="asteraceae">Asteraceae</SelectItem>
            <SelectItem value="lamiaceae">Lamiaceae</SelectItem>
            <SelectItem value="apiaceae">Apiaceae</SelectItem>
          </SelectContent>
        </Select>

        {/* Add New Seed Button */}
        <Button onClick={onAddSeed} className="gap-2">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Add New Seed</span>
        </Button>
      </div>
    </header>
  )
}
