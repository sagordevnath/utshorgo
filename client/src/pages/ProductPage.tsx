import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, BadgeCheck, ShieldCheck, ShoppingBag, Star } from 'lucide-react';
import { api } from '../api';
import type { Product } from '../types';
import { useCart } from '../stores/cart';
import { ProductCard } from '../components/ProductCard';
import { showToast } from '../components/Toast';

export function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const add = useCart((s) => s.add);
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setProduct(null);
    setError(null);
    api
      .getProduct(id!)
      .then((res) => {
        if (cancelled) return;
        setProduct(res.data);
        return api.listProducts({ category: res.data.category });
      })
      .then((res) => {
        if (cancelled || !res) return;
        setRelated(res.data.filter((p) => p.id !== Number(id)).slice(0, 4));
      })
      .catch((e: Error) => {
        if (!cancelled) setError(e.message);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (error) {
    return (
      <main className="section product-section" style={{ paddingTop: 140 }}>
        <p className="section-note">{error}</p>
        <Link className="text-link" to="/">
          <ArrowLeft size={14} /> Back to the marketplace
        </Link>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="section product-section" style={{ paddingTop: 140 }}>
        <p className="section-note">Loading product…</p>
      </main>
    );
  }

  const handleAdd = (goToCheckout = false) => {
    add(product, qty);
    showToast(`${product.name} added to your bag`);
    if (goToCheckout) navigate('/checkout');
  };

  return (
    <main>
      <section className="product-hero">
        <Link to="/" className="breadcrumb">
          <ArrowLeft size={14} /> Marketplace
        </Link>
        <div className="product-hero-grid">
          <div className={`product-hero-visual ${product.visual}`} data-cursor="view">
            <span className="product-number">{String(product.id).padStart(3, '0')}</span>
            {product.on_sale && <span className="sale-tag">Sale</span>}
            {product.is_new && <span className="new-tag">New</span>}
          </div>
          <div className="product-hero-info">
            <p className="eyebrow">
              {product.category.toUpperCase()} · {product.reseller_name.toUpperCase()}
            </p>
            <h1>{product.name}</h1>
            <div className="product-rating">
              <span>★★★★★</span>
              {product.rating.toFixed(1)} · {product.reviews} reviews
            </div>
            <p className="product-description">{product.description}</p>
            <div className="product-price-row">
              <strong>${product.price}</strong>
              <span className="stock-hint">
                <ShieldCheck size={14} /> Authenticity guaranteed
              </span>
            </div>
            <div className="qty-row">
              <button aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))}>
                −
              </button>
              <span>{qty}</span>
              <button aria-label="Increase quantity" onClick={() => setQty((q) => q + 1)}>
                +
              </button>
            </div>
            <div className="product-cta-row">
              <button className="button button-primary" onClick={() => handleAdd(false)}>
                <ShoppingBag size={16} /> Add to bag
              </button>
              <button className="button button-dark" onClick={() => handleAdd(true)}>
                Buy now
              </button>
            </div>
            <div className="seller-strip">
              <div className="seller-avatar">{product.reseller_name.slice(0, 2).toUpperCase()}</div>
              <div>
                <strong>
                  {product.reseller_name} <BadgeCheck size={13} />
                </strong>
                <p>Verified seller · Ships in 2–4 days</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section product-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">KEEP EXPLORING</p>
              <h2>
                You might also <em>like</em>
              </h2>
            </div>
          </div>
          <div className="product-grid">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
