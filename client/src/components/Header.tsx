import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Heart, Menu, Search, ShoppingBag, X } from 'lucide-react';
import { useCart } from '../stores/cart';

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
        <span className="wordmark-mark">U</span>
        <span>utshorgo</span>
      </Link>
      <nav className="main-nav" aria-label="Primary navigation">
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
          Discover
        </NavLink>
        <a href="/#resellers">Resellers</a>
        <a href="/#categories">Categories</a>
        <NavLink to="/dashboard">Sell on Utshorgo</NavLink>
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
            <button className="icon-button" aria-label="Open saved items">
              <Heart size={18} />
            </button>
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
