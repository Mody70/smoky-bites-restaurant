"use client";

import { Bike, Store } from "lucide-react";
import type { CheckoutDetails, CheckoutErrors } from "@/types/menu";

interface CheckoutFormProps {
  checkout: CheckoutDetails;
  errors: CheckoutErrors;
  onChange: (checkout: CheckoutDetails) => void;
}

export function CheckoutForm({ checkout, errors, onChange }: CheckoutFormProps) {
  const updateField = <K extends keyof CheckoutDetails>(
    field: K,
    value: CheckoutDetails[K],
  ) => {
    onChange({ ...checkout, [field]: value });
  };

  return (
    <div className="space-y-4">
      <div>
        <p className="mb-2 text-sm font-black text-zinc-400">
          طريقة الاستلام
        </p>
        <div className="grid grid-cols-2 gap-2 rounded-lg border border-white/10 bg-white/[0.04] p-1">
          <button
            type="button"
            onClick={() => updateField("fulfillment", "delivery")}
            className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-black transition ${
              checkout.fulfillment === "delivery"
                ? "bg-flame text-charcoal"
                : "text-zinc-300 hover:bg-white/8"
            }`}
          >
            <Bike className="h-4 w-4" aria-hidden="true" />
            توصيل
          </button>
          <button
            type="button"
            onClick={() => updateField("fulfillment", "pickup")}
            className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-black transition ${
              checkout.fulfillment === "pickup"
                ? "bg-flame text-charcoal"
                : "text-zinc-300 hover:bg-white/8"
            }`}
          >
            <Store className="h-4 w-4" aria-hidden="true" />
            استلام من الفرع
          </button>
        </div>
      </div>

      <label className="block">
        <span className="text-sm font-bold text-zinc-200">اسم العميل</span>
        <input
          type="text"
          value={checkout.name}
          onChange={(event) => updateField("name", event.target.value)}
          className="mt-2 h-12 w-full rounded-lg border border-white/10 bg-white/[0.06] px-4 text-sm font-semibold text-bone outline-none transition placeholder:text-zinc-500 focus:border-flame/70"
          placeholder="اكتب اسمك"
        />
        {errors.name ? (
          <span className="mt-1 block text-xs font-bold text-flame">
            {errors.name}
          </span>
        ) : null}
      </label>

      <label className="block">
        <span className="text-sm font-bold text-zinc-200">رقم الموبايل</span>
        <input
          type="tel"
          value={checkout.phone}
          onChange={(event) => updateField("phone", event.target.value)}
          className="mt-2 h-12 w-full rounded-lg border border-white/10 bg-white/[0.06] px-4 text-sm font-semibold text-bone outline-none transition placeholder:text-zinc-500 focus:border-flame/70"
          placeholder="01XXXXXXXXX"
        />
        {errors.phone ? (
          <span className="mt-1 block text-xs font-bold text-flame">
            {errors.phone}
          </span>
        ) : null}
      </label>

      <label className="block">
        <span className="text-sm font-bold text-zinc-200">العنوان / المنطقة</span>
        <textarea
          value={checkout.address}
          onChange={(event) => updateField("address", event.target.value)}
          rows={3}
          className="mt-2 w-full resize-none rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-semibold text-bone outline-none transition placeholder:text-zinc-500 focus:border-flame/70"
          placeholder={
            checkout.fulfillment === "delivery"
              ? "المنطقة، الشارع، رقم العمارة، الشقة"
              : "ملاحظة اختيارية للاستلام"
          }
        />
        {errors.address ? (
          <span className="mt-1 block text-xs font-bold text-flame">
            {errors.address}
          </span>
        ) : null}
      </label>

      <label className="block">
        <span className="text-sm font-bold text-zinc-200">ملاحظات على الطلب</span>
        <textarea
          value={checkout.notes}
          onChange={(event) => updateField("notes", event.target.value)}
          rows={3}
          className="mt-2 w-full resize-none rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-semibold text-bone outline-none transition placeholder:text-zinc-500 focus:border-flame/70"
          placeholder="بدون بصل، سبايسي زيادة، كلموني عند الوصول..."
        />
      </label>
    </div>
  );
}
