export type SeedType = "vegetable" | "flower" | "herb"

export interface Seed {
  id: string
  type: SeedType
  varietyName: string
  source: string
  yearPacked: number
  quantity: string
  viability: number
  location: string
  family?: string
}

export const seedTypeColors: Record<SeedType, { bg: string; text: string }> = {
  vegetable: {
    bg: "bg-primary/15",
    text: "text-primary",
  },
  flower: {
    bg: "bg-pink-100 dark:bg-pink-900/30",
    text: "text-pink-700 dark:text-pink-300",
  },
  herb: {
    bg: "bg-amber-100 dark:bg-amber-900/30",
    text: "text-amber-700 dark:text-amber-300",
  },
}

export const initialSeeds: Seed[] = [
  {
    id: "1",
    type: "vegetable",
    varietyName: "Cherokee Purple Tomato",
    source: "Baker Creek",
    yearPacked: 2024,
    quantity: "~50 seeds",
    viability: 85,
    location: "Box A, Fridge",
    family: "solanaceae",
  },
  {
    id: "2",
    type: "vegetable",
    varietyName: "Brandywine Tomato",
    source: "Seed Savers",
    yearPacked: 2023,
    quantity: "~30 seeds",
    viability: 78,
    location: "Box A, Fridge",
    family: "solanaceae",
  },
  {
    id: "3",
    type: "flower",
    varietyName: "Black-Eyed Susan",
    source: "Johnny's Seeds",
    yearPacked: 2024,
    quantity: "~100 seeds",
    viability: 92,
    location: "Box B, Shelf",
    family: "asteraceae",
  },
  {
    id: "4",
    type: "herb",
    varietyName: "Genovese Basil",
    source: "Local Garden Center",
    yearPacked: 2024,
    quantity: "~200 seeds",
    viability: 95,
    location: "Box C, Shelf",
    family: "lamiaceae",
  },
  {
    id: "5",
    type: "vegetable",
    varietyName: "Rainbow Chard",
    source: "Territorial Seed",
    yearPacked: 2022,
    quantity: "~15 seeds",
    viability: 65,
    location: "Box A, Fridge",
    family: "brassicaceae",
  },
  {
    id: "6",
    type: "flower",
    varietyName: "Zinnia California Giant",
    source: "Baker Creek",
    yearPacked: 2024,
    quantity: "~75 seeds",
    viability: 88,
    location: "Box B, Shelf",
    family: "asteraceae",
  },
  {
    id: "7",
    type: "herb",
    varietyName: "Italian Parsley",
    source: "Burpee",
    yearPacked: 2023,
    quantity: "~150 seeds",
    viability: 72,
    location: "Box C, Shelf",
    family: "apiaceae",
  },
  {
    id: "8",
    type: "vegetable",
    varietyName: "Sugar Snap Pea",
    source: "Seed Savers",
    yearPacked: 2021,
    quantity: "~8 seeds",
    viability: 45,
    location: "Box A, Fridge",
    family: "fabaceae",
  },
  {
    id: "9",
    type: "flower",
    varietyName: "Lavender Munstead",
    source: "High Mowing Seeds",
    yearPacked: 2024,
    quantity: "~60 seeds",
    viability: 80,
    location: "Box B, Shelf",
    family: "lamiaceae",
  },
  {
    id: "10",
    type: "vegetable",
    varietyName: "Butternut Squash",
    source: "Johnny's Seeds",
    yearPacked: 2023,
    quantity: "~12 seeds",
    viability: 90,
    location: "Box A, Fridge",
    family: "cucurbitaceae",
  },
]
