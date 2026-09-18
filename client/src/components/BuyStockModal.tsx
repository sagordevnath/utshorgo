import { useMemo, useState } from 'react';
import { Boxes, Store, TrendingUp } from 'lucide-react';
import type { WholesaleItem } from '../types';
import { Modal } from './Modal';
import { showToast } from './Toast';

interface BuyStockModalProps {
  item: WholesaleItem;
  onClose: () => void;
  onPurchased: () => void;
}

export function BuyStockModal({ item, onClose, onPurchased }: BuyStockModalProps) {
  const [qty, setQty] = useState(1);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const max = Math.max(1, item.stock);
  const clamped = Math.min(qty, max);
  const totalCost = useMemo(() => +(item.wholesale_price * clamped).toFixed(2), [item.wholesale_price, clamped]);
  // Suggested retail is the listing's current retail price; buyer may undercut.
  const suggestRetail = item.retail_price;
  const potentialProfit = +((suggestRetail - item.wholesale_price) * clamped).toFixed(2);
  const margin = suggestRetail > 0 ? Math.round(((suggestRetail - item.wholesale_price) / suggestRetail) * 100) : 0;

  const submit = async () => {
    setBusy(true);
    setError(null);
    try {
      const { api } = await import('../api');
      await api.purchaseStock(item.id, clamped);
      showToast(`Bought ${clamped} × ${item.name} at $${item.wholesale_price} each`);
      onPurchased();
      onClose();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Modal title={`Buy stock — ${item.name}`} onClose={onClose}>
      <div className="buy-modal">
        <div className="buy-summary">
          <span className="buy-from"><Store size={13} /> From {item.reseller_name}</span>
          <span className="buy-type">{item.type === 'service' ? 'Service slots' : 'Wholesale units'}</span>
        </div>

        <div className="buy-qty-row">
          <span className="field-label">Quantity</span>
          <div className="qty-stepper">
            <button aria-label="Decrease quantity" disabled={clamped <= 1} onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
            <input
              type="number"
              min={1}
              max={max}
              value={clamped}
              onChange={(e) => setQty(Math.max(1, Math.min(max, Number(e.target.value) || 1)))}
              aria-label="Quantity"
            />
            <button aria-label="Increase quantity" disabled={clamped >= max} onClick={() => setQty((q) => Math.min(max, q + 1))}>+</button>
          </div>
          <span className="buy-stock-hint">{item.stock} available · ${item.wholesale_price}/unit</span>
        </div>

        <div className="buy-math">
          <div><span>Your cost</span><strong>${totalCost.toFixed(2)}</strong></div>
          <div><span>Suggested retail</span><strong>${suggestRetail}</strong></div>
          <div className="buy-profit"><span>Potential profit</span><strong>+${potentialProfit.toFixed(2)}</strong></div>
        </div>
        <div className="buy-margin-note"><TrendingUp size={13} /> {margin}% margin at suggested retail</div>

        {error && <p className="form-error">{error}</p>}

        <div className="buy-actions">
          <button className="button button-ghost" onClick={onClose} disabled={busy}>Cancel</button>
          <button className="button button-primary" onClick={submit} disabled={busy}>
            <Boxes size={15} /> {busy ? 'Reserving…' : `Buy ${clamped} for $${totalCost.toFixed(0)}`}
          </button>
        </div>
      </div>
    </Modal>
  );
}
