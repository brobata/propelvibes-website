"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/how-it-works", label: "How It Works", highlight: true },
  { href: "/launches", label: "Browse Launches" },
  { href: "/developers", label: "Find Developers" },
];

const categoryLinks = [
  { href: "/launches?tech=OpenAI+API", label: "AI Apps" },
  { href: "/launches?tech=React+Native", label: "Mobile" },
  { href: "/launches?services=feature_development", label: "SaaS" },
  { href: "/launches?services=full_launch", label: "Full Launch" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setShowCategories(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 left-0 right-0 z-50 bg-white border-b",
        isScrolled ? "border-border shadow-sm" : "border-border"
      )}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-12">
          {/* Logo - Simple text */}
          <Link
            href="/"
            className="font-semibold text-lg text-text-primary hover:text-primary"
          >
            Propel Vibes
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {/* Categories Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setShowCategories(true)}
              onMouseLeave={() => setShowCategories(false)}
            >
              <button
                className={cn(
                  "flex items-center gap-1 px-3 py-1.5 text-sm",
                  showCategories
                    ? "text-primary"
                    : "text-text-secondary hover:text-text-primary"
                )}
              >
                Categories
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {showCategories && (
                <div className="absolute top-full left-0 mt-0 w-40 bg-white border border-border rounded shadow-md">
                  <div className="py-1">
                    {categoryLinks.map((category) => (
                      <Link
                        key={category.href}
                        href={category.href}
                        className="block px-3 py-1.5 text-sm text-text-secondary hover:text-primary hover:bg-surface"
                      >
                        {category.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-1.5 text-sm rounded-md transition-colors",
                  pathname === link.href
                    ? "text-primary font-medium"
                    : link.highlight
                    ? "text-primary font-medium bg-primary-50 hover:bg-primary-100"
                    : "text-text-secondary hover:text-text-primary"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            {/* TODO: Re-enable when auth is ready
            <Link
              href="/login"
              className="text-sm text-primary hover:underline"
            >
              Sign in
            </Link>
            */}
            <Button size="sm" className="cursor-default opacity-75" disabled>
              Post a Launch
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-text-secondary hover:text-text-primary"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden" style={{ top: "48px" }}>
          <div
            className="fixed inset-0 bg-black/20"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="relative bg-white border-b border-border shadow-md">
            <div className="py-2">
              {/* Categories */}
              <div className="px-4 py-2 border-b border-border">
                <p className="text-xs text-text-muted mb-2">Categories</p>
                <div className="flex flex-wrap gap-2">
                  {categoryLinks.map((category) => (
                    <Link
                      key={category.href}
                      href={category.href}
                      className="px-2 py-1 text-sm border border-border rounded text-text-secondary hover:text-primary hover:border-primary"
                    >
                      {category.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Nav Links */}
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "block px-4 py-2 text-sm",
                    pathname === link.href
                      ? "text-primary font-medium"
                      : "text-text-secondary hover:text-text-primary hover:bg-surface"
                  )}
                >
                  {link.label}
                </Link>
              ))}

              {/* Actions */}
              <div className="px-4 py-3 border-t border-border">
                <button
                  disabled
                  className="block w-full text-center py-2 text-sm bg-primary/75 text-white rounded cursor-default"
                >
                  Post a Launch
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
