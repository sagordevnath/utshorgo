import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ResellerState {
  name: string;
  setName: (name: string) => void;
}

/**
 * Lightweight reseller identity for the demo (no auth yet). Persisted so
 * purchases and inventory stay attached to the same store name.
 * Replaced by real user accounts when Supabase Auth lands.
 */
export const useReseller = create<ResellerState>()(
  persist(
    (set) => ({
      name: 'My Store',
      setName: (name) => set({ name: name.trim() || 'My Store' }),
    }),
    { name: 'utshorgo-reseller' }
  )
);
