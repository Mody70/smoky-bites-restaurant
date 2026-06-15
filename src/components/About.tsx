import { Flame } from "lucide-react";
import { ImageWithFallback } from "./ImageWithFallback";
import { SectionHeader } from "./SectionHeader";

export function About() {
  return (
    <section id="about" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="relative min-h-96 overflow-hidden rounded-lg border border-white/10 bg-smoke shadow-glow">
          <ImageWithFallback
            src="/images/about-kitchen.png"
          alt="مطبخ سموكي بايتس"
            className="h-full min-h-96 w-full object-cover"
          />
          <div className="absolute bottom-5 right-5 inline-flex items-center gap-2 rounded-full bg-charcoal/80 px-4 py-2 text-sm font-black text-gold backdrop-blur">
            <Flame className="h-4 w-4" aria-hidden="true" />
            مشوي على النار. مقلي فريش.
          </div>
        </div>

        <div>
          <SectionHeader
            eyebrow="عن سموكي بايتس"
            title="مفهوم فاست فود بريميوم بطابع غامق وطعم جريء"
            description="سموكي بايتس مطعم خيالي للبرجر والفرايد تشيكن مبني على نكهة سموكي، قرمشة واضحة، صوصات دافية، وتجربة طلب سهلة على واتساب. الهوية بتجمع بين شكل سينمائي غامق وتجربة استخدام عملية تصلح لعرض بورتفوليو احترافي."
          />

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              ["36", "عنصر في المنيو"],
              ["12 ظهرًا", "ميعاد الفتح"],
              ["2 صباحًا", "آخر الطلبات"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-lg border border-white/10 bg-white/[0.045] p-5"
              >
                <p className="text-3xl font-black text-gold">{value}</p>
                <p className="mt-1 text-sm font-bold text-zinc-400">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
