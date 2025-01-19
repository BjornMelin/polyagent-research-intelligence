"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { MoonIcon, SunIcon, Menu, Home, Info, MessageSquarePlus } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'About', href: '/about', icon: Info },
  { name: 'Feedback', href: '/feedback', icon: MessageSquarePlus },
] as const

export function Header() {
  const { setTheme } = useTheme()
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 border-b bg-gradient-to-b from-background to-muted/20 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link 
            href="/" 
            className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent hover:opacity-90 transition-opacity"
            aria-label="PolyAgent Research Intelligence - Home"
          >
            PolyAgent Research Intelligence
          </Link>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Navigation for larger screens */}
            <nav className="hidden md:flex items-center gap-1">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      px-3 py-2 rounded-md text-sm font-medium transition-colors
                      hover:bg-accent hover:text-accent-foreground
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
                      ${isActive ? 'bg-accent text-accent-foreground' : 'text-foreground/60'}
                    `}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span className="flex items-center gap-2">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      {item.name}
                    </span>
                  </Link>
                )
              })}
            </nav>

            {/* Theme toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full"
                  aria-label="Toggle theme"
                >
                  <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile navigation */}
            <div className="md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon"
                    aria-label="Navigation menu"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {navigation.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href
                    
                    return (
                      <DropdownMenuItem
                        key={item.href}
                        asChild
                        className={isActive ? 'bg-accent' : ''}
                      >
                        <Link
                          href={item.href}
                          className="w-full flex items-center gap-2"
                          aria-current={isActive ? 'page' : undefined}
                        >
                          <Icon className="h-4 w-4" aria-hidden="true" />
                          {item.name}
                        </Link>
                      </DropdownMenuItem>
                    )
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}