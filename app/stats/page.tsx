'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import EmptyState from '../components/EmptyState'

type Report = {
  id: string
  ai_category: string | null
  status: string
  votes: number
}

const categoryIcons: Record<string, string> = {
  Streetlight: '💡',
  Water: '💧',
  Garbage: '🗑️',
  Road: '🛣️',
  Electricity: '⚡',
  Other: '📋',
}

export default function Stats() {
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReports = async () => {
      const { data, error } = await supabase.from('reports').select('id, ai_category, status, votes')
      if (!error && data) setReports(data)
      setLoading(false)
    }
    fetchReports()
  }, [])

 if (loading) {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto animate-pulse">
        <div className="h-8 w-48 bg-gray-200 rounded mb-8" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          <div className="bg-white rounded-lg shadow p-5 h-24" />
          <div className="bg-white rounded-lg shadow p-5 h-24" />
          <div className="bg-white rounded-lg shadow p-5 h-24 col-span-2 md:col-span-1" />
        </div>
        <div className="bg-white rounded-lg shadow p-6 h-40" />
      </div>
    </main>
  )
}

  const total = reports.length
  const totalVotes = reports.reduce((sum, r) => sum + (r.votes || 0), 0)

  const categoryCounts: Record<string, number> = {}
  reports.forEach((r) => {
    const cat = r.ai_category || 'Uncategorized'
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1
  })

  const statusCounts: Record<string, number> = { Pending: 0, 'In Progress': 0, Resolved: 0 }
  reports.forEach((r) => {
    if (statusCounts[r.status] !== undefined) statusCounts[r.status]++
  })

  const maxCategoryCount = Math.max(...Object.values(categoryCounts), 1)

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">Community Insights</h1>

        {/* Top stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          <div className="bg-white rounded-lg shadow p-5 text-center">
            <p className="text-3xl font-bold text-[#1e3a5f]">{total}</p>
            <p className="text-sm text-gray-500 mt-1">Total Reports</p>
          </div>
          <div className="bg-white rounded-lg shadow p-5 text-center">
            <p className="text-3xl font-bold text-[#1e3a5f]">{totalVotes}</p>
            <p className="text-sm text-gray-500 mt-1">Total Upvotes</p>
          </div>
          <div className="bg-white rounded-lg shadow p-5 text-center col-span-2 md:col-span-1">
            <p className="text-3xl font-bold text-[#1e3a5f]">{statusCounts.Resolved}</p>
            <p className="text-sm text-gray-500 mt-1">Resolved Issues</p>
          </div>
        </div>

        {/* Category breakdown */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="font-semibold text-lg mb-4">Reports by Category</h2>
          <div className="space-y-3">
            {Object.entries(categoryCounts).map(([category, count]) => (
              <div key={category}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{categoryIcons[category] || '📋'} {category}</span>
                  <span className="text-gray-500">{count}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-amber-500 h-2 rounded-full"
                    style={{ width: `${(count / maxCategoryCount) * 100}%` }}
                  />
                </div>
              </div>
            ))}
            {Object.keys(categoryCounts).length === 0 && (
  <EmptyState icon="📊" title="No data yet" subtitle="Stats will appear here once reports are submitted." />
)}
          </div>
        </div>

        {/* Status breakdown */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="font-semibold text-lg mb-4">Reports by Status</h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-red-600">{statusCounts.Pending}</p>
              <p className="text-xs text-gray-500 mt-1">Pending</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-600">{statusCounts['In Progress']}</p>
              <p className="text-xs text-gray-500 mt-1">In Progress</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">{statusCounts.Resolved}</p>
              <p className="text-xs text-gray-500 mt-1">Resolved</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}