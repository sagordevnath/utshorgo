import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, Search, ShieldCheck, ShoppingBag, X } from 'lucide-react';
import { useCart } from '../stores/cart';
import logo from '../assets/utshorgo-logo@1x.png';
import logo2x from '../assets/utshorgo-logo@2x.png';

export function Header() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const count = useCart((s) => s.items.reduce((sum, i) => sum + i.qty, 0));

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(query.trim() ? `/?search=${encodeURIComponent(query.trim())}` : '/');
    setSearchOpen(false);
  };

  return (
    <header className="site-header">
      <Link className="wordmark" to="/">
        <img
          className="wordmark-logo"
          src={logo}
          srcSet={`${logo2x} 2x`}
          width={118}
          height={40}
          alt="Utshorgo"
        />
      </Link>
      <nav className="main-nav" aria-label="Primary navigation">
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
          Discover
        </NavLink>
        <NavLink to="/resellers" className={({ isActive }) => (isActive ? 'active' : '')}>
          Reseller Exchange
        </NavLink>
        <NavLink to="/sell" className={({ isActive }) => (isActive ? 'active' : '')}>
          Sell
        </NavLink>
        <NavLink to="/inventory">Inventory</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </nav>
      <div className="header-actions">
        {searchOpen ? (
          <form className="header-search" onSubmit={submitSearch}>
            <Search size={14} />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the marketplace…"
              aria-label="Search products"
            />
            <button type="button" aria-label="Close search" onClick={() => setSearchOpen(false)}>
              <X size={14} />
            </button>
          </form>
        ) : (
          <>
            <button className="icon-button" aria-label="Open search" onClick={() => setSearchOpen(true)}>
              <Search size={18} />
            </button>
            <Link to="/admin" className="icon-button" aria-label="Admin approval console" title="Admin console">
              <ShieldCheck size={18} />
            </Link>
          </>
        )}
        <Link to="/checkout" className="cart-button" aria-label="Open cart">
          <ShoppingBag size={16} />
          <span>Bag</span>
          <b>{count}</b>
        </Link>
      </div>
    </header>
  );
}
