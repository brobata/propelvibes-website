"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Rocket,
  Code2,
  ChevronDown,
  LogIn,
  UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/launches", label: "Browse Launches" },
  { href: "/developers", label: "Find Developers" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
            : "bg-transparent"
        )}
      >
        <nav className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 font-semibold text-xl text-text-primary hover:text-primary transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <span>Propel Vibes</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                    pathname === link.href
                      ? "text-primary bg-primary-50"
                      : "text-text-secondary hover:text-text-primary hover:bg-surface"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">
                  <LogIn className="w-4 h-4" />
                  Log In
                </Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/signup">
                  <UserPlus className="w-4 h-4" />
                  Get Started
                </Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-text-secondary hover:text-text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-background z-50 md:hidden shadow-xl"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <Link
                    href="/"
                    className="flex items-center gap-2 font-semibold text-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                      <Rocket className="w-5 h-5 text-white" />
                    </div>
                    <span>Propel Vibes</span>
                  </Link>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-text-secondary hover:text-text-primary"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 overflow-y-auto py-4">
                  <div className="px-2 space-y-1">
                    {navLinks.map((link, index) => (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          href={link.href}
                          className={cn(
                            "flex items-center px-4 py-3 text-base font-medium rounded-lg transition-colors",
                            pathname === link.href
                              ? "text-primary bg-primary-50"
                              : "text-text-secondary hover:text-text-primary hover:bg-surface"
                          )}
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  {/* Divider */}
                  <div className="my-4 mx-4 border-t border-border" />

                  {/* Quick Actions */}
                  <div className="px-4 space-y-2">
                    <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-3">
                      Quick Actions
                    </p>
                    <Link
                      href="/post-launch"
                      className="flex items-center gap-3 px-4 py-3 bg-surface rounded-lg text-text-secondary hover:text-text-primary transition-colors"
                    >
                      <Rocket className="w-5 h-5 text-primary" />
                      <span className="font-medium">Post a Launch</span>
                    </Link>
                    <Link
                      href="/developers"
                      className="flex items-center gap-3 px-4 py-3 bg-surface rounded-lg text-text-secondary hover:text-text-primary transition-colors"
                    >
                      <Code2 className="w-5 h-5 text-primary" />
                      <span className="font-medium">Find Work</span>
                    </Link>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="p-4 border-t border-border space-y-2">
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/login">
                      <LogIn className="w-4 h-4" />
                      Log In
                    </Link>
                  </Button>
                  <Button className="w-full" asChild>
                    <Link href="/signup">
                      <UserPlus className="w-4 h-4" />
                      Get Started
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
