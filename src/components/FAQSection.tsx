import React, { useState } from 'react';
import { faqs } from '../data/faqs';

export default function FAQSection({ lang }: { lang: 'vi' | 'en' }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto my-12 p-6 bg-white rounded-lg shadow-sm border border-slate-200">
      <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">
        {lang === 'vi' ? 'Câu Hỏi Thường Gặp (FAQ)' : 'Frequently Asked Questions (FAQ)'}
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const question = lang === 'vi' ? faq.questionVi : faq.questionEn;
          const answer = lang === 'vi' ? faq.answerVi : faq.answerEn;
          const isOpen = openIndex === index;

          return (
            <div key={index} className="border border-slate-200 rounded-md overflow-hidden">
              <button
                className="w-full text-left px-6 py-4 bg-slate-50 hover:bg-slate-100 flex justify-between items-center transition-colors duration-200 focus:outline-none"
                onClick={() => toggle(index)}
              >
                <h3 className="text-lg font-semibold text-slate-800 m-0">{question}</h3>
                <span className={`text-slate-500 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              <div
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 py-4 opacity-100' : 'max-h-0 py-0 opacity-0'}`}
              >
                <p className="text-slate-600 m-0">{answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
