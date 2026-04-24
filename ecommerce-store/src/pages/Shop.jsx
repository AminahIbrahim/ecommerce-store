import { useMemo, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { products, categories } from '../data/products'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const categoryFromUrl = searchParams.get('category') || 'all'
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState(
    ['all', 'footwear', 'watches'].includes(categoryFromUrl) ? categoryFromUrl : 'all'
  )

  const { addToCart } = useCart()
  const { showToast } = useToast()

  useEffect(() => {
    const c = searchParams.get('category')
    if (c && ['all', 'footwear', 'watches'].includes(c)) {
      setCategory(c)
    }
  }, [searchParams])

  function handleCategoryChange(next) {
    setCategory(next)
    const nextParams = new URLSearchParams(searchParams)
    if (next === 'all') {
      nextParams.delete('category')
    } else {
      nextParams.set('category', next)
    }
    setSearchParams(nextParams, { replace: true })
  }

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCat = category === 'all' || p.category === category
      const q = search.trim().toLowerCase()
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      return matchCat && matchSearch
    })
  }, [category, search])

  const sneakerProducts = filtered.filter((p) => p.category === 'footwear')
  const watchProducts = filtered.filter((p) => p.category === 'watches')
  const showSplitSections = category === 'all'

  function handleAdd(product) {
    addToCart(product, 1)
    showToast('Added to cart')
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">Shop</h1>
        <p className="mt-2 text-ink-500">
          Filter by category or search by name. All prices in USD.
        </p>
      </div>

      <div className="mt-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="w-full max-w-md">
          <label htmlFor="search" className="sr-only">
            Search products
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-ink-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </span>
            <input
              id="search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or description…"
              className="w-full rounded-full border border-ink-200 bg-white py-3 pl-11 pr-4 text-sm text-ink-900 placeholder:text-ink-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => handleCategoryChange(c.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                category === c.id
                  ? 'bg-ink-900 text-white'
                  : 'bg-white text-ink-600 ring-1 ring-ink-200 hover:bg-ink-50'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-ink-500">No products match your filters.</p>
      ) : showSplitSections ? (
        <div className="mt-12 space-y-12">
          <section>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-ink-900">Sneakers</h2>
                <p className="text-sm text-ink-500">{sneakerProducts.length} items</p>
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sneakerProducts.map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={handleAdd} />
              ))}
            </div>
          </section>

          <section>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-ink-900">Watches</h2>
                <p className="text-sm text-ink-500">{watchProducts.length} items</p>
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {watchProducts.map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={handleAdd} />
              ))}
            </div>
          </section>
        </div>
      ) : (
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAdd} />
          ))}
        </div>
      )}
    </div>
  )
}
