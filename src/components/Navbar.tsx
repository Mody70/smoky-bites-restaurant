"use client";

import { Menu, ShoppingBag, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "#home", label: "الرئيسية" },
  { href: "#menu", label: "المنيو" },
  { href: "#offers", label: "العروض" },
  { href: "#about", label: "عن المطعم" },
  { href: "#reviews", label: "آراء العملاء" },
  { href: "#contact", label: "تواصل معنا" },
];

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

export function Navbar({ cartCount, onCartClick }: NavbarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-charcoal/82 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#home" className="group inline-flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center overflow-hidden rounded-lg border border-flame/35 bg-ember/20 p-1 shadow-glow">
            <img
              src="/images/branding/smoky-bites-icon.png"
              alt="شعار سموكي بايتس"
              className="h-full w-full object-contain"
            />
          </span>
          <span>
            <span className="block text-lg font-black text-bone">
              سموكي بايتس
            </span>
            <span className="block text-xs font-semibold text-flame">
              برجر و فرايد تشيكن
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-zinc-300 transition hover:text-flame"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onCartClick}
            className="inline-flex h-11 items-center gap-2 rounded-lg border border-white/10 bg-white/8 px-3 text-sm font-bold text-bone transition hover:border-flame/50 hover:bg-flame/15"
            aria-label={`افتح السلة وبها ${cartCount} منتج`}
          >
            <ShoppingBag className="h-5 w-5 text-flame" aria-hidden="true" />
            <span className="hidden sm:inline">السلة</span>
            <span className="grid min-w-6 place-items-center rounded-full bg-flame px-2 py-0.5 text-xs text-charcoal">
              {cartCount}
            </span>
          </button>

          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-lg border border-white/10 bg-white/8 text-bone transition hover:border-flame/50 hover:bg-flame/15 lg:hidden"
            onClick={() => setIsMobileOpen((current) => !current)}
            aria-label={isMobileOpen ? "إغلاق القائمة" : "فتح القائمة"}
          >
            {isMobileOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {isMobileOpen ? (
        <div className="border-t border-white/10 bg-charcoal/96 px-4 py-4 shadow-2xl lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-bold text-zinc-200 transition hover:bg-white/8 hover:text-flame"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
