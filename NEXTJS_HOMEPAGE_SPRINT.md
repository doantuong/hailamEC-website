# SPRINT: NEXT.JS 14+ HOMEPAGE CORE SECTIONS
**Role:** Expert Next.js 14+ Developer & UI/UX Specialist
**Objective:** Xây dựng phần Introduction (Hero) và Khối Dịch vụ cốt lõi (Services) với thiết kế chuyên biệt cho mảng công nghiệp B2B, áp dụng nguyên tắc tối ưu tỷ lệ chuyển đổi.

---

## 1. MÃ NGUỒN: `components/Hero.tsx`

Hero section là điểm tiếp xúc đầu tiên (Above the Fold). Thiết kế sử dụng màu Nền Deep Blue của thương hiệu (Primary) kết hợp typography tương phản cao để tạo ấn tượng về độ tin cậy và chuyên nghiệp kỹ thuật.

```tsx
import Link from "next/link";
import { ArrowRight, Activity } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative bg-primary overflow-hidden">
      {/* Background Tech Pattern / Gradient (Optional decorative layer) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/80 via-primary to-slate-900 opacity-90 z-0"></div>
      
      {/* Abstract industrial wireframe lines */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary font-medium tracking-wide text-sm mb-8 animate-fade-in-up">
            <Activity className="w-4 h-4 mr-2" />
            <span>Đối Tác Kỹ Thuật Đáng Tin Cậy Từ LK</span>
          </div>
          
          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight mb-6">
            Giải Pháp Kỹ Thuật & Tự Động Hóa Công Nghiệp <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-secondary">Toàn Diện</span>
          </h1>
          
          {/* Sub-headline */}
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-10 max-w-2xl font-light">
            LK tự hào là chuyên gia hàng đầu trong thi công hệ thống điện, lập trình PLC và hệ thống trạm quan trắc. Đảm bảo hiệu suất vận hành bền bỉ và đáp ứng tiêu chuẩn khắt khe nhất của mọi nhà máy.
          </p>
          
          {/* Call To Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/lien-he" 
              className="inline-flex justify-center items-center px-8 py-4 bg-secondary hover:bg-[#c9303c] text-white font-bold rounded-md shadow-[0_0_20px_rgba(230,57,70,0.4)] hover:shadow-[0_0_30px_rgba(230,57,70,0.6)] transition-all group"
            >
              Yêu cầu báo giá kỹ thuật
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="#services" 
              className="inline-flex justify-center items-center px-8 py-4 bg-transparent border border-white/30 hover:border-white/80 hover:bg-white/5 text-white font-semibold rounded-md transition-all"
            >
              Tìm hiểu giải pháp
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

## 2. MÃ NGUỒN: `components/Services.tsx`

Khối dịch vụ áp dụng cấu trúc CSS Grid, Card Component có đổ bóng tối giản và hiệu ứng nổi (Lift effect) khi hover, thể hiện rõ ràng năng lực cốt lõi của LK.

```tsx
import { Zap, Cpu, Activity, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function Services() {
  const coreServices = [
    {
      id: "he-thong-dien",
      title: "Hạ tầng điện công nghiệp (M&E)",
      description: "Đội ngũ LK cung cấp dịch vụ tổng thầu thi công an toàn, thiết kế bản vẽ Shopdrawing chuẩn xác và lắp ráp tủ phân phối điện tổng (MSB, DB) đúng chuẩn quốc tế.",
      icon: <Zap className="w-10 h-10 text-secondary" />,
      link: "/dich-vu/he-thong-dien"
    },
    {
      id: "tu-dong-hoa",
      title: "Hệ thống điều khiển tự động hóa",
      description: "LK chuyên tích hợp các giải pháp điều khiển cấp cao sử dụng PLC Siemens (S7-1200, S7-1500) kết hợp hệ thống SCADA giúp giám sát dây chuyền sản xuất toàn diện.",
      icon: <Cpu className="w-10 h-10 text-secondary" />,
      link: "/dich-vu/tu-dong-hoa"
    },
    {
      id: "quan-trac",
      title: "Hệ thống quan trắc môi trường",
      description: "Triển khai lắp đặt, hiệu chuẩn và lập trình truyền tải dữ liệu các trạm quan trắc liên tục (CEMS, WQMS, AQMS) đáp ứng quy định kiểm duyệt nghiêm ngặt nhất.",
      icon: <Activity className="w-10 h-10 text-secondary" />,
      link: "/dich-vu/quan-trac"
    }
  ];

  return (
    <section id="services" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-4">
            Năng Lực Cốt Lõi Của <span className="text-secondary">LK</span>
          </h2>
          <p className="text-lg text-gray-600">
            Từ khâu khảo sát, thiết kế bản vẽ cho đến thi công lập trình tại công trường, LK đảm nhiệm trọn gói nhằm giảm thiểu rủi ro và cam kết tiến độ.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {coreServices.map((service) => (
            <div 
              key={service.id} 
              className="group relative bg-white p-8 rounded-xl border border-gray-200/60 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              {/* Icon Container */}
              <div className="w-16 h-16 bg-red-50 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              
              {/* Content */}
              <h3 className="text-2xl font-bold text-primary mb-4 leading-snug">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                {service.description}
              </p>
              
              {/* Card Footer Link */}
              <div className="mt-auto pt-4 border-t border-gray-100">
                <Link 
                  href={service.link}
                  className="inline-flex items-center text-sm font-bold text-primary group-hover:text-secondary transition-colors"
                >
                  Xem chi tiết hạng mục
                  <ArrowUpRight className="ml-1 w-4 h-4 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### 📋 HƯỚNG DẪN TÍCH HỢP CHO LK:
1. Tạo 2 file `Hero.tsx` và `Services.tsx` trong thư mục `components/`.
2. Lắp ráp chúng vào trang chủ (file `app/page.tsx` hoặc `src/app/page.tsx`):

```tsx
// app/page.tsx
import Hero from "@/components/Hero";
import Services from "@/components/Services";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
    </>
  );
}
```
