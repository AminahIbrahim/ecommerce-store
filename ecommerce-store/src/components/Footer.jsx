import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-ink-200 bg-ink-50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1.8fr] lg:items-start">
          <div className="space-y-4">
            <p className="text-lg font-semibold text-ink-900">Elvar</p>
            <p className="max-w-md text-sm text-ink-500">
              Curated sneakers and watches. Minimal design, maximum quality.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3 text-sm">
            <div>
              <p className="font-medium text-ink-900">Shop</p>
              <ul className="mt-3 space-y-2 text-ink-500">
                <li>
                  <Link to="/all-products" className="hover:text-ink-800">
                    All products
                  </Link>
                </li>
                <li>
                  <Link to="/footwear" className="hover:text-ink-800">
                    Footwear
                  </Link>
                </li>
                <li>
                  <Link to="/watches" className="hover:text-ink-800">
                    Watches
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-ink-900">Company</p>
              <ul className="mt-3 space-y-2 text-ink-500">
                <li>
                  <Link to="/about" className="hover:text-ink-800">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-ink-800">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/careers" className="hover:text-ink-800">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-ink-900">Support</p>
              <ul className="mt-3 space-y-2 text-ink-500">
                <li>
                  <Link to="/help-center" className="hover:text-ink-800">
                    Help center
                  </Link>
                </li>
                <li>
                  <Link to="/shipping" className="hover:text-ink-800">
                    Shipping
                  </Link>
                </li>
                <li>
                  <Link to="/returns" className="hover:text-ink-800">
                    Returns
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-ink-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-ink-500">
            Questions? Email us at{' '}
            <a href="mailto:hello@elvar.store" className="font-medium text-ink-900 hover:text-ink-800">
              hello@elvar.store
            </a>
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-ink-500">
            <span className="font-medium text-ink-900">Follow us</span>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-ink-800">
              Instagram
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-ink-800">
              Twitter
            </a>
          </div>
        </div>

        <p className="mt-10 text-center text-xs text-ink-400">
          © {new Date().getFullYear()} Elvar. Demo store — not a real shop.
        </p>
      </div>
    </footer>
  )
}
