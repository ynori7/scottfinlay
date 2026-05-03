'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const sectionLinks = [
  { label: 'About', href: '#about' },
  { label: 'CV', href: '#cv' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [shrunk, setShrunk] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';
  const isBlog = pathname.startsWith('/blog');

  useEffect(() => {
    const handleScroll = () => setShrunk(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSectionClick = (hash: string) => {
    setMenuOpen(false);
    if (isHome) {
      const id = hash.replace('#', '');
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
    // If not on home, the Link href="/#section" navigates there and the browser handles the hash
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        shrunk || menuOpen ? 'bg-[#222] py-2' : 'bg-transparent md:py-6 py-2'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        {/* Brand */}
        <Link
          href="/"
          className="text-[#ee3030] hover:text-[#c01010] font-bold text-xl md:text-2xl transition-colors duration-300"
          style={{ textDecoration: 'none' }}
        >
          Scott Finlay
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-6 list-none m-0 p-0">
          {sectionLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={isHome ? link.href : `/${link.href}`}
                onClick={() => handleSectionClick(link.href)}
                className="text-white hover:text-[#ee3030] uppercase text-sm tracking-wider font-normal transition-colors duration-200"
                style={{ textDecoration: 'none' }}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/blog"
              onClick={() => setMenuOpen(false)}
              className={`uppercase text-sm tracking-wider font-normal transition-colors duration-200 ${
                isBlog ? 'text-[#ee3030]' : 'text-white hover:text-[#ee3030]'
              }`}
              style={{ textDecoration: 'none' }}
            >
              Blog
            </Link>
          </li>
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
            {sectionLinks.map((link) => (
              <li key={link.href} className="border-b border-white/5">
                <Link
                  href={isHome ? link.href : `/${link.href}`}
                  onClick={() => handleSectionClick(link.href)}
                  className="block w-full text-left text-white hover:text-[#ee3030] uppercase text-sm tracking-wider px-4 py-3 transition-colors duration-200"
                  style={{ textDecoration: 'none' }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/blog"
                onClick={() => setMenuOpen(false)}
                className={`block w-full text-left uppercase text-sm tracking-wider px-4 py-3 transition-colors duration-200 ${
                  isBlog ? 'text-[#ee3030]' : 'text-white hover:text-[#ee3030]'
                }`}
                style={{ textDecoration: 'none' }}
              >
                Blog
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
