'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import Toast from './components/Toast'

export default function Home() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [area, setArea] = useState('')
  const [photo, setPhoto] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setToast(null)

    try {
      let photoUrl = null

      if (photo) {
        const cleanName = photo.name.replace(/[^a-zA-Z0-9.]/g, '_')
        const fileName = `${Date.now()}-${cleanName}`
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('report-photos')
          .upload(fileName, photo)

        if (uploadError) throw uploadError

        const { data: urlData } = supabase.storage
          .from('report-photos')
          .getPublicUrl(fileName)

        photoUrl = urlData.publicUrl
      }

      // Call AI to categorize and rewrite the complaint
      let aiCategory = null
      let aiComplaint = null

      try {
        const aiResponse = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, description }),
        })
        const aiData = await aiResponse.json()
        if (!aiData.error) {
          aiCategory = aiData.category
          aiComplaint = aiData.complaint
        }
      } catch (aiError) {
        console.error('AI call failed, proceeding without it:', aiError)
      }

      const { error: insertError } = await supabase.from('reports').insert({
        title,
        raw_description: description,
        area,
        photo_url: photoUrl,
        ai_category: aiCategory,
        ai_complaint: aiComplaint,
      })

      if (insertError) throw insertError

      setToast({ message: 'Report submitted successfully!', type: 'success' })
      setTitle('')
      setDescription('')
      setArea('')
      setPhoto(null)
    } catch (error: any) {
     setToast({ message: error.message || 'Something went wrong', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
  <section className="bg-[#1e3a5f] text-white text-center py-14 px-4">
    <h1 className="text-3xl md:text-4xl font-bold mb-3">Smart Community Help Hub</h1>
    <p className="text-blue-100 max-w-xl mx-auto">
      Report local issues. Get them seen. Get them fixed.
    </p>
  </section>

  <div className="max-w-xl mx-auto bg-white rounded-lg shadow p-8 -mt-8 relative z-10 mb-12">
 <div className="flex justify-between items-center mb-6">
  <h2 className="text-xl font-semibold">Submit a Report</h2>
  <a href="/reports" className="text-blue-600 hover:underline text-sm">View All Reports →</a>
</div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
  type="text"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  required
  minLength={5}
  className={`w-full border rounded px-3 py-2 ${title.length > 0 && title.length < 5 ? 'border-red-400' : 'border-gray-300'}`}
  placeholder="e.g. Broken streetlight on Main Road"
/>
{title.length > 0 && title.length < 5 && (
  <p className="text-xs text-red-500 mt-1">Title should be at least 5 characters.</p>
)}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  required
  minLength={15}
  rows={4}
  className={`w-full border rounded px-3 py-2 ${description.length > 0 && description.length < 15 ? 'border-red-400' : 'border-gray-300'}`}
  placeholder="Describe the issue in your own words..."
/>
{description.length > 0 && description.length < 15 && (
  <p className="text-xs text-red-500 mt-1">Please provide a bit more detail (at least 15 characters) for the AI to work with.</p>
)}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Area</label>
            <input
              type="text"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              required
              className="w-full border rounded px-3 py-2"
              placeholder="e.g. Kashmir Road, Sialkot"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files?.[0] || null)}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 text-white py-2 rounded hover:bg-amber-600 disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit Report'}
          </button>
        </form>
      </div>
    </main>
  )
}