'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import FadeIn from '@/components/FadeIn';

export default function Home() {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(0);
  const [formData, setFormData] = useState({ phone: '', email: '' });

  const faqItems = [
    { question: "스카이차 기사님이 현장까지 함께 오시나요?", answer: "네, 모든 작업은 전문 스탭이 동행하여 안전하게 진행합니다. 현장 상황을 확인 후 최적의 작업 방식을 안내해드립니다." },
    { question: "견적은 어떻게 받나요?", answer: "전화 또는 문의 폼을 통해 현장 정보를 알려주시면, 담당자가 신속하게 연락드려 투명한 견적을 제시해드립니다." },
    { question: "어떤 결제 방식이 가능한가요?", answer: "현금, 계좌이체, 카드 결제 등 다양한 결제 방식이 가능합니다. 작업 완료 후 결제해주시면 됩니다." },
    { question: "당일 출동도 가능한가요?", answer: "네, 가능한 한 빠른 시간 내 출동하기 위해 노력하고 있습니다. 긴급 상황의 경우 전화로 먼저 연락주시기 바랍니다." },
  ];

  const reviews = [
    { name: "정은서", photo: "/images/review1.jpg", text: "높은 층 유리 청소가 필요해 문의했는데, 장비 상태도 좋고 작업도 매끄러웠습니다. 안전 장비를 철저히 착용하고 작업하셔서 믿음이 갔습니다." },
    { name: "이승훈", photo: "/images/review2.jpg", text: "통신선 점검 때문에 급히 연락드렸는데, 당일 바로 출동해주셔서 정말 도움됐습니다. 현장 상황 설명도 이해하기 쉽게 해주셔서 좋았어요." },
    { name: "박지현", photo: "/images/review3.jpg", text: "외벽 청소 작업을 요청했는데 기사님이 너무 친절하고 전문적이셨어요. 작업 전후 비교 사진까지 보내주셔서 더 신뢰가 갔습니다." },
    { name: "김도윤", photo: "/images/review4.jpg", text: "간판 철거 작업을 맡겼는데, 현장 파악부터 안전조치까지 정말 꼼꼼했습니다. 작업 속도도 빨라 부담 없이 진행할 수 있었어요." },
  ];

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="overflow-hidden">
      <Header activePage="home" />

      {/* ===== Hero ===== */}
      <section className="gradient-blue text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-white/[0.03] rounded-full blur-3xl" />
          <div className="absolute -bottom-60 -left-40 w-[500px] h-[500px] bg-blue-400/[0.06] rounded-full blur-3xl" />
          <div className="absolute top-1/3 left-1/3 w-[700px] h-[700px] bg-blue-500/[0.03] rounded-full blur-3xl" />
        </div>

        <div className="max-w-container flex items-center justify-between gap-16 pt-20 pb-32 md:pt-28 md:pb-44 relative z-10">
          <div className="flex-1 max-w-2xl">
            <FadeIn delay={0}>
              <span className="inline-flex items-center gap-2.5 text-sm font-medium bg-white/[0.1] backdrop-blur-sm px-5 py-2.5 rounded-full mb-10 border border-white/10">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                신속한 대응, 완벽한 작업
              </span>
            </FadeIn>
            <FadeIn delay={100}>
              <h1 className="text-4xl sm:text-5xl md:text-[3.5rem] lg:text-[4rem] font-extrabold mb-8 tracking-tight" style={{ lineHeight: '1.15' }}>
                높은 곳의 작업,<br className="hidden sm:block" />
                우승이 해결합니다
              </h1>
            </FadeIn>
            <FadeIn delay={200}>
              <p className="text-lg md:text-xl text-blue-100/80 mb-14 max-w-lg" style={{ lineHeight: '1.8' }}>
                스카이차 · 고소작업차 전문 대여 업체로<br className="hidden sm:block" />
                어떤 환경에서도 안전하고 정확한 작업을 보장합니다
              </p>
            </FadeIn>
            <FadeIn delay={300}>
              <div className="flex flex-wrap gap-4">
                <a href="tel:010-5811-5297" className="inline-flex items-center gap-3 btn-accent px-9 py-4 rounded-2xl text-[16px]">
                  지금 문의하기
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                  </svg>
                </a>
                <button onClick={() => scrollToSection('about')} className="inline-flex items-center gap-2 btn-outline-white px-9 py-4 rounded-2xl text-[16px]">
                  더 알아보기
                </button>
              </div>
            </FadeIn>
          </div>

          <FadeIn direction="right" delay={200} className="flex-1 hidden lg:block relative h-[480px]">
            <Image src="/images/truck.png" alt="우승 스카이차" fill className="object-contain drop-shadow-2xl" priority />
          </FadeIn>
        </div>

        <div className="lg:hidden relative h-56 px-4 -mb-2">
          <Image src="/images/truck.png" alt="우승 스카이차" fill className="object-contain" priority />
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
            <path d="M0 70V35C360 0 720 0 1080 35C1260 52 1380 55 1440 35V70H0Z" fill="#f9fafb" />
          </svg>
        </div>
      </section>

      {/* ===== Stats ===== */}
      <section className="bg-gray-50 -mt-1 pb-8">
        <div className="max-w-container">
          <FadeIn>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6 -mt-10 relative z-10">
              {[
                { number: '10+', label: '년 경력', sub: 'Years Experience' },
                { number: '500+', label: '건 작업 완료', sub: 'Projects Done' },
                { number: '24h', label: '빠른 출동', sub: 'Quick Response' },
                { number: '100%', label: '안전 작업', sub: 'Safety Record' },
              ].map((stat, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 md:p-8 text-center border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.04)' }}>
                  <p className="stat-number mb-2.5">{stat.number}</p>
                  <p className="text-gray-800 text-sm font-semibold">{stat.label}</p>
                  <p className="text-gray-400 text-[11px] mt-1 tracking-wide uppercase">{stat.sub}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== Process ===== */}
      <section id="services" className="bg-gray-50 section-padding">
        <div className="max-w-container">
          <FadeIn className="text-center mb-20">
            <span className="section-badge">Service Process</span>
            <h2 className="section-title mb-6">간편한 3단계로 시작하세요</h2>
            <p className="section-desc mx-auto">전화 한 통이면 전문 담당자가 신속하게 대응합니다</p>
          </FadeIn>

          <div className="grid md:grid-cols-5 gap-6 md:gap-4 items-start">
            {[
              { icon: <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />, step: '01', title: '전화 문의', desc: '현장 상황과 필요한 작업 내용을 알려주세요. 가장 적합한 견적을 바로 안내해드립니다.' },
              { icon: <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />, step: '02', title: '담당자 배정', desc: '요청 내용을 바탕으로 전담 담당자가 배정되어 신속하게 작업 준비를 완성합니다.' },
              { icon: <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.1-5.1m0 0L11.42 4.97m-5.1 5.1H22.54" />, step: '03', title: '작업 진행', desc: '안전 기준을 철저히 준수하며 계획된 일정에 맞춰 높은 완성도의 작업을 수행합니다.' },
            ].map((step, i) => (
              <React.Fragment key={i}>
                {i > 0 && (
                  <div className="process-arrow pt-10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </svg>
                  </div>
                )}
                <FadeIn delay={i * 150}>
                  <div className="process-step">
                    <div className="process-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        {step.icon}
                      </svg>
                    </div>
                    <span className="text-primary/40 text-xs font-bold tracking-widest mb-2.5">{step.step}</span>
                    <p className="font-bold text-gray-900 mb-3.5 text-lg">{step.title}</p>
                    <p className="text-[15px] text-gray-500" style={{ lineHeight: '1.85' }}>{step.desc}</p>
                  </div>
                </FadeIn>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ===== About ===== */}
      <section id="about" className="bg-white section-padding">
        <div className="max-w-container">
          <FadeIn>
            <div className="relative h-[28rem] sm:h-[32rem] rounded-3xl overflow-hidden mb-24 group">
              <Image src="/images/work-photo.jpg" alt="작업 현장" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-14">
                <span className="text-white/50 text-xs font-bold tracking-[0.2em] uppercase">About Us</span>
                <h3 className="text-white text-2xl md:text-3xl font-extrabold mt-3 mb-5" style={{ lineHeight: '1.35' }}>
                  안전을 최우선으로 하는<br />고공 작업 전문 업체
                </h3>
                <Link href="/about" className="inline-flex items-center gap-2 text-white/70 text-[15px] font-medium hover:text-accent transition-colors group/link">
                  자세히 보기
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                  </svg>
                </Link>
              </div>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-16 lg:gap-28 items-start">
            <FadeIn direction="left">
              <span className="section-badge">Company</span>
              <h2 className="section-title mb-8">
                높은 곳의 작업,<br />
                우승이 더 안전하게
              </h2>
              <p className="text-[17px] text-gray-600" style={{ lineHeight: '2.05' }}>
                우승 스카이차는 다양한 현장에 최적화된 스카이차 · 고소작업 장비를 제공합니다. 숙련된 전문 스탭이 직접 현장을 검토하고, 안전한 작업 진행을 위해 체계적으로 대응합니다.
              </p>
              <p className="text-[17px] text-gray-600 mt-7" style={{ lineHeight: '2.05' }}>
                신속한 출동과 높은 작업 완성도로 고객 만족을 최우선으로 하고 있습니다.
              </p>
            </FadeIn>

            <FadeIn direction="right" delay={150}>
              <div className="space-y-5 md:pt-16">
                {['경력과 자격을 갖춘 전문 스탭 운용', '정기 점검된 안정적인 스카이차 보유', '신속한 출동, 투명한 견적 안내'].map((text, i) => (
                  <div key={i} className="check-item">
                    <div className="check-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <p className="text-gray-800 font-semibold text-[16px]">{text}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" className="bg-gray-50 section-padding">
        <div className="max-w-container">
          <div className="max-w-2xl mx-auto">
            <FadeIn className="text-center mb-16">
              <span className="section-badge">FAQ</span>
              <h2 className="section-title mb-6">자주 묻는 질문</h2>
              <p className="section-desc mx-auto">
                고객님들이 가장 많이 문의하시는 내용을 정리했습니다.
              </p>
            </FadeIn>

            <FadeIn>
              <div className="space-y-3.5">
                {faqItems.map((item, index) => (
                  <div key={index} className="accordion-item">
                    <button onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)} className="accordion-header w-full">
                      <span className="font-semibold text-left text-gray-900 text-[15px] sm:text-[16px]">{item.question}</span>
                      <span className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${expandedFAQ === index ? 'bg-primary text-white rotate-180 shadow-md' : 'bg-gray-100 text-gray-400'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                      </span>
                    </button>
                    <div className="accordion-content" style={{ maxHeight: expandedFAQ === index ? '200px' : '0' }}>
                      <div className="accordion-body">{item.answer}</div>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn className="text-center mt-12">
              <p className="text-gray-400 text-sm mb-3">찾으시는 답변이 없으신가요?</p>
              <button onClick={() => scrollToSection('contact')} className="text-primary font-semibold hover:text-primary-dark transition-colors inline-flex items-center gap-1.5 text-[15px]">
                직접 문의하기
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                </svg>
              </button>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ===== Reviews ===== */}
      <section id="reviews" className="bg-white section-padding overflow-hidden">
        <FadeIn className="max-w-container mb-16">
          <div className="text-center">
            <span className="section-badge">Reviews</span>
            <h2 className="section-title mb-6">고객님들의 실제 후기</h2>
            <p className="section-desc mx-auto">
              우승 스카이차를 이용해주신 고객님들의 생생한 경험담입니다.
            </p>
          </div>
        </FadeIn>

        <div className="marquee-container">
          <div className="marquee-track">
            {[...reviews, ...reviews, ...reviews, ...reviews].map((review, index) => (
              <div key={index} className="review-card">
                <div className="flex gap-0.5 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-[18px] h-[18px] text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 text-[15px] mb-7 flex-1" style={{ lineHeight: '1.95' }}>
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="flex items-center gap-3.5 pt-5 border-t border-gray-100">
                  <div className="relative w-11 h-11 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-gray-100">
                    <Image src={review.photo} alt={review.name} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-[15px]">{review.name}</p>
                    <p className="text-[11px] text-green-600 font-semibold mt-0.5 tracking-wide">NAVER 리뷰</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Contact ===== */}
      <section id="contact" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950" />
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-container relative z-10 py-28 md:py-40">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-28 items-center">
            <FadeIn direction="left">
              <div className="text-white">
                <span className="inline-flex items-center gap-2 text-[11px] font-bold bg-white/[0.06] backdrop-blur-sm px-5 py-2 rounded-full mb-10 text-blue-200 border border-white/10 tracking-[0.18em] uppercase">
                  Contact Us
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-8" style={{ lineHeight: '1.25' }}>
                  안전하고 완성도 높은<br />작업이 필요하신가요?
                </h2>
                <p className="text-gray-400 text-lg mb-14" style={{ lineHeight: '1.95' }}>
                  스카이차가 필요한 작업이 있으신가요?<br />
                  현장 상담부터 출동까지, 우승 스카이차가<br className="hidden md:block" />
                  빠르고 정확하게 도와드립니다.
                </p>
                <a href="tel:010-5811-5297" className="inline-flex items-center gap-5 group">
                  <span className="w-16 h-16 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </span>
                  <span className="text-2xl md:text-3xl font-extrabold text-white group-hover:text-accent transition-colors tracking-tight">010-5811-5297</span>
                </a>
              </div>
            </FadeIn>

            <FadeIn direction="right" delay={150}>
              <div className="bg-white/[0.05] backdrop-blur-2xl p-10 md:p-12 rounded-3xl border border-white/[0.08] shadow-2xl">
                <h3 className="text-white text-xl font-bold mb-2">빠른 문의</h3>
                <p className="text-gray-500 text-sm mb-8" style={{ lineHeight: '1.7' }}>연락처를 남겨주시면 빠르게 연락드립니다</p>
                <form onSubmit={(e) => { e.preventDefault(); setFormData({ phone: '', email: '' }); alert('문의가 접수되었습니다!'); }} className="space-y-5">
                  <input
                    type="tel" name="phone" value={formData.phone} onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))} required
                    className="w-full px-5 py-4 bg-white/[0.06] text-white rounded-2xl border border-white/[0.08] focus:border-primary focus:ring-2 focus:ring-primary/30 focus:outline-none placeholder-gray-500 transition-all text-[16px]"
                    placeholder="전화번호"
                  />
                  <input
                    type="email" name="email" value={formData.email} onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))} required
                    className="w-full px-5 py-4 bg-white/[0.06] text-white rounded-2xl border border-white/[0.08] focus:border-primary focus:ring-2 focus:ring-primary/30 focus:outline-none placeholder-gray-500 transition-all text-[16px]"
                    placeholder="이메일"
                  />
                  <button type="submit" className="w-full btn-accent py-4 rounded-2xl text-[16px] mt-2">문의하기</button>
                </form>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

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
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">대표전화</span>
              <span className="font-semibold text-gray-300">010-5811-5297</span>
            </div>
            <p className="text-[11px] text-gray-600 tracking-wide">&copy; 2025 우승 스카이차. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
