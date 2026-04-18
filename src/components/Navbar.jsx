import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/characters', label: 'Characters' },
  { to: '/episodes', label: 'Episodes' },
  { to: '/locations', label: 'Locations' },
]

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  function closeMenu() {
    setIsOpen(false)
  }

  return (
    <header className="sticky top-0 z-40 mb-10">
      <div className="rounded-[1.6rem] border border-[#E8DCCF] bg-[rgba(255,250,243,0.97)] px-5 py-3.5 shadow-[0_8px_24px_rgba(88,66,46,0.07)] backdrop-blur-sm">
        <div className="flex items-center justify-between gap-4">
          <NavLink to="/" className="flex items-center gap-3 min-w-0" onClick={closeMenu}>
            <div className="flex gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#B86B4B]" />
              <span className="h-2 w-2 rounded-full bg-[#D6A54B]" />
              <span className="h-2 w-2 rounded-full bg-[#556B5D]" />
            </div>
            <span className="font-editorial text-xl tracking-[-0.02em] text-[#3E3128]">
              Friends Wiki
            </span>
          </NavLink>

          <button
            type="button"
            onClick={() => setIsOpen((c) => !c)}
            className="inline-flex rounded-full border border-[#E8DCCF] bg-[#FFF7EE] px-4 py-2 text-sm font-medium text-[#3E3128] transition hover:bg-[#F1E3D3] md:hidden"
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? 'Close' : 'Menu'}
          </button>

          <nav className="hidden items-center gap-1.5 md:flex">
            {links.map((link) => (
              <NavItem key={link.to} {...link} onNavigate={closeMenu} />
            ))}
          </nav>
        </div>

        {isOpen ? (
          <nav className="mt-3.5 grid gap-1.5 border-t border-[#F0E4D8] pt-3.5 md:hidden">
            {links.map((link) => (
              <NavItem key={link.to} {...link} onNavigate={closeMenu} />
            ))}
          </nav>
        ) : null}
      </div>
    </header>
  )
}

function NavItem({ to, label, end, onNavigate }) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onNavigate}
      className={({ isActive }) =>
        [
          'inline-flex min-w-[80px] justify-center rounded-full px-4 py-2 text-sm font-medium transition',
          isActive
            ? 'bg-[#F0E4D4] text-[#3E3128] font-semibold'
            : 'text-[#6B5B52] hover:bg-[#F1E3D3] hover:text-[#3E3128]',
        ].join(' ')
      }
    >
      {label}
    </NavLink>
  )
}

export default Navbar
