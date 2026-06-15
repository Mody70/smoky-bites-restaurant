import { Camera, Music2, Share2 } from "lucide-react";

const links = [
  { href: "#home", label: "الرئيسية" },
  { href: "#menu", label: "المنيو" },
  { href: "#offers", label: "العروض" },
  { href: "#about", label: "عن المطعم" },
  { href: "#reviews", label: "آراء العملاء" },
  { href: "#contact", label: "تواصل معنا" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-charcoal px-4 pb-24 pt-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.1fr_0.9fr_0.8fr]">
        <div>
          <div className="mb-5 flex h-20 w-full max-w-64 items-center justify-start rounded-lg border border-white/10 bg-white/[0.035] px-4 shadow-inner-ember">
            <img
              src="/images/branding/smoky-bites-logo.png"
              alt="لوجو سموكي بايتس الكامل"
              className="max-h-14 w-full object-contain object-right"
            />
          </div>
          <p className="text-2xl font-black text-bone">سموكي بايتس</p>
          <p className="mt-3 max-w-md text-sm leading-7 text-zinc-400">
            هذا موقع طلبات مطعم خيالي تم إنشاؤه كمفهوم بورتفوليو.
          </p>
        </div>

        <div>
          <p className="text-sm font-black text-zinc-500">
            روابط سريعة
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-bold text-zinc-300 transition hover:text-flame"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-black text-zinc-500">
            السوشيال
          </p>
          <div className="mt-4 flex gap-2">
            {[
              { label: "إنستجرام", icon: Camera },
              { label: "فيسبوك", icon: Share2 },
              { label: "تيك توك", icon: Music2 },
            ].map(({ label, icon: Icon }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="grid h-11 w-11 place-items-center rounded-lg border border-white/10 bg-white/8 text-zinc-200 transition hover:border-flame/50 hover:bg-flame/15 hover:text-flame"
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
