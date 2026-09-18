import { BadgeCheck, Plus, Star } from 'lucide-react';
import type { Reseller } from '../types';

interface ResellerCardProps {
  reseller: Reseller;
  featured?: boolean;
  index?: number;
}

export function ResellerCard({ reseller, featured = false, index = 0 }: ResellerCardProps) {
  const delays = ['', 'reveal-delay-small', 'reveal-delay-medium', 'reveal-delay-large'];
  const delay = delays[index % delays.length];

  return (
    <article className={`reseller-card ${featured ? 'reseller-card-featured' : ''} reveal ${delay}`}>
      <div className={`reseller-photo ${reseller.photo}`}>
        <span className="status-tag">
          <BadgeCheck size={12} /> {reseller.badge}
        </span>
      </div>
      <div className="reseller-info">
        <div>
          <h3>{reseller.name}</h3>
          <p>
            {reseller.location} · {reseller.tagline}
          </p>
        </div>
        <span className="rating">
          {reseller.rating.toFixed(1)} <Star size={11} />
        </span>
      </div>
      <div className="reseller-meta">
        <span>{reseller.item_count} items</span>
        <span>{(reseller.followers / 1000).toFixed(1)}k followers</span>
        <button aria-label={`Follow ${reseller.name}`}>
          <Plus size={15} />
        </button>
      </div>
    </article>
  );
}
