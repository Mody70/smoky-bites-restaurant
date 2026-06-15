"use client";

import type { MenuItem } from "@/types/menu";
import { ProductCard } from "./ProductCard";
import { SectionHeader } from "./SectionHeader";

interface PopularItemsProps {
  items: MenuItem[];
  onAdd: (item: MenuItem) => void;
  onQuickView: (item: MenuItem) => void;
}

export function PopularItems({ items, onAdd, onQuickView }: PopularItemsProps) {
  return (
    <section className="bg-smoke/45 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="اختيارات مفضلة"
          title="أكثر الطلبات اللي العملاء بيرجعوا لها"
          description="ثمانية اختيارات مميزة مع شارات واضحة، عرض تفاصيل، وإضافة سريعة للسلة."
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <ProductCard
              key={item.id}
              item={item}
              onAdd={onAdd}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
