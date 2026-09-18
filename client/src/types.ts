export type ListingType = 'product' | 'service';
export type ListingStatus = 'pending' | 'approved' | 'rejected';

export interface Product {
  id: number;
  name: string;
  description: string;
  type: ListingType;
  status: ListingStatus;
  price: number;
  reseller_price: number | null;
  category: string;
  visual: string;
  image_url?: string | null;
  stock: number;
  reseller_id: number | null;
  reseller_name: string;
  submitted_by?: string;
  review_note?: string | null;
  rating: number;
  reviews: number;
  is_new: boolean;
  on_sale: boolean;
}

export interface WholesaleItem {
  id: number;
  name: string;
  type: ListingType;
  category: string;
  visual: string;
  reseller_id: number | null;
  reseller_name: string;
  retail_price: number;
  wholesale_price: number;
  margin: number;
  stock: number;
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

export interface Purchase {
  id: number;
  reseller_name: string;
  listing_id: number;
  listing_name: string;
  listing_type: ListingType;
  seller_name: string;
  qty: number;
  unit_cost: number;
  total_cost: number;
  purchased_at: string;
}

export interface Resale {
  id: number;
  purchase_id: number;
  listing_id: number;
  listing_name: string;
  reseller_name?: string;
  qty: number;
  unit_cost: number;
  unit_price: number;
  revenue: number;
  profit: number;
  sold_at: string;
}

export interface InventoryRow {
  listing_id: number;
  listing_name: string;
  listing_type: ListingType;
  seller_name: string;
  bought: number;
  spent: number;
  sold: number;
  revenue: number;
  profit: number;
  unit_cost: number;
  remaining: number;
}

export interface InventoryData {
  rows: InventoryRow[];
  purchases: Purchase[];
  resales: Resale[];
}

export interface SubmissionInput {
  name: string;
  description: string;
  type: ListingType;
  category: string;
  price: number;
  reseller_price: number;
  stock: number;
  visual: string;
  reseller_name?: string;
  reseller_id?: number;
  image_url?: string;
}
