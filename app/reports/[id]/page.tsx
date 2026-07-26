'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'

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
type Update = {
  id: string
  message: string
  created_at: string
}

const statusColors: Record<string, string> = {
  Pending: 'bg-red-100 text-red-800',
  'In Progress': 'bg-yellow-100 text-yellow-800',
  Resolved: 'bg-green-100 text-green-800',
}

const categoryIcons: Record<string, string> = {
  Streetlight: '💡',
  Water: '💧',
  Garbage: '🗑️',
  Road: '🛣️',
  Electricity: '⚡',
  Other: '📋',
}

export default function ReportDetail() {
  const params = useParams()
  const [report, setReport] = useState<Report | null>(null)
  const [loading, setLoading] = useState(true)
  const [updates, setUpdates] = useState<Update[]>([])

  useEffect(() => {
  const fetchReport = async () => {
    const { data, error } = await supabase
      .from('reports')
      .select('*')
      .eq('id', params.id)
      .single()

    if (!error && data) setReport(data)

    const { data: updateData } = await supabase
      .from('report_updates')
      .select('*')
      .eq('report_id', params.id)
      .order('created_at', { ascending: false })

    if (updateData) setUpdates(updateData)

    setLoading(false)
  }
  fetchReport()
}, [params.id])

  const handleUpvote = async () => {
    if (!report) return
    const newVotes = report.votes + 1
    setReport({ ...report, votes: newVotes })
    await supabase.from('reports').update({ votes: newVotes }).eq('id', report.id)
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Report not found.</p>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <a href="/reports" className="text-blue-600 hover:underline text-sm mb-4 inline-block">← Back to all reports</a>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          {report.photo_url && (
            <img src={report.photo_url} alt={report.title} className="w-full h-64 object-cover" />
          )}

          <div className="p-6">
            <div className="flex gap-2 mb-3">
              {report.ai_category && (
                <span className="text-xs px-2 py-1 rounded-full font-medium bg-blue-100 text-blue-800">
                  {categoryIcons[report.ai_category] || '📋'} {report.ai_category}
                </span>
              )}
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[report.status] || statusColors.Pending}`}>
                {report.status}
              </span>
            </div>

            <h1 className="text-2xl font-bold mb-2">{report.title}</h1>
            <p className="text-sm text-gray-500 mb-6">📍 {report.area} · Submitted {new Date(report.created_at).toLocaleDateString()}</p>

            {report.ai_complaint && (
              <div className="mb-6">
                <h2 className="text-sm font-semibold text-gray-500 uppercase mb-2">AI-Generated Formal Complaint</h2>
                <p className="text-gray-800 bg-blue-50 border border-blue-100 rounded p-4">{report.ai_complaint}</p>
              </div>
            )}

            <div className="mb-6">
              <h2 className="text-sm font-semibold text-gray-500 uppercase mb-2">Original Report</h2>
              <p className="text-gray-700">{report.raw_description}</p>
            </div>
            <button
              onClick={handleUpvote}
              className="w-fit flex items-center gap-1 text-sm border rounded-full px-4 py-2 bg-amber-50 border-amber-300 text-amber-800 hover:bg-amber-100 transition"
            >
              👍 {report.votes} Upvotes
            </button>

            {updates.length > 0 && (
              <div className="mt-8 pt-6 border-t">
                <h2 className="text-sm font-semibold text-gray-500 uppercase mb-3">Activity Timeline</h2>
                <div className="space-y-3">
                  {updates.map((u) => (
                    <div key={u.id} className="flex gap-3 text-sm">
                      <span className="text-gray-400">•</span>
                      <div>
                        <p className="text-gray-700">{u.message}</p>
                        <p className="text-xs text-gray-400">{new Date(u.created_at).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
