import { useEffect, useMemo, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, Package, ShoppingBag, Star, TrendingUp, Wallet } from 'lucide-react';
import { api } from '../api';
import type { OrderRecord, Product } from '../types';
import { useCountUp } from '../hooks/useReveal';

function StatCard({ label, value, prefix = '', trend, icon: Icon }: { label: string; value: number; prefix?: string; trend: number; icon: typeof Wallet }) {
  const animated = useCountUp(value);
  const positive = trend >= 0;
  return (
    <div className="stat-card">
      <div className="stat-top">
        <span className="stat-icon">
          <Icon size={16} />
        </span>
        <span className={`stat-trend ${positive ? 'up' : 'down'}`}>
          {positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {Math.abs(trend)}%
        </span>
      </div>
      <strong>
        {prefix}
        {animated.toLocaleString()}
      </strong>
      <span className="stat-label">{label}</span>
    </div>
  );
}

export function DashboardPage() {
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [mode, setMode] = useState<string>('demo');

  useEffect(() => {
    Promise.all([api.listOrders(), api.listProducts(), api.listProducts({ sort: 'rating' })])
      .then(([ordersRes, productsRes, topRes]) => {
        setOrders(ordersRes.data);
        setProducts(productsRes.data);
        setMode(ordersRes.mode);
      })
      .catch(() => undefined);
  }, []);

  const revenue = useMemo(() => orders.reduce((sum, o) => sum + Number(o.total), 0), [orders]);
  const topProducts = useMemo(
    () => [...(products.length ? products : [])].sort((a, b) => b.reviews - a.reviews).slice(0, 5),
    [products]
  );
  const topRated = useMemo(
    () => [...(products.length ? products : [])].sort((a, b) => b.rating - a.rating).slice(0, 4),
    [products]
  );

  const maxSales = Math.max(...topProducts.map((p) => p.reviews), 1);

  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <div>
          <p className="eyebrow">RESELLER CENTER</p>
          <h1>Your storefront at a glance</h1>
          <p className="section-note">Data source: {mode === 'demo' ? 'demo data (add Supabase keys for live data)' : 'Supabase'}</p>
        </div>
        <button className="button button-primary">+ Add product</button>
      </header>

      <div className="stat-grid">
        <StatCard label="Revenue" value={revenue} prefix="$" trend={12.4} icon={Wallet} />
        <StatCard label="Orders" value={orders.length} trend={8.1} icon={ShoppingBag} />
        <StatCard label="Products listed" value={products.length} trend={4.6} icon={Package} />
        <StatCard label="Avg. rating" value={4.9 * 10} trend={0.6} icon={Star} />
      </div>

      <div className="dashboard-grid">
        <section className="panel sales-panel">
          <h2>Sales momentum</h2>
          <div className="bar-chart">
            {topProducts.map((p) => (
              <div className="bar-row" key={p.id}>
                <span className="bar-label">{p.name}</span>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: `${(p.reviews / maxSales) * 100}%` }} />
                </div>
                <span className="bar-value">{p.reviews}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <h2>Top rated</h2>
          <ul className="top-list">
            {topRated.map((p) => (
              <li key={p.id}>
                <div className={`mini-visual ${p.visual}`} />
                <div>
                  <strong>{p.name}</strong>
                  <span>
                    ★ {p.rating.toFixed(1)} · {p.reviews} reviews
                  </span>
                </div>
                <span className="rating-badge">{p.rating.toFixed(1)}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="panel orders-panel">
          <h2>Recent orders</h2>
          {orders.length === 0 ? (
            <p className="section-note">
              No orders yet. Place one through checkout and it will appear here. <TrendingUp size={12} />
            </p>
          ) : (
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 8).map((o) => (
                  <tr key={o.id}>
                    <td>{o.order_number}</td>
                    <td>{o.items?.length ?? 0}</td>
                    <td>${Number(o.total).toFixed(2)}</td>
                    <td>
                      <span className={`status-pill ${o.status}`}>{o.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        <section className="panel growth-panel">
          <h2>Growth tips</h2>
          <ul className="tips-list">
            <li>Add 3D-style photos to your top listing to lift conversion up to 18%.</li>
            <li>Bundle two slow movers with your bestseller at a 10% discount.</li>
            <li>Respond to every review within 24h to climb the trust ladder.</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
