'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

type Report = {
  id: string
  title: string
  ai_category: string | null
  area: string
  status: string
  votes: number
}

const statusOptions = ['Pending', 'In Progress', 'Resolved']

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState<string | null>(null)

  const fetchReports = async () => {
    const { data, error } = await supabase
      .from('reports')
      .select('id, title, ai_category, area, status, votes')
      .order('created_at', { ascending: false })

    if (!error && data) setReports(data)
    setLoading(false)
  }

  useEffect(() => {
    if (authenticated) fetchReports()
  }, [authenticated])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (passwordInput === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setAuthenticated(true)
    } else {
      alert('Incorrect password')
    }
  }
  const handleStatusChange = async (id: string, newStatus: string) => {
  setUpdating(id)
  setReports((prev) => prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r)))
  await supabase.from('reports').update({ status: newStatus }).eq('id', id)
  await supabase.from('report_updates').insert({
    report_id: id,
    message: `Status updated to "${newStatus}"`,
  })
  setUpdating(null)
}

  if (!authenticated) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <form onSubmit={handleLogin} className="bg-white rounded-lg shadow p-8 max-w-sm w-full">
          <h1 className="text-xl font-bold mb-4">Admin Login</h1>
          <input
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            placeholder="Enter admin password"
            className="w-full border rounded px-3 py-2 mb-4"
          />
          <button type="submit" className="w-full bg-[#1e3a5f] text-white py-2 rounded hover:bg-[#16304d]">
            Login
          </button>
        </form>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Admin — Manage Reports</h1>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <div className="bg-white rounded-lg shadow divide-y">
            {reports.map((report) => (
              <div key={report.id} className="p-4 flex justify-between items-center gap-4">
                <div>
                  <p className="font-medium">{report.title}</p>
                  <p className="text-sm text-gray-500">📍 {report.area} · {report.ai_category || 'Uncategorized'} · 👍 {report.votes}</p>
                </div>
                <select
                  value={report.status}
                  onChange={(e) => handleStatusChange(report.id, e.target.value)}
                  disabled={updating === report.id}
                  className="border rounded px-3 py-1 text-sm"
                >
                  {statusOptions.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}