export default function Footer() {
  return (
    <footer className="bg-[#0f2038] text-blue-200 py-7 px-4 mt-auto border-t border-white/10">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2 text-base">
        <p>© {new Date().getFullYear()} Smart Community Help Hub — Built by Eman Nisar Ahmad</p>
        <p>Powered by Next.js, Supabase & Google Gemini AI</p>
      </div>
    </footer>
  )
}