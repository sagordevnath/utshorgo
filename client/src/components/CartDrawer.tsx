import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Minus, Plus, ShoppingBag, X } from 'lucide-react';
import { useCart } from '../stores/cart';

export function CartDrawer() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const items = useCart((s) => s.items);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const total = items.reduce((sum, i) => sum + i.qty * i.product.price, 0);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <div className={`drawer-scrim ${open ? 'open' : ''}`} onClick={() => setOpen(false)} />
      <aside className={`cart-drawer ${open ? 'open' : ''}`} aria-hidden={!open}>
        <div className="drawer-header">
          <h2>Your bag</h2>
          <button className="close-drawer" aria-label="Close bag" onClick={() => setOpen(false)}>
            <X size={20} />
          </button>
        </div>
        <div className="drawer-content">
          {items.length === 0 ? (
            <div className="empty-bag">
              <ShoppingBag size={34} />
              <p>
                Your bag is waiting
                <br />
                for a good find.
              </p>
            </div>
          ) : (
            items.map(({ product, qty }) => (
              <div className="drawer-item" key={product.id}>
                <div className={`mini-visual ${product.visual}`} />
                <div className="drawer-item-copy">
                  <p>
                    {product.category} · {product.reseller_name}
                  </p>
                  <h3>{product.name}</h3>
                  <strong>${product.price}</strong>
                  <div className="qty-controls">
                    <button aria-label="Decrease quantity" onClick={() => setQty(product.id, qty - 1)}>
                      <Minus size={12} />
                    </button>
                    <span>{qty}</span>
                    <button aria-label="Increase quantity" onClick={() => setQty(product.id, qty + 1)}>
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
                <button className="remove-item" aria-label={`Remove ${product.name}`} onClick={() => remove(product.id)}>
                  <X size={14} />
                </button>
              </div>
            ))
          )}
        </div>
        <div className="drawer-footer">
          <div>
            <span>Total</span>
            <strong>${total.toFixed(2)}</strong>
          </div>
          <button className="button button-primary checkout-button" disabled={items.length === 0} onClick={() => { setOpen(false); navigate('/checkout'); }}>
            Checkout
          </button>
        </div>
      </aside>
    </>
  );
}
