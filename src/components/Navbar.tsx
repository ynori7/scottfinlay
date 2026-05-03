'use client';

import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'CV', href: '#cv' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [shrunk, setShrunk] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShrunk(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        shrunk || menuOpen ? 'bg-[#222] py-2' : 'bg-transparent md:py-6 py-2'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        {/* Brand */}
        <button
          onClick={() => handleNavClick('#page-top')}
          className="text-[#ee3030] hover:text-[#c01010] font-bold text-xl md:text-2xl transition-colors duration-300 cursor-pointer bg-transparent border-none"
        >
          Scott Finlay
        </button>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-6 list-none m-0 p-0">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleNavClick(link.href)}
                className="text-white hover:text-[#ee3030] uppercase text-sm tracking-wider font-normal transition-colors duration-200 cursor-pointer bg-transparent border-none"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 bg-[#ee3030] rounded cursor-pointer border-none"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle navigation"
        >
          <span className="block w-5 h-0.5 bg-white" />
          <span className="block w-5 h-0.5 bg-white" />
          <span className="block w-5 h-0.5 bg-white" />
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-[#222] border-t border-white/10">
          <ul className="list-none m-0 p-0">
            {navLinks.map((link) => (
              <li key={link.href} className="border-b border-white/5">
                <button
                  onClick={() => handleNavClick(link.href)}
                  className="block w-full text-left text-white hover:text-[#ee3030] uppercase text-sm tracking-wider px-4 py-3 transition-colors duration-200 cursor-pointer bg-transparent border-none"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
