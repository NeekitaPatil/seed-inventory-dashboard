"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Pencil, Trash2 } from "lucide-react"
import { Seed, seedTypeColors } from "@/lib/seed-data"

interface SeedTableProps {
  seeds: Seed[]
  onEdit: (seed: Seed) => void
  onDelete: (id: string) => void
}

export function SeedTable({ seeds, onEdit, onDelete }: SeedTableProps) {
  return (
    <Card className="border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Seed Ledger</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[100px]">Type</TableHead>
                <TableHead>Variety Name</TableHead>
                <TableHead>Source</TableHead>
                <TableHead className="w-[100px]">Year Packed</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead className="w-[140px]">Viability</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="w-[100px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {seeds.map((seed) => (
                <TableRow key={seed.id}>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={`capitalize ${seedTypeColors[seed.type].bg} ${seedTypeColors[seed.type].text} border-0`}
                    >
                      {seed.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{seed.varietyName}</TableCell>
                  <TableCell className="text-muted-foreground">{seed.source}</TableCell>
                  <TableCell>{seed.yearPacked}</TableCell>
                  <TableCell className="text-muted-foreground">{seed.quantity}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress
                        value={seed.viability}
                        className="h-2 w-16"
                      />
                      <span
                        className={`text-sm font-medium ${
                          seed.viability >= 80
                            ? "text-primary"
                            : seed.viability >= 60
                            ? "text-warning"
                            : "text-destructive"
                        }`}
                      >
                        {seed.viability}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{seed.location}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        onClick={() => onEdit(seed)}
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit {seed.varietyName}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => onDelete(seed.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete {seed.varietyName}</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-3 p-4">
          {seeds.map((seed) => (
            <Card key={seed.id} className="border-border bg-background">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <Badge
                      variant="secondary"
                      className={`capitalize mb-2 ${seedTypeColors[seed.type].bg} ${seedTypeColors[seed.type].text} border-0`}
                    >
                      {seed.type}
                    </Badge>
                    <h3 className="font-semibold text-foreground">{seed.varietyName}</h3>
                    <p className="text-sm text-muted-foreground">{seed.source}</p>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground"
                      onClick={() => onEdit(seed)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => onDelete(seed.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Year: </span>
                    <span className="text-foreground">{seed.yearPacked}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Qty: </span>
                    <span className="text-foreground">{seed.quantity}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Location: </span>
                    <span className="text-foreground">{seed.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Viability:</span>
                    <Progress value={seed.viability} className="h-2 w-12" />
                    <span
                      className={`font-medium ${
                        seed.viability >= 80
                          ? "text-primary"
                          : seed.viability >= 60
                          ? "text-warning"
                          : "text-destructive"
                      }`}
                    >
                      {seed.viability}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {seeds.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground">No seeds found.</p>
            <p className="text-sm text-muted-foreground">Add your first seed to get started!</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
