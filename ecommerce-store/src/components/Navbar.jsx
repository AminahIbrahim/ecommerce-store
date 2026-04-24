import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const linkClass = ({ isActive }) =>
  `text-sm font-medium transition-colors ${
    isActive ? 'text-ink-900' : 'text-ink-500 hover:text-ink-800'
  }`

export default function Navbar() {
  const { itemCount } = useCart()

  return (
    <header className="sticky top-0 z-40 border-b border-ink-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/elvar-logo-new.png"
            alt="Elvar logo"
            className="h-12 w-12 rounded-full object-cover transition-transform duration-300 ease-out hover:scale-105"
          />
          <div className="flex flex-col leading-tight">
            <span className="text-xl font-semibold tracking-tight text-ink-900">Elvar Sole | Sneakers & Watches</span>
          </div>
        </Link>

        <nav className="flex items-center gap-6 sm:gap-8">
          <NavLink to="/" className={linkClass} end>
            Home
          </NavLink>
          <NavLink to="/shop" className={linkClass}>
            Shop
          </NavLink>
          <Link
            to="/cart"
            className="relative flex items-center gap-1.5 rounded-full bg-ink-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-ink-800"
          >
            Cart
            {itemCount > 0 && (
              <span className="flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-accent px-1 text-[11px] font-semibold leading-none text-white">
                {itemCount > 99 ? '99+' : itemCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  )
}
