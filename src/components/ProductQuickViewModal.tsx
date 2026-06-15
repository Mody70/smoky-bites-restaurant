"use client";

import { Minus, Plus, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { addOns, categoryLabelById } from "@/data/menuItems";
import type { CartAddOn, MenuItem } from "@/types/menu";
import { ImageWithFallback } from "./ImageWithFallback";

interface ProductQuickViewModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAdd: (item: MenuItem, selectedAddOns: CartAddOn[], quantity: number) => void;
}

export function ProductQuickViewModal({
  item,
  onClose,
  onAdd,
}: ProductQuickViewModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>([]);

  useEffect(() => {
    setQuantity(1);
    setSelectedAddOnIds([]);
  }, [item]);

  useEffect(() => {
    if (!item) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [item, onClose]);

  const availableAddOns = useMemo(() => {
    if (!item) {
      return [];
    }

    return addOns.filter((addOn) => addOn.appliesTo.includes(item.category));
  }, [item]);

  const selectedAddOns = useMemo(
    () =>
      availableAddOns
        .filter((addOn) => selectedAddOnIds.includes(addOn.id))
        .map(({ id, name, price }) => ({ id, name, price })),
    [availableAddOns, selectedAddOnIds],
  );

  if (!item) {
    return null;
  }

  const addOnsTotal = selectedAddOns.reduce((sum, addOn) => sum + addOn.price, 0);
  const total = (item.price + addOnsTotal) * quantity;

  const toggleAddOn = (addOnId: string) => {
    setSelectedAddOnIds((current) =>
      current.includes(addOnId)
        ? current.filter((id) => id !== addOnId)
        : [...current, addOnId],
    );
  };

  return (
    <div className="fixed inset-0 z-[70] grid place-items-end bg-black/72 p-0 backdrop-blur-sm sm:place-items-center sm:p-4">
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        onClick={onClose}
        aria-label="إغلاق عرض التفاصيل"
      />

      <section
        role="dialog"
        aria-modal="true"
        aria-label={item.name}
        className="relative max-h-[92vh] w-full overflow-hidden rounded-t-lg border border-white/10 bg-charcoal shadow-2xl sm:max-w-4xl sm:rounded-lg"
      >
        <div className="grid max-h-[92vh] overflow-y-auto lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative min-h-72 overflow-hidden bg-smoke">
            <ImageWithFallback
              src={item.image}
              alt={item.name}
              className="h-full min-h-72 w-full object-cover"
            />
            <div className="absolute right-4 top-4 rounded-full bg-charcoal/80 px-3 py-1 text-xs font-black text-gold backdrop-blur">
              {item.badge}
            </div>
          </div>

          <div className="p-5 sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-black text-flame">
                  {categoryLabelById[item.category]}
                </p>
                <h2 className="mt-2 text-3xl font-black leading-tight text-bone">
                  {item.name}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/8 text-zinc-100 transition hover:border-flame/50 hover:bg-flame/15"
                aria-label="إغلاق عرض التفاصيل"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <p className="mt-4 text-base leading-7 text-zinc-300">
              {item.description}
            </p>
            <p className="mt-5 text-3xl font-black text-gold">
              {item.price} جنيه
            </p>

            {availableAddOns.length > 0 ? (
              <div className="mt-7">
                <p className="text-sm font-black text-zinc-400">
                  الإضافات
                </p>
                <div className="mt-3 grid gap-2">
                  {availableAddOns.map((addOn) => {
                    const selected = selectedAddOnIds.includes(addOn.id);

                    return (
                      <label
                        key={addOn.id}
                        className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 transition ${
                          selected
                            ? "border-flame bg-flame/12"
                            : "border-white/10 bg-white/[0.045] hover:border-white/20"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={selected}
                            onChange={() => toggleAddOn(addOn.id)}
                            className="h-4 w-4 accent-flame"
                          />
                          <span className="font-bold text-bone">{addOn.name}</span>
                        </span>
                        <span className="text-sm font-black text-gold">
                          +{addOn.price} جنيه
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            ) : null}

            <div className="mt-7 flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/[0.045] p-3">
              <span className="text-sm font-black text-zinc-400">
                الكمية
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                  className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/8 text-bone transition hover:border-flame/50 hover:bg-flame/15"
                  aria-label="تقليل الكمية"
                >
                  <Minus className="h-4 w-4" aria-hidden="true" />
                </button>
                <span className="grid h-10 min-w-12 place-items-center text-lg font-black text-bone">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((current) => current + 1)}
                  className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/8 text-bone transition hover:border-flame/50 hover:bg-flame/15"
                  aria-label="زيادة الكمية"
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                onAdd(item, selectedAddOns, quantity);
                onClose();
              }}
              className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-flame px-5 py-3 text-sm font-black text-charcoal transition hover:bg-gold"
            >
              <Plus className="h-5 w-5" aria-hidden="true" />
              أضف للسلة - {total} جنيه
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
