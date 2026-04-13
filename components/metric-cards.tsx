import { Card, CardContent } from "@/components/ui/card"
import { Sprout, AlertTriangle, Clock } from "lucide-react"

interface MetricCardsProps {
  totalVarieties: number
  lowStock: number
  expiringSoon: number
}

export function MetricCards({
  totalVarieties,
  lowStock,
  expiringSoon,
}: MetricCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {/* Total Varieties */}
      <Card className="border-border">
        <CardContent className="flex items-center gap-4 p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Sprout className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Total Varieties
            </p>
            <p className="text-3xl font-bold text-foreground">{totalVarieties}</p>
          </div>
        </CardContent>
      </Card>

      {/* Low Stock */}
      <Card className="border-border">
        <CardContent className="flex items-center gap-4 p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-warning/10">
            <AlertTriangle className="h-6 w-6 text-warning" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Low Stock</p>
            <p className="text-3xl font-bold text-warning">{lowStock}</p>
          </div>
        </CardContent>
      </Card>

      {/* Expiring Soon */}
      <Card className="border-border sm:col-span-2 lg:col-span-1">
        <CardContent className="flex items-center gap-4 p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <Clock className="h-6 w-6 text-destructive" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Expiring Soon
            </p>
            <p className="text-3xl font-bold text-destructive">{expiringSoon}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
