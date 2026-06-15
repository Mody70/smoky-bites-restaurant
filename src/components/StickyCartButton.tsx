"use client";

import { ShoppingBag } from "lucide-react";

interface StickyCartButtonProps {
  count: number;
  total: number;
  onClick: () => void;
}

export function StickyCartButton({ count, total, onClick }: StickyCartButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="fixed bottom-4 left-4 right-4 z-40 inline-flex min-h-14 items-center justify-center gap-3 rounded-lg border border-flame/30 bg-charcoal/92 px-5 py-3 text-sm font-black text-bone shadow-glow backdrop-blur transition hover:border-flame hover:bg-smoke sm:left-5 sm:right-auto"
      aria-label={`افتح السلة وبها ${count} منتج`}
    >
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-flame text-charcoal">
        <ShoppingBag className="h-5 w-5" aria-hidden="true" />
      </span>
      <span>{count} منتج</span>
      <span className="text-gold">{total} جنيه</span>
    </button>
  );
}
