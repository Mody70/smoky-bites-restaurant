import { Star } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const reviews = [
  {
    quote: "الدبل سماش بصراحة إدمان.",
    name: "مريم أ.",
  },
  {
    quote: "التوصيل سريع والأكل وصل سخن.",
    name: "عمر ك.",
  },
  {
    quote: "تجربة الطلب على واتساب سهلة جدًا.",
    name: "نور س.",
  },
];

export function Reviews() {
  return (
    <section id="reviews" className="bg-smoke/45 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="آراء العملاء"
          title="آراء خيالية بتدي إحساس مطعم حقيقي"
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {reviews.map((review) => (
            <article
              key={review.quote}
              className="rounded-lg border border-white/10 bg-white/[0.045] p-6"
            >
              <div className="flex gap-1 text-gold" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-5 text-xl font-black leading-snug text-bone">
                "{review.quote}"
              </p>
              <p className="mt-5 text-sm font-bold text-zinc-400">{review.name}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
