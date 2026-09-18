import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import { seedProducts, seedResellers, seedPurchases, seedResales } from './data.js';

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
  purchases: [...seedPurchases],
  resales: [...seedResales],
  nextId: 200,
  nextPurchaseId: 4,
  nextResaleId: 3,
};

const delay = (ms = 120) => new Promise((r) => setTimeout(r, ms));

function matchesQuery(item, { category, search, type, status = 'approved', limit }) {
  if (item.status !== status) return false;
  if (type && type !== 'all' && item.type !== type) return false;
  if (category && category !== 'All' && item.category !== category) return false;
  if (search) {
    const q = String(search).toLowerCase();
    const hay = `${item.name} ${item.description} ${item.category} ${item.reseller_name}`.toLowerCase();
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
      .eq('status', params.status || 'approved');
    if (params.type && params.type !== 'all') query = query.eq('type', params.type);
    if (params.category && params.category !== 'All') query = query.eq('category', params.category);
    if (params.search) query = query.ilike('name', `%${params.search}%`);
    if (params.sort === 'price_asc') query = query.order('price', { ascending: true });
    if (params.sort === 'price_desc') query = query.order('price', { ascending: false });
    if (params.sort === 'rating') query = query.order('rating', { ascending: false });
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
      const product = demoDb.products.find((p) => p.id === Number(id) && p.status === 'approved');
      if (!product) throw new Error('Product not found');
      return product;
    }
    const { data, error } = await supabase
      .from('products')
      .select('*, resellers(name, location, tagline, badge, rating)')
      .eq('id', id)
      .eq('status', 'approved')
      .single();
    if (error) throw new Error('Product not found');
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

  /* ---------------------- Seller submissions ----------------------- */

  async createSubmission(input) {
    const record = {
      id: isDemoMode ? demoDb.nextId++ : undefined,
      name: input.name,
      description: input.description,
      price: Number(input.price),
      reseller_price: Number(input.reseller_price),
      category: input.category,
      type: input.type,
      visual: input.visual || 'image-lamp',
      stock: Number(input.stock) || 10,
      image_url: input.image_url || null,
      reseller_id: input.reseller_id ? Number(input.reseller_id) : null,
      reseller_name: input.reseller_name || 'Independent seller',
      submitted_by: input.submitted_by || input.reseller_name || 'Independent seller',
      status: 'pending',
      rating: 0,
      reviews: 0,
      is_new: true,
      on_sale: false,
      created_at: new Date().toISOString(),
    };
    if (isDemoMode) {
      await delay(200);
      demoDb.products.unshift(record);
      return record;
    }
    const { data, error } = await supabase
      .from('products')
      .insert({
        name: record.name,
        description: record.description,
        price: record.price,
        reseller_price: record.reseller_price,
        category: record.category,
        type: record.type,
        visual: record.visual,
        stock: record.stock,
        image_url: record.image_url,
        reseller_id: record.reseller_id,
        reseller_name: record.reseller_name,
        submitted_by: record.submitted_by,
        status: 'pending',
      })
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async listSubmissions(status = null) {
    if (isDemoMode) {
      await delay(150);
      const all = demoDb.products.filter((p) => p.status !== 'approved');
      return status ? all.filter((p) => p.status === status) : all;
    }
    let query = supabase.from('products').select('*').neq('status', 'approved').order('created_at', { ascending: true });
    if (status) query = query.eq('status', status);
    const { data, error } = await query;
    if (error) throw error;
    return data ?? [];
  },

  async moderateSubmission(id, decision, note = null) {
    if (!['approved', 'rejected'].includes(decision)) throw new Error('Invalid decision');
    if (isDemoMode) {
      await delay(150);
      const item = demoDb.products.find((p) => p.id === Number(id) && p.status === 'pending');
      if (!item) throw new Error('Submission not found');
      item.status = decision;
      item.review_note = note;
      item.reviewed_at = new Date().toISOString();
      return item;
    }
    const { data, error } = await supabase
      .from('products')
      .update({ status: decision, review_note: note, reviewed_at: new Date().toISOString() })
      .eq('id', id)
      .eq('status', 'pending')
      .select()
      .single();
    if (error) throw new Error('Submission not found or already reviewed');
    return data;
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

  /* ------------------- Reseller purchasing + resales ------------------ */

  async purchaseStock({ listing_id, qty, reseller_name = 'My Store' }) {
    const n = Number(qty);
    if (!Number.isInteger(n) || n <= 0) throw new Error('Quantity must be a positive whole number');

    if (isDemoMode) {
      await delay(200);
      const listing = demoDb.products.find((p) => p.id === Number(listing_id) && p.status === 'approved');
      if (!listing) throw new Error('Listing not found');
      if ((listing.stock ?? 0) < n) throw new Error(`Only ${listing.stock} left in seller stock`);
      listing.stock -= n; // decrement seller's stock
      const unit = Number(listing.reseller_price);
      const record = {
        id: demoDb.nextPurchaseId++,
        reseller_name,
        listing_id: listing.id,
        listing_name: listing.name,
        listing_type: listing.type,
        seller_name: listing.reseller_name,
        qty: n,
        unit_cost: unit,
        total_cost: +(unit * n).toFixed(2),
        purchased_at: new Date().toISOString(),
      };
      demoDb.purchases.unshift(record);
      return record;
    }

    // Supabase: read, check stock, decrement, insert purchase.
    const { data: listing, error: fetchErr } = await supabase
      .from('products')
      .select('id, name, type, stock, reseller_price, reseller_name')
      .eq('id', listing_id)
      .eq('status', 'approved')
      .single();
    if (fetchErr || !listing) throw new Error('Listing not found');
    if ((listing.stock ?? 0) < n) throw new Error(`Only ${listing.stock} left in seller stock`);

    const { error: decErr } = await supabase
      .from('products')
      .update({ stock: listing.stock - n })
      .eq('id', listing.id)
      .eq('stock', listing.stock); // optimistic concurrency guard
    if (decErr) throw new Error('Could not reserve stock, please retry');

    const unit = Number(listing.reseller_price);
    const { data, error } = await supabase
      .from('purchases')
      .insert({
        reseller_name,
        listing_id: listing.id,
        listing_name: listing.name,
        listing_type: listing.type,
        seller_name: listing.reseller_name,
        qty: n,
        unit_cost: unit,
        total_cost: +(unit * n).toFixed(2),
      })
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async listPurchases() {
    if (isDemoMode) {
      await delay();
      return demoDb.purchases;
    }
    const { data, error } = await supabase
      .from('purchases')
      .select('*')
      .order('purchased_at', { ascending: false })
      .limit(100);
    if (error) throw error;
    return data ?? [];
  },

  async recordResale({ purchase_id, qty, unit_price }) {
    const n = Number(qty);
    const p = Number(unit_price);
    if (!Number.isInteger(n) || n <= 0) throw new Error('Quantity must be a positive whole number');
    if (!(p > 0)) throw new Error('Resale price must be greater than 0');

    if (isDemoMode) {
      await delay(200);
      const purchase = demoDb.purchases.find((x) => x.id === Number(purchase_id));
      if (!purchase) throw new Error('Purchase not found');
      const alreadySold = demoDb.resales
        .filter((r) => r.purchase_id === purchase.id)
        .reduce((s, r) => s + r.qty, 0);
      const remaining = purchase.qty - alreadySold;
      if (n > remaining) throw new Error(`Only ${remaining} unit(s) left to resell on this purchase`);
      const record = {
        id: demoDb.nextResaleId++,
        purchase_id: purchase.id,
        listing_id: purchase.listing_id,
        listing_name: purchase.listing_name,
        qty: n,
        unit_cost: purchase.unit_cost,
        unit_price: p,
        revenue: +(n * p).toFixed(2),
        profit: +((p - purchase.unit_cost) * n).toFixed(2),
        sold_at: new Date().toISOString(),
        reseller_name: purchase.reseller_name,
      };
      demoDb.resales.unshift(record);
      return record;
    }

    const { data: purchase, error: fetchErr } = await supabase
      .from('purchases')
    .select('id, qty, unit_cost, listing_id, listing_name, reseller_name')
      .eq('id', purchase_id)
      .single();
    if (fetchErr || !purchase) throw new Error('Purchase not found');
    const { data: soldRows } = await supabase
      .from('resales')
      .select('qty')
      .eq('purchase_id', purchase.id);
    const alreadySold = (soldRows ?? []).reduce((s, r) => s + r.qty, 0);
    const remaining = purchase.qty - alreadySold;
    if (n > remaining) throw new Error(`Only ${remaining} unit(s) left to resell on this purchase`);
    const { data, error } = await supabase
      .from('resales')
      .insert({
        purchase_id: purchase.id,
        listing_id: purchase.listing_id,
        listing_name: purchase.listing_name,
        qty: n,
        unit_cost: purchase.unit_cost,
        unit_price: p,
        revenue: +(n * p).toFixed(2),
        profit: +((p - purchase.unit_cost) * n).toFixed(2),
        reseller_name: purchase.reseller_name,
      })
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async listResales() {
    if (isDemoMode) {
      await delay();
      return demoDb.resales;
    }
    const { data, error } = await supabase
      .from('resales')
      .select('*')
      .order('sold_at', { ascending: false })
      .limit(100);
    if (error) throw error;
    return data ?? [];
  },

  async inventoryRollup() {
    const purchases = await db.listPurchases();
    const resales = await db.listResales();
    // Group by listing: total bought, total sold, remaining, avg unit cost,
    // realized profit, and the resale price the market suggests (listing retail).
    const byListing = new Map();
    for (const pu of purchases) {
      const key = pu.listing_id;
      if (!byListing.has(key)) {
        byListing.set(key, {
          listing_id: pu.listing_id,
          listing_name: pu.listing_name,
          listing_type: pu.listing_type,
          seller_name: pu.seller_name,
          bought: 0,
          spent: 0,
          sold: 0,
          revenue: 0,
          profit: 0,
          unit_cost: pu.unit_cost,
        });
      }
      const row = byListing.get(key);
      row.bought += pu.qty;
      row.spent = +(row.spent + pu.total_cost).toFixed(2);
      row.unit_cost = pu.unit_cost;
    }
    for (const re of resales) {
      const row = byListing.get(re.listing_id);
      if (!row) continue;
      row.sold += re.qty;
      row.revenue = +(row.revenue + re.revenue).toFixed(2);
      row.profit = +(row.profit + re.profit).toFixed(2);
    }
    const rows = [...byListing.values()].map((r) => ({
      ...r,
      remaining: r.bought - r.sold,
    }));
    return { rows, purchases, resales };
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
