import { Link, useNavigate } from 'react-router-dom'
import { Search, ShoppingBag, User, LogOut, X } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { itemCount } = useCart()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleSearch = (event) => {
    event.preventDefault()

    const value = query.trim()

    if (value) {
      navigate(`/shop?search=${encodeURIComponent(value)}`)
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">

        {/* Logo */}
        <Link
          to={user ? '/shop' : '/'}
          className="font-display text-2xl font-extrabold tracking-tight"
        >
          Northstar
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {user && (
            <>
              <Link
                to="/shop"
                className="text-sm font-bold uppercase tracking-[.12em] hover:text-terracotta"
              >
                Shop
              </Link>

              <Link
                to="/orders"
                className="text-sm font-bold uppercase tracking-[.12em] hover:text-terracotta"
              >
                Orders
              </Link>
            </>
          )}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4">

          {/* Search */}
          {user && (
            <form
              onSubmit={handleSearch}
              className="hidden items-center border-b border-ink/20 sm:flex"
            >
              <Search size={16} className="text-ink/50" />

              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-32 bg-transparent px-2 py-2 text-sm outline-none"
                placeholder="Search"
              />

              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                >
                  <X size={15} />
                </button>
              )}
            </form>
          )}

          {/* Login/Register */}
          {!user && (
            <>
              <Link
                to="/login"
                className="hidden text-sm font-bold uppercase tracking-[.1em] sm:block hover:text-terracotta"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-forest px-4 py-2 text-sm font-bold uppercase tracking-[.08em] text-paper hover:opacity-90"
              >
                Create account
              </Link>
            </>
          )}

          {/* Account */}
          {user && (
            <Link
              to="/account"
              className="flex items-center gap-2 text-sm font-bold hover:text-terracotta"
              title="My Account"
            >
              <User size={19} />
              <span className="hidden lg:inline">
                {user.name || 'Account'}
              </span>
            </Link>
          )}

          {/* Logout */}
          {user && (
            <button
              onClick={handleLogout}
              className="hidden items-center gap-2 text-sm font-bold uppercase tracking-[.08em] hover:text-terracotta sm:flex"
            >
              <LogOut size={17} />
              Logout
            </button>
          )}

          {/* Cart */}
          {user && (
            <Link
              to="/cart"
              className="relative"
              aria-label="Shopping cart"
            >
              <ShoppingBag size={21} />

              {itemCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-terracotta px-1 text-[10px] font-bold text-white">
                  {itemCount}
                </span>
              )}
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Search */}
      {user && (
        <div className="border-t border-ink/10 px-5 py-2 sm:hidden">
          <form
            onSubmit={handleSearch}
            className="flex items-center"
          >
            <Search size={15} className="text-ink/50" />

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent px-2 py-2 text-sm outline-none"
              placeholder="Search pieces"
            />

            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Clear search"
              >
                <X size={15} />
              </button>
            )}
          </form>
        </div>
      )}
    </header>
  )
}