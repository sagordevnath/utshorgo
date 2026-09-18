export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <span className="wordmark light">
            <span className="wordmark-mark">U</span>
            <span>utshorgo</span>
          </span>
          <p>The reseller-first marketplace where anyone can build their business.</p>
        </div>
        <nav className="footer-links" aria-label="Footer navigation">
          <a href="/#resellers">Resellers</a>
          <a href="/#categories">Categories</a>
          <a href="/dashboard">Seller Center</a>
          <a href="/checkout">Bag</a>
        </nav>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} UTSHORGO</span>
        <span>BUILT FOR THE RESELLER ECONOMY</span>
      </div>
    </footer>
  );
}
