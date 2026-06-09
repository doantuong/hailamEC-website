# SPRINT: NEXT.JS 14+ GLOBAL COMPONENTS
**Role:** Expert Next.js 14+ Developer & UI/UX Specialist
**Objective:** Xây dựng các UI components mang tính toàn cục (Header, Footer, Floating Contact) với độ tối ưu UX/UI cao cho nền tảng B2B.

---

## 1. MÃ NGUỒN: `components/Header.tsx`

Sử dụng `"use client"` để xử lý trạng thái đóng/mở menu trên nền tảng Mobile. Hiệu ứng làm mờ nền (blur) tạo cảm giác hiện đại và không che khuất hoàn toàn nội dung công nghiệp bên dưới.

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Trang chủ", href: "/" },
    { name: "Dịch vụ", href: "/dich-vu" },
    { name: "Dự án", href: "/du-an" },
    { name: "Tin tức", href: "/tin-tuc" },
    { name: "Liên hệ", href: "/lien-he" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 border-b border-gray-200/50 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Area */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-black text-primary tracking-tight">
              HAILAM<span className="text-secondary"> EC</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-primary/80 hover:text-secondary font-semibold transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button Desktop */}
          <div className="hidden md:flex items-center">
            <Link
              href="/lien-he"
              className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-md font-medium transition-all shadow-md hover:shadow-lg focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Hợp tác dự án
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-primary hover:text-secondary focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-7 w-7" />
              ) : (
                <Menu className="h-7 w-7" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-gray-200">
          <div className="px-4 pt-2 pb-6 space-y-1 shadow-inner">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-3 rounded-md text-base font-semibold text-primary hover:text-secondary hover:bg-gray-50 border-b border-gray-100 last:border-none"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/lien-he"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full text-center mt-6 bg-primary text-white px-5 py-3 rounded-md font-bold shadow-md"
            >
              Hợp tác dự án
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
```

---

## 2. MÃ NGUỒN: `components/Footer.tsx`

Kết cấu 4 cột tiêu chuẩn B2B. Tuân thủ tuyệt đối nhận diện xưng hô (LK) khi nhắc về công ty.

```tsx
import Link from "next/link";
import { Youtube, Linkedin, Video } from "lucide-react"; // Note: Lucide uses generic icons, mapped properly below

export default function Footer() {
  return (
    <footer className="bg-primary text-gray-200 pt-16 pb-8 border-t-[6px] border-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1: Brand Info */}
          <div>
            <h3 className="text-2xl font-black text-white tracking-tight mb-4">
              HAILAM<span className="text-secondary"> EC</span>
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              LK tự hào là đối tác chiến lược cung cấp các giải pháp tự động hóa công nghiệp và thi công cơ điện. Đội ngũ kỹ sư tại LK luôn cam kết mang lại hiệu suất tối đa cho dây chuyền của khách hàng.
            </p>
            <div className="text-sm text-gray-400">
              <p>Mã số thuế: 0317xxxxx</p>
              <p className="mt-1">ISO 9001:2015 Certified</p>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Liên kết nhanh</h4>
            <ul className="space-y-3">
              <li><Link href="/ve-chung-toi" className="hover:text-secondary transition-colors text-sm">Về LK</Link></li>
              <li><Link href="/du-an" className="hover:text-secondary transition-colors text-sm">Dự án tiêu biểu</Link></li>
              <li><Link href="/tin-tuc" className="hover:text-secondary transition-colors text-sm">Tin tức ngành</Link></li>
              <li><Link href="/tuyen-dung" className="hover:text-secondary transition-colors text-sm">Tuyển dụng kỹ sư</Link></li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Giải pháp Nòng cốt</h4>
            <ul className="space-y-3">
              <li><Link href="/dich-vu/he-thong-dien" className="hover:text-secondary transition-colors text-sm">Hệ thống Điện (EPC)</Link></li>
              <li><Link href="/dich-vu/tu-dong-hoa" className="hover:text-secondary transition-colors text-sm">Tự động hóa PLC/SCADA</Link></li>
              <li><Link href="/dich-vu/quan-trac" className="hover:text-secondary transition-colors text-sm">Quan trắc Môi trường (CEMS)</Link></li>
              <li><Link href="/dich-vu/thiet-ke-ho-so" className="hover:text-secondary transition-colors text-sm">Thiết kế Kỹ thuật Từ xa (Remote)</Link></li>
            </ul>
          </div>

          {/* Column 4: Connect */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Kết nối với LK</h4>
            <p className="text-sm text-gray-400 mb-4 block">
              Trụ sở: Verosa Park, Tp. Thủ Đức, HCM.
            </p>
            <div className="flex space-x-4">
              <a href="https://linkedin.com/company/hailamec" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#0077b5] transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5 text-white" />
              </a>
              <a href="https://youtube.com/@hailamec" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FF0000] transition-colors" aria-label="YouTube">
                <Youtube className="w-5 h-5 text-white" />
              </a>
              <a href="https://tiktok.com/@hailamec" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-black transition-colors" aria-label="TikTok">
                <Video className="w-5 h-5 text-white" />
              </a>
            </div>
            <div className="mt-6 border-t border-white/10 pt-4">
              <p className="text-secondary font-bold text-xl">Hotline: 0364 518 980</p>
              <p className="text-gray-400 text-sm mt-1">info@hailamec.com</p>
            </div>
          </div>

        </div>

        {/* Global Footer Copyright */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} HAILAM Engineering & Construction (LK). Bảo lưu mọi quyền.</p>
          <div className="space-x-4 mt-4 md:mt-0">
            <Link href="/chinh-sach-bao-mat" className="hover:text-white transition">Chính sách bảo mật</Link>
            <Link href="/dieu-khoan" className="hover:text-white transition">Điều khoản sử dụng</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

---

## 3. MÃ NGUỒN: `components/FloatingContact.tsx`

Nút liên hệ dạng bung tỏa động. Yêu cầu tính tương tác cao (Client Component). Sử dụng màu thương hiệu cùng các tín hiệu nhấp nháy Pulse.

```tsx
"use strict";
"use client";

import { useState } from "react";
import { MessageCircle, PhoneCall, Mail, MessageSquare, X } from "lucide-react";

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);

  const contactOptions = [
    {
      id: "whatsapp",
      label: "WhatsApp",
      icon: <MessageCircle className="w-5 h-5 text-white" />, // Placeholder icon for WhatsApp
      link: "https://wa.me/84364518980",
      bgColor: "bg-[#25D366]",
    },
    {
      id: "messenger",
      label: "Messenger",
      icon: <MessageSquare className="w-5 h-5 text-white" />,
      link: "https://m.me/700249799848085",
      bgColor: "bg-[#0084ff]",
    },
    {
      id: "zalo",
      label: "Zalo (Dương Toán)",
      icon: <span className="text-white font-bold text-xs">Zalo</span>,
      link: "https://zalo.me/0364518980",
      bgColor: "bg-[#0068ff]",
    },
    {
      id: "email",
      label: "Gửi Email",
      icon: <Mail className="w-5 h-5 text-white" />,
      link: "mailto:info@hailamec.com",
      bgColor: "bg-secondary", // Technical Red
    },
    {
      id: "call",
      label: "Gọi Kỹ Sư",
      icon: <PhoneCall className="w-5 h-5 text-white" />,
      link: "tel:+84364518980",
      bgColor: "bg-[#0AE340]",
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
      
      {/* Options Menu (Expanding) */}
      <div
        className={`flex flex-col-reverse items-end space-y-reverse space-y-3 mb-4 transition-all duration-300 origin-bottom ${
          isOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-50 pointer-events-none"
        }`}
      >
        {contactOptions.map((opt) => (
          <div key={opt.id} className="flex items-center group">
            <span className="mr-3 px-3 py-1.5 bg-white text-gray-800 text-sm font-semibold rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {opt.label}
            </span>
            <a
              href={opt.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transform transition-transform hover:scale-110 ${opt.bgColor}`}
              aria-label={opt.label}
            >
              {opt.icon}
            </a>
          </div>
        ))}
      </div>

      {/* Main Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white shadow-xl hover:bg-primary/90 transition-colors focus:outline-none group"
        aria-label="Contact options"
      >
        {/* Pulse effect rings */}
        {!isOpen && (
          <>
            <span className="absolute inline-flex rounded-full bg-secondary/60 h-full w-full animate-ping opacity-75"></span>
            <span className="absolute inline-flex rounded-full bg-primary/40 h-full w-full animate-pulse delay-75"></span>
          </>
        )}
        
        {/* Main Icon Transition */}
        <div className={`transform transition-transform duration-300 ${isOpen ? "rotate-90 scale-0" : "rotate-0 scale-100"}`}>
          <MessageCircle className="w-8 h-8" />
        </div>
        <div className={`absolute transform transition-transform duration-300 ${isOpen ? "rotate-0 scale-100" : "-rotate-90 scale-0"}`}>
          <X className="w-8 h-8" />
        </div>
      </button>
      
    </div>
  );
}
```

### 📋 HƯỚNG DẪN TÍCH HỢP CHO LK:
- Tạo thư mục `src/components` (hoặc `components` ở root tuỳ cấu trúc).
- Tạo 3 file `Header.tsx`, `Footer.tsx`, và `FloatingContact.tsx` và paste nội dung tương ứng.
- Bước cuối cùng: Mở file `layout.tsx` (tạo ở SPRINT trước), import 3 components này và bọc chúng xung quanh `{children}` bên trong thẻ `<body>`:

```tsx
<Header />
<main className="flex-grow">{children}</main>
<Footer />
<FloatingContact />
```
