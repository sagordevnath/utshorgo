import express from 'express';
import cors from 'cors';
import { db, isDemoMode } from './db.js';

const app = express();
const PORT = Number(process.env.PORT) || 4000;

app.use(cors({ origin: true }));
app.use(express.json());

const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

app.get('/api/health', (req, res) => {
  res.json({ ok: true, mode: db.mode() });
});

/* ------------------------------- Catalog ------------------------------ */

app.get('/api/products', asyncHandler(async (req, res) => {
  const products = await db.listProducts(req.query);
  res.json({ data: products, mode: db.mode() });
}));

app.get('/api/products/:id', asyncHandler(async (req, res) => {
  const product = await db.getProduct(req.params.id);
  res.json({ data: product, mode: db.mode() });
}));

app.get('/api/resellers', asyncHandler(async (req, res) => {
  const resellers = await db.listResellers();
  res.json({ data: resellers, mode: db.mode() });
}));

/* Wholesale price list — what resellers pay to buy stock in. */
app.get('/api/resellers/wholesale', asyncHandler(async (req, res) => {
  const items = await db.listProducts({ status: 'approved' });
  const wholesale = items
    .filter((i) => i.reseller_price && i.reseller_price < i.price)
    .map((i) => ({
      id: i.id,
      name: i.name,
      type: i.type,
      category: i.category,
      visual: i.visual,
      reseller_id: i.reseller_id,
      reseller_name: i.reseller_name,
      retail_price: i.price,
      wholesale_price: i.reseller_price,
      margin: Math.round(((i.price - i.reseller_price) / i.price) * 100),
      stock: i.stock ?? 0,
    }))
    .sort((a, b) => b.margin - a.margin);
  res.json({ data: wholesale, mode: db.mode() });
}));

/* -------------------------- Seller submissions ------------------------ */

app.post('/api/submissions', asyncHandler(async (req, res) => {
  const b = req.body ?? {};
  const errors = [];
  if (!b.name || String(b.name).trim().length < 3) errors.push('Name must be at least 3 characters');
  if (!b.description || String(b.description).trim().length < 10) errors.push('Description must be at least 10 characters');
  if (!b.price || Number(b.price) <= 0) errors.push('Price must be greater than 0');
  if (!b.reseller_price || Number(b.reseller_price) <= 0) errors.push('Reseller (purchase) price must be greater than 0');
  if (Number(b.reseller_price) > Number(b.price)) errors.push('Reseller price cannot exceed the retail price');
  if (!b.category) errors.push('Category is required');
  if (!['product', 'service'].includes(b.type)) errors.push('Type must be product or service');
  if (errors.length) return res.status(400).json({ error: errors.join('. ') });

  const submission = await db.createSubmission(b);
  res.status(201).json({ data: submission, mode: db.mode() });
}));

app.get('/api/submissions', asyncHandler(async (req, res) => {
  const submissions = await db.listSubmissions(req.query.status ?? null);
  res.json({ data: submissions, mode: db.mode() });
}));

app.post('/api/submissions/:id/moderate', asyncHandler(async (req, res) => {
  const { decision, note } = req.body ?? {};
  if (!['approved', 'rejected'].includes(decision)) {
    return res.status(400).json({ error: 'decision must be approved or rejected' });
  }
  const item = await db.moderateSubmission(req.params.id, decision, note);
  res.json({ data: item, mode: db.mode() });
}));

/* --------------------- Reseller purchasing/resales -------------------- */

app.get('/api/inventory', asyncHandler(async (req, res) => {
  const { rows, purchases, resales } = await db.inventoryRollup();
  res.json({ data: { rows, purchases, resales }, mode: db.mode() });
}));

app.post('/api/purchases', asyncHandler(async (req, res) => {
  const { listing_id, qty, reseller_name } = req.body ?? {};
  if (!listing_id) return res.status(400).json({ error: 'listing_id is required' });
  const purchase = await db.purchaseStock({ listing_id, qty, reseller_name });
  res.status(201).json({ data: purchase, mode: db.mode() });
}));

app.post('/api/resales', asyncHandler(async (req, res) => {
  const { purchase_id, qty, unit_price } = req.body ?? {};
  if (!purchase_id) return res.status(400).json({ error: 'purchase_id is required' });
  const sale = await db.recordResale({ purchase_id, qty, unit_price });
  res.status(201).json({ data: sale, mode: db.mode() });
}));

/* ------------------------------- Orders ------------------------------- */

app.get('/api/orders', asyncHandler(async (req, res) => {
  const orders = await db.listOrders();
  res.json({ data: orders, mode: db.mode() });
}));

app.post('/api/orders', asyncHandler(async (req, res) => {
  const { items, total } = req.body ?? {};
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Order must include at least one item' });
  }
  const order = await db.createOrder({ items, total });
  res.status(201).json({ data: order, mode: db.mode() });
}));

app.use((req, res) => {
  res.status(404).json({ error: `No route for ${req.method} ${req.path}` });
});

app.use((err, req, res, next) => {
  console.error(err);
  const message = String(err?.message ?? 'Server error');
  const status = message.includes('not found') ? 404 : 500;
  res.status(status).json({ error: message });
});

app.listen(PORT, () => {
  console.log(`Utshorgo API listening on http://localhost:${PORT} (${isDemoMode ? 'demo data' : 'supabase'})`);
});
