export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-[#0E2240] text-white shadow z-50">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <img src="/gold_logo_nobg.png" alt="Logo" className="h-10 w-auto" />
          <span className="text-xl font-bold">Job Tracker</span>
        </div>
      </div>
    </nav>
  );
}
