import { MessageCircle, MousePointerClick, PackageCheck, Utensils } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const steps = [
  { title: "تصفح المنيو", icon: Utensils },
  { title: "ضيف أكلك المفضل", icon: MousePointerClick },
  { title: "ابعت الطلب على واتساب", icon: MessageCircle },
  { title: "استلم أكلك فريش", icon: PackageCheck },
];

export function HowToOrder() {
  return (
    <section className="bg-smoke/45 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="طريقة الطلب"
          title="تجربة طلب بسيطة وسريعة للعميل"
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ title, icon: Icon }, index) => (
            <div
              key={title}
              className="rounded-lg border border-white/10 bg-white/[0.045] p-5"
            >
              <span className="grid h-12 w-12 place-items-center rounded-lg bg-flame/12 text-flame">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <p className="mt-5 text-sm font-black text-zinc-500">
                خطوة {index + 1}
              </p>
              <h3 className="mt-2 text-xl font-black text-bone">{title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
