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
      <section className="gradient-blue text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-20 left-10 w-[350px] h-[350px] bg-white/[0.03] rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-[450px] h-[450px] bg-blue-400/[0.05] rounded-full blur-3xl" />
        </div>
        <div className="max-w-container relative z-10 pt-20 pb-32 md:pt-24 md:pb-40">
          <FadeIn>
            <span className="inline-flex items-center gap-2 text-sm font-medium bg-white/[0.12] backdrop-blur-sm px-5 py-2.5 rounded-full mb-8 border border-white/10 tracking-wide uppercase">
              Portfolio
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-5" style={{ lineHeight: 1.2 }}>시공사례</h1>
            <p className="text-blue-100 text-lg max-w-xl" style={{ lineHeight: 1.85 }}>우승스카이차의 실제 작업 현장입니다. 안전하고 전문적인 고공 작업을 확인해보세요.</p>
          </FadeIn>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60V30C240 0 480 0 720 30C960 60 1200 60 1440 30V60H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Cases grid */}
      <section className="section-padding">
        <div className="max-w-container">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="bg-gray-100 rounded-2xl h-80 animate-pulse" />
              ))}
            </div>
          ) : cases.length === 0 ? (
            <FadeIn>
              <div className="text-center py-24">
                <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-gray-400 text-lg mb-2">아직 등록된 시공사례가 없습니다.</p>
                <p className="text-gray-300 text-sm">곧 다양한 작업 사례가 업데이트됩니다.</p>
              </div>
            </FadeIn>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {cases.map((c, idx) => (
                <FadeIn key={c.id} delay={idx * 80} direction="up">
                  <button
                    onClick={() => { setSelectedCase(c); setSelectedImageIdx(0); }}
                    className="w-full text-left bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                    style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 6px 16px rgba(0,0,0,0.03)' }}
                  >
                    {c.image_urls && c.image_urls.length > 0 ? (
                      <div className="relative h-60 overflow-hidden">
                        <Image src={c.image_urls[0]} alt={c.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        {c.image_urls.length > 1 && (
                          <span className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm font-medium">
                            {c.image_urls.length}장
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className="h-60 bg-gray-100 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="font-bold text-gray-900 text-[17px] group-hover:text-primary transition-colors">{c.title}</h3>
                      {c.description && (
                        <p className="text-sm text-gray-500 mt-2 line-clamp-2" style={{ lineHeight: '1.8' }}>{c.description}</p>
                      )}
                      <div className="flex items-center gap-4 mt-4 text-xs text-gray-400">
                        {c.location && (
                          <span className="flex items-center gap-1.5">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {c.location}
                          </span>
                        )}
                        {c.work_date && (
                          <span className="flex items-center gap-1.5">
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
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedCase(null)}>
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            {/* Main image */}
            {selectedCase.image_urls && selectedCase.image_urls.length > 0 && (
              <div className="relative h-72 sm:h-96">
                <Image src={selectedCase.image_urls[selectedImageIdx]} alt={selectedCase.title} fill className="object-cover rounded-t-3xl" />
                <button
                  onClick={() => setSelectedCase(null)}
                  className="absolute top-4 right-4 w-9 h-9 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors backdrop-blur-sm"
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
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 text-white rounded-full flex items-center justify-center hover:bg-black/60 backdrop-blur-sm transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setSelectedImageIdx(prev => prev < selectedCase.image_urls.length - 1 ? prev + 1 : 0)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 text-white rounded-full flex items-center justify-center hover:bg-black/60 backdrop-blur-sm transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 px-4 py-1.5 rounded-full text-white text-xs backdrop-blur-sm font-medium">
                      {selectedImageIdx + 1} / {selectedCase.image_urls.length}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Thumbnails */}
            {selectedCase.image_urls && selectedCase.image_urls.length > 1 && (
              <div className="flex gap-2.5 px-7 pt-5 overflow-x-auto">
                {selectedCase.image_urls.map((url, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIdx(idx)}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                      idx === selectedImageIdx ? 'border-primary ring-2 ring-primary/20' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image src={url} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Info */}
            <div className="p-7">
              <h2 className="text-xl font-bold text-gray-900 mb-3">{selectedCase.title}</h2>
              <div className="flex items-center gap-5 text-sm text-gray-400 mb-5">
                {selectedCase.location && (
                  <span className="flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {selectedCase.location}
                  </span>
                )}
                {selectedCase.work_date && (
                  <span className="flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {selectedCase.work_date}
                  </span>
                )}
              </div>
              {selectedCase.description && (
                <p className="text-gray-600 whitespace-pre-wrap" style={{ lineHeight: 1.95 }}>{selectedCase.description}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-400 py-14 border-t border-white/5">
        <div className="max-w-container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 relative">
                <Image src="/images/logo.png" alt="로고" fill className="object-contain opacity-40" />
              </div>
              <span className="font-bold text-gray-300 text-lg">우승 스카이차</span>
            </div>
            <div className="text-sm">
              <span className="text-gray-500">대표전화</span>{' '}
              <span className="text-gray-300 font-medium">010-5811-5297</span>
            </div>
            <p className="text-xs text-gray-600">&copy; 2025 우승 스카이차. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
