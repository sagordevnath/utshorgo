import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, CreditCard, MapPin, ShoppingBag, Wallet } from 'lucide-react';
import { api } from '../api';
import { useCart } from '../stores/cart';
import { showToast } from '../components/Toast';
import type { OrderRecord } from '../types';

type Step = 0 | 1 | 2;

const SHIPPING = 8;

export function CheckoutPage() {
  const navigate = useNavigate();
  const items = useCart((s) => s.items);
  const clear = useCart((s) => s.clear);
  const [step, setStep] = useState<Step>(0);
  const [address, setAddress] = useState({ name: '', line1: '', city: '', zip: '' });
  const [payment, setPayment] = useState<'card' | 'wallet' | 'bank'>('card');
  const [placing, setPlacing] = useState(false);
  const [order, setOrder] = useState<OrderRecord | null>(null);

  const subtotal = items.reduce((sum, i) => sum + i.qty * i.product.price, 0);
  const total = subtotal + (items.length > 0 ? SHIPPING : 0);

  const addressValid = address.name.trim() && address.line1.trim() && address.city.trim() && address.zip.trim();

  const placeOrder = async () => {
    setPlacing(true);
    try {
      const res = await api.createOrder(items, total);
      setOrder(res.data);
      clear();
      showToast('Order confirmed 🎉');
    } catch (e) {
      showToast((e as Error).message);
    } finally {
      setPlacing(false);
    }
  };

  if (order) {
    return (
      <main className="section checkout-section">
        <div className="confirm-card">
          <div className="confirm-check">
            <Check size={34} />
          </div>
          <h1>Order confirmed</h1>
          <p className="section-note">{order.order_number} · We emailed your receipt.</p>
          <div className="confirm-summary">
            {order.items.map(({ product, qty }) => (
              <div className="confirm-item" key={product.id}>
                <div className={`mini-visual ${product.visual}`} />
                <span>
                  {qty}× {product.name}
                </span>
                <strong>${(product.price * qty).toFixed(2)}</strong>
              </div>
            ))}
            <div className="confirm-total">
              <span>Total paid</span>
              <strong>${order.total.toFixed(2)}</strong>
            </div>
          </div>
          <button className="button button-primary" onClick={() => navigate('/')}>
            Keep exploring
          </button>
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="section checkout-section">
        <div className="confirm-card">
          <ShoppingBag size={40} />
          <h1>Your bag is empty</h1>
          <p className="section-note">Find something worth passing on.</p>
          <Link to="/" className="button button-primary">
            Back to the marketplace
          </Link>
        </div>
      </main>
    );
  }

  const steps = ['Shipping', 'Payment', 'Review'];

  return (
    <main className="section checkout-section">
      <Link to="/" className="breadcrumb">
        <ArrowLeft size={14} /> Keep shopping
      </Link>
      <div className="checkout-grid">
        <div className="checkout-steps">
          <ol className="step-indicator">
            {steps.map((label, i) => (
              <li key={label} className={i === step ? 'active' : i < step ? 'done' : ''}>
                <span>{i < step ? <Check size={12} /> : i + 1}</span> {label}
              </li>
            ))}
          </ol>

          {step === 0 && (
            <div className="checkout-step-card">
              <h2>
                <MapPin size={18} /> Where should it land?
              </h2>
              <div className="form-grid">
                <input placeholder="Full name" value={address.name} onChange={(e) => setAddress({ ...address, name: e.target.value })} />
                <input placeholder="Street address" value={address.line1} onChange={(e) => setAddress({ ...address, line1: e.target.value })} />
                <input placeholder="City" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} />
                <input placeholder="ZIP / Postcode" value={address.zip} onChange={(e) => setAddress({ ...address, zip: e.target.value })} />
              </div>
              <button className="button button-primary" disabled={!addressValid} onClick={() => setStep(1)}>
                Continue to payment
              </button>
            </div>
          )}

          {step === 1 && (
            <div className="checkout-step-card">
              <h2>
                <CreditCard size={18} /> How would you like to pay?
              </h2>
              <div className="payment-options">
                {(
                  [
                    { id: 'card', label: 'Card', icon: CreditCard, hint: 'Visa, MC, Amex' },
                    { id: 'wallet', label: 'Digital wallet', icon: Wallet, hint: 'Apple / Google Pay' },
                    { id: 'bank', label: 'Bank transfer', icon: MapPin, hint: '1–2 business days' },
                  ] as const
                ).map(({ id, label, icon: Icon, hint }) => (
                  <button
                    key={id}
                    className={`payment-option ${payment === id ? 'selected' : ''}`}
                    onClick={() => setPayment(id)}
                  >
                    <Icon size={18} />
                    <div>
                      <strong>{label}</strong>
                      <span>{hint}</span>
                    </div>
                  </button>
                ))}
              </div>
              <div className="step-actions">
                <button className="button button-ghost-dark" onClick={() => setStep(0)}>
                  Back
                </button>
                <button className="button button-primary" onClick={() => setStep(2)}>
                  Review order
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="checkout-step-card">
              <h2>Almost yours</h2>
              <p className="section-note">
                Shipping to {address.name}, {address.line1}, {address.city} {address.zip}
              </p>
              <div className="confirm-summary">
                {items.map(({ product, qty }) => (
                  <div className="confirm-item" key={product.id}>
                    <div className={`mini-visual ${product.visual}`} />
                    <span>
                      {qty}× {product.name}
                    </span>
                    <strong>${(product.price * qty).toFixed(2)}</strong>
                  </div>
                ))}
              </div>
              <div className="step-actions">
                <button className="button button-ghost-dark" onClick={() => setStep(1)}>
                  Back
                </button>
                <button className="button button-primary" disabled={placing} onClick={placeOrder}>
                  {placing ? 'Placing order…' : `Place order · $${total.toFixed(2)}`}
                </button>
              </div>
            </div>
          )}
        </div>

        <aside className="order-summary">
          <h3>Order summary</h3>
          {items.map(({ product, qty }) => (
            <div className="summary-row" key={product.id}>
              <span>
                {qty}× {product.name}
              </span>
              <span>${(product.price * qty).toFixed(2)}</span>
            </div>
          ))}
          <div className="summary-row muted">
            <span>Shipping</span>
            <span>${SHIPPING.toFixed(2)}</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <strong>${total.toFixed(2)}</strong>
          </div>
          <p className="section-note">Authenticity guarantee · 30-day returns</p>
        </aside>
      </div>
    </main>
  );
}
