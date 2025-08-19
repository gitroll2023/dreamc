"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navigation = [
  { name: "홈", href: "/" },
  { 
    name: "드림캐쳐 소개", 
    href: "/about",
    children: [
      { name: "인사말", href: "/about#greeting" },
      { name: "미션과 비전", href: "/about#mission" },
      { name: "연혁", href: "/about#history" },
      { name: "함께하는 사람들", href: "/about#team" },
      { name: "우리의 이야기", href: "/history" },
    ]
  },
  { name: "주요 사업", href: "/programs" },
  { 
    name: "소식 및 활동", 
    href: "/community",
    children: [
      { name: "공지사항", href: "/community" },
      { name: "활동 갤러리", href: "/gallery" },
    ]
  },
  { name: "문의하기", href: "/contact" },
  { name: "체험권", href: "/coupon" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8" aria-label="Global">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">D</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-primary leading-5">드림캐쳐</span>
                <span className="text-xs text-muted-foreground">체험프로그램</span>
              </div>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-x-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative flex items-center h-16">
                {item.children ? (
                  <div
                    className="relative flex items-center h-full"
                    onMouseEnter={() => setOpenDropdown(item.name)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button className="flex items-center gap-x-1 text-sm font-semibold text-foreground hover:text-primary transition-colors h-full">
                      {item.name}
                      <ChevronDown className="h-4 w-4" aria-hidden="true" />
                    </button>
                    {openDropdown === item.name && (
                      <div className="absolute left-0 top-full z-50 mt-0 w-56 origin-top-left rounded-md bg-background border shadow-lg">
                        <div className="py-1">
                          {item.children.map((child) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground"
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="flex items-center text-sm font-semibold text-foreground hover:text-primary transition-colors h-full"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.children && (
                    <div className="ml-4">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block rounded-lg px-3 py-2 text-sm leading-7 text-gray-600 hover:bg-gray-50"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}