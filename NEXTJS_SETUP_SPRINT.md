# SPRINT: NEXT.JS 14+ FOUNDATION & LAYOUT SETUP
**Role:** Expert Next.js 14+ Developer & UI/UX Specialist
**Objective:** Establish the foundational styling and root layout for the modern B2B industrial website of HAILAM Engineering & Construction (LK).

---

## 1. MÃ NGUỒN: tailwind.config.ts

Sử dụng cấu hình dưới đây để thiết lập Design Tokens chuẩn theo yêu cầu (Primary: Deep Blue, Secondary: Technical Red, Background: Light Slate).

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1a365d",    // Deep Blue
        secondary: "#e63946",  // Technical Red
        background: "#f8fafc", // Light Slate Background
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
```

---

## 2. MÃ NGUỒN: app/layout.tsx (Root Layout)

File này kết hợp metadata chuẩn SEO cho ngành B2B công nghiệp, import font chữ `Inter`, và tuân thủ tuyệt đối quy tắc xưng hô thương hiệu "LK".

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Import font Inter with CSS variable to sync with Tailwind config
const inter = Inter({ 
  subsets: ["latin", "vietnamese"], 
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Giải pháp Kỹ thuật & Tự động hóa | HAILAM EC",
  description: "LK tự hào là đối tác chiến lược cung cấp các giải pháp tự động hóa công nghiệp, thiết kế thi công tủ điện (EPC), và dịch vụ viễn thông kỹ thuật (Remote Engineering) chuyên nghiệp chất lượng cao.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${inter.variable} scroll-smooth`}>
      <body className="font-sans bg-background text-primary antialiased min-h-screen flex flex-col">
        {/* You can inject Header/Navigation here */}
        <main className="flex-grow">
          {children}
        </main>
        {/* You can inject Footer/CTA here */}
      </body>
    </html>
  );
}
```

### 📋 HƯỚNG DẪN TÍCH HỢP CHO LK:
1. Copy đoạn code vào file `tailwind.config.ts` ở thư mục gốc của dự án Next.js.
2. Copy đoạn code Layout vào file `src/app/layout.tsx` (hoặc `app/layout.tsx`).
3. Đảm bảo bạn đã có file `globals.css` định nghĩa các directive mặc định (`@tailwind base; @tailwind components; @tailwind utilities;`).
