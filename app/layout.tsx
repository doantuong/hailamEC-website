import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingContact from '@/components/FloatingContact';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Hải Lam Engineering & Construction | Chuyên gia Điện công nghiệp & Tự động hóa',
  description: 'Nhà thầu uy tín về hạ tầng M&E, hệ thống điều khiển tự động hóa PLC Siemens và trạm quan trắc môi trường.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
        <FloatingContact />
      </body>
    </html>
  );
}
