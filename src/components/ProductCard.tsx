"use client";

import { Eye, Plus } from "lucide-react";
import type { MenuItem } from "@/types/menu";
import { categoryLabelById } from "@/data/menuItems";
import { ImageWithFallback } from "./ImageWithFallback";

interface ProductCardProps {
  item: MenuItem;
  onAdd: (item: MenuItem) => void;
  onQuickView: (item: MenuItem) => void;
}

export function ProductCard({ item, onAdd, onQuickView }: ProductCardProps) {
  return (
    <article className="group overflow-hidden rounded-lg border border-white/10 bg-white/[0.045] shadow-inner-ember transition hover:-translate-y-1 hover:border-flame/35 hover:bg-white/[0.065] hover:shadow-glow">
      <div className="relative aspect-[4/3] overflow-hidden bg-smoke">
        <ImageWithFallback
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute right-3 top-3 rounded-full bg-charcoal/80 px-3 py-1 text-xs font-black text-gold backdrop-blur">
          {item.badge}
        </div>
        <div className="absolute bottom-3 right-3 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-bold text-zinc-100 backdrop-blur">
          {categoryLabelById[item.category]}
        </div>
      </div>

      <div className="flex min-h-64 flex-col p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-black leading-snug text-bone">{item.name}</h3>
          <p className="shrink-0 text-lg font-black text-gold">
            {item.price} جنيه
          </p>
        </div>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-zinc-300">
          {item.description}
        </p>

        <div className="mt-auto grid grid-cols-[1fr_auto] gap-2 pt-5">
          <button
            type="button"
            onClick={() => onAdd(item)}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-flame px-4 py-2 text-sm font-black text-charcoal transition hover:bg-gold"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            أضف للسلة
          </button>
          <button
            type="button"
            onClick={() => onQuickView(item)}
            className="grid h-11 w-11 place-items-center rounded-lg border border-white/10 bg-white/8 text-zinc-100 transition hover:border-flame/50 hover:bg-flame/15"
            aria-label={`عرض تفاصيل ${item.name}`}
            title="عرض التفاصيل"
          >
            <Eye className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}
