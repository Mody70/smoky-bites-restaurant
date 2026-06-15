"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { menuCategories } from "@/data/menuItems";
import type { CategoryFilter, MenuItem } from "@/types/menu";
import { ProductCard } from "./ProductCard";
import { SectionHeader } from "./SectionHeader";

interface MenuSectionProps {
  items: MenuItem[];
  onAdd: (item: MenuItem) => void;
  onQuickView: (item: MenuItem) => void;
}

export function MenuSection({ items, onAdd, onQuickView }: MenuSectionProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return items.filter((item) => {
      const matchesCategory =
        activeCategory === "all" || item.category === activeCategory;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        item.name.toLowerCase().includes(normalizedQuery) ||
        item.description.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, items, query]);

  return (
    <section id="menu" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <SectionHeader
            eyebrow="المنيو الكامل"
            title="برجر، فرايد تشيكن، كومبو، إضافات، صوصات، مشروبات، وحلويات"
            description="ابحث في المنيو، فلتر حسب التصنيف، وخصص وجبتك من عرض التفاصيل."
          />

          <div className="relative">
            <Search
              className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="ابحث باسم المنتج أو الوصف"
              className="h-14 w-full rounded-lg border border-white/10 bg-white/[0.06] pl-4 pr-12 text-base font-semibold text-bone outline-none transition placeholder:text-zinc-500 focus:border-flame/70 focus:bg-white/[0.08]"
            />
          </div>
        </div>

        <div className="no-scrollbar mt-8 flex gap-2 overflow-x-auto pb-2">
          {menuCategories.map((category) => {
            const isActive = category.id === activeCategory;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.id)}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-black transition ${
                  isActive
                    ? "border-flame bg-flame text-charcoal"
                    : "border-white/10 bg-white/6 text-zinc-200 hover:border-flame/50 hover:bg-flame/15"
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        {filteredItems.length > 0 ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredItems.map((item) => (
              <ProductCard
                key={item.id}
                item={item}
                onAdd={onAdd}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-lg border border-white/10 bg-white/[0.045] p-10 text-center">
            <p className="text-xl font-black text-bone">مفيش منتجات مطابقة</p>
            <p className="mt-2 text-sm text-zinc-400">
              جرّب كلمة بحث تانية أو اختار تصنيف مختلف.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
