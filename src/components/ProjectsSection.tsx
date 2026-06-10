import React, { useState } from 'react';
import { projects } from '../data/projects';

export default function ProjectsSection({ lang }: { lang: 'vi' | 'en' }) {
  const [filter, setFilter] = useState('All');

  const categories = ['All', ...new Set(projects.map(p => p.category))];
  const filteredProjects = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  const getProjectImage = (project: typeof projects[0] & { imageUrl?: string }) => {
    if (project.imageUrl) return project.imageUrl;

    if (project.image) {
      if (project.image.startsWith("http")) return project.image;
      return `${import.meta.env.BASE_URL}${project.image.replace(/^\/+/, "")}`;
    }

    return "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1200&q=80";
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1200&q=80";
  };

  return (
    <div className="max-w-7xl mx-auto my-16 px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">
          {lang === 'vi' ? 'Dự Án Tiêu Biểu & Case Studies' : 'Featured Projects & Case Studies'}
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          {lang === 'vi' 
            ? 'Khám phá các dự án đã triển khai bao gồm Tự động hóa công nghiệp, thi công hệ thống Điện (EPC) và Dịch vụ kỹ thuật từ xa (Remote Engineering).'
            : 'Explore our delivered projects encompassing Industrial Automation, Electrical EPC, and Remote Engineering Services.'}
        </p>
      </div>

      <div className="flex justify-center gap-4 mb-10 flex-wrap">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full font-medium transition-colors ${
              filter === cat 
              ? 'bg-[#2F423B] text-white' 
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {cat === 'All' ? (lang === 'vi' ? 'Tất cả' : 'All') : cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow group flex flex-col h-full">
            <div className="project-card-image-wrapper">
               <img 
                 src={getProjectImage(project)}
                 alt={lang === 'vi' ? project.titleVi : project.titleEn}
                 loading="lazy"
                 onError={handleImageError}
                 className="group-hover:scale-105 transition-transform duration-500 project-card-image"
               />
               <div className="absolute top-4 left-4 bg-[#0AE340] text-[#1e2b26] text-xs font-bold px-3 py-1 rounded shadow uppercase z-10">
                 {project.category}
               </div>
            </div>
            
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-bold text-slate-800 mb-2 leading-tight">
                {lang === 'vi' ? project.titleVi : project.titleEn}
              </h3>
              
              <div className="flex gap-4 text-sm text-slate-500 mb-4 pb-4 border-b border-slate-100">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                  {lang === 'vi' ? project.industryVi : project.industryEn}
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  {project.location}
                </span>
              </div>
              
              <div className="mb-4 text-slate-600 text-sm flex-grow space-y-2">
                <p><strong>{lang === 'vi' ? 'Quy mô:' : 'Scope:'}</strong> {lang === 'vi' ? project.scopeVi : project.scopeEn}</p>
                <p><strong>{lang === 'vi' ? 'Kết quả:' : 'Result:'}</strong> {lang === 'vi' ? project.resultVi : project.resultEn}</p>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-auto pt-4">
                {project.tags.map(tag => (
                  <span key={tag} className="text-xs font-semibold bg-slate-100 text-slate-600 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
