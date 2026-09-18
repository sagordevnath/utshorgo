import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { BadgeDollarSign, Boxes, CheckCircle2, Clock3, ImagePlus, LayoutGrid, Package, Percent, ShieldCheck, Sparkles, Tag } from 'lucide-react';
import { api } from '../api';
import type { ListingType, SubmissionInput } from '../types';
import { showToast } from '../components/Toast';

const VISUALS = [
  { value: 'image-lamp', label: 'Minimal' },
  { value: 'image-watch', label: 'Editorial' },
  { value: 'image-radio', label: 'Retro' },
  { value: 'image-ceramic', label: 'Artisan' },
  { value: 'image-style', label: 'Lifestyle' },
  { value: 'image-sound', label: 'Studio' },
];

const CATEGORIES = ['Objects', 'Wearables', 'Digital', 'Vintage'];

export function SellPage() {
  const [type, setType] = useState<ListingType>('product');
  const [form, setForm] = useState({
    name: '',
    description: '',
    category: 'Objects',
    price: '',
    reseller_price: '',
    stock: '10',
    visual: 'image-lamp',
    reseller_name: '',
    image_url: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const retail = Number(form.price) || 0;
  const wholesale = Number(form.reseller_price) || 0;
  const margin = retail > 0 && wholesale > 0 ? Math.round(((retail - wholesale) / retail) * 100) : null;

  const previewName = form.name.trim() || 'Your listing title';
  const previewDesc = form.description.trim() || 'Describe what makes it special — materials, craft, story, or what buyers get.';

  const validation = useMemo(() => {
    const issues: string[] = [];
    if (form.name.trim().length < 3) issues.push('Title needs at least 3 characters');
    if (form.description.trim().length < 10) issues.push('Description needs at least 10 characters');
    if (!(retail > 0)) issues.push('Retail price must be greater than 0');
    if (!(wholesale > 0)) issues.push('Reseller purchase price must be greater than 0');
    if (retail > 0 && wholesale > retail) issues.push('Reseller price cannot exceed retail price');
    return issues;
  }, [form.name, form.description, retail, wholesale]);

  const canSubmit = validation.length === 0 && !submitting;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    setError(null);
    const payload: SubmissionInput = {
      name: form.name.trim(),
      description: form.description.trim(),
      type,
      category: form.category,
      price: retail,
      reseller_price: wholesale,
      stock: Number(form.stock) || 10,
      visual: form.visual,
      reseller_name: form.reseller_name.trim() || 'Independent seller',
      image_url: form.image_url.trim() || undefined,
    };
    try {
      await api.submitListing(payload);
      setSubmitted(true);
      showToast('Submitted for review — our team approves listings within 24h');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <main className="sell-page">
        <section className="sell-success reveal visible">
          <div className="success-orbit" aria-hidden="true" />
          <span className="success-icon"><CheckCircle2 size={44} strokeWidth={1.4} /></span>
          <h1>Listing submitted</h1>
          <p>
            <strong>{form.name}</strong> is now in the review queue. Our curation team checks quality,
            pricing sanity, and description honesty — most listings go live within 24 hours.
          </p>
          <div className="success-actions">
            <Link className="button button-primary" to="/">Back to marketplace</Link>
            <button className="button button-ghost" onClick={() => { setSubmitted(false); setForm({ ...form, name: '', description: '', price: '', reseller_price: '' }); }}>
              Submit another
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="sell-page">
      <header className="sell-header">
        <p className="eyebrow"><Sparkles size={13} /> SELLER STUDIO</p>
        <h1>
          List it. We <em>review</em> it. It sells.
        </h1>
        <p className="section-note">
          Products and services both welcome. Every listing is reviewed by our team before going live —
          that is what keeps buyers trusting the marketplace.
        </p>
      </header>

      <div className="sell-layout">
        <form className="sell-form" onSubmit={handleSubmit} noValidate>
          {/* ------------------------------ Type ----------------------------- */}
          <fieldset className="form-section">
            <legend><LayoutGrid size={14} /> What are you listing?</legend>
            <div className="type-toggle" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={type === 'product'}
                className={`type-option ${type === 'product' ? 'active' : ''}`}
                onClick={() => setType('product')}
              >
                <Package size={18} />
                <strong>Product</strong>
                <span>Physical item you ship</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={type === 'service'}
                className={`type-option ${type === 'service' ? 'active' : ''}`}
                onClick={() => setType('service')}
              >
                <Clock3 size={18} />
                <strong>Service</strong>
                <span>Time, skill, or session</span>
              </button>
            </div>
          </fieldset>

          {/* ----------------------------- Basics ---------------------------- */}
          <fieldset className="form-section">
            <legend><Tag size={14} /> The basics</legend>
            <label className="field">
              <span>Title</span>
              <input
                value={form.name}
                onChange={set('name')}
                placeholder={type === 'service' ? 'e.g. Vintage tech repair' : 'e.g. Arc travel tote'}
                maxLength={80}
              />
            </label>
            <label className="field">
              <span>Description</span>
              <textarea
                value={form.description}
                onChange={set('description')}
                rows={4}
                maxLength={600}
                placeholder={type === 'service'
                  ? 'What is included, how long it takes, where it happens…'
                  : 'Materials, dimensions, condition, what makes it worth owning…'}
              />
              <em>{form.description.length}/600</em>
            </label>
            <div className="field-row">
              <label className="field">
                <span>Category</span>
                <select value={form.category} onChange={set('category')}>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </label>
              <label className="field">
                <span>Visual style</span>
                <select value={form.visual} onChange={set('visual')}>
                  {VISUALS.map((v) => (
                    <option key={v.value} value={v.value}>{v.label}</option>
                  ))}
                </select>
              </label>
            </div>
            <label className="field">
              <span>Image URL <em>(optional)</em></span>
              <div className="field-icon">
                <ImagePlus size={14} />
                <input value={form.image_url} onChange={set('image_url')} placeholder="https://…" />
              </div>
            </label>
          </fieldset>

          {/* ---------------------------- Pricing ---------------------------- */}
          <fieldset className="form-section">
            <legend><BadgeDollarSign size={14} /> Pricing & stock</legend>
            <div className="field-row">
              <label className="field">
                <span>{type === 'service' ? 'Session price ($)' : 'Retail price ($)'} </span>
                <input type="number" min="1" step="0.01" value={form.price} onChange={set('price')} placeholder="149" />
              </label>
              <label className="field">
                <span>{type === 'service' ? 'Partner rate ($)' : 'Reseller purchase price ($)'} </span>
                <input type="number" min="1" step="0.01" value={form.reseller_price} onChange={set('reseller_price')} placeholder="92" />
              </label>
            </div>
            <div className="margin-strip">
              <Percent size={14} />
              {margin === null ? (
                <span>Enter both prices to see the reseller margin</span>
              ) : margin <= 0 ? (
                <span className="margin-bad">Margin: {margin}% — resellers need room to profit</span>
              ) : margin < 20 ? (
                <span className="margin-warn">Margin: {margin}% — healthy listings offer 25%+</span>
              ) : (
                <span className="margin-good">Margin: {margin}% — attractive to resellers</span>
              )}
            </div>
            <div className="field-row">
              <label className="field">
                <span>{type === 'service' ? 'Slots available' : 'Units in stock'}</span>
                <input type="number" min="1" value={form.stock} onChange={set('stock')} />
              </label>
              <label className="field">
                <span>Store / seller name</span>
                <input value={form.reseller_name} onChange={set('reseller_name')} placeholder="e.g. Analog Club" />
              </label>
            </div>
          </fieldset>

          {error && <p className="form-error">{error}</p>}

          <div className="form-footer">
            <p className="form-footnote">
              <ShieldCheck size={13} /> Listings are reviewed by the Utshorgo team before going live.
            </p>
            <button className="button button-primary" type="submit" disabled={!canSubmit}>
              {submitting ? 'Submitting…' : 'Submit for review'}
            </button>
          </div>
        </form>

        {/* --------------------------- Live preview -------------------------- */}
        <aside className="sell-preview" aria-label="Live listing preview">
          <p className="preview-kicker">LIVE PREVIEW</p>
          <article className="product-card reveal visible preview-card">
            <div className={`product-image ${form.visual}`}>
              {retail > 0 && wholesale > 0 && margin !== null && margin >= 25 && (
                <span className="new-tag">Reseller pick</span>
              )}
              <span className="product-number">NEW</span>
            </div>
            <div className="product-copy">
              <div>
                <p>
                  {form.category} · {form.reseller_name.trim() || 'Independent seller'}
                </p>
                <h3>{previewName}</h3>
                <div className="product-rating">
                  <span>★★★★★</span> New listing
                </div>
              </div>
              <div className="product-buy">
                <strong>${retail || '—'}</strong>
                <span className="preview-type-chip">{type === 'service' ? 'Service' : 'Product'}</span>
              </div>
            </div>
          </article>
          <div className="preview-note">
            <Boxes size={14} />
            <p>
              Resellers will see your purchase price of <b>${wholesale || '—'}</b> and can stock your item
              with a <b>{margin !== null ? `${margin}%` : '—'} margin</b>. Buyers never see wholesale numbers.
            </p>
          </div>
          {validation.length > 0 && (
            <ul className="preview-validation">
              {validation.map((v) => (
                <li key={v}>{v}</li>
              ))}
            </ul>
          )}
        </aside>
      </div>
    </main>
  );
}
