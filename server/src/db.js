import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import { seedProducts, seedResellers } from './data.js';

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY ||
  '';

export const hasSupabase = Boolean(SUPABASE_URL && SUPABASE_KEY);
export const isDemoMode = !hasSupabase;

export const supabase = hasSupabase
  ? createClient(SUPABASE_URL, SUPABASE_KEY, { auth: { persistSession: false } })
  : null;

/* ------------------------------------------------------------------ */
/* Demo data store — used when Supabase env vars are not configured.  */
/* Same shape as the Supabase tables so the API layer is identical.   */
/* ------------------------------------------------------------------ */

const demoDb = {
  resellers: [...seedResellers],
  products: [...seedProducts],
  orders: [],
};

const delay = (ms = 120) => new Promise((r) => setTimeout(r, ms));

function matchesQuery(product, { category, search, sort, limit }) {
  if (category && category !== 'All' && product.category !== category) return false;
  if (search) {
    const q = String(search).toLowerCase();
    const hay = `${product.name} ${product.description} ${product.category} ${product.reseller_name}`.toLowerCase();
    if (!hay.includes(q)) return false;
  }
  return true;
}

function sortProducts(list, sort) {
  const sorted = [...list];
  switch (sort) {
    case 'price_asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price_desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'newest':
      return sorted.sort((a, b) => (b.is_new ? 1 : 0) - (a.is_new ? 1 : 0));
    default:
      return sorted.sort((a, b) => b.id - a.id);
  }
}

export const db = {
  mode: () => (isDemoMode ? 'demo' : 'supabase'),

  async listProducts(params = {}) {
    if (isDemoMode) {
      await delay();
      const filtered = sortProducts(
        demoDb.products.filter((p) => matchesQuery(p, params)),
        params.sort
      );
      return filtered.slice(0, params.limit ?? 100);
    }
    let query = supabase
      .from('products')
      .select('*, resellers(name, location, tagline, badge, rating)')
      .order(params.sort === 'price_asc' ? 'price' : 'id', {
        ascending: params.sort === 'price_asc',
      });
    if (params.category && params.category !== 'All') query = query.eq('category', params.category);
    if (params.search) query = query.ilike('name', `%${params.search}%`);
    if (params.limit) query = query.limit(params.limit);
    const { data, error } = await query;
    if (error) throw error;
    return (data ?? []).map((row) => ({
      ...row,
      reseller_name: row.resellers?.name ?? 'Utshorgo Studio',
    }));
  },

  async getProduct(id) {
    if (isDemoMode) {
      await delay();
      const product = demoDb.products.find((p) => p.id === Number(id));
      if (!product) throw new Error('Product not found');
      return product;
    }
    const { data, error } = await supabase
      .from('products')
      .select('*, resellers(name, location, tagline, badge, rating)')
      .eq('id', id)
      .single();
    if (error) throw error;
    return { ...data, reseller_name: data.resellers?.name ?? 'Utshorgo Studio' };
  },

  async listResellers() {
    if (isDemoMode) {
      await delay();
      return demoDb.resellers;
    }
    const { data, error } = await supabase
      .from('resellers')
      .select('*')
      .order('rating', { ascending: false });
    if (error) throw error;
    return data ?? [];
  },

  async listOrders() {
    if (isDemoMode) {
      await delay();
      return demoDb.orders;
    }
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);
    if (error) throw error;
    return data ?? [];
  },

  async createOrder(order) {
    const record = {
      id: Date.now(),
      order_number: `UT-${String(order.id ?? Date.now()).slice(-6)}`,
      items: order.items,
      total: order.total,
      status: 'processing',
      created_at: new Date().toISOString(),
    };
    if (isDemoMode) {
      await delay(250);
      demoDb.orders.unshift(record);
      return record;
    }
    const { data, error } = await supabase
      .from('orders')
      .insert({ items: order.items, total: order.total, status: 'processing' })
      .select()
      .single();
    if (error) throw error;
    return data;
  },
};
