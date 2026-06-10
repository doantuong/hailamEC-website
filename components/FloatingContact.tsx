'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={wrapperRef} className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
      <div className={`flex flex-col gap-3 mb-4 transition-all duration-300 origin-bottom-right ${isOpen ? 'scale-100 opacity-100 visible' : 'scale-75 opacity-0 invisible pointer-events-none'}`}>
        
        {/* WHATSAPP */}
        <a href="https://wa.me/84364518980" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-4 h-12 bg-[#25d366] text-white rounded-full shadow-lg hover:bg-opacity-90 transition-all hover:scale-105">
          <span className="font-semibold text-sm">WhatsApp</span>
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.333 4.993L2 22l5.233-1.371a9.936 9.936 0 004.777 1.216h.004c5.505 0 9.99-4.478 9.99-9.984 0-2.668-1.037-5.176-2.922-7.062A9.93 9.93 0 0012.012 2zm5.727 14.126c-.313.883-1.528 1.614-2.1 1.666-.525.047-1.21.077-3.18-.742-2.52-1.047-4.13-3.608-4.256-3.777-.127-.168-.946-1.258-.946-2.397 0-1.139.593-1.699.805-1.926.212-.227.466-.284.621-.284.155 0 .311.001.446.007.145.006.339-.055.53.4.197.471.672 1.637.73 1.753.059.117.099.252.021.407-.077.156-.156.252-.255.368-.1.117-.209.26-.3.355-.1.1-.205.21-.088.408.117.198.522.859 1.121 1.392.773.688 1.411.898 1.612.997.2.1.321.084.442-.055.122-.14.522-.607.662-.813.14-.205.28-.172.471-.101.191.071 1.211.571 1.416.674.205.103.342.152.392.238.05.087.05 1.002-.263 1.885z"/></svg>
        </a>

        {/* ZALO */}
        <a href="https://zalo.me/84364518980" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-4 h-12 bg-[#0068ff] text-white rounded-full shadow-lg hover:bg-opacity-90 transition-all hover:scale-105">
          <span className="font-semibold text-sm">Zalo</span>
          <svg viewBox="0 0 48 48" fill="none" className="w-7 h-7 -mr-0.5"><path d="M24 9C14.06 9 6 16.03 6 24.7c0 4.75 2.37 8.98 6.13 11.83-1.04 3.03-3.21 6.36-3.21 6.36-.2.27.04.59.34.52 1.45-.33 5.42-1.74 8.78-3.4 1.88.46 3.88.72 5.96.72 9.94 0 18-7.03 18-15.73C42 16.03 33.94 9 24 9z" fill="white"/><text x="24" y="29.5" fill="#0068ff" fontSize="13" fontWeight="900" fontFamily="Arial" textAnchor="middle">Zalo</text></svg>
        </a>

        {/* MESSENGER */}
        <a href="https://m.me/hailamengineering" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-4 h-12 bg-[#0084ff] text-white rounded-full shadow-lg hover:bg-opacity-90 transition-all hover:scale-105">
          <span className="font-semibold text-sm">Messenger</span>
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12 2C6.36 2 2 6.14 2 11.24c0 2.91 1.42 5.51 3.65 7.18.19.14.31.36.31.6l.02 2.21c.01.44.47.74.87.55l2.45-1.18c.2-.1.43-.11.64-.04.65.2 1.34.31 2.06.31 5.64 0 10-4.14 10-9.24S17.64 2 12 2zm1.09 12.31l-2.6-2.77-5.07 2.77 5.57-5.92 2.68 2.77 4.99-2.77-5.57 5.92z"/></svg>
        </a>

        {/* EMAIL */}
        <a href="mailto:info@hailamec.com" className="flex items-center gap-3 px-4 h-12 bg-[#e63946] text-white rounded-full shadow-lg hover:bg-opacity-90 transition-all hover:scale-105">
          <span className="font-semibold text-sm">Email</span>
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
        </a>

        {/* CALL */}
        <a href="tel:+84364518980" className="flex items-center gap-3 px-4 h-12 bg-[#34a853] text-white rounded-full shadow-lg hover:bg-opacity-90 transition-all hover:scale-105">
          <span className="font-semibold text-sm">Gọi điện</span>
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M6.62 10.79a15.15 15.15 0 006.59 6.59l2.2-2.2c.28-.28.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
        </a>
      </div>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-14 h-14 bg-blue-600 text-white rounded-full shadow-xl hover:bg-blue-700 hover:scale-105 transition-all duration-300 z-50 relative"
      >
        <span className="sr-only">Toggle Contact Menu</span>
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>
    </div>
  );
}
