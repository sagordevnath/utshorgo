import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDownRight, ArrowUpRight, Boxes, DollarSign, Package, Receipt, Wallet } from 'lucide-react';
import { api } from '../api';
import type { InventoryData, InventoryRow } from '../types';
import { useCountUp } from '../hooks/useReveal';
import { RecordSaleModal } from '../components/RecordSaleModal';
import { useReseller } from '../stores/reseller';

function StatCard({ label, value, prefix = '', trend, icon: Icon }: { label: string; value: number; prefix?: string; trend: number; icon: typeof Wallet }) {
  const animated = useCountUp(value);
  const positive = trend >= 0;
  return (
    <div className="stat-card">
      <div className="stat-top">
        <span className="stat-icon"><Icon size={16} /></span>
        <span className={`stat-trend ${positive ? 'up' : 'down'}`}>
          {positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {Math.abs(trend)}%
        </span>
      </div>
      <strong>{prefix}{animated.toLocaleString()}</strong>
      <span className="stat-label">{label}</span>
    </div>
  );
}

export function InventoryPage() {
  const [data, setData] = useState<InventoryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saleRow, setSaleRow] = useState<InventoryRow | null>(null);
  const resellerName = useReseller((s) => s.name);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.listInventory();
      setData(res.data);
    } catch {
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const totals = useMemo(() => {
    const rows = data?.rows ?? [];
    const resales = data?.resales ?? [];
    const stock = rows.reduce((s, r) => s + r.remaining, 0);
    const invested = rows.reduce((s, r) => s + r.spent, 0);
    const profit = resales.reduce((s, r) => s + r.profit, 0);
    const revenue = resales.reduce((s, r) => s + r.revenue, 0);
    const marginPct = revenue > 0 ? Math.round((profit / revenue) * 100) : 0;
    return { stock, invested, profit, revenue, marginPct };
  }, [data]);

  if (loading) {
    return (
      <main className="inventory-page">
        <p className="section-note">Loading your inventory…</p>
      </main>
    );
  }

  return (
    <main className="inventory-page">
      <header className="dashboard-header">
        <div>
          <p className="eyebrow">RESELLER TOOLKIT</p>
          <h1>Your inventory & profits</h1>
          <p className="section-note">
            Trading as <b>{resellerName}</b>. Buy wholesale on the exchange, sell at your price,
            record every sale here — profit is calculated automatically against your cost basis.
          </p>
        </div>
        <Link className="button button-primary" to="/resellers">+ Buy more stock</Link>
      </header>

      <div className="stat-grid">
        <StatCard label="Units in stock" value={totals.stock} trend={9.2} icon={Package} />
        <StatCard label="Capital invested" value={Math.round(totals.invested)} prefix="$" trend={-4.1} icon={Wallet} />
        <StatCard label="Resale revenue" value={Math.round(totals.revenue)} prefix="$" trend={18.3} icon={DollarSign} />
        <StatCard label="Net profit" value={Math.round(totals.profit)} prefix="$" trend={14.7} icon={Boxes} />
      </div>

      <section className="panel inventory-panel">
        <div className="panel-head">
          <h2>Stock on hand</h2>
          <span className="section-note">One row per listing you hold</span>
        </div>
        {!data || data.rows.length === 0 ? (
          <p className="section-note">
            Nothing in stock yet. Head to the <Link to="/resellers">Reseller Exchange</Link> and buy your first batch.
          </p>
        ) : (
          <div className="wholesale-table-wrap">
            <table className="wholesale-table">
              <thead>
                <tr>
                  <th>Listing</th>
                  <th>Bought</th>
                  <th>Sold</th>
                  <th>In stock</th>
                  <th>Cost basis</th>
                  <th>Realized profit</th>
                  <th aria-label="Actions" />
                </tr>
              </thead>
              <tbody>
                {data.rows.map((r) => (
                  <tr key={r.listing_id} className="reveal visible">
                    <td>
                      <div className="wholesale-item">
                        <span className="inv-dot" data-type={r.listing_type} />
                        <div>
                          <strong>{r.listing_name}</strong>
                          <span className="wholesale-type">from {r.seller_name} · ${r.unit_cost}/unit</span>
                        </div>
                      </div>
                    </td>
                    <td className="num">{r.bought}</td>
                    <td className="num">{r.sold}</td>
                    <td className="num">
                      <span className={`stock-pill ${r.remaining === 0 ? 'out' : r.remaining <= 2 ? 'low' : 'ok'}`}>
                        {r.remaining}
                      </span>
                    </td>
                    <td className="num">${r.spent.toFixed(0)}</td>
                    <td className="num profit-cell">{r.profit > 0 ? `+$${r.profit.toFixed(0)}` : '$0'}</td>
                    <td>
                      <button
                        className="button button-dark small-button"
                        disabled={r.remaining === 0}
                        onClick={() => setSaleRow(r)}
                      >
                        Record sale
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <div className="dashboard-grid">
        <section className="panel orders-panel inventory-history">
          <h2>Sales history</h2>
          {!data || data.resales.length === 0 ? (
            <p className="section-note">No resales recorded yet.</p>
          ) : (
            <table className="orders-table">
              <thead>
                <tr><th>Item</th><th>Qty</th><th>Price</th><th>Profit</th><th>When</th></tr>
              </thead>
              <tbody>
                {data.resales.slice(0, 10).map((s) => (
                  <tr key={s.id}>
                    <td>{s.listing_name}</td>
                    <td className="num">{s.qty}</td>
                    <td className="num">${s.unit_price}</td>
                    <td className={`num profit-cell ${s.profit < 0 ? 'loss-cell' : ''}`}>{s.profit < 0 ? `-$${Math.abs(s.profit).toFixed(2)}` : `+$${s.profit.toFixed(2)}`}</td>
                    <td>{new Date(s.sold_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        <section className="panel">
          <h2>Buying activity</h2>
          {!data || data.purchases.length === 0 ? (
            <p className="section-note">No purchases yet.</p>
          ) : (
            <ul className="top-list">
              {data.purchases.slice(0, 6).map((p) => (
                <li key={p.id}>
                  <span className="receipt-icon"><Receipt size={16} /></span>
                  <div>
                    <strong>{p.qty} × {p.listing_name}</strong>
                    <span>from {p.seller_name} · ${p.total_cost.toFixed(0)} total</span>
                  </div>
                  <span className="rating-badge">{new Date(p.purchased_at).toLocaleDateString()}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {saleRow && (
        <RecordSaleModal
          row={saleRow}
          purchases={(data?.purchases ?? []).filter((p) => p.listing_id === saleRow.listing_id)}
          resales={data?.resales ?? []}
          onClose={() => setSaleRow(null)}
          onRecorded={load}
        />
      )}
    </main>
  );
}
