'use client';

import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b shadow-sm">
      {/* Top Bar for Contact Info */}
      <div className="hidden lg:flex w-full bg-blue-900 text-white py-2">
        <div className="container mx-auto px-4 flex justify-end items-center space-x-6 text-sm">
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            <a href="mailto:info@hailamec.com" className="hover:text-blue-200 transition-colors">info@hailamec.com</a>
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
            <a href="tel:+84364518980" className="hover:text-blue-200 transition-colors">+84 364 518 980</a>
          </span>
        </div>
      </div>
      
      {/* Main Header */}
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="w-[95px] h-[60px] md:w-[115px] md:h-[70px] lg:w-[130px] lg:h-[78px] px-2 py-1 bg-white flex flex-col justify-center items-center">
            <img 
              src="/hailam-ec-logo.png" 
              alt="Hai Lam Engineering & Construction Logo" 
              className="max-w-full max-h-[52px] md:max-h-[60px] lg:max-h-[66px] object-contain" 
            />
          </div>
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
