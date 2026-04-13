"use client"

import { useState, useMemo } from "react"
import { SidebarNav } from "@/components/sidebar-nav"
import { TopHeader } from "@/components/top-header"
import { MetricCards } from "@/components/metric-cards"
import { SeedTable } from "@/components/seed-table"
import { AddSeedModal } from "@/components/add-seed-modal"
import { Seed, initialSeeds } from "@/lib/seed-data"

export default function DashboardPage() {
  const [seeds, setSeeds] = useState<Seed[]>(initialSeeds)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingSeed, setEditingSeed] = useState<Seed | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("all")

  // Calculate metrics
  const metrics = useMemo(() => {
    const totalVarieties = seeds.length
    const lowStock = seeds.filter((s) => {
      const qty = parseInt(s.quantity.replace(/[^0-9]/g, "")) || 0
      return qty < 20
    }).length
    const currentYear = new Date().getFullYear()
    const expiringSoon = seeds.filter(
      (s) => s.yearPacked <= currentYear - 2 || s.viability < 60
    ).length
    return { totalVarieties, lowStock, expiringSoon }
  }, [seeds])

  // Filter seeds
  const filteredSeeds = useMemo(() => {
    return seeds.filter((seed) => {
      const matchesSearch =
        seed.varietyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        seed.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
        seed.type.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesFamily = sortBy === "all" || seed.family === sortBy
      
      return matchesSearch && matchesFamily
    })
  }, [seeds, searchQuery, sortBy])

  const handleAddSeed = (seedData: Omit<Seed, "id">) => {
    if (editingSeed) {
      // Update existing seed
      setSeeds((prev) =>
        prev.map((s) => (s.id === editingSeed.id ? { ...seedData, id: s.id } : s))
      )
      setEditingSeed(null)
    } else {
      // Add new seed
      const newSeed: Seed = {
        ...seedData,
        id: Date.now().toString(),
      }
      setSeeds((prev) => [newSeed, ...prev])
    }
  }

  const handleEditSeed = (seed: Seed) => {
    setEditingSeed(seed)
    setModalOpen(true)
  }

  const handleDeleteSeed = (id: string) => {
    setSeeds((prev) => prev.filter((s) => s.id !== id))
  }

  const handleOpenModal = () => {
    setEditingSeed(null)
    setModalOpen(true)
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar - Hidden on mobile */}
      <div className="hidden lg:block">
        <SidebarNav />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopHeader
          onAddSeed={handleOpenModal}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <div className="mx-auto max-w-7xl space-y-6">
            {/* Page Title */}
            <div>
              <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
              <p className="text-muted-foreground">
                Manage your seed collection and track germination rates.
              </p>
            </div>

            {/* Metric Cards */}
            <MetricCards
              totalVarieties={metrics.totalVarieties}
              lowStock={metrics.lowStock}
              expiringSoon={metrics.expiringSoon}
            />

            {/* Seed Table */}
            <SeedTable
              seeds={filteredSeeds}
              onEdit={handleEditSeed}
              onDelete={handleDeleteSeed}
            />
          </div>
        </main>
      </div>

      {/* Add/Edit Seed Modal */}
      <AddSeedModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        onSave={handleAddSeed}
        editingSeed={editingSeed}
      />
    </div>
  )
}
