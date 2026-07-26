'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import SkeletonCard from '../components/SkeletonCard'
import EmptyState from '../components/EmptyState'

type Report = {
  id: string
  title: string
  raw_description: string
  ai_category: string | null
  ai_complaint: string | null
  photo_url: string | null
  area: string
  status: string
  votes: number
  created_at: string
}

const categoryIcons: Record<string, string> = {
  Streetlight: '💡',
  Water: '💧',
  Garbage: '🗑️',
  Road: '🛣️',
  Electricity: '⚡',
  Other: '📋',
}


const categoryColors: Record<string, string> = {
  Streetlight: 'bg-yellow-100 text-yellow-800',
  Water: 'bg-blue-100 text-blue-800',
  Garbage: 'bg-green-100 text-green-800',
  Road: 'bg-orange-100 text-orange-800',
  Electricity: 'bg-purple-100 text-purple-800',
  Other: 'bg-gray-100 text-gray-800',
}

const statusColors: Record<string, string> = {
  Pending: 'bg-red-100 text-red-800',
  'In Progress': 'bg-yellow-100 text-yellow-800',
  Resolved: 'bg-green-100 text-green-800',
}

export default function Reports() {
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [sortBy, setSortBy] = useState<'recent' | 'votes'>('recent')

  const fetchReports = async () => {
    const { data, error } = await supabase
      .from('reports')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) setReports(data)
    setLoading(false)
  }

  useEffect(() => {
  fetchReports()
}, [])
const categories = ['All', 'Streetlight', 'Water', 'Garbage', 'Road', 'Electricity', 'Other']
const filteredReports = (selectedCategory === 'All'
  ? reports
  : reports.filter((r) => r.ai_category === selectedCategory)
).slice().sort((a, b) => {
  if (sortBy === 'votes') return b.votes - a.votes
  return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
})

  const handleUpvote = async (id: string, currentVotes: number) => {
    // Optimistic UI update
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, votes: currentVotes + 1 } : r))
    )

    await supabase
      .from('reports')
      .update({ votes: currentVotes + 1 })
      .eq('id', id)
  }

if (loading) {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="grid gap-6 md:grid-cols-2">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    </main>
  )
}

return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Community Reports</h1>
          <a href="/" className="text-blue-600 hover:underline">+ New Report</a>
        </div>
       <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-sm px-4 py-1.5 rounded-full font-medium transition ${
                selectedCategory === cat
                  ? 'bg-[#1e3a5f] text-white'
                  : 'bg-white text-gray-600 border hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setSortBy('recent')}
            className={`text-xs px-3 py-1 rounded-full font-medium transition ${
              sortBy === 'recent' ? 'bg-amber-500 text-white' : 'bg-white text-gray-500 border hover:bg-gray-100'
            }`}
          >
            🕒 Most Recent
          </button>
          <button
            onClick={() => setSortBy('votes')}
            className={`text-xs px-3 py-1 rounded-full font-medium transition ${
              sortBy === 'votes' ? 'bg-amber-500 text-white' : 'bg-white text-gray-500 border hover:bg-gray-100'
            }`}
          >
            👍 Most Upvoted
          </button>
        </div>
        
  {filteredReports.length === 0 && (
  <EmptyState
    icon="📍"
    title={selectedCategory === 'All' ? 'No reports yet' : `No ${selectedCategory} reports`}
    subtitle="Be the first to report a local issue and help your community stay informed."
    actionLabel="Report an Issue"
    actionHref="/"
  />
)}
<div className="grid gap-6 md:grid-cols-2">
  {filteredReports.map((report) => (
            <div key={report.id} className="bg-white rounded-lg shadow overflow-hidden">
           <a href={`/reports/${report.id}`}>
  {report.photo_url && (
    <img src={report.photo_url} alt={report.title} className="w-full h-48 object-cover" />
  )}
</a>
<div className="p-4">
                <div className="flex gap-2 mb-2">
                  {report.ai_category && (
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${categoryColors[report.ai_category] || categoryColors.Other}`}>   
                      {categoryIcons[report.ai_category] || '📋'} {report.ai_category}
                    </span>
                  )}
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[report.status] || statusColors.Pending}`}>
                    {report.status}
                  </span>
                </div>
                <a href={`/reports/${report.id}`}>
  <h2 className="font-semibold text-lg mb-1 hover:text-blue-600">{report.title}</h2>
</a>
                <p className="text-sm text-gray-500 mb-2">📍 {report.area}</p>
                <p className="text-sm text-gray-700 mb-4">
                  {report.ai_complaint || report.raw_description}
                </p>
                <button
  onClick={() => handleUpvote(report.id, report.votes)}
  className="w-fit flex items-center gap-1 text-sm border rounded-full px-3 py-1 bg-amber-50 border-amber-300 text-amber-800 hover:bg-amber-100 transition"
>
  👍 {report.votes}
</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}