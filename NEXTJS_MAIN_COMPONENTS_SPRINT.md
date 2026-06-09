# SPRINT: TRUST SIGNALS, LEAD GENERATION & PAGE ASSEMBLY
**Role:** Expert Next.js 14+ Developer & UI/UX Specialist
**Objective:** Hoàn thiện Homepage với các bằng chứng thực tế (Trust Signals), biểu mẫu thu thập Leads B2B chất lượng cao và file Page cấu trúc hoàn chỉnh.

---

## 1. MÃ NGUỒN: `components/TrustSignals.tsx`

Khối thông tin tạo điểm neo niềm tin (Trust Anchor). Thiết kế sử dụng không gian nền Dark Blue (Primary) làm nổi bật các con số thành tựu cốt lõi của LK.

```tsx
import { ShieldCheck, HardHat, CheckCircle2 } from "lucide-react";

export default function TrustSignals() {
  const stats = [
    {
      id: 1,
      name: "Năm Kinh Nghiệm",
      value: "10+",
      icon: <ShieldCheck className="w-8 h-8 text-secondary mb-3" />,
      description: "Được tin chọn bởi các đối tác FDI & tập đoàn lớn tại Việt Nam."
    },
    {
      id: 2,
      name: "Dự Án Hoàn Thành",
      value: "300+",
      icon: <CheckCircle2 className="w-8 h-8 text-secondary mb-3" />,
      description: "Thực thi chính xác, an toàn, đảm bảo lộ trình Zero-Downtime."
    },
    {
      id: 3,
      name: "Đội Ngũ Kỹ Sư",
      value: "Chuyên Sâu",
      icon: <HardHat className="w-8 h-8 text-secondary mb-3" />,
      description: "Kỹ sư LK được đào tạo chuyên chuẩn Siemens, ABB, Schneider."
    }
  ];

  return (
    <section className="bg-primary py-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Tại Sao Nên Chọn LK Làm Đối Tác Chiến Lược?
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
            LK không chỉ là nhà thầu thi công, chúng tôi là chuyên gia kỹ thuật giải quyết trọn vẹn các bài toán tự động hóa phức tạp nhất tại nhà máy của bạn.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat) => (
            <div key={stat.id} className="bg-white/5 border border-white/10 rounded-xl p-8 text-center hover:bg-white/10 transition-colors">
              <div className="flex justify-center">{stat.icon}</div>
              <div className="text-5xl font-black text-white mb-2">{stat.value}</div>
              <div className="text-xl font-semibold text-gray-200 mb-3">{stat.name}</div>
              <p className="text-sm text-gray-400 leading-relaxed max-w-xs mx-auto">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## 2. MÃ NGUỒN: `components/LeadForm.tsx`

Form yêu cầu tư vấn kỹ thuật. Tích hợp UI chia tách rõ ràng: Cột trái truyền tải giá trị (Value Proposition) và cột phải là biểu mẫu thu thập Data của Project Manager.

```tsx
"use client";

import { useState } from "react";
import { Send, User, Phone, Mail, FileText } from "lucide-react";

export default function LeadForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API request or link to a Server Action
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Cảm ơn! Yêu cầu của bạn đã được gửi đến Ban Giám Đốc Dự Án LK.");
    }, 1200);
  };

  return (
    <section id="lead-form" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 flex flex-col lg:flex-row">
          
          {/* Left Info Column */}
          <div className="lg:w-[40%] bg-primary p-10 lg:p-12 text-white flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-secondary/20 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4 leading-snug">Kết Nối Yêu Cầu Kỹ Thuật</h2>
              <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                Hãy để lại thông tin dự án. Các chuyên gia tại LK sẽ chuẩn bị tài liệu phân tích sơ bộ và liên hệ lại với giải pháp tối ưu nhất trong vòng 24 giờ.
              </p>
              <ul className="space-y-5 text-gray-200">
                <li className="flex items-center">
                  <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mr-4 shrink-0 text-secondary font-bold">✓</span>
                  Tư vấn phương án khả thi hoàn toàn miễn phí
                </li>
                <li className="flex items-center">
                  <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mr-4 shrink-0 text-secondary font-bold">✓</span>
                  Bóc tách khối lượng (BOQ) chuyên sâu
                </li>
                <li className="flex items-center">
                  <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mr-4 shrink-0 text-secondary font-bold">✓</span>
                  Khảo sát nhà máy trực tiếp ngay trên công trường
                </li>
              </ul>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:w-[60%] p-10 lg:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Khách hàng */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Tên khách hàng *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input type="text" required className="pl-10 w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg focus:ring-primary focus:border-secondary block p-3 transition-colors outline-none" placeholder="Nguyễn Văn A" />
                  </div>
                </div>

                {/* SĐT */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Số điện thoại *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input type="tel" required className="pl-10 w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg focus:ring-primary focus:border-secondary block p-3 transition-colors outline-none" placeholder="090x xxx xxx" />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email công ty *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input type="email" required className="pl-10 w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg focus:ring-primary focus:border-secondary block p-3 transition-colors outline-none" placeholder="email@congty.com" />
                </div>
              </div>

              {/* Select */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Loại dự án *</label>
                <select required defaultValue="" className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg focus:ring-primary focus:border-secondary block p-3 transition-colors outline-none appearance-none font-medium">
                  <option value="" disabled>-- Chọn lĩnh vực cần hỗ trợ --</option>
                  <option value="dien">Điện công nghiệp (Tủ MSB, Bảng điện, Thi công M&E)</option>
                  <option value="plc">Tự động hóa (Lập trình PLC / SCADA / DCS)</option>
                  <option value="quan-trac">Quan trắc môi trường (CEMS/WQMS)</option>
                  <option value="khac">Yêu cầu khảo sát và tư vấn bảo trì</option>
                </select>
              </div>

              {/* Mô tả */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Mô tả yêu cầu</label>
                <div className="relative">
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <FileText className="h-5 w-5 text-gray-400" />
                  </div>
                  <textarea rows={4} className="pl-10 w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg focus:ring-primary focus:border-secondary block p-3 transition-colors outline-none" placeholder="Vui lòng mô tả sơ bộ tình trạng hệ thống hoặc hạng mục cần LK triển khai..."></textarea>
                </div>
              </div>

              {/* Button */}
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-secondary hover:bg-[#c9303c] text-white font-bold rounded-lg px-5 py-4 text-center transition-all flex items-center justify-center space-x-2 disabled:opacity-75 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
              >
                <span>{isSubmitting ? "Hệ thống đang xử lý..." : "Nhận tư vấn kỹ thuật"}</span>
                {!isSubmitting && <Send className="w-5 h-5 ml-2" />}
              </button>
              
              <p className="text-center text-xs text-gray-500 mt-4">
                Mọi thông tin dự án của quý khách được LK bảo mật tuyệt đối theo tiêu chuẩn An toàn Thông tin ISO.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

## 3. MÃ NGUỒN: LẮP RÁP `app/page.tsx`

File Homepage cuối cùng. Gắn kết toàn bộ các components đã tạo theo một dòng chảy UI/UX mạch lạc từ "Gây sự chú ý" > "Khẳng định năng lực" > "Thu thập khách hàng".

```tsx
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import TrustSignals from "@/components/TrustSignals";
import LeadForm from "@/components/LeadForm";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";

export default function Home() {
  return (
    <>
      <Header />
      
      <main className="flex-grow flex flex-col w-full">
        {/* Vùng Top Banner */}
        <Hero />
        
        {/* Vùng Liệt Kê Năng Lực Cốt Lõi */}
        <Services />
        
        {/* Vùng Minh Chứng Niềm Tin */}
        <TrustSignals />
        
        {/* Vùng Thu Thập Thông Tin Khách Hàng (CTA Cuối) */}
        <LeadForm />
      </main>

      <Footer />
      <FloatingContact />
    </>
  );
}
```

### 📋 LƯU Ý KHI BUILD & DEPLOY:
> Nếu bạn đã đưa `Header` và `Footer` vào `layout.tsx` theo như setup ban đầu, bạn chỉ việc giữ lại `Hero`, `Services`, `TrustSignals`, và `LeadForm` trong thẻ `<main>` của `page.tsx` để tránh lặp component. Code trên được assemble đẩy đủ nguyên trang (Standalone Page) như bạn yêu cầu. Các icon từ thư viện **lucide-react** sẽ hoạt động hoàn hảo!
