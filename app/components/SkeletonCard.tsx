export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden animate-pulse">
      <div className="w-full h-48 bg-gray-200" />
      <div className="p-4 space-y-3">
        <div className="flex gap-2">
          <div className="h-5 w-16 bg-gray-200 rounded-full" />
          <div className="h-5 w-16 bg-gray-200 rounded-full" />
        </div>
        <div className="h-5 w-3/4 bg-gray-200 rounded" />
        <div className="h-4 w-1/2 bg-gray-200 rounded" />
        <div className="h-4 w-full bg-gray-200 rounded" />
        <div className="h-4 w-full bg-gray-200 rounded" />
        <div className="h-8 w-20 bg-gray-200 rounded-full" />
      </div>
    </div>
  )
}