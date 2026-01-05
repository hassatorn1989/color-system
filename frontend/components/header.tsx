"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./mode-toggle";

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-0 lg:px-0">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-primary">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                ChromaLab
              </span>
            </Link>
          </div>

          {/* Desktop Menu - Updated menu text to Thai */}
          <div className="hidden md:flex gap-8">
            <Link
              href="/color-wheel"
              className="text-foreground/70 hover:text-foreground transition font-medium"
            >
              วงจรสี
            </Link>
            <Link
              href="/color-patterns"
              className="text-foreground/70 hover:text-foreground transition font-medium"
            >
              แบบรูปสี
            </Link>
            <Link
              href="/contrast-checker"
              className="text-foreground/70 hover:text-foreground transition font-medium"
            >
              ตรวจความคม
            </Link>
            <Link
              href="/about"
              className="text-foreground/70 hover:text-foreground transition font-medium"
            >
              เกี่ยวกับเรา
            </Link>
            <Link
              href="/contact"
              className="text-foreground/70 hover:text-foreground transition font-medium"
            >
              ติดต่อเรา
            </Link>

            {/* <ModeToggle /> */}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        {/* Mobile Menu - Updated menu text to Thai */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link
              href="/color-wheel"
              className="block px-4 py-2 text-foreground/70 hover:text-foreground hover:bg-muted rounded-md transition"
            >
              วงจรสี
            </Link>
            <Link
              href="/color-patterns"
              className="block px-4 py-2 text-foreground/70 hover:text-foreground hover:bg-muted rounded-md transition"
            >
              แบบรูปสี
            </Link>
            <Link
              href="/contrast-checker"
              className="block px-4 py-2 text-foreground/70 hover:text-foreground hover:bg-muted rounded-md transition"
            >
              ตรวจความคม
            </Link>
            <Link
              href="/about"
              className="block px-4 py-2 text-foreground/70 hover:text-foreground hover:bg-muted rounded-md transition"
            >
              เกี่ยวกับเรา
            </Link>
            <Link
              href="/contact"
              className="block px-4 py-2 text-foreground/70 hover:text-foreground hover:bg-muted rounded-md transition"
            >
              ติดต่อเรา
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
