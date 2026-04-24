import { useToast } from '../context/ToastContext'

export default function Toast() {
  const { toast } = useToast()

  if (!toast) return null

  return (
    <div
      role="status"
      aria-live="polite"
      className="toast-enter pointer-events-none fixed bottom-6 left-1/2 z-[100] -translate-x-1/2"
    >
      <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-ink-200 bg-white px-5 py-3 shadow-lg shadow-ink-900/10">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white">
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </span>
        <span className="text-sm font-medium text-ink-800">{toast.message}</span>
      </div>
    </div>
  )
}
