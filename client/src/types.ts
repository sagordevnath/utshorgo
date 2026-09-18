export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  visual: string;
  reseller_id: number;
  reseller_name: string;
  rating: number;
  reviews: number;
  is_new: boolean;
  on_sale: boolean;
}

export interface Reseller {
  id: number;
  name: string;
  location: string;
  tagline: string;
  badge: string;
  rating: number;
  followers: number;
  item_count: number;
  photo: string;
}

export interface CartItem {
  product: Product;
  qty: number;
}

export interface OrderRecord {
  id: number;
  order_number: string;
  items: { product: Product; qty: number }[];
  total: number;
  status: string;
  created_at: string;
}

export interface ApiEnvelope<T> {
  data: T;
  mode: 'demo' | 'supabase';
}
