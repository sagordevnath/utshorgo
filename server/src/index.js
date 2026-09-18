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
  res.status(err.message === 'Product not found' ? 404 : 500).json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`Utshorgo API listening on http://localhost:${PORT} (${isDemoMode ? 'demo data' : 'supabase'})`);
});
