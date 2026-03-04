'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import FadeIn from '@/components/FadeIn';

interface CaseItem {
  id: number;
  title: string;
  description: string;
  location: string;
  work_date: string | null;
  image_urls: string[];
}

export default function CasesPage() {
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCase, setSelectedCase] = useState<CaseItem | null>(null);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  useEffect(() => {
    fetch('/api/cases')
      .then(res => res.json())
      .then(data => {
        setCases(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
      <Header activePage="cases" />

      {/* Hero */}
      <section className="gradient-blue text-white py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-60 h-60 bg-blue-300 rounded-full blur-3xl" />
        </div>
        <div className="max-w-container relative">
          <FadeIn>
            <span className="inline-block text-xs font-bold bg-white/15 px-4 py-1.5 rounded-full mb-4 tracking-widest uppercase border border-white/20">Portfolio</span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4" style={{ lineHeight: 1.2 }}>시공사례</h1>
            <p className="text-white/70 text-lg max-w-xl">우승스카이차의 실제 작업 현장입니다. 안전하고 전문적인 고공 작업을 확인해보세요.</p>
          </FadeIn>
        </div>
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 60L1440 60L1440 0C1200 50 240 50 0 0L0 60Z" fill="white" />
        </svg>
      </section>

      {/* Cases grid */}
      <section className="section-padding">
        <div className="max-w-container">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="bg-gray-100 rounded-2xl h-80 animate-pulse" />
              ))}
            </div>
          ) : cases.length === 0 ? (
            <FadeIn>
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-gray-400 text-lg">아직 등록된 시공사례가 없습니다.</p>
                <p className="text-gray-300 text-sm mt-2">곧 다양한 작업 사례가 업데이트됩니다.</p>
              </div>
            </FadeIn>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cases.map((c, idx) => (
                <FadeIn key={c.id} delay={idx * 0.08} direction="up">
                  <button
                    onClick={() => { setSelectedCase(c); setSelectedImageIdx(0); }}
                    className="w-full text-left bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-soft hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 group"
                  >
                    {c.image_urls && c.image_urls.length > 0 ? (
                      <div className="relative h-56 overflow-hidden">
                        <Image src={c.image_urls[0]} alt={c.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        {c.image_urls.length > 1 && (
                          <span className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2.5 py-1 rounded-full backdrop-blur-sm">
                            {c.image_urls.length}장
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className="h-56 bg-gray-100 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    <div className="p-5">
                      <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors">{c.title}</h3>
                      {c.description && (
                        <p className="text-sm text-gray-500 mt-1.5 line-clamp-2">{c.description}</p>
                      )}
                      <div className="flex items-center gap-3 mt-3 text-xs text-gray-400">
                        {c.location && (
                          <span className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {c.location}
                          </span>
                        )}
                        {c.work_date && (
                          <span className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {c.work_date}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Detail Modal */}
      {selectedCase && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setSelectedCase(null)}>
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            {/* Main image */}
            {selectedCase.image_urls && selectedCase.image_urls.length > 0 && (
              <div className="relative h-72 sm:h-96">
                <Image src={selectedCase.image_urls[selectedImageIdx]} alt={selectedCase.title} fill className="object-cover rounded-t-2xl" />
                <button
                  onClick={() => setSelectedCase(null)}
                  className="absolute top-3 right-3 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors backdrop-blur-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                {/* Nav arrows */}
                {selectedCase.image_urls.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImageIdx(prev => prev > 0 ? prev - 1 : selectedCase.image_urls.length - 1)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/40 text-white rounded-full flex items-center justify-center hover:bg-black/60 backdrop-blur-sm"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setSelectedImageIdx(prev => prev < selectedCase.image_urls.length - 1 ? prev + 1 : 0)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/40 text-white rounded-full flex items-center justify-center hover:bg-black/60 backdrop-blur-sm"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/50 px-3 py-1 rounded-full text-white text-xs backdrop-blur-sm">
                      {selectedImageIdx + 1} / {selectedCase.image_urls.length}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Thumbnails */}
            {selectedCase.image_urls && selectedCase.image_urls.length > 1 && (
              <div className="flex gap-2 px-6 pt-4 overflow-x-auto">
                {selectedCase.image_urls.map((url, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIdx(idx)}
                    className={`relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                      idx === selectedImageIdx ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image src={url} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Info */}
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">{selectedCase.title}</h2>
              <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                {selectedCase.location && (
                  <span className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {selectedCase.location}
                  </span>
                )}
                {selectedCase.work_date && (
                  <span className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {selectedCase.work_date}
                  </span>
                )}
              </div>
              {selectedCase.description && (
                <p className="text-gray-600 whitespace-pre-wrap" style={{ lineHeight: 1.85 }}>{selectedCase.description}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10">
        <div className="max-w-container flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold">우승스카이차</span>
          </div>
          <a href="tel:010-5811-5297" className="text-gray-400 hover:text-white transition-colors text-sm">010-5811-5297</a>
          <p className="text-gray-500 text-xs">&copy; 2024 우승스카이차. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
