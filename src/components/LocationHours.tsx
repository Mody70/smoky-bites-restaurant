import { Clock, MapPin } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

export function LocationHours() {
  return (
    <section id="contact" className="bg-smoke/45 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="زورنا"
          title="طعم من القاهرة وساعات عمل لآخر الليل"
          description="بيانات المكان والمواعيد مكتوبة كبيانات جاهزة لعرض عميل مطعم."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <div className="rounded-lg border border-white/10 bg-white/[0.045] p-6">
            <span className="grid h-12 w-12 place-items-center rounded-lg bg-flame/12 text-flame">
              <MapPin className="h-6 w-6" aria-hidden="true" />
            </span>
            <h3 className="mt-5 text-2xl font-black text-bone">الموقع</h3>
            <p className="mt-2 text-zinc-300">القاهرة، مصر</p>
            <a
              href="https://maps.google.com/?q=Cairo%2C%20Egypt"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg border border-white/10 bg-white/8 px-5 py-2 text-sm font-black text-bone transition hover:border-flame/50 hover:bg-flame/15"
            >
              افتح خرائط جوجل
            </a>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.045] p-6">
            <span className="grid h-12 w-12 place-items-center rounded-lg bg-flame/12 text-flame">
              <Clock className="h-6 w-6" aria-hidden="true" />
            </span>
            <h3 className="mt-5 text-2xl font-black text-bone">مواعيد العمل</h3>
            <p className="mt-2 text-zinc-300">12 ظهرًا - 2 صباحًا</p>
            <p className="mt-6 text-sm leading-7 text-zinc-400">
              التوصيل والاستلام من الفرع متاحين خلال مواعيد العمل.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
