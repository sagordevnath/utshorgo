import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, BadgeCheck, Clock3, Handshake, Package, Percent, ShoppingCart, TrendingUp } from 'lucide-react';
import { api } from '../api';
import type { Reseller, WholesaleItem } from '../types';
import { BuyStockModal } from '../components/BuyStockModal';
import { useReseller } from '../stores/reseller';

export function ResellersPage() {
  const [wholesale, setWholesale] = useState<WholesaleItem[]>([]);
  const [resellers, setResellers] = useState<Reseller[]>([]);
  const [typeFilter, setTypeFilter] = useState<'all' | 'product' | 'service'>('all');
  const [loading, setLoading] = useState(true);
  const [buyItem, setBuyItem] = useState<WholesaleItem | null>(null);
  const resellerName = useReseller((s) => s.name);

  useEffect(() => {
    let cancelled = false;
    Promise.all([api.listWholesale(), api.listResellers()])
      .then(([w, r]) => {
        if (cancelled) return;
        setWholesale(w.data);
        setResellers(r.data);
      })
      .catch(() => undefined)
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(
    () => (typeFilter === 'all' ? wholesale : wholesale.filter((w) => w.type === typeFilter)),
    [wholesale, typeFilter]
  );

  const avgMargin = useMemo(() => {
    if (filtered.length === 0) return 0;
    return Math.round(filtered.reduce((s, w) => s + w.margin, 0) / filtered.length);
  }, [filtered]);

  return (
    <main className="resellers-page">
      <header className="page-hero">
        <p className="eyebrow">THE RESELLER EXCHANGE</p>
        <h1>
          Buy at wholesale. Sell at <em>yours</em>.
        </h1>
        <p className="section-note">
          Join as a reseller and you see the purchase price behind every listing on Utshorgo. Stock what
          your customers love, set your own price, keep the margin.
        </p>
        <p className="section-note trading-as">Trading as <b>{resellerName}</b> — change this later in your inventory hub.</p>
        <div className="hero-actions">
          <Link className="button button-primary" to="/sell">
            List your catalog <ArrowUpRight size={15} />
          </Link>
          <a className="button button-ghost" href="#wholesale-list">
            Browse the price list
          </a>
        </div>
        <div className="exchange-stats">
          <div><strong>{filtered.length}</strong><span>live listings</span></div>
          <div><strong>{avgMargin}%</strong><span>avg. margin</span></div>
          <div><strong>{resellers.length}</strong><span>verified sellers</span></div>
        </div>
      </header>

      <section className="section" id="wholesale-list">
        <div className="section-heading">
          <div>
            <p className="eyebrow">MEMBERS-ONLY PRICING</p>
            <h2>
              Wholesale <em>price list</em>
            </h2>
          </div>
          <div className="filter-row">
            {(['all', 'product', 'service'] as const).map((t) => (
              <button key={t} className={`filter-chip ${typeFilter === t ? 'active' : ''}`} onClick={() => setTypeFilter(t)}>
                {t[0].toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <p className="section-note">Loading exchange…</p>
        ) : filtered.length === 0 ? (
          <p className="section-note">Nothing in this category yet.</p>
        ) : (
          <div className="wholesale-table-wrap">
            <table className="wholesale-table">
              <thead>
                <tr>
                  <th>Listing</th>
                  <th>From</th>
                  <th>Retail</th>
                  <th>Reseller buys at</th>
                  <th>Margin</th>
                  <th>Stock</th>
                  <th aria-label="Actions" />
                  <th className="sr-only">Buy</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((w) => (
                  <tr key={w.id} className="reveal visible">
                    <td>
                      <div className="wholesale-item">
                        <div className={`mini-visual ${w.visual}`} />
                        <div>
                          <strong>{w.name}</strong>
                          <span className="wholesale-type">
                            {w.type === 'service' ? (
                              <><Clock3 size={11} /> Service</>
                            ) : (
                              <><Package size={11} /> Product</>
                            )}
                          </span>
                        </div>
                      </div>
                      <span className="sr-only">{w.category}</span>
                    </td>
                    <td>{w.reseller_name}</td>
                    <td className="num">${w.retail_price}</td>
                    <td className="num wholesale-price">${w.wholesale_price}</td>
                <td>
                      <span className={`margin-pill ${w.margin >= 40 ? 'hot' : w.margin >= 25 ? 'good' : 'thin'}`}>
                        <Percent size={11} /> {w.margin}%
                      </span>
                    </td>
                    <td className="num">
                      <span className={`stock-pill ${w.stock === 0 ? 'out' : w.stock <= 5 ? 'low' : 'ok'}`}>{w.stock}</span>
                    </td>
                    <td>
                      <Link className="text-link" to={`/product/${w.id}`}>
                        View <ArrowUpRight size={12} />
                      </Link>
                    </td>
                    <td>
                      <button
                        className="button button-primary small-button"
                        disabled={w.stock === 0}
                        onClick={() => setBuyItem(w)}
                        aria-label={`Buy stock of ${w.name}`}
                      >
                        <ShoppingCart size={13} /> Buy
                      </button>
                    </td>
                  </tr>
                ))}
                </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="manifesto">
        <div className="manifesto-mark">R</div>
        <div>
          <h2>
            Become a <em>reseller.</em>
          </h2>
          <p>
            One application, no listing fees, wholesale pricing across the whole catalog. Stock your
            storefront from vetted sellers and keep your customers yours.
          </p>
          <div className="manifesto-points">
            <span><Handshake size={14} /> Direct seller relationships</span>
            <span><TrendingUp size={14} /> Transparent margins upfront</span>
            <span><BadgeCheck size={14} /> Vetted quality, guaranteed</span>
          </div>
          <Link className="button button-light" to="/sell">Apply to the exchange</Link>
        </div>
        <div className="manifesto-orbit" aria-hidden="true" />
      </section>

      {buyItem && (
        <BuyStockModal
          item={buyItem}
          onClose={() => setBuyItem(null)}
          onPurchased={() => {
            // Refresh wholesale list so seller stock counts update.
            api.listWholesale().then((w) => setWholesale(w.data)).catch(() => undefined);
          }}
        />
      )}
    </main>
  );
}

