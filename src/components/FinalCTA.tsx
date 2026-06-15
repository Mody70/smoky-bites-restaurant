"use client";

import { ArrowLeft } from "lucide-react";

interface FinalCTAProps {
  onStartOrder: () => void;
}

export function FinalCTA({ onStartOrder }: FinalCTAProps) {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-lg border border-flame/25 bg-[linear-gradient(135deg,rgba(185,28,28,0.28),rgba(249,115,22,0.12),rgba(24,24,27,0.92))] p-8 shadow-glow sm:p-10 lg:p-12">
        <div className="max-w-3xl">
          <p className="text-sm font-black text-gold">
            آخر نداء للجوعانين
          </p>
          <h2 className="mt-3 text-4xl font-black leading-tight text-bone sm:text-5xl">
            جاهز تطلب وجبتك السموكي المفضلة؟
          </h2>
          <button
            type="button"
            onClick={onStartOrder}
            className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-flame px-6 py-3 text-sm font-black text-charcoal transition hover:bg-gold"
          >
            ابدأ طلبك
            <ArrowLeft className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
