"use client";

import { ArrowLeft, Flame, MessageCircle, Timer } from "lucide-react";
import { ImageWithFallback } from "./ImageWithFallback";

interface HeroProps {
  onStartOrder: () => void;
}

const badges = [
  { label: "طازج يوميًا", icon: Flame },
  { label: "توصيل سريع", icon: Timer },
  { label: "طلب على واتساب", icon: MessageCircle },
];

export function Hero({ onStartOrder }: HeroProps) {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-[82vh] items-center overflow-hidden pt-24"
    >
      <ImageWithFallback
        src="/images/hero-food.png"
        alt="برجر سموكي ودجاج كرسبي"
        priority
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        fallbackClassName="absolute inset-0 -z-20"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(270deg,rgba(11,11,15,0.96),rgba(11,11,15,0.78),rgba(11,11,15,0.35)),linear-gradient(0deg,rgba(11,11,15,0.96),rgba(11,11,15,0.10)_42%,rgba(11,11,15,0.92))]" />

      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-flame/30 bg-flame/10 px-4 py-2 text-sm font-bold text-gold shadow-glow">
            <Flame className="h-4 w-4" aria-hidden="true" />
            فاست فود سموكي بطابع سينمائي
          </div>

          <h1 className="max-w-4xl text-5xl font-black leading-[0.96] text-bone sm:text-6xl lg:text-7xl">
            برجر سموكي. دجاج كرسبي. طلب سريع على واتساب.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-200 sm:text-xl">
            اختار وجبتك، ضيفها للسلة، وابعت طلبك كامل مباشرة على واتساب.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onStartOrder}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-flame px-6 py-3 text-sm font-black text-charcoal shadow-glow transition hover:bg-gold"
          >
              اطلب الآن
              <ArrowLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <a
              href="#menu"
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/14 bg-white/8 px-6 py-3 text-sm font-black text-bone transition hover:border-flame/50 hover:bg-flame/15"
            >
              شوف المنيو
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            {badges.map(({ label, icon: Icon }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-charcoal/70 px-4 py-2 text-sm font-bold text-zinc-100 backdrop-blur"
              >
                <Icon className="h-4 w-4 text-flame" aria-hidden="true" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
