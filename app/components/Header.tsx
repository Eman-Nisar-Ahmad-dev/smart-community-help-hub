export default function Header() {
  return (
    <header className="bg-[#1e3a5f] shadow-md sticky top-0 z-40">
      <div className="max-w-4xl mx-auto flex justify-between items-center px-6 py-4">
        <a href="/" className="text-white font-bold text-lg tracking-tight flex items-center gap-2">
          <span className="bg-amber-500 text-[#1e3a5f] w-8 h-8 rounded-md flex items-center justify-center font-black text-sm">
            SC
          </span>
          Smart Community Help Hub
        </a>
        <nav className="flex gap-6 text-sm font-medium text-blue-100">
          <a href="/" className="hover:text-amber-400 transition-colors">Report Issue</a>
          <a href="/reports" className="hover:text-amber-400 transition-colors">View Reports</a>
          <a href="/stats" className="hover:text-amber-400 transition-colors">Stats</a>
          <a href="/about" className="hover:text-amber-400 transition-colors">About</a>
        </nav>
      </div>
    </header>
  )
}