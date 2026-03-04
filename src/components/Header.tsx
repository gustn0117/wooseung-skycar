'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface HeaderProps {
  activePage?: 'home' | 'about' | 'cases';
}

export default function Header({ activePage = 'home' }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileOpen(false);
    if (activePage !== 'home') {
      window.location.href = `/#${id}`;
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-lg shadow-lg' : 'bg-white/80 backdrop-blur-md'}`}>
        <nav className="max-w-container flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 relative">
              <Image src="/images/logo.png" alt="우승 스카이차 로고" fill className="object-contain" />
            </div>
            <span className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">우승스카이차</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-9">
            <Link href="/about" className={`nav-link ${activePage === 'about' ? 'text-primary !font-semibold after:!w-full' : ''}`}>
              회사소개
            </Link>
            <Link href="/cases" className={`nav-link ${activePage === 'cases' ? 'text-primary !font-semibold after:!w-full' : ''}`}>
              시공사례
            </Link>
            <button onClick={() => scrollToSection('services')} className="nav-link">서비스 안내</button>
            <button onClick={() => scrollToSection('contact')} className="nav-link">문의하기</button>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="tel:010-5811-5297"
              className="hidden sm:flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-primary-dark transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              010-5811-5297
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="메뉴"
            >
              <span className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? 'max-h-80' : 'max-h-0'}`}>
          <div className="px-6 pb-6 pt-2 space-y-1 border-t border-gray-100">
            <Link href="/about" className="block py-3 text-gray-700 hover:text-primary font-medium transition-colors" onClick={() => setMobileOpen(false)}>
              회사소개
            </Link>
            <Link href="/cases" className="block py-3 text-gray-700 hover:text-primary font-medium transition-colors" onClick={() => setMobileOpen(false)}>
              시공사례
            </Link>
            <button onClick={() => scrollToSection('services')} className="block w-full text-left py-3 text-gray-700 hover:text-primary font-medium transition-colors">
              서비스 안내
            </button>
            <button onClick={() => scrollToSection('contact')} className="block w-full text-left py-3 text-gray-700 hover:text-primary font-medium transition-colors">
              문의하기
            </button>
            <a
              href="tel:010-5811-5297"
              className="flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-xl font-semibold mt-3 active:scale-95 transition-transform"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              전화 문의하기
            </a>
          </div>
        </div>
      </header>

      {/* Mobile floating CTA */}
      <a
        href="tel:010-5811-5297"
        className="sm:hidden fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary text-white rounded-full shadow-xl flex items-center justify-center hover:bg-primary-dark active:scale-90 transition-all"
        aria-label="전화하기"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      </a>
    </>
  );
}
