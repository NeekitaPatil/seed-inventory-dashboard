"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import {
  LayoutDashboard,
  BookOpen,
  Sprout,
  Settings,
  Menu,
  Leaf,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "#" },
  { icon: BookOpen, label: "Inventory Ledger", href: "#" },
  { icon: Sprout, label: "Germination Tests", href: "#" },
  { icon: Settings, label: "Settings", href: "#" },
]

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const [activeItem, setActiveItem] = useState("Dashboard")

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 bg-sidebar p-0">
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center border-b border-sidebar-border px-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Leaf className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold text-sidebar-foreground">
                SeedVault
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-3">
            {navItems.map((item) => (
              <Button
                key={item.label}
                variant={activeItem === item.label ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  activeItem === item.label &&
                    "bg-sidebar-accent text-sidebar-accent-foreground"
                )}
                onClick={() => {
                  setActiveItem(item.label)
                  setOpen(false)
                }}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                <span>{item.label}</span>
              </Button>
            ))}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  )
}
