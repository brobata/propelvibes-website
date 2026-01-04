"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  LogIn,
  ChevronDown,
  Sparkles,
  Shield,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/launches", label: "Launches" },
  { href: "/developers", label: "Developers" },
  { href: "/how-it-works", label: "How It Works" },
];

const categoryLinks = [
  { href: "/launches?tech=OpenAI+API", label: "AI Apps" },
  { href: "/launches?tech=React+Native", label: "Mobile" },
  { href: "/launches?services=feature_development", label: "SaaS" },
  { href: "/launches?services=full_launch", label: "Full Launch" },
];

const valueProps = [
  { icon: Sparkles, label: "Vibe Coders Welcome" },
  { icon: Shield, label: "Verified Developers" },
  { icon: Zap, label: "Ship Faster" },
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
    <>
      {/* Top Bar - Value Props */}
      <div className="bg-primary text-text-inverse text-xs py-1.5 hidden md:block">
        <div className="container-custom flex items-center justify-center gap-6">
          {valueProps.map((prop) => (
            <div key={prop.label} className="flex items-center gap-1.5">
              <prop.icon className="w-3.5 h-3.5" />
              <span>{prop.label}</span>
            </div>
          ))}
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 left-0 right-0 z-50 bg-background-pure border-b",
          isScrolled ? "border-border shadow-sm" : "border-border"
        )}
      >
        <nav className="container-custom">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-lg text-text-primary hover:text-primary"
            >
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Sparkles className="w-4.5 h-4.5 text-white" />
              </div>
              <span>Propel Vibes</span>
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
                  <div className="absolute top-full left-0 mt-0 w-40 bg-background-pure border border-border rounded shadow-md">
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
                    "px-3 py-1.5 text-sm",
                    pathname === link.href
                      ? "text-primary font-medium"
                      : "text-text-secondary hover:text-text-primary"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-2">
              <Link
                href="/login"
                className="px-3 py-1.5 text-sm text-text-secondary hover:text-text-primary"
              >
                Log In
              </Link>
              <Button size="sm" asChild>
                <Link href="/post-launch">
                  Post Launch
                </Link>
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
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="fixed inset-0 bg-black/30"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed top-14 left-0 right-0 bg-background-pure border-b border-border shadow-md">
            <div className="py-2">
              {/* Categories */}
              <div className="px-4 py-2 border-b border-border">
                <p className="text-xs font-medium text-text-muted uppercase mb-2">
                  Categories
                </p>
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
                      ? "text-primary font-medium bg-primary-50"
                      : "text-text-secondary hover:text-text-primary hover:bg-surface"
                  )}
                >
                  {link.label}
                </Link>
              ))}

              {/* Actions */}
              <div className="px-4 py-3 border-t border-border flex gap-2">
                <Link
                  href="/login"
                  className="flex-1 text-center py-2 text-sm border border-border rounded text-text-secondary hover:text-text-primary"
                >
                  Log In
                </Link>
                <Link
                  href="/post-launch"
                  className="flex-1 text-center py-2 text-sm bg-primary text-white rounded hover:bg-primary-dark"
                >
                  Post Launch
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
