import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const { items, increment, decrement, removeFromCart, subtotal } = useCart()

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6">
        <h1 className="text-2xl font-semibold text-ink-900">Your cart is empty</h1>
        <p className="mt-2 text-ink-500">Add something you love from the shop.</p>
        <Link
          to="/shop"
          className="mt-8 inline-flex rounded-full bg-ink-900 px-8 py-3 text-sm font-semibold text-white hover:bg-ink-800"
        >
          Browse shop
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="text-3xl font-semibold tracking-tight text-ink-900">Cart</h1>
      <p className="mt-1 text-ink-500">{items.length} line item(s)</p>

      <div className="mt-10 lg:grid lg:grid-cols-3 lg:gap-10">
        <ul className="space-y-4 lg:col-span-2">
          {items.map(({ product, quantity }) => (
            <li
              key={product.id}
              className="flex gap-4 rounded-2xl border border-ink-200 bg-white p-4 shadow-card sm:gap-6 sm:p-5"
            >
              <Link
                to={`/product/${product.id}`}
                className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-ink-100 sm:h-28 sm:w-28"
              >
                <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
              </Link>
              <div className="min-w-0 flex-1">
                <Link to={`/product/${product.id}`}>
                  <h2 className="font-semibold text-ink-900 hover:text-accent">{product.name}</h2>
                </Link>
                <p className="mt-1 text-sm tabular-nums text-ink-600">
                  ${product.price.toFixed(2)} each
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <div className="flex items-center rounded-full border border-ink-200">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      className="px-3 py-2 text-sm text-ink-600 hover:bg-ink-50 disabled:opacity-40"
                      disabled={quantity <= 1}
                      onClick={() => decrement(product.id)}
                    >
                      −
                    </button>
                    <span className="min-w-[2rem] text-center text-sm font-semibold tabular-nums">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      className="px-3 py-2 text-sm text-ink-600 hover:bg-ink-50 disabled:opacity-40"
                      disabled={quantity >= product.stock}
                      onClick={() => increment(product.id)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromCart(product.id)}
                    className="text-sm font-medium text-red-600 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="hidden text-right sm:block">
                <p className="font-semibold tabular-nums text-ink-900">
                  ${(product.price * quantity).toFixed(2)}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <aside className="mt-10 rounded-2xl border border-ink-200 bg-white p-6 shadow-card lg:mt-0">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-500">Summary</h2>
          <div className="mt-4 flex justify-between text-ink-700">
            <span>Subtotal</span>
            <span className="font-semibold tabular-nums">${subtotal.toFixed(2)}</span>
          </div>
          <p className="mt-2 text-xs text-ink-400">Shipping and tax calculated at checkout (demo).</p>
          <button
            type="button"
            className="mt-6 w-full rounded-full bg-ink-900 py-3.5 text-sm font-semibold text-white transition hover:bg-ink-800"
          >
            Checkout
          </button>
          <Link
            to="/shop"
            className="mt-4 block text-center text-sm font-medium text-accent hover:text-accent-dark"
          >
            Continue shopping
          </Link>
        </aside>
      </div>
    </div>
  )
}
