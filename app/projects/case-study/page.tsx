import React from 'react';
import Image from 'next/image';

export default function CaseStudyPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-20">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Hệ thống tự động hóa trạm xử lý nước thải
          </h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Giải pháp nâng cấp hệ thống điều khiển trung tâm (SCADA) và PLC nhằm đáp ứng tiêu chuẩn nghiêm ngặt về môi trường.
          </p>
        </div>
      </section>

      {/* 2-Column Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Challenge */}
            <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Thách thức của nhà máy</h2>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start">
                  <span className="text-red-500 mr-3">•</span>
                  <span>Hệ thống điều khiển cũ thường xuyên gặp sự cố gián đoạn.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3">•</span>
                  <span>Chất lượng nước thải đầu ra không ổn định, nguy cơ vi phạm quy định.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3">•</span>
                  <span>Thiếu hệ thống giám sát tập trung gây khó khăn cho việc quản lý bảo trì.</span>
                </li>
              </ul>
            </div>

            {/* Solution */}
            <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-10"></div>
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Giải pháp kỹ thuật của LK</h2>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3">✓</span>
                  <span>Thiết kế và lắp ráp lại toàn bộ tủ điện điều khiển trung tâm (MCC & PLC).</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3">✓</span>
                  <span>Tích hợp bộ điều khiển Siemens S7-1200 / S7-1500 với độ tin cậy cao.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3">✓</span>
                  <span>Phát triển hệ thống phần mềm SCADA giám sát trực quan 24/7.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="bg-white py-20 border-t border-gray-200">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Kết quả dự án</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="text-5xl font-black text-blue-600 mb-4">99.9%</div>
              <p className="text-lg font-medium text-gray-800 mb-2">Uptime</p>
              <p className="text-gray-500">Hệ thống hoạt động liên tục không gián đoạn.</p>
            </div>
            <div className="p-6">
              <div className="text-5xl font-black text-blue-600 mb-4">Đạt chuẩn</div>
              <p className="text-lg font-medium text-gray-800 mb-2">Bộ TN&MT</p>
              <p className="text-gray-500">Chỉ số xả thải luôn nằm trong giới hạn an toàn quy định.</p>
            </div>
            <div className="p-6">
              <div className="text-5xl font-black text-blue-600 mb-4">-30%</div>
              <p className="text-lg font-medium text-gray-800 mb-2">Chi phí vận hành</p>
              <p className="text-gray-500">Tối ưu hóa năng lượng và giảm nhân sự trực ca.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
