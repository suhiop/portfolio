'use client';

import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@/lib/utils/cn';
import { CATEGORIES, SCOPES } from '@/lib/types';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-[rgba(0,0,0,0.1)]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl md:text-2xl font-heading font-bold tracking-tight hover:opacity-70 transition-opacity"
          >
            GRAPHII—GRAPHY
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              <span className="text-sm text-text-secondary">Work</span>
              {CATEGORIES.map((category) => (
                <Link
                  key={category}
                  href={`/?category=${encodeURIComponent(category)}`}
                  className="text-sm text-text-primary hover:opacity-70 transition-opacity"
                >
                  {category}
                </Link>
              ))}
            </div>

            <div className="h-4 w-px bg-border" />

            <div className="flex items-center gap-4">
              {SCOPES.map((scope) => (
                <Link
                  key={scope}
                  href={`/?scope=${encodeURIComponent(scope)}`}
                  className="text-xs px-3 py-1 rounded-full border border-border hover:bg-black hover:text-white transition-colors"
                >
                  {scope}
                </Link>
              ))}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:opacity-70 transition-opacity"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={cn(
                "block h-0.5 w-full bg-current transition-transform",
                mobileMenuOpen && "rotate-45 translate-y-2"
              )} />
              <span className={cn(
                "block h-0.5 w-full bg-current transition-opacity",
                mobileMenuOpen && "opacity-0"
              )} />
              <span className={cn(
                "block h-0.5 w-full bg-current transition-transform",
                mobileMenuOpen && "-rotate-45 -translate-y-2"
              )} />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <div>
                <span className="text-xs text-text-secondary mb-2 block">Categories</span>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((category) => (
                    <Link
                      key={category}
                      href={`/?category=${encodeURIComponent(category)}`}
                      className="text-sm text-text-primary hover:opacity-70"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs text-text-secondary mb-2 block">Scope</span>
                <div className="flex flex-wrap gap-2">
                  {SCOPES.map((scope) => (
                    <Link
                      key={scope}
                      href={`/?scope=${encodeURIComponent(scope)}`}
                      className="text-xs px-3 py-1 rounded-full border border-border"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {scope}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
