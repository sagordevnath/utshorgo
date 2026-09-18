export function ProductSkeletonGrid({ count = 8 }: { count?: number }) {
  return (
    <div className="product-grid">
      {Array.from({ length: count }).map((_, i) => (
        <div className="product-card skeleton-card" key={i}>
          <div className="product-image skeleton" />
          <div className="product-copy">
            <div>
              <div className="skeleton skeleton-line" />
              <div className="skeleton skeleton-line short" />
            </div>
            <div className="skeleton skeleton-line" />
          </div>
        </div>
      ))}
    </div>
  );
}
