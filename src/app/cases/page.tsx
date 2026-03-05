'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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

  // ESC key to close modal
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') setSelectedCase(null);
    if (!selectedCase) return;
    if (e.key === 'ArrowLeft') setSelectedImageIdx(prev => prev > 0 ? prev - 1 : selectedCase.image_urls.length - 1);
    if (e.key === 'ArrowRight') setSelectedImageIdx(prev => prev < selectedCase.image_urls.length - 1 ? prev + 1 : 0);
  }, [selectedCase]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Lock body scroll when modal open
  useEffect(() => {
    if (selectedCase) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedCase]);

  const featured = cases.length > 0 ? cases[0] : null;
  const rest = cases.slice(1);

  return (
    <>
      <Header activePage="cases" />

      {/* ===== Hero ===== */}
      <section className="gradient-blue text-white relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots" />
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-white/[0.03] rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-blue-400/[0.06] rounded-full blur-3xl" />
        </div>
        <div className="max-w-container relative z-10 pt-20 pb-32 md:pt-28 md:pb-44">
          <FadeIn>
            <span className="inline-flex items-center gap-2 text-sm font-medium bg-white/[0.12] backdrop-blur-sm px-5 py-2.5 rounded-full mb-8 border border-white/10">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Portfolio
            </span>
          </FadeIn>
          <FadeIn delay={100}>
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold mb-6" style={{ lineHeight: 1.15 }}>시공사례</h1>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="text-blue-100/80 text-lg md:text-xl max-w-xl mb-10" style={{ lineHeight: 1.85 }}>
              우승스카이차의 실제 작업 현장입니다.<br className="hidden sm:block" />
              안전하고 전문적인 고공 작업을 확인해보세요.
            </p>
          </FadeIn>
          {!loading && cases.length > 0 && (
            <FadeIn delay={300}>
              <div className="flex items-center gap-8">
                <div>
                  <p className="text-3xl md:text-4xl font-extrabold text-white">{cases.length}<span className="text-accent text-2xl ml-1">건</span></p>
                  <p className="text-blue-200/60 text-sm mt-1">완료된 시공사례</p>
                </div>
                <div className="w-px h-12 bg-white/15" />
                <div>
                  <p className="text-3xl md:text-4xl font-extrabold text-white">100<span className="text-accent text-2xl ml-1">%</span></p>
                  <p className="text-blue-200/60 text-sm mt-1">고객 만족도</p>
                </div>
              </div>
            </FadeIn>
          )}
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
            <path d="M0 70V35C360 0 720 0 1080 35C1260 52 1380 55 1440 35V70H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ===== Cases Content ===== */}
      <section className="section-padding bg-white">
        <div className="max-w-container">
          {loading ? (
            /* Skeleton loading */
            <div className="space-y-8">
              <div className="bg-gray-100 rounded-3xl h-[400px] animate-pulse" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                {[1, 2, 3].map(i => (
                  <div key={i} className="bg-gray-100 rounded-2xl h-80 animate-pulse" />
                ))}
              </div>
            </div>
          ) : cases.length === 0 ? (
            /* Empty state */
            <FadeIn>
              <div className="text-center py-28">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-primary/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">아직 등록된 시공사례가 없습니다</h3>
                <p className="text-gray-400 text-[16px] mb-10 max-w-md mx-auto" style={{ lineHeight: '1.9' }}>
                  곧 다양한 작업 사례가 업데이트됩니다.<br />
                  작업 문의는 전화로 편하게 연락주세요.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a href="tel:010-5811-5297" className="inline-flex items-center gap-2.5 btn-primary px-8 py-3.5 rounded-2xl">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                    전화 문의하기
                  </a>
                  <Link href="/" className="text-gray-500 hover:text-primary font-medium transition-colors inline-flex items-center gap-1.5">
                    홈으로 돌아가기
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                    </svg>
                  </Link>
                </div>
              </div>
            </FadeIn>
          ) : (
            <div className="space-y-10">
              {/* Featured (first) case - full width */}
              {featured && (
                <FadeIn>
                  <button
                    onClick={() => { setSelectedCase(featured); setSelectedImageIdx(0); }}
                    className="w-full text-left case-card group rounded-3xl overflow-hidden"
                  >
                    <div className="grid md:grid-cols-2">
                      <div className="relative h-64 md:h-[420px] overflow-hidden">
                        {featured.image_urls && featured.image_urls.length > 0 ? (
                          <>
                            <Image src={featured.image_urls[0]} alt={featured.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                            <div className="case-card-overlay">
                              <span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                </svg>
                                자세히 보기
                              </span>
                            </div>
                          </>
                        ) : (
                          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                          </div>
                        )}
                        <div className="featured-tag">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          최신 사례
                        </div>
                        {featured.image_urls && featured.image_urls.length > 1 && (
                          <span className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm font-medium z-10">
                            {featured.image_urls.length}장
                          </span>
                        )}
                      </div>
                      <div className="p-8 md:p-12 flex flex-col justify-center">
                        <div className="flex flex-wrap items-center gap-2.5 mb-5">
                          {featured.location && (
                            <span className="meta-badge meta-badge-location">
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                              </svg>
                              {featured.location}
                            </span>
                          )}
                          {featured.work_date && (
                            <span className="meta-badge meta-badge-date">
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                              </svg>
                              {featured.work_date}
                            </span>
                          )}
                        </div>
                        <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4 group-hover:text-primary transition-colors" style={{ lineHeight: '1.3' }}>
                          {featured.title}
                        </h3>
                        {featured.description && (
                          <p className="text-gray-500 text-[16px] line-clamp-3 mb-8" style={{ lineHeight: '1.95' }}>{featured.description}</p>
                        )}
                        <span className="inline-flex items-center gap-2 text-primary font-semibold text-[15px] group-hover:gap-3 transition-all">
                          자세히 보기
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </button>
                </FadeIn>
              )}

              {/* Rest of cases - grid */}
              {rest.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                  {rest.map((c, idx) => (
                    <FadeIn key={c.id} delay={idx * 80} direction="up">
                      <button
                        onClick={() => { setSelectedCase(c); setSelectedImageIdx(0); }}
                        className="w-full text-left case-card group h-full flex flex-col"
                      >
                        {c.image_urls && c.image_urls.length > 0 ? (
                          <div className="relative h-60 overflow-hidden">
                            <Image src={c.image_urls[0]} alt={c.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="case-card-overlay">
                              <span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                </svg>
                                자세히 보기
                              </span>
                            </div>
                            {c.image_urls.length > 1 && (
                              <span className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm font-medium z-10">
                                {c.image_urls.length}장
                              </span>
                            )}
                          </div>
                        ) : (
                          <div className="h-60 bg-gray-50 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                          </div>
                        )}
                        <div className="p-6 flex-1 flex flex-col">
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            {c.location && (
                              <span className="meta-badge meta-badge-location">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                </svg>
                                {c.location}
                              </span>
                            )}
                            {c.work_date && (
                              <span className="meta-badge meta-badge-date">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                                </svg>
                                {c.work_date}
                              </span>
                            )}
                          </div>
                          <h3 className="font-bold text-gray-900 text-[17px] group-hover:text-primary transition-colors mb-2">{c.title}</h3>
                          {c.description && (
                            <p className="text-sm text-gray-500 line-clamp-2 flex-1" style={{ lineHeight: '1.85' }}>{c.description}</p>
                          )}
                        </div>
                      </button>
                    </FadeIn>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="gradient-blue section-padding relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots" />
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/[0.04] rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-blue-400/[0.06] rounded-full blur-3xl" />
        </div>
        <FadeIn className="max-w-container text-center text-white relative z-10">
          <span className="inline-flex items-center gap-2 text-sm font-medium bg-white/[0.1] backdrop-blur-sm px-5 py-2.5 rounded-full mb-8 border border-white/10">
            작업이 필요하신가요?
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-7" style={{ lineHeight: '1.2' }}>
            우승 스카이차에<br className="sm:hidden" /> 문의해보세요
          </h2>
          <p className="text-blue-100/70 text-lg mb-12 max-w-xl mx-auto" style={{ lineHeight: '1.85' }}>
            현장 상담부터 출동까지, 빠르고 정확하게 도와드립니다.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="tel:010-5811-5297" className="inline-flex items-center gap-3 btn-accent px-10 py-4 rounded-2xl text-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              010-5811-5297
            </a>
            <Link href="/" className="inline-flex items-center gap-2 btn-outline-white px-8 py-4 rounded-2xl text-[16px]">
              홈으로 돌아가기
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* ===== Detail Modal ===== */}
      {selectedCase && (
        <div className="modal-backdrop" onClick={() => setSelectedCase(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            {/* Main image */}
            {selectedCase.image_urls && selectedCase.image_urls.length > 0 && (
              <div className="relative h-72 sm:h-[28rem]">
                <Image src={selectedCase.image_urls[selectedImageIdx]} alt={selectedCase.title} fill className="object-cover rounded-t-3xl" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-t-3xl" />
                <button
                  onClick={() => setSelectedCase(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors backdrop-blur-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                {/* Nav arrows */}
                {selectedCase.image_urls.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImageIdx(prev => prev > 0 ? prev - 1 : selectedCase.image_urls.length - 1)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-black/40 text-white rounded-full flex items-center justify-center hover:bg-black/60 backdrop-blur-sm transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setSelectedImageIdx(prev => prev < selectedCase.image_urls.length - 1 ? prev + 1 : 0)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-black/40 text-white rounded-full flex items-center justify-center hover:bg-black/60 backdrop-blur-sm transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 px-5 py-2 rounded-full text-white text-sm backdrop-blur-sm font-medium">
                      {selectedImageIdx + 1} / {selectedCase.image_urls.length}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Thumbnails */}
            {selectedCase.image_urls && selectedCase.image_urls.length > 1 && (
              <div className="flex gap-2.5 px-8 pt-6 overflow-x-auto">
                {selectedCase.image_urls.map((url, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIdx(idx)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                      idx === selectedImageIdx ? 'border-primary ring-2 ring-primary/20 scale-105' : 'border-transparent opacity-50 hover:opacity-100'
                    }`}
                  >
                    <Image src={url} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Info */}
            <div className="p-8 md:p-10">
              <div className="flex flex-wrap items-center gap-2.5 mb-5">
                {selectedCase.location && (
                  <span className="meta-badge meta-badge-location">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    {selectedCase.location}
                  </span>
                )}
                {selectedCase.work_date && (
                  <span className="meta-badge meta-badge-date">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                    </svg>
                    {selectedCase.work_date}
                  </span>
                )}
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-5" style={{ lineHeight: '1.3' }}>{selectedCase.title}</h2>
              {selectedCase.description && (
                <div className="border-t border-gray-100 pt-6">
                  <p className="text-gray-600 whitespace-pre-wrap text-[16px]" style={{ lineHeight: 2 }}>{selectedCase.description}</p>
                </div>
              )}
              <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                <p className="text-gray-400 text-sm">ESC 또는 바깥을 클릭하여 닫기</p>
                <a href="tel:010-5811-5297" className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:text-primary-dark transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  비슷한 작업 문의하기
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== Footer ===== */}
      <footer className="bg-gray-950 text-gray-400 py-16 border-t border-white/5">
        <div className="max-w-container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 relative">
                <Image src="/images/logo.png" alt="로고" fill className="object-contain opacity-40" />
              </div>
              <span className="font-bold text-gray-300 text-lg tracking-tight">우승 스카이차</span>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/" className="footer-link">홈</Link>
              <Link href="/about" className="footer-link">회사소개</Link>
              <span className="text-gray-600">|</span>
              <span className="text-gray-500">대표전화</span>
              <span className="font-semibold text-gray-300">010-5811-5297</span>
            </div>
            <p className="text-[11px] text-gray-600 tracking-wide">&copy; 2025 우승 스카이차. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
