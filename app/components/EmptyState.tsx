type EmptyStateProps = {
  icon?: string
  title: string
  subtitle?: string
  actionLabel?: string
  actionHref?: string
}

export default function EmptyState({
  icon = '📭',
  title,
  subtitle,
  actionLabel,
  actionHref,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4">
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-700 mb-1">{title}</h3>
      {subtitle && (
        <p className="text-gray-500 text-sm max-w-sm mb-4">{subtitle}</p>
      )}
      {actionLabel && actionHref && (
        <a href={actionHref} className="bg-amber-500 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-amber-600 transition">
          {actionLabel}
        </a>
      )}
    </div>
  )
}