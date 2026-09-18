import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Move3d, Play } from 'lucide-react';
import type { Product } from '../types';

interface HeroProps {
  products: Product[];
}

const STAGE_CLASSES = ['', 'stage-variant-two', 'stage-variant-three', 'stage-variant-four'];

export function Hero({ products }: HeroProps) {
  const [index, setIndex] = useState(0);
  const featured = products.slice(0, 4);

  useEffect(() => {
    if (featured.length === 0) return;
    const timer = window.setInterval(() => {
      setIndex((i) => (i + 1) % featured.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [featured.length]);

  const product = featured[index];
  const variant = STAGE_CLASSES[index % STAGE_CLASSES.length];

  return (
    <section className="hero" id="discover">
      <div className="hero-grid-noise" aria-hidden="true" />
      <div className="hero-copy reveal visible">
        <p className="eyebrow">
          <span className="pulse-dot" /> THE MARKETPLACE IN MOTION
        </p>
        <h1>
          Find what
          <br />
          <em>moves</em> you.
        </h1>
        <p className="hero-description">
          A living marketplace of independent taste-makers, rare objects, and the ideas worth passing on.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="#new-arrivals">
            Explore the drop <ArrowUpRight size={16} />
          </a>
          <Link className="button button-ghost" to="/dashboard">
            <span className="play-icon">
              <Play size={12} />
            </span>
            Start selling
          </Link>
        </div>
        <div className="hero-footnote">
          <span className="line" />
          <span>Curated by people, not algorithms</span>
        </div>
      </div>
      <div
        className="hero-stage reveal visible"
        aria-label="Rotating 3D product display"
        data-cursor="drag"
      >
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />
        <div className="stage-label stage-label-top">
          <span>
            {String(index + 1).padStart(2, '0')} / {String(featured.length).padStart(2, '0')}
          </span>
          <span>Featured signal</span>
        </div>
        <div className="product-shadow" />
        <div className={`floating-product ${variant}`} id="floating-product">
          <div className="product-face product-face-front">
            <div className="bag-handle" />
            <div className="bag-body">
              <span>{index + 1}</span>
            </div>
        </div>
          <div className="product-face product-face-back" />
          <div className="product-face product-face-side" />
        </div>
        {product && (
          <div className="stage-caption">
            <span className="caption-kicker">OBJECT {String(product.id).padStart(3, '0')}</span>
            <strong>{product.name}</strong>
            <span className="caption-detail">
              By {product.reseller_name} · ${product.price}
            </span>
          </div>
        )}
        <div className="stage-controls">
          {featured.map((_, i) => (
            <button
              key={i}
              className={`stage-control ${i === index ? 'active' : ''}`}
              aria-label={`Show object ${i + 1}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
        <div className="drag-hint">
          <Move3d size={15} /> Drag to orbit
        </div>
      </div>
    </section>
  );
}
