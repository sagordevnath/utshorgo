import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Clock3, Package, Percent, ShieldAlert, XCircle } from 'lucide-react';
import { api } from '../api';
import type { Product } from '../types';
import { showToast } from '../components/Toast';

export function AdminPage() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<number | null>(null);
  const [filter, setFilter] = useState<'pending' | 'approved' | 'rejected'>('pending');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.listSubmissions(filter);
      setItems(res.data);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    load();
  }, [load]);

  const moderate = async (id: number, decision: 'approved' | 'rejected') => {
    setBusyId(id);
    try {
      await api.moderate(id, decision);
      showToast(decision === 'approved' ? 'Listing approved and live' : 'Listing rejected');
      await load();
    } catch (err) {
      showToast((err as Error).message);
    } finally {
      setBusyId(null);
    }
  };

  return (
    <main className="admin-page">
      <header className="admin-header">
        <div>
          <p className="eyebrow"><ShieldAlert size={13} /> ADMIN CONSOLE</p>
          <h1>Listing approvals</h1>
          <p className="section-note">
            Every seller submission lands here. Approve to publish it to the marketplace; reject to send it back.
          </p>
        </div>
        <div className="admin-filter">
          {(['pending', 'approved', 'rejected'] as const).map((f) => (
            <button key={f} className={`filter-chip ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
              {f[0].toUpperCase() + f.slice(1)}
              {f === 'pending' && items.length > 0 ? ` (${items.length})` : ''}
            </button>
          ))}
        </div>
  </header>

      {loading ? (
        <p className="section-note">Loading queue…</p>
      ) : items.length === 0 ? (
        <div className="admin-empty">
          <CheckCircle2 size={40} strokeWidth={1.3} />
          <h2>Queue is clear</h2>
          <p className="section-note">No {filter} submissions right now.</p>
          <Link className="text-link" to="/"><ArrowLeft size={14} /> Back to marketplace</Link>
        </div>
      ) : (
        <div className="admin-grid">
          {items.map((item, i) => (
            <article key={item.id} className={`admin-card reveal visible ${i % 3 === 1 ? 'reveal-delay-small' : i % 3 === 2 ? 'reveal-delay-medium' : ''}`}>
              <div className={`admin-card-visual ${item.visual}`}>
                <span className="new-tag">{item.type === 'service' ? 'Service' : 'Product'}</span>
              </div>
              <div className="admin-card-body">
                <p className="admin-card-meta">
                  {item.category} · by {item.submitted_by || item.reseller_name}
                </p>
                <h3>{item.name}</h3>
                <p className="admin-card-desc">{item.description}</p>
                <div className="admin-card-pricing">
                  <span><b>${item.price}</b> retail</span>
                  <span className="admin-wholesale"><b>${item.reseller_price}</b> reseller</span>
                  <span className="admin-margin">
                    <Percent size={11} />
                    {item.price > 0 && item.reseller_price ? Math.round(((item.price - item.reseller_price) / item.price) * 100) : 0}%
                  </span>
                  <span className="admin-stock">{item.stock} in stock</span>
                </div>
                {item.review_note && <p className="admin-note">“{item.review_note}”</p>}
                {item.status === 'pending' && (
                  <div className="admin-actions">
                    <button
                      className="button button-primary"
                      disabled={busyId === item.id}
                      onClick={() => moderate(item.id, 'approved')}
                    >
                      <CheckCircle2 size={15} /> Approve
                    </button>
                    <button
                      className="button button-dark"
                      disabled={busyId === item.id}
                      onClick={() => moderate(item.id, 'rejected')}
                    >
                      <XCircle size={15} /> Reject
                    </button>
                  </div>
                )}
                {item.status === 'approved' && <p className="admin-status approved"><CheckCircle2 size={13} /> Live on marketplace</p>}
                {item.status === 'rejected' && <p className="admin-status rejected"><XCircle size={13} /> Rejected</p>}
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
