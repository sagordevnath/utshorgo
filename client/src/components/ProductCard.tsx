import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Heart, Star } from 'lucide-react';
import type { Product } from '../types';
import { useCart } from '../stores/cart';
import { showToast } from './Toast';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const add = useCart((s) => s.add);
  const [saved, setSaved] = useState(false);
  const delays = ['', 'reveal-delay-small', 'reveal-delay-medium', 'reveal-delay-large'];
  const delay = delays[index % delays.length];

  const handleAdd = () => {
    add(product);
    showToast(`${product.name} added to your bag`);
  };

  return (
    <article className={`product-card reveal ${delay}`}>
      <div
        className={`product-image ${product.visual} ${product.type === 'service' ? 'is-service' : ''}`}
        data-cursor="view"
      >
        {product.on_sale && <span className="sale-tag">Sale</span>}
        {product.is_new && <span className="new-tag">New</span>}
        <span className={`type-tag ${product.type}`}>{product.type === 'service' ? 'Service' : 'Product'}</span>
        <button
          className={`wishlist ${saved ? 'saved' : ''}`}
          aria-label={`Save ${product.name}`}
          onClick={() => setSaved((s) => !s)}
        >
          <Heart size={15} />
        </button>
        <span className="product-number">{String(index + 1).padStart(3, '0')}</span>
        <Link to={`/product/${product.id}`} className="quick-view" aria-label={`View ${product.name}`}>
          View <ArrowUpRight size={12} />
        </Link>
      </div>
      <div className="product-copy">
        <div>
          <p>
            {product.category} · {product.reseller_name}
          </p>
          <h3>
            <Link to={`/product/${product.id}`}>{product.name}</Link>
          </h3>
          <div className="product-rating">
            <span>★★★★★</span>
            {product.rating.toFixed(1)} ({product.reviews})
          </div>
        </div>
        <div className="product-buy">
          <strong>${product.price}</strong>
          <button className="add-button" onClick={handleAdd} aria-label={`Add ${product.name} to bag`}>
            Add
          </button>
        </div>
      </div>
    </article>
  );
}
