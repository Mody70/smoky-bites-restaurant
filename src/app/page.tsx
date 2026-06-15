"use client";

import { useEffect, useMemo, useState } from "react";
import { About } from "@/components/About";
import { CartDrawer } from "@/components/CartDrawer";
import { FAQ } from "@/components/FAQ";
import { FeaturedOffer } from "@/components/FeaturedOffer";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HowToOrder } from "@/components/HowToOrder";
import { LocationHours } from "@/components/LocationHours";
import { MenuSection } from "@/components/MenuSection";
import { Navbar } from "@/components/Navbar";
import { PopularItems } from "@/components/PopularItems";
import { ProductQuickViewModal } from "@/components/ProductQuickViewModal";
import { Reviews } from "@/components/Reviews";
import { StickyCartButton } from "@/components/StickyCartButton";
import { TrustBar } from "@/components/TrustBar";
import { WHATSAPP_NUMBER, addOns, menuItems } from "@/data/menuItems";
import type {
  CartAddOn,
  CartItem,
  CheckoutDetails,
  CheckoutErrors,
  MenuItem,
} from "@/types/menu";

const CART_STORAGE_KEY = "smoky-bites-cart";

const initialCheckout: CheckoutDetails = {
  name: "",
  phone: "",
  address: "",
  notes: "",
  fulfillment: "delivery",
};

const getCartItemSignature = (itemId: string, addOns: CartAddOn[]) =>
  `${itemId}:${addOns
    .map((addOn) => addOn.id)
    .sort()
    .join("|")}`;

const createCartId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `cart-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const getCartUnitTotal = (item: CartItem) =>
  item.basePrice + item.selectedAddOns.reduce((sum, addOn) => sum + addOn.price, 0);

const hydrateStoredCart = (storedCart: CartItem[]) =>
  storedCart.map((cartItem) => {
    const menuItem = menuItems.find((item) => item.id === cartItem.itemId);
    const selectedAddOns = cartItem.selectedAddOns.map((selectedAddOn) => {
      const currentAddOn = addOns.find((addOn) => addOn.id === selectedAddOn.id);

      return currentAddOn
        ? {
            id: currentAddOn.id,
            name: currentAddOn.name,
            price: currentAddOn.price,
          }
        : selectedAddOn;
    });

    if (!menuItem) {
      return {
        ...cartItem,
        selectedAddOns,
      };
    }

    return {
      ...cartItem,
      itemId: menuItem.id,
      name: menuItem.name,
      category: menuItem.category,
      image: menuItem.image,
      badge: menuItem.badge,
      basePrice: menuItem.price,
      selectedAddOns,
    };
  });

const buildWhatsAppMessage = ({
  cart,
  checkout,
  subtotal,
  deliveryFee,
  finalTotal,
}: {
  cart: CartItem[];
  checkout: CheckoutDetails;
  subtotal: number;
  deliveryFee: number;
  finalTotal: number;
}) => {
  const itemLines = cart
    .map((item, index) => {
      const addOnsText =
        item.selectedAddOns.length > 0
          ? item.selectedAddOns
              .map((addOn) => `${addOn.name} (+${addOn.price} جنيه)`)
              .join("، ")
          : "لا يوجد";
      const itemTotal = getCartUnitTotal(item) * item.quantity;

      return [
        `${index + 1}. ${item.name}`,
        `الكمية: ${item.quantity}`,
        `السعر: ${item.basePrice} جنيه`,
        `الإضافات: ${addOnsText}`,
        `إجمالي المنتج: ${itemTotal} جنيه`,
      ].join("\n");
    })
    .join("\n\n");

  return [
    "طلب سموكي بايتس",
    "",
    "اسم المطعم: سموكي بايتس",
    "",
    "تفاصيل الطلب",
    "",
    "المنتجات:",
    itemLines,
    "",
    `الإجمالي الفرعي: ${subtotal} جنيه`,
    `طريقة الاستلام: ${
      checkout.fulfillment === "delivery" ? "توصيل" : "استلام من الفرع"
    }`,
    `رسوم التوصيل: ${deliveryFee} جنيه`,
    `الإجمالي النهائي: ${finalTotal} جنيه`,
    "",
    "بيانات العميل:",
    `الاسم: ${checkout.name.trim()}`,
    `رقم الموبايل: ${checkout.phone.trim()}`,
    `العنوان: ${
      checkout.fulfillment === "delivery"
        ? checkout.address.trim()
        : checkout.address.trim() || "استلام من الفرع"
    }`,
    `الملاحظات: ${checkout.notes.trim() || "لا يوجد"}`,
  ].join("\n");
};

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [checkout, setCheckout] = useState<CheckoutDetails>(initialCheckout);
  const [checkoutErrors, setCheckoutErrors] = useState<CheckoutErrors>({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewItem, setQuickViewItem] = useState<MenuItem | null>(null);
  const [hasLoadedCart, setHasLoadedCart] = useState(false);

  useEffect(() => {
    try {
      const storedCart = window.localStorage.getItem(CART_STORAGE_KEY);

      if (storedCart) {
        const parsedCart = JSON.parse(storedCart) as CartItem[];

        if (Array.isArray(parsedCart)) {
          setCart(hydrateStoredCart(parsedCart));
        } else {
          window.localStorage.removeItem(CART_STORAGE_KEY);
        }
      }
    } catch {
      window.localStorage.removeItem(CART_STORAGE_KEY);
    } finally {
      setHasLoadedCart(true);
    }
  }, []);

  useEffect(() => {
    if (!hasLoadedCart) {
      return;
    }

    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart, hasLoadedCart]);

  const subtotal = useMemo(
    () =>
      cart.reduce(
        (sum, item) => sum + getCartUnitTotal(item) * item.quantity,
        0,
      ),
    [cart],
  );
  const deliveryFee =
    checkout.fulfillment === "delivery" && subtotal > 0 && subtotal < 500 ? 30 : 0;
  const finalTotal = subtotal + deliveryFee;
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const featuredOffer =
    menuItems.find((item) => item.id === "classic-burger-meal") ?? menuItems[0];
  const popularItems = menuItems.filter((item) => item.popular).slice(0, 8);

  const scrollToMenu = () => {
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
  };

  const addToCart = (
    item: MenuItem,
    selectedAddOns: CartAddOn[] = [],
    quantity = 1,
  ) => {
    const normalizedAddOns = [...selectedAddOns].sort((a, b) =>
      a.id.localeCompare(b.id),
    );
    const newSignature = getCartItemSignature(item.id, normalizedAddOns);

    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (cartItem) =>
          getCartItemSignature(cartItem.itemId, cartItem.selectedAddOns) ===
          newSignature,
      );

      if (existingItem) {
        return currentCart.map((cartItem) =>
          cartItem.id === existingItem.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem,
        );
      }

      return [
        ...currentCart,
        {
          id: createCartId(),
          itemId: item.id,
          name: item.name,
          category: item.category,
          image: item.image,
          badge: item.badge,
          basePrice: item.price,
          quantity,
          selectedAddOns: normalizedAddOns,
        },
      ];
    });

    setCheckoutErrors((currentErrors) => ({ ...currentErrors, cart: undefined }));
  };

  const incrementCartItem = (cartItemId: string) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === cartItemId ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decrementCartItem = (cartItemId: string) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === cartItemId
            ? { ...item, quantity: Math.max(0, item.quantity - 1) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeCartItem = (cartItemId: string) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== cartItemId));
  };

  const handleCheckoutChange = (nextCheckout: CheckoutDetails) => {
    setCheckout(nextCheckout);
    setCheckoutErrors((currentErrors) => ({
      ...currentErrors,
      name: nextCheckout.name.trim() ? undefined : currentErrors.name,
      phone: nextCheckout.phone.trim() ? undefined : currentErrors.phone,
      address:
        nextCheckout.fulfillment === "pickup" || nextCheckout.address.trim()
          ? undefined
          : currentErrors.address,
    }));
  };

  const checkoutOnWhatsApp = () => {
    const nextErrors: CheckoutErrors = {};

    if (cart.length === 0) {
      nextErrors.cart = "ضيف منتج واحد على الأقل قبل إرسال الطلب.";
    }

    if (!checkout.name.trim()) {
      nextErrors.name = "اسم العميل مطلوب.";
    }

    if (!checkout.phone.trim()) {
      nextErrors.phone = "رقم الموبايل مطلوب.";
    }

    if (checkout.fulfillment === "delivery" && !checkout.address.trim()) {
      nextErrors.address = "العنوان مطلوب للتوصيل.";
    }

    setCheckoutErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setIsCartOpen(true);
      return;
    }

    const message = buildWhatsAppMessage({
      cart,
      checkout,
      subtotal,
      deliveryFee,
      finalTotal,
    });
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message,
    )}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-charcoal text-bone">
      <Navbar cartCount={cartCount} onCartClick={() => setIsCartOpen(true)} />
      <Hero onStartOrder={scrollToMenu} />
      <TrustBar />
      <FeaturedOffer item={featuredOffer} onAdd={addToCart} />
      <PopularItems
        items={popularItems}
        onAdd={addToCart}
        onQuickView={setQuickViewItem}
      />
      <MenuSection
        items={menuItems}
        onAdd={addToCart}
        onQuickView={setQuickViewItem}
      />
      <HowToOrder />
      <About />
      <Reviews />
      <FAQ />
      <LocationHours />
      <FinalCTA onStartOrder={scrollToMenu} />
      <Footer />
      <StickyCartButton
        count={cartCount}
        total={finalTotal}
        onClick={() => setIsCartOpen(true)}
      />
      <ProductQuickViewModal
        item={quickViewItem}
        onClose={() => setQuickViewItem(null)}
        onAdd={addToCart}
      />
      <CartDrawer
        isOpen={isCartOpen}
        cart={cart}
        checkout={checkout}
        errors={checkoutErrors}
        subtotal={subtotal}
        deliveryFee={deliveryFee}
        finalTotal={finalTotal}
        onClose={() => setIsCartOpen(false)}
        onCheckoutChange={handleCheckoutChange}
        onIncrement={incrementCartItem}
        onDecrement={decrementCartItem}
        onRemove={removeCartItem}
        onCheckout={checkoutOnWhatsApp}
      />
    </main>
  );
}
