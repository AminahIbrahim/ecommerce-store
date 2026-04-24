import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'

const featured = products.slice(0, 4)

export default function Home() {
  const { addToCart } = useCart()
  const { showToast } = useToast()

  function handleAdd(product) {
    addToCart(product, 1)
    showToast('Added to cart')
  }

  return (
    <div>
      <section className="relative overflow-hidden border-b border-ink-200 bg-gradient-to-br from-white via-ink-50 to-sky-50/40">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:py-28">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-widest text-accent">
              New season
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink-900 sm:text-5xl lg:text-6xl">
              Sneakers & watches, refined.
            </h1>
            <p className="mt-6 text-lg text-ink-600">
              Discover a tight edit of performance footwear and precision timepieces — minimal
              aesthetics, responsive comfort, built to last.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center rounded-full bg-ink-900 px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-ink-800"
              >
                Shop collection
              </Link>
              <Link
                to="/shop?category=watches"
                className="inline-flex items-center justify-center rounded-full border border-ink-300 bg-white px-8 py-3.5 text-sm font-semibold text-ink-800 transition hover:border-ink-400 hover:bg-ink-50"
              >
                Explore watches
              </Link>
            </div>
          </div>
        </div>
        <div
          className="pointer-events-none absolute -right-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-sky-200/40 blur-3xl sm:right-10 lg:right-32"
          aria-hidden
        />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl">
              Featured
            </h2>
            <p className="mt-1 text-ink-500">Hand-picked pieces from this week&apos;s drop.</p>
          </div>
          <Link
            to="/shop"
            className="text-sm font-medium text-accent hover:text-accent-dark"
          >
            View all →
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAdd} />
          ))}
        </div>
      </section>
    </div>
  )
}
