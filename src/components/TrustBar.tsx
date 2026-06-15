import { Bike, Leaf, MessageCircle, Store } from "lucide-react";

const items = [
  { label: "مكونات فريش", icon: Leaf },
  { label: "توصيل سريع", icon: Bike },
  { label: "طلب آمن على واتساب", icon: MessageCircle },
  { label: "استلام من الفرع", icon: Store },
];

export function TrustBar() {
  return (
    <section className="border-y border-white/10 bg-smoke/70">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-4 py-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        {items.map(({ label, icon: Icon }) => (
          <div key={label} className="flex items-center gap-3 px-2 py-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-flame/12 text-flame">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="text-sm font-bold text-zinc-100">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
