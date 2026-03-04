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
    { name: "김도윤", photo: "/images/review4.jpg", text: "간판 철거 작업을 맡겼는데, 현장 파악부터 안전조치까지 정말 꼼꼼했습니다. 작업 속도도 빨라 부담 없이 진행할 수 있었어요" },
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
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-white/[0.03] rounded-full blur-3xl" />
          <div className="absolute -bottom-60 -left-60 w-[600px] h-[600px] bg-blue-400/[0.06] rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/[0.04] rounded-full blur-3xl" />
        </div>

        <div className="max-w-container flex items-center justify-between gap-16 py-28 md:py-40 relative z-10">
          <div className="flex-1">
            <FadeIn delay={0}>
              <span className="inline-flex items-center gap-2 text-sm font-medium bg-white/[0.12] backdrop-blur-sm px-5 py-2 rounded-full mb-8">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                신속한 대응, 완벽한 작업
              </span>
            </FadeIn>
            <FadeIn delay={100}>
              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold mb-7" style={{ lineHeight: '1.15' }}>
                우승 스카이차
              </h1>
            </FadeIn>
            <FadeIn delay={200}>
              <p className="text-lg md:text-xl text-blue-100 mb-12 max-w-lg" style={{ lineHeight: '1.75' }}>
                스카이차·고소작업차 전문 대여 업체로 어떤 환경에서도 안전하고 정확한 작업을 보장합니다
              </p>
            </FadeIn>
            <FadeIn delay={300}>
              <div className="flex flex-wrap gap-4">
                <a href="tel:010-5811-5297" className="inline-flex items-center gap-2.5 btn-accent px-8 py-4 rounded-2xl text-base">
                  지금 문의하기
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                  </svg>
                </a>
                <button onClick={() => scrollToSection('about')} className="inline-flex items-center gap-2 btn-outline-white px-8 py-4 rounded-2xl text-base">
                  더 알아보기
                </button>
              </div>
            </FadeIn>
          </div>

          <FadeIn direction="right" delay={200} className="flex-1 hidden md:block relative h-[440px]">
            <Image src="/images/truck.png" alt="우승 스카이차" fill className="object-contain drop-shadow-2xl" priority />
          </FadeIn>
        </div>

        <div className="md:hidden relative h-56 px-4 -mb-2">
          <Image src="/images/truck.png" alt="우승 스카이차" fill className="object-contain" priority />
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60V30C240 0 480 0 720 30C960 60 1200 60 1440 30V60H0Z" fill="#f9fafb" />
          </svg>
        </div>
      </section>

      {/* ===== Stats ===== */}
      <section className="bg-gray-50 -mt-1">
        <div className="max-w-container">
          <FadeIn>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 -mt-8 relative z-10">
              {[
                { number: '10+', label: '년 경력' },
                { number: '500+', label: '건 작업 완료' },
                { number: '24h', label: '빠른 출동' },
                { number: '100%', label: '안전 작업' },
              ].map((stat, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 md:p-8 text-center shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                  <p className="stat-number mb-2">{stat.number}</p>
                  <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
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
            <span className="section-badge">서비스 절차</span>
            <h2 className="section-title mb-5">간편한 3단계로 시작하세요</h2>
            <p className="section-desc mx-auto">전화 한 통이면 전문 담당자가 신속하게 대응합니다</p>
          </FadeIn>

          <div className="grid md:grid-cols-5 gap-6 md:gap-4 items-start">
            {[
              { icon: <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />, title: '010-5811-5297 문의', desc: '현장 상황과 필요한 작업 내용을 알려주세요. 가장 적합한 견적을 바로 추천해드립니다' },
              { icon: <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />, title: '담당자 배정', desc: '요청 내용을 바탕으로 전담 담당자가 배정됩니다. 신속한 소통으로 작업 준비를 완성합니다' },
              { icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />, title: '작업 진행', desc: '안전 기준을 준수하며 계획된 일정에 맞춰 작업을 수행합니다. 높은 완성도와 만족도를 보장합니다' },
            ].map((step, i) => (
              <React.Fragment key={i}>
                {i > 0 && (
                  <div className="process-arrow pt-8">
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
                    <p className="font-bold text-gray-900 mb-3 text-[17px]">{step.title}</p>
                    <p className="text-[15px] text-gray-500" style={{ lineHeight: '1.75' }}>{step.desc}</p>
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
            <div className="relative h-[30rem] rounded-3xl overflow-hidden mb-20 group">
              <Image src="/images/work-photo.jpg" alt="작업 현장" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-14">
                <Link href="/about" className="inline-flex items-center gap-2 text-white text-lg font-semibold hover:text-accent transition-colors group/link">
                  Learn more about us
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 group-hover/link:translate-x-1.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                  </svg>
                </Link>
              </div>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-start">
            <FadeIn direction="left">
              <span className="section-badge">회사 소개</span>
              <h2 className="section-title mb-8">
                높은 곳의 작업,<br />
                우승이 더 안전하게 만듭니다
              </h2>
              <p className="text-[17px] text-gray-600" style={{ lineHeight: '1.9' }}>
                우승 스카이차는 다양한 현장에 최적화된 스카이차·고소작업 장비를 제공합니다. 숙련된 전문 스탭이 직접 현장을 검토하고, 안전한 작업 진행을 위해 체계적으로 대응합니다. 신속한 출동과 높은 작업 완성도로 고객 만족을 최우선으로 하고 있습니다.
              </p>
            </FadeIn>

            <FadeIn direction="right" delay={150}>
              <div className="space-y-5 md:pt-14">
                {['경력과 자격을 갖춘 전문 스탭 운용', '정기 점검된 안정적인 스카이차 보유', '신속한 출동, 투명한 견적 안내'].map((text, i) => (
                  <div key={i} className="check-item">
                    <div className="check-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <p className="text-gray-800 font-medium text-[16px]">{text}</p>
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
            <FadeIn className="text-center mb-14">
              <span className="section-badge">FAQ</span>
              <h2 className="section-title mb-5">자주 묻는 질문을 모았습니다</h2>
              <p className="section-desc mx-auto mb-5">
                고객님들이 가장 많이 문의하시는 내용을 정리했습니다.<br className="hidden sm:block" />
                혹시 찾으시는 답변이 없다면 언제든지 문의해주세요.
              </p>
              <button onClick={() => scrollToSection('contact')} className="text-primary font-semibold hover:text-primary-dark transition-colors inline-flex items-center gap-1.5 text-[15px]">
                문의하기
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                </svg>
              </button>
            </FadeIn>

            <FadeIn>
              <div className="space-y-3">
                {faqItems.map((item, index) => (
                  <div key={index} className="accordion-item">
                    <button onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)} className="accordion-header w-full">
                      <span className="font-semibold text-left text-gray-900 text-[16px]">{item.question}</span>
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
          </div>
        </div>
      </section>

      {/* ===== Reviews ===== */}
      <section id="reviews" className="bg-white section-padding overflow-hidden">
        <FadeIn className="max-w-container mb-16">
          <div className="text-center">
            <span className="section-badge">고객 후기</span>
            <h2 className="section-title mb-5">고객님들의 실제 후기를 소개합니다</h2>
            <p className="section-desc mx-auto">
              우승 스카이차를 이용해주신 고객님들의 경험을 바탕으로<br className="hidden sm:block" />
              더 안전하고 신뢰할 수 있는 서비스를 만들어가고 있습니다.
            </p>
          </div>
        </FadeIn>

        <div className="marquee-container">
          <div className="marquee-track">
            {[...reviews, ...reviews, ...reviews, ...reviews].map((review, index) => (
              <div key={index} className="review-card">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-[18px] h-[18px] text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 text-[15px] mb-6 flex-1" style={{ lineHeight: '1.85' }}>
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="flex items-center gap-3.5 pt-5 border-t border-gray-100">
                  <div className="relative w-11 h-11 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-gray-100">
                    <Image src={review.photo} alt={review.name} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-[15px]">{review.name}</p>
                    <p className="text-xs text-green-600 font-semibold mt-0.5">Review on NAVER</p>
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
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-container relative z-10 py-28 md:py-36">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
            <FadeIn direction="left">
              <div className="text-white">
                <span className="inline-flex items-center gap-2 text-sm font-medium bg-white/[0.08] backdrop-blur-sm px-5 py-2 rounded-full mb-8 text-blue-200 border border-white/10">
                  문의하기
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-7" style={{ lineHeight: '1.2' }}>
                  함께 안전하고 완성도<br />높은 작업을 만들어가요!
                </h2>
                <p className="text-gray-400 text-lg mb-12" style={{ lineHeight: '1.85' }}>
                  스카이차가 필요한 작업이 있으신가요?<br />
                  현장 상담부터 출동까지, 우승 스카이차가<br className="hidden md:block" />
                  빠르고 정확하게 도와드립니다.
                </p>
                <a href="tel:010-5811-5297" className="inline-flex items-center gap-4 group">
                  <span className="w-16 h-16 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </span>
                  <span className="text-2xl md:text-3xl font-extrabold text-white group-hover:text-accent transition-colors">010-5811-5297</span>
                </a>
              </div>
            </FadeIn>

            <FadeIn direction="right" delay={150}>
              <div className="bg-white/[0.06] backdrop-blur-2xl p-10 md:p-12 rounded-3xl border border-white/[0.08] shadow-2xl">
                <h3 className="text-white text-xl font-bold mb-8">빠른 문의</h3>
                <form onSubmit={(e) => { e.preventDefault(); setFormData({ phone: '', email: '' }); alert('문의가 접수되었습니다!'); }} className="space-y-5">
                  <input
                    type="tel" name="phone" value={formData.phone} onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))} required
                    className="w-full px-5 py-4 bg-white/[0.07] text-white rounded-2xl border border-white/[0.08] focus:border-primary focus:ring-2 focus:ring-primary/30 focus:outline-none placeholder-gray-500 transition-all text-[16px]"
                    placeholder="전화번호"
                  />
                  <input
                    type="email" name="email" value={formData.email} onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))} required
                    className="w-full px-5 py-4 bg-white/[0.07] text-white rounded-2xl border border-white/[0.08] focus:border-primary focus:ring-2 focus:ring-primary/30 focus:outline-none placeholder-gray-500 transition-all text-[16px]"
                    placeholder="이메일"
                  />
                  <button type="submit" className="w-full btn-accent py-4 rounded-2xl text-base mt-1">문의하기</button>
                </form>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="bg-gray-950 text-gray-400 py-14 border-t border-white/5">
        <div className="max-w-container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 relative">
                <Image src="/images/logo.png" alt="로고" fill className="object-contain opacity-40" />
              </div>
              <span className="font-bold text-gray-300 text-lg">우승 스카이차</span>
            </div>
            <div className="flex items-center gap-0 text-sm">
              <span>대표전화: 010-5811-5297</span>
            </div>
            <p className="text-xs text-gray-600">&copy; 2024 우승 스카이차. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
