export type CategoryId =
  | "burgers"
  | "fried-chicken"
  | "combos"
  | "sides"
  | "sauces"
  | "drinks"
  | "desserts";

export type FulfillmentMethod = "delivery" | "pickup";

export type CategoryFilter = CategoryId | "all";

export interface MenuCategory {
  id: CategoryFilter;
  label: string;
}

export interface MenuItem {
  id: string;
  name: string;
  category: CategoryId;
  price: number;
  description: string;
  image: string;
  badge: string;
  popular: boolean;
}

export interface AddOn {
  id: string;
  name: string;
  price: number;
  appliesTo: CategoryId[];
}

export interface CartAddOn {
  id: string;
  name: string;
  price: number;
}

export interface CartItem {
  id: string;
  itemId: string;
  name: string;
  category: CategoryId;
  image: string;
  badge: string;
  basePrice: number;
  quantity: number;
  selectedAddOns: CartAddOn[];
}

export interface CheckoutDetails {
  name: string;
  phone: string;
  address: string;
  notes: string;
  fulfillment: FulfillmentMethod;
}

export type CheckoutErrors = Partial<
  Record<"name" | "phone" | "address" | "cart", string>
>;
