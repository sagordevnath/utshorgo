import { useMemo, useState } from 'react';
import { BadgeDollarSign } from 'lucide-react';
import type { InventoryRow, Purchase, Resale } from '../types';
import { Modal } from './Modal';
import { showToast } from './Toast';

interface RecordSaleModalProps {
  row: InventoryRow;
  purchases: Purchase[];
  resales: Resale[];
  onClose: () => void;
  onRecorded: () => void;
}

export function RecordSaleModal({ row, purchases, resales, onClose, onRecorded }: RecordSaleModalProps) {
  // Units already resold out of each purchase batch.
  const soldByPurchase = useMemo(() => {
    const map = new Map<number, number>();
    resales.forEach((r) => map.set(r.purchase_id, (map.get(r.purchase_id) ?? 0) + r.qty));
    return map;
  }, [resales]);

  const openPurchases = purchases.filter((p) => p.qty - (soldByPurchase.get(p.id) ?? 0) > 0);
  const [purchaseId, setPurchaseId] = useState<number>(openPurchases[0]?.id ?? 0);
  const purchase = purchases.find((p) => p.id === purchaseId) ?? openPurchases[0];
  const max = purchase ? purchase.qty - (soldByPurchase.get(purchase.id) ?? 0) : 0;
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState<string>('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clampedQty = Math.max(1, Math.min(qty, Math.max(1, max)));
  const unitPrice = Number(price) || 0;
  const unitCost = purchase?.unit_cost ?? 0;
  const profit = +((unitPrice - unitCost) * clampedQty).toFixed(2);
  const revenue = +(unitPrice * clampedQty).toFixed(2);

  const submit = async () => {
    if (!purchase) return;
    if (!(unitPrice > 0)) {
      setError('Enter the price you sold it for');
      return;
    }
    if (unitPrice <= unitCost) {
      setError(`Below your cost of $${unitCost} — this sale would lose money`);
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const { api } = await import('../api');
      await api.recordResale(purchase.id, clampedQty, unitPrice);
      showToast(`Recorded: +$${profit.toFixed(2)} profit on ${row.listing_name}`);
      onRecorded();
      onClose();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Modal title={`Record sale — ${row.listing_name}`} onClose={onClose}>
      <div className="buy-modal">
        {openPurchases.length === 0 ? (
          <p className="section-note">No open purchases with remaining stock for this listing.</p>
        ) : (
          <>
            {openPurchases.length > 1 && (
              <label className="field">
                <span>Which purchase batch</span>
                <select value={purchaseId} onChange={(e) => setPurchaseId(Number(e.target.value))}>
                  {openPurchases.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.qty - (soldByPurchase.get(p.id) ?? 0)} left · ${p.unit_cost}/unit · {new Date(p.purchased_at).toLocaleDateString()}
                    </option>
                  ))}
                </select>
              </label>
            )}

            <div className="buy-qty-row">
              <span className="field-label">Units sold</span>
              <div className="qty-stepper">
                <button aria-label="Decrease quantity" disabled={clampedQty <= 1} onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
                <input
                  type="number"
                  min={1}
                  max={max}
                  value={clampedQty}
                  onChange={(e) => setQty(Math.max(1, Math.min(max, Number(e.target.value) || 1)))}
                  aria-label="Units sold"
                />
                <button aria-label="Increase quantity" disabled={clampedQty >= max} onClick={() => setQty((q) => Math.min(max, q + 1))}>+</button>
              </div>
              <span className="buy-stock-hint">{max} unsold · bought at ${unitCost}/unit</span>
            </div>

            <label className="field">
              <span>Your sale price per unit ($)</span>
              <input
                type="number"
                min="0.01"
                step="0.01"
                placeholder={`e.g. ${row.seller_name ? '' : ''}29`}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </label>

            <div className="buy-math">
              <div><span>Revenue</span><strong>${revenue.toFixed(2)}</strong></div>
              <div><span>Cost basis</span><strong>${(unitCost * clampedQty).toFixed(2)}</strong></div>
              <div className="buy-profit"><span>Net profit</span><strong>{profit >= 0 ? '+' : ''}${profit.toFixed(2)}</strong></div>
            </div>

            {error && <p className="form-error">{error}</p>}

            <div className="buy-actions">
              <button className="button button-ghost" onClick={onClose} disabled={busy}>Cancel</button>
              <button className="button button-primary" onClick={submit} disabled={busy}>
                <BadgeDollarSign size={15} /> {busy ? 'Recording…' : 'Record sale'}
              </button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}
