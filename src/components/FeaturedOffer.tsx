"use client";

import { Plus, Sparkles } from "lucide-react";
import type { MenuItem } from "@/types/menu";
import { ImageWithFallback } from "./ImageWithFallback";
import { SectionHeader } from "./SectionHeader";

interface FeaturedOfferProps {
  item: MenuItem;
  onAdd: (item: MenuItem) => void;
}

export function FeaturedOffer({ item, onAdd }: FeaturedOfferProps) {
  return (
    <section id="offers" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="عرض مميز"
          title="وجبة كلاسيك برجر"
          description="عرض واضح وجذاب لعميل مطعم حقيقي، بتصميم قوي وزر طلب مباشر."
        />

        <div className="mt-10 grid overflow-hidden rounded-lg border border-flame/20 bg-[linear-gradient(135deg,rgba(185,28,28,0.24),rgba(24,24,27,0.92))] shadow-glow lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative min-h-80 overflow-hidden">
            <ImageWithFallback
              src={item.image}
              alt={item.name}
              className="h-full min-h-80 w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
          </div>

          <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-gold px-4 py-2 text-xs font-black text-charcoal">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              عرض اليوم
            </div>
            <h3 className="mt-6 text-4xl font-black leading-tight text-bone">
              {item.name}
            </h3>
            <p className="mt-3 text-xl font-bold text-flame">
              برجر + بطاطس + مشروب
            </p>
            <p className="mt-4 max-w-xl text-base leading-7 text-zinc-300">
              {item.description}
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-4xl font-black text-gold">199 جنيه</p>
              <button
                type="button"
                onClick={() => onAdd(item)}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-flame px-6 py-3 text-sm font-black text-charcoal transition hover:bg-gold"
              >
                <Plus className="h-5 w-5" aria-hidden="true" />
                أضف للسلة
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
