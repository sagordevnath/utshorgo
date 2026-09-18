import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowUpRight, Box, Gem, History, ScanLine } from 'lucide-react';
import { api } from '../api';
import type { Product, Reseller } from '../types';
import { Hero } from '../components/Hero';
import { ResellerCard } from '../components/ResellerCard';
import { ProductCard } from '../components/ProductCard';
import { ProductSkeletonGrid } from '../components/Skeleton';
import { useReveal } from '../hooks/useReveal';

const CATEGORIES = [
  { name: 'Objects', icon: Box, className: 'category-blue', count: '2,840 signals' },
  { name: 'Wearables', icon: Gem, className: 'category-coral', count: '1,206 signals' },
  { name: 'Digital', icon: ScanLine, className: 'category-lime', count: '984 signals' },
  { name: 'Vintage', icon: History, className: 'category-ink', count: '3,410 signals' },
];

const FILTERS = ['All', 'Objects', 'Wearables', 'Digital', 'Vintage'];
const SORTS = [
  { value: 'newest', label: 'Newest' },
  { value: 'price_asc', label: 'Price ↑' },
  { value: 'price_desc', label: 'Price ↓' },
  { value: 'rating', label: 'Top rated' },
];
const TYPE_TABS = [
  { value: 'all', label: 'Everything' },
  { value: 'product', label: 'Products' },
  { value: 'service', label: 'Services' },
] as const;

export function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search') ?? '';
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('newest');
  const [listingType, setListingType] = useState<'all' | 'product' | 'service'>('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [resellers, setResellers] = useState<Reseller[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useReveal<HTMLElement>();

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    Promise.all([api.listProducts({ category, search, sort, type: listingType }), api.listResellers()])
      .then(([productsRes, resellersRes]) => {
        if (cancelled) return;
        setProducts(productsRes.data);
        setResellers(resellersRes.data);
      })
      .catch(() => {
        if (!cancelled) setProducts([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [category, search, sort, listingType]);

  const tickerItems = useMemo(
    () => ['ONE MARKETPLACE', 'ONE THOUSAND WAYS TO FIND YOURS', 'CURATED BY PEOPLE', 'SHIPPED WITH INTENT'],
    []
  );

  const applyCategory = (name: string) => {
    setCategory(name);
    document.getElementById('new-arrivals')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main>
      <Hero products={products} />

      <section className="ticker" aria-label="Marketplace highlights">
        <div className="ticker-track">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i}>
              {item} <b>✦</b>
            </span>
          ))}
        </div>
      </section>

      <section className="section reseller-section" id="resellers">
        <div className="section-heading reveal visible">
          <div>
            <p className="eyebrow">PEOPLE WITH A POINT OF VIEW</p>
            <h2>
              Trending <em>resellers</em>
            </h2>
          </div>
          <a className="text-link" href="#resellers">
            See all resellers <ArrowUpRight size={14} />
          </a>
        </div>
        <div className="reseller-rail">
          {resellers.slice(0, 4).map((r, i) => (
            <ResellerCard key={r.id} reseller={r} featured={i === 0} index={i} />
          ))}
          {resellers.length === 0 && <p className="section-note">Loading resellers…</p>}
        </div>
      </section>

      <section className="section category-section" id="categories">
        <div className="section-heading reveal visible">
          <div>
            <p className="eyebrow">FOLLOW YOUR CURIOSITY</p>
            <h2>
              Browse by <em>energy</em>
            </h2>
          </div>
          <p className="section-note">Four ways in. No wrong turn.</p>
        </div>
        <div className="category-grid">
          {CATEGORIES.map((cat, i) => {
            const Icon = cat.icon;
            const delays = ['', 'reveal-delay-small', 'reveal-delay-medium', 'reveal-delay-large'];
            return (
              <button
                key={cat.name}
                className={`category-card ${cat.className} ${delays[i % delays.length]} reveal visible`}
                onClick={() => applyCategory(cat.name)}
              >
                <span className="category-index">{String(i + 1).padStart(2, '0')}</span>
                <Icon size={54} strokeWidth={1.2} />
                <strong>{cat.name}</strong>
                <span>{cat.count}</span>
                <ArrowUpRight className="corner-arrow" size={17} />
              </button>
            );
          })}
        </div>
      </section>

      <section className="section product-section" id="new-arrivals" ref={sectionRef}>
        <div className="section-heading reveal visible">
          <div>
            <p className="eyebrow">FRESH FROM THE NETWORK</p>
            <h2>
              {search ? (
                <>
                  Results for <em>“{search}”</em>
                </>
              ) : (
                <>
                  New <em>arrivals</em>
                </>
              )}
            </h2>
          </div>
          <div className="filter-row">
            <div className="type-tabs" role="tablist" aria-label="Listing type">
              {TYPE_TABS.map((t) => (
                <button
                  key={t.value}
                  role="tab"
                  aria-selected={listingType === t.value}
                  className={`type-tab ${listingType === t.value ? 'active' : ''}`}
                  onClick={() => setListingType(t.value)}
                >
                  {t.label}
                </button>
              ))}
            </div>
            {FILTERS.map((f) => (
              <button
                key={f}
                className={`filter-chip ${category === f ? 'active' : ''}`}
                onClick={() => setCategory(f)}
              >
                {f}
              </button>
            ))}
            <select className="sort-select" value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort products">
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {search && (
          <button
            className="text-link clear-search"
            onClick={() => {
              searchParams.delete('search');
              setSearchParams(searchParams);
            }}
          >
            Clear search
          </button>
        )}

        {loading ? (
          <ProductSkeletonGrid count={8} />
        ) : products.length === 0 ? (
          <p className="section-note">No products match that filter yet. Try another energy.</p>
        ) : (
          <div className="product-grid">
            {products.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}
      </section>

      <section className="manifesto">
        <div className="manifesto-mark">U</div>
        <div>
          <h2>
            Sell what you <em>love.</em>
          </h2>
          <p>
            Open a storefront in minutes. Reach buyers who care where things come from. Keep your customers, your
            margins, and your point of view.
          </p>
          <a className="button button-light" href="/dashboard">
            Open your storefront
          </a>
        </div>
        <div className="manifesto-orbit" aria-hidden="true" />
      </section>
    </main>
  );
}
