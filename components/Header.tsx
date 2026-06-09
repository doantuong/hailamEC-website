'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image 
            src="/logo-hai-lam.png" 
            alt="LK" 
            width={200} 
            height={60} 
            className="object-contain" 
            priority 
          />
        </Link>

        {/* Navigation - Center */}
        <nav className="hidden md:flex items-center space-x-8 text-gray-700 font-medium text-sm">
          <Link href="/" className="hover:text-blue-600 transition-colors">TRANG CHỦ</Link>
          <Link href="/about" className="hover:text-blue-600 transition-colors">VỀ CHÚNG TÔI</Link>
          <Link href="/services" className="hover:text-blue-600 transition-colors">DỊCH VỤ</Link>
          <Link href="/projects" className="hover:text-blue-600 transition-colors">DỰ ÁN</Link>
          <Link href="/news" className="hover:text-blue-600 transition-colors">TIN TỨC</Link>
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2 text-sm font-semibold text-gray-600">
            <button className="text-blue-600">VI</button>
            <span className="text-gray-300">|</span>
            <button className="hover:text-blue-600 transition-colors">EN</button>
          </div>
          
          <Link 
            href="/contact" 
            className="hidden md:inline-flex items-center justify-center bg-blue-600 text-white px-6 py-2.5 rounded-full font-medium hover:bg-blue-700 transition-colors"
          >
            Liên hệ ngay
          </Link>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
