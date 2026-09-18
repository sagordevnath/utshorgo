import { Link } from 'react-router-dom';
import logo from '../assets/utshorgo-logo@1x.png';
import logo2x from '../assets/utshorgo-logo@2x.png';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <span className="wordmark light">
            <img
              className="wordmark-logo"
              src={logo}
              srcSet={`${logo2x} 2x`}
              width={118}
              height={40}
              alt="Utshorgo"
            />
          </span>
          <p>The reseller-first marketplace where anyone can build their business.</p>
        </div>
        <nav className="footer-links" aria-label="Footer navigation">
          <Link to="/resellers">Reseller Exchange</Link>
          <Link to="/sell">Sell with us</Link>
          <Link to="/admin">Admin console</Link>
          <Link to="/dashboard">Seller Dashboard</Link>
          <Link to="/inventory">Reseller Inventory</Link>
          <Link to="/checkout">Bag</Link>
        </nav>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} UTSHORGO</span>
        <span>BUILT FOR THE RESELLER ECONOMY</span>
      </div>
    </footer>
  );
}
