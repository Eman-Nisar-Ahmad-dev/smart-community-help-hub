export default function About() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-8">
        <h1 className="text-2xl font-bold mb-6">About Smart Community Help Hub</h1>

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-2 text-[#1e3a5f]">The Problem</h2>
          <p className="text-gray-700 leading-relaxed">
            Every day, people notice issues in their neighborhood — a broken streetlight, an overflowing
            garbage bin, a damaged road, a water leak — but have no clear, organized way to report them.
            Complaints often get lost in scattered WhatsApp groups or never reach the right authority at all,
            leaving problems unresolved for weeks or months.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-2 text-[#1e3a5f]">The Solution</h2>
          <p className="text-gray-700 leading-relaxed">
            Smart Community Help Hub gives residents a simple way to report local issues with a photo and
            location, track their status over time, and support issues that matter most to their community
            through upvoting — turning scattered complaints into an organized, visible public record.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-2 text-[#1e3a5f]">How the AI Works</h2>
          <p className="text-gray-700 leading-relaxed">
            When a report is submitted, Google&apos;s Gemini AI automatically reads the user&apos;s raw
            description and does two things: it categorizes the issue (Streetlight, Water, Garbage, Road,
            Electricity, or Other), and rewrites the informal report into a clear, professional complaint
            suitable for submission to a local authority — saving residents the effort of writing formal
            language themselves.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2 text-[#1e3a5f]">Built With</h2>
          <p className="text-gray-700 leading-relaxed">
            Next.js, Supabase (database, storage), and Google Gemini AI.
          </p>
        </section>
      </div>
    </main>
  )
}