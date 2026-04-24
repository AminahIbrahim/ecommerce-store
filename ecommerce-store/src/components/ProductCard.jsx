import { Link } from 'react-router-dom'

export default function ProductCard({ product, onAddToCart }) {
  const categoryLabel =
    product.category === 'footwear' ? 'Footwear' : 'Watches'

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-ink-200/80 bg-white shadow-card transition duration-300 hover:-translate-y-0.5 hover:shadow-card-hover">
      <Link
        to={`/product/${product.id}`}
        className="relative block aspect-[4/3] overflow-hidden bg-ink-100"
      >
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-[1.03]"
          loading="lazy"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-medium text-ink-700 backdrop-blur-sm">
          {categoryLabel}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-base font-semibold text-ink-900 transition group-hover:text-accent sm:text-lg">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 line-clamp-2 flex-1 text-sm text-ink-500">{product.description}</p>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-lg font-semibold tabular-nums text-ink-900">
            ${product.price.toFixed(2)}
          </p>
          <button
            type="button"
            onClick={() => onAddToCart?.(product)}
            className="w-full rounded-full bg-ink-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-ink-800 active:scale-[0.98] sm:w-auto"
          >
            Add to cart
          </button>
        </div>
      </div>
    </article>
  )
}
