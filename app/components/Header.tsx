export default function Header() {
  return (
    <header className="bg-[#0f2038] shadow-lg sticky top-0 z-40 border-b border-white/10">
      <div className="max-w-4xl mx-auto flex justify-between items-center px-6 py-6">
        <a href="/" className="text-white font-bold text-xl tracking-tight flex items-center gap-2">
          <span className="bg-amber-500 text-white w-9 h-9 rounded-md flex items-center justify-center font-black text-base">
            SC
          </span>
          Smart Community Help Hub
        </a>
        <nav className="flex gap-6 text-base font-medium text-blue-100">
          <a href="/" className="hover:text-amber-400 transition-colors flex items-center gap-1">📝 Report Issue</a>
          <a href="/reports" className="hover:text-amber-400 transition-colors flex items-center gap-1">📋 View Reports</a>
          <a href="/stats" className="hover:text-amber-400 transition-colors flex items-center gap-1">📊 Stats</a>
          <a href="/about" className="hover:text-amber-400 transition-colors flex items-center gap-1">ℹ️ About</a>
        </nav>
      </div>
    </header>
  )
}