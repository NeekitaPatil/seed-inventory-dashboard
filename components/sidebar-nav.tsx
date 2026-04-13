"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  BookOpen,
  Sprout,
  Settings,
  ChevronLeft,
  ChevronRight,
  Leaf,
} from "lucide-react"

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "#" },
  { icon: BookOpen, label: "Inventory Ledger", href: "#" },
  { icon: Sprout, label: "Germination Tests", href: "#" },
  { icon: Settings, label: "Settings", href: "#" },
]

export function SidebarNav() {
  const [collapsed, setCollapsed] = useState(false)
  const [activeItem, setActiveItem] = useState("Dashboard")

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen border-r border-border bg-sidebar transition-all duration-300 lg:relative",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center border-b border-sidebar-border px-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Leaf className="h-5 w-5 text-primary-foreground" />
            </div>
            {!collapsed && (
              <span className="text-lg font-semibold text-sidebar-foreground">
                SeedVault
              </span>
            )}
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
                  "bg-sidebar-accent text-sidebar-accent-foreground",
                collapsed && "justify-center px-2"
              )}
              onClick={() => setActiveItem(item.label)}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Button>
          ))}
        </nav>

        {/* Collapse Toggle */}
        <div className="border-t border-sidebar-border p-3">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-center text-sidebar-foreground hover:bg-sidebar-accent"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </aside>
  )
}
