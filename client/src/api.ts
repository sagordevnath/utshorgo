import type {
  ApiEnvelope,
  InventoryData,
  OrderRecord,
  Product,
  Reseller,
  Resale,
  Purchase,
  SubmissionInput,
  WholesaleItem,
} from './types';

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
  listProducts: (params: { category?: string; search?: string; sort?: string; type?: string } = {}) => {
    const qs = new URLSearchParams(
      Object.entries(params).filter(([, v]) => v !== undefined && v !== '') as [string, string][]
    ).toString();
    return get<Product[]>(`/products${qs ? `?${qs}` : ''}`);
  },
  getProduct: (id: string | number) => get<Product>(`/products/${id}`),
  listResellers: () => get<Reseller[]>('/resellers'),
  listWholesale: () => get<WholesaleItem[]>('/resellers/wholesale'),
  listSubmissions: (status?: string) => get<Product[]>(`/submissions${status ? `?status=${status}` : ''}`),
  submitListing: (input: SubmissionInput) => post<Product>('/submissions', input),
  moderate: (id: number, decision: 'approved' | 'rejected', note?: string) =>
    post<Product>(`/submissions/${id}/moderate`, { decision, note }),
  listOrders: () => get<OrderRecord[]>('/orders'),
  createOrder: (items: { product: Product; qty: number }[], total: number) =>
    post<OrderRecord>('/orders', { items, total }),
  listInventory: () => get<InventoryData>('/inventory'),
  purchaseStock: (listingId: number, qty: number): Promise<ApiEnvelope<Purchase>> =>
    post<Purchase>('/purchases', { listing_id: listingId, qty }),
  recordResale: (purchaseId: number, qty: number, unitPrice: number): Promise<ApiEnvelope<Resale>> =>
    post<Resale>('/resales', { purchase_id: purchaseId, qty, unit_price: unitPrice }),
};
