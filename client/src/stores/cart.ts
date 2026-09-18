import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Product } from '../types';

interface CartState {
  items: CartItem[];
  add: (product: Product, qty?: number) => void;
  remove: (productId: number) => void;
  setQty: (productId: number, qty: number) => void;
  clear: () => void;
  count: () => number;
  total: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (product, qty = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.product.id === product.id);
          const items = existing
            ? state.items.map((i) => (i.product.id === product.id ? { ...i, qty: i.qty + qty } : i))
            : [...state.items, { product, qty }];
          return { items };
        }),
      remove: (productId) => set((s) => ({ items: s.items.filter((i) => i.product.id !== productId) })),
      setQty: (productId, qty) =>
        set((s) => ({
          items:
            qty <= 0
              ? s.items.filter((i) => i.product.id !== productId)
              : s.items.map((i) => (i.product.id === productId ? { ...i, qty } : i)),
        })),
      clear: () => set({ items: [] }),
      count: () => get().items.reduce((sum, i) => sum + i.qty, 0),
      total: () => get().items.reduce((sum, i) => sum + i.qty * i.product.price, 0),
    }),
    { name: 'utshorgo-cart' }
  )
);
