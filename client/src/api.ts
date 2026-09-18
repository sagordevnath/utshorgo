import type { ApiEnvelope, OrderRecord, Product, Reseller } from './types';

const BASE = import.meta.env.VITE_API_URL ?? '/api';

async function get<T>(path: string): Promise<ApiEnvelope<T>> {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `Request failed: ${res.status}`);
  }
  return res.json();
}

async function post<T>(path: string, body: unknown): Promise<ApiEnvelope<T>> {
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const payload = await res.json().catch(() => ({}));
    throw new Error(payload.error ?? `Request failed: ${res.status}`);
  }
  return res.json();
}

export const api = {
  listProducts: (params: { category?: string; search?: string; sort?: string } = {}) => {
    const qs = new URLSearchParams(
      Object.entries(params).filter(([, v]) => v !== undefined && v !== '') as [string, string][]
    ).toString();
    return get<Product[]>(`/products${qs ? `?${qs}` : ''}`);
  },
  getProduct: (id: string | number) => get<Product>(`/products/${id}`),
  listResellers: () => get<Reseller[]>('/resellers'),
  listOrders: () => get<OrderRecord[]>('/orders'),
  createOrder: (items: { product: Product; qty: number }[], total: number) =>
    post<OrderRecord>('/orders', { items, total }),
};
