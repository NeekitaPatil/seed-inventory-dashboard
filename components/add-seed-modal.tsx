"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Seed, SeedType } from "@/lib/seed-data"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"

interface AddSeedModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (seed: Omit<Seed, "id">) => void
  editingSeed?: Seed | null
}

const currentYear = new Date().getFullYear()
const years = Array.from({ length: 10 }, (_, i) => currentYear - i)

export function AddSeedModal({
  open,
  onOpenChange,
  onSave,
  editingSeed,
}: AddSeedModalProps) {
  const [type, setType] = useState<SeedType>("vegetable")
  const [varietyName, setVarietyName] = useState("")
  const [source, setSource] = useState("")
  const [yearPacked, setYearPacked] = useState(currentYear.toString())
  const [quantity, setQuantity] = useState("")
  const [viability, setViability] = useState([85])
  const [location, setLocation] = useState("")
  const [family, setFamily] = useState("")

  useEffect(() => {
    if (editingSeed) {
      setType(editingSeed.type)
      setVarietyName(editingSeed.varietyName)
      setSource(editingSeed.source)
      setYearPacked(editingSeed.yearPacked.toString())
      setQuantity(editingSeed.quantity)
      setViability([editingSeed.viability])
      setLocation(editingSeed.location)
      setFamily(editingSeed.family || "")
    } else {
      resetForm()
    }
  }, [editingSeed, open])

  const resetForm = () => {
    setType("vegetable")
    setVarietyName("")
    setSource("")
    setYearPacked(currentYear.toString())
    setQuantity("")
    setViability([85])
    setLocation("")
    setFamily("")
  }

  const handleSave = () => {
    if (!varietyName.trim() || !source.trim()) return

    onSave({
      type,
      varietyName: varietyName.trim(),
      source: source.trim(),
      yearPacked: parseInt(yearPacked),
      quantity: quantity.trim() || "Unknown",
      viability: viability[0],
      location: location.trim() || "Not specified",
      family: family || undefined,
    })

    resetForm()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-card">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            {editingSeed ? "Edit Seed" : "Add New Seed"}
          </DialogTitle>
          <DialogDescription>
            {editingSeed
              ? "Update the details for this seed variety."
              : "Enter the details for your new seed variety."}
          </DialogDescription>
        </DialogHeader>

        <FieldGroup className="gap-4 py-4">
          {/* Type Select */}
          <Field>
            <FieldLabel htmlFor="type">Type</FieldLabel>
            <Select value={type} onValueChange={(v) => setType(v as SeedType)}>
              <SelectTrigger id="type" className="bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vegetable">Vegetable</SelectItem>
                <SelectItem value="flower">Flower</SelectItem>
                <SelectItem value="herb">Herb</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          {/* Variety Name */}
          <Field>
            <FieldLabel htmlFor="varietyName">Variety Name</FieldLabel>
            <Input
              id="varietyName"
              placeholder="e.g., Cherokee Purple Tomato"
              value={varietyName}
              onChange={(e) => setVarietyName(e.target.value)}
              className="bg-background"
            />
          </Field>

          {/* Source */}
          <Field>
            <FieldLabel htmlFor="source">Source</FieldLabel>
            <Input
              id="source"
              placeholder="e.g., Baker Creek"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="bg-background"
            />
          </Field>

          {/* Year Packed & Quantity Row */}
          <div className="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel htmlFor="yearPacked">Year Packed</FieldLabel>
              <Select value={yearPacked} onValueChange={setYearPacked}>
                <SelectTrigger id="yearPacked" className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <FieldLabel htmlFor="quantity">Quantity</FieldLabel>
              <Input
                id="quantity"
                placeholder="e.g., ~50 seeds"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="bg-background"
              />
            </Field>
          </div>

          {/* Location */}
          <Field>
            <FieldLabel htmlFor="location">Storage Location</FieldLabel>
            <Input
              id="location"
              placeholder="e.g., Box A, Fridge"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-background"
            />
          </Field>

          {/* Plant Family */}
          <Field>
            <FieldLabel htmlFor="family">Plant Family (Optional)</FieldLabel>
            <Select value={family} onValueChange={setFamily}>
              <SelectTrigger id="family" className="bg-background">
                <SelectValue placeholder="Select family" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="solanaceae">Solanaceae (Nightshades)</SelectItem>
                <SelectItem value="brassicaceae">Brassicaceae (Mustards)</SelectItem>
                <SelectItem value="asteraceae">Asteraceae (Daisies)</SelectItem>
                <SelectItem value="lamiaceae">Lamiaceae (Mints)</SelectItem>
                <SelectItem value="apiaceae">Apiaceae (Carrots)</SelectItem>
                <SelectItem value="cucurbitaceae">Cucurbitaceae (Squashes)</SelectItem>
                <SelectItem value="fabaceae">Fabaceae (Legumes)</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          {/* Viability Slider */}
          <Field>
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="viability">Germination Rate (Viability)</FieldLabel>
              <span className="text-sm font-medium text-primary">{viability[0]}%</span>
            </div>
            <Slider
              id="viability"
              min={0}
              max={100}
              step={1}
              value={viability}
              onValueChange={setViability}
              className="mt-2"
            />
          </Field>
        </FieldGroup>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!varietyName.trim() || !source.trim()}>
            {editingSeed ? "Save Changes" : "Add Seed"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
