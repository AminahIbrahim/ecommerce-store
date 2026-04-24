import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProductById } from '../data/products'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'

export default function ProductDetail() {
  const { id } = useParams()
  const product = getProductById(id)
  const { addToCart } = useCart()
  const { showToast } = useToast()
  const [qty, setQty] = useState(1)

  if (!product) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6">
        <h1 className="text-2xl font-semibold text-ink-900">Product not found</h1>
        <Link to="/shop" className="mt-6 inline-block text-accent hover:text-accent-dark">
          ← Back to shop
        </Link>
      </div>
    )
  }

  const categoryLabel = product.category === 'footwear' ? 'Footwear' : 'Watches'
  const maxAdd = Math.min(qty, product.stock)

  function handleAdd() {
    addToCart(product, maxAdd)
    showToast('Added to cart')
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <Link
        to="/shop"
        className="inline-flex items-center gap-1 text-sm font-medium text-ink-500 transition hover:text-ink-800"
      >
        ← Shop
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="overflow-hidden rounded-2xl border border-ink-200 bg-ink-100 shadow-card">
          <img
            src={product.image}
            alt={product.name}
            className="aspect-square w-full object-cover sm:aspect-[4/3]"
          />
        </div>

        <div className="flex flex-col">
          <span className="inline-flex w-fit rounded-full bg-ink-100 px-3 py-1 text-xs font-medium text-ink-700">
            {categoryLabel}
          </span>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-6 text-lg text-ink-600">{product.description}</p>
          <p className="mt-8 text-3xl font-semibold tabular-nums text-ink-900">
            ${product.price.toFixed(2)}
          </p>
          <p className="mt-2 text-sm text-ink-500">
            {product.stock > 0 ? (
              <>
                <span className="font-medium text-ink-700">{product.stock}</span> in stock
              </>
            ) : (
              <span className="text-red-600">Out of stock</span>
            )}
          </p>

          {product.stock > 0 && (
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="flex items-center rounded-full border border-ink-200 bg-white">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  className="px-4 py-3 text-lg text-ink-600 transition hover:bg-ink-50 disabled:opacity-40"
                  disabled={qty <= 1}
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                >
                  −
                </button>
                <span className="min-w-[2rem] text-center text-sm font-semibold tabular-nums">
                  {qty}
                </span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  className="px-4 py-3 text-lg text-ink-600 transition hover:bg-ink-50 disabled:opacity-40"
                  disabled={qty >= product.stock}
                  onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                >
                  +
                </button>
              </div>
              <button
                type="button"
                onClick={handleAdd}
                className="rounded-full bg-ink-900 px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-ink-800"
              >
                Add to cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
