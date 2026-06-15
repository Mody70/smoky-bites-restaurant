"use client";

import { MessageCircle, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import type {
  CartItem,
  CheckoutDetails,
  CheckoutErrors,
} from "@/types/menu";
import { ImageWithFallback } from "./ImageWithFallback";
import { CheckoutForm } from "./CheckoutForm";

interface CartDrawerProps {
  isOpen: boolean;
  cart: CartItem[];
  checkout: CheckoutDetails;
  errors: CheckoutErrors;
  subtotal: number;
  deliveryFee: number;
  finalTotal: number;
  onClose: () => void;
  onCheckoutChange: (checkout: CheckoutDetails) => void;
  onIncrement: (cartItemId: string) => void;
  onDecrement: (cartItemId: string) => void;
  onRemove: (cartItemId: string) => void;
  onCheckout: () => void;
}

const itemUnitTotal = (item: CartItem) =>
  item.basePrice + item.selectedAddOns.reduce((sum, addOn) => sum + addOn.price, 0);

export function CartDrawer({
  isOpen,
  cart,
  checkout,
  errors,
  subtotal,
  deliveryFee,
  finalTotal,
  onClose,
  onCheckoutChange,
  onIncrement,
  onDecrement,
  onRemove,
  onCheckout,
}: CartDrawerProps) {
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div
      className={`fixed inset-0 z-[60] transition ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!isOpen}
    >
      <button
        type="button"
        className={`absolute inset-0 bg-black/68 backdrop-blur-sm transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
        aria-label="إغلاق السلة"
      />

      <aside
        className={`absolute bottom-0 left-0 flex h-[92vh] w-full flex-col overflow-hidden rounded-t-lg border border-white/10 bg-charcoal shadow-2xl transition-transform duration-300 md:top-0 md:h-full md:max-w-[480px] md:rounded-none md:border-y-0 md:border-l-0 ${
          isOpen ? "translate-y-0 md:translate-x-0" : "translate-y-full md:-translate-x-full md:translate-y-0"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="سلة الطلبات"
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-lg bg-flame/12 text-flame">
              <ShoppingBag className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-lg font-black text-bone">سلتك</p>
              <p className="text-sm font-semibold text-zinc-400">
                {cartCount} منتج
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/8 text-zinc-100 transition hover:border-flame/50 hover:bg-flame/15"
            aria-label="إغلاق السلة"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          {errors.cart ? (
            <div className="mb-4 rounded-lg border border-flame/30 bg-flame/10 p-3 text-sm font-bold text-flame">
              {errors.cart}
            </div>
          ) : null}

          {cart.length === 0 ? (
            <div className="grid min-h-72 place-items-center rounded-lg border border-dashed border-white/14 bg-white/[0.035] p-8 text-center">
              <div>
                <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-flame/12 text-flame">
                  <ShoppingBag className="h-7 w-7" aria-hidden="true" />
                </span>
                <p className="mt-4 text-xl font-black text-bone">السلة فارغة</p>
                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  ضيف برجر، بوكس دجاج، أو حلو عشان تبدأ طلبك.
                </p>
                <a
                  href="#menu"
                  onClick={onClose}
                  className="mt-5 inline-flex min-h-11 items-center justify-center rounded-lg bg-flame px-5 py-2 text-sm font-black text-charcoal transition hover:bg-gold"
                >
                  تصفح المنيو
                </a>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((item) => {
                const unitTotal = itemUnitTotal(item);
                const lineTotal = unitTotal * item.quantity;

                return (
                  <article
                    key={item.id}
                    className="rounded-lg border border-white/10 bg-white/[0.045] p-3"
                  >
                    <div className="grid grid-cols-[76px_1fr] gap-3">
                      <div className="h-20 overflow-hidden rounded-lg bg-smoke">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-black leading-snug text-bone">
                              {item.name}
                            </h3>
                            <p className="mt-1 text-xs font-bold text-zinc-400">
                              السعر الأساسي {item.basePrice} جنيه
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => onRemove(item.id)}
                            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/8 text-zinc-300 transition hover:border-flame/50 hover:bg-flame/15 hover:text-flame"
                            aria-label={`حذف ${item.name}`}
                          >
                            <Trash2 className="h-4 w-4" aria-hidden="true" />
                          </button>
                        </div>

                        {item.selectedAddOns.length > 0 ? (
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {item.selectedAddOns.map((addOn) => (
                              <span
                                key={addOn.id}
                                className="rounded-full bg-flame/12 px-2 py-1 text-[11px] font-bold text-gold"
                              >
                                {addOn.name} +{addOn.price} جنيه
                              </span>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between gap-3 border-t border-white/10 pt-3">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onDecrement(item.id)}
                          className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/8 text-bone transition hover:border-flame/50 hover:bg-flame/15"
                          aria-label={`تقليل ${item.name}`}
                        >
                          <Minus className="h-4 w-4" aria-hidden="true" />
                        </button>
                        <span className="grid h-9 min-w-10 place-items-center text-sm font-black text-bone">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onIncrement(item.id)}
                          className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/8 text-bone transition hover:border-flame/50 hover:bg-flame/15"
                          aria-label={`زيادة ${item.name}`}
                        >
                          <Plus className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>
                      <p className="text-base font-black text-gold">
                        {lineTotal} جنيه
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          <div className="mt-6 border-t border-white/10 pt-6">
            <CheckoutForm
              checkout={checkout}
              errors={errors}
              onChange={onCheckoutChange}
            />
          </div>
        </div>

        <div className="border-t border-white/10 bg-smoke/90 p-5">
          <div className="space-y-2 text-sm font-bold">
            <div className="flex items-center justify-between text-zinc-300">
              <span>الإجمالي الفرعي</span>
              <span>{subtotal} جنيه</span>
            </div>
            <div className="flex items-center justify-between text-zinc-300">
              <span>رسوم التوصيل</span>
              <span>
                {deliveryFee === 0
                  ? checkout.fulfillment === "pickup"
                    ? "استلام من الفرع"
                    : "مجاني"
                  : `${deliveryFee} جنيه`}
              </span>
            </div>
            {checkout.fulfillment === "delivery" && subtotal > 0 && subtotal < 500 ? (
              <p className="text-xs font-semibold text-zinc-500">
                التوصيل مجاني للطلبات من 500 جنيه.
              </p>
            ) : null}
            <div className="flex items-center justify-between border-t border-white/10 pt-3 text-lg font-black text-bone">
              <span>الإجمالي النهائي</span>
              <span className="text-gold">{finalTotal} جنيه</span>
            </div>
          </div>

          <button
            type="button"
            onClick={onCheckout}
            className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-flame px-5 py-3 text-sm font-black text-charcoal transition hover:bg-gold"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            إرسال الطلب على واتساب
          </button>
        </div>
      </aside>
    </div>
  );
}
