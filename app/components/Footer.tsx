export default function Footer() {
  return (
    <footer className="bg-[#1e3a5f] text-blue-100 py-6 px-4 mt-auto">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2 text-sm">
        <p>© {new Date().getFullYear()} Smart Community Help Hub — Built by Eman Nisar Ahmad</p>
        <p>Powered by Next.js, Supabase & Google Gemini AI</p>
      </div>
    </footer>
  )
}