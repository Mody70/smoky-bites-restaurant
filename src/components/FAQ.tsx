"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { SectionHeader } from "./SectionHeader";

const faqs = [
  {
    question: "هل في توصيل؟",
    answer:
      "أيوه، التوصيل متاح برسوم 30 جنيه، وبيبقى مجاني لما الإجمالي الفرعي يوصل 500 جنيه.",
  },
  {
    question: "ينفع أستلم الطلب من الفرع؟",
    answer:
      "أيوه، اختار استلام من الفرع في نموذج الطلب ورسوم التوصيل هتتشال من الإجمالي.",
  },
  {
    question: "ينفع أخصص البرجر؟",
    answer:
      "أيوه، افتح عرض التفاصيل للمنتجات المتاحة وضيف جبنة، قطعة لحم، دجاج كرسبي، صوص، أو خليه كومبو.",
  },
  {
    question: "أأكد الطلب إزاي؟",
    answer:
      "بعد ما واتساب يفتح، ابعت الرسالة المجهزة لرقم المطعم عشان تأكد الطلب.",
  },
  {
    question: "هل ده مطعم حقيقي؟",
    answer:
      "لا. سموكي بايتس موقع مطعم خيالي معمول كمفهوم بورتفوليو.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeader
          eyebrow="أسئلة شائعة"
          title="إجابات سريعة قبل إرسال الطلب"
          description="تفاصيل طلب واضحة لموقع مطعم من غير أي تعقيد أو باك إند."
        />

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = index === openIndex;

            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.045]"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-right"
                >
                  <span className="font-black text-bone">{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-flame transition ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>
                {isOpen ? (
                  <div className="border-t border-white/10 px-5 py-4 text-sm leading-7 text-zinc-300">
                    {faq.answer}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
