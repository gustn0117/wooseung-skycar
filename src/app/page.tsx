'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(0);
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
  });

  const faqItems = [
    {
      question: "스카이차 기사님이 현장까지 함께 오시나요?",
      answer: "네, 모든 작업은 전문 스탭이 동행하여 안전하게 진행합니다. 현장 상황을 확인 후 최적의 작업 방식을 안내해드립니다."
    },
    {
      question: "견적은 어떻게 받나요?",
      answer: "전화 또는 문의 폼을 통해 현장 정보를 알려주시면, 담당자가 신속하게 연락드려 투명한 견적을 제시해드립니다."
    },
    {
      question: "어떤 결제 방식이 가능한가요?",
      answer: "현금, 계좌이체, 카드 결제 등 다양한 결제 방식이 가능합니다. 작업 완료 후 결제해주시면 됩니다."
    },
    {
      question: "당일 출동도 가능한가요?",
      answer: "네, 가능한 한 빠른 시간 내 출동하기 위해 노력하고 있습니다. 긴급 상황의 경우 전화로 먼저 연락주시기 바랍니다."
    }
  ];

  const reviews = [
    {
      name: "정은서",
      photo: "/images/review1.jpg",
      text: "높은 층 유리 청소가 필요해 문의했는데, 장비 상태도 좋고 작업도 매끄러웠습니다. 안전 장비를 철저히 착용하고 작업하셔서 믿음이 갔습니다.",
    },
    {
      name: "이승훈",
      photo: "/images/review2.jpg",
      text: "통신선 점검 때문에 급히 연락드렸는데, 당일 바로 출동해주셔서 정말 도움됐습니다. 현장 상황 설명도 이해하기 쉽게 해주셔서 좋았어요.",
    },
    {
      name: "박지현",
      photo: "/images/review3.jpg",
      text: "외벽 청소 작업을 요청했는데 기사님이 너무 친절하고 전문적이셨어요. 작업 전후 비교 사진까지 보내주셔서 더 신뢰가 갔습니다.",
    },
    {
      name: "김도윤",
      photo: "/images/review4.jpg",
      text: "간판 철거 작업을 맡겼는데, 현장 파악부터 안전조치까지 정말 꼼꼼했습니다. 작업 속도도 빨라 부담 없이 진행할 수 있었어요",
    }
  ];

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormData({ phone: '', email: '' });
    alert('문의가 접수되었습니다. 감사합니다!');
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="overflow-hidden">
      {/* ===== Header ===== */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-nav">
        <nav className="max-w-container flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 relative">
              <Image src="/images/logo.png" alt="우승 스카이차 로고" fill className="object-contain" />
            </div>
            <span className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">우승스카이차</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/about" className="nav-link">회사소개</Link>
            <button onClick={() => scrollToSection('services')} className="nav-link">서비스 안내</button>
            <button onClick={() => scrollToSection('contact')} className="nav-link">문의하기</button>
          </div>

          <a
            href="tel:010-5811-5297"
            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-primary-dark transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="hidden sm:inline">010-5811-5297</span>
          </a>
        </nav>
      </header>

      {/* ===== Hero Section ===== */}
      <section id="hero" className="gradient-blue text-white relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-container flex items-center justify-between gap-12 py-20 md:py-32 relative z-10">
          <div className="flex-1 animate-fade-in-up">
            <span className="inline-block text-sm font-medium bg-white/15 backdrop-blur-sm px-4 py-1.5 rounded-full mb-6 tracking-wide">
              신속한 대응, 완벽한 작업
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              우승 스카이차
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-10 max-w-lg leading-relaxed">
              우승 스카이차는 스카이차·고소작업차 전문 대여 업체로 어떤 환경에서도 안전하고 정확한 작업을 보장합니다
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="tel:010-5811-5297"
                className="inline-flex items-center gap-2 btn-accent px-8 py-3.5 rounded-xl text-base"
              >
                지금 문의하기
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <button
                onClick={() => scrollToSection('about')}
                className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-8 py-3.5 rounded-xl hover:bg-white/10 transition-all duration-200 text-base font-semibold"
              >
                더 알아보기
              </button>
            </div>
          </div>

          <div className="flex-1 hidden md:block relative h-[420px] animate-slide-in-right">
            <Image src="/images/truck.png" alt="우승 스카이차" fill className="object-contain drop-shadow-2xl" priority />
          </div>
        </div>

        <div className="md:hidden relative h-64 -mb-4 px-4">
          <Image src="/images/truck.png" alt="우승 스카이차" fill className="object-contain" priority />
        </div>
      </section>

      {/* ===== Process Section ===== */}
      <section id="services" className="bg-gray-50 section-padding">
        <div className="max-w-container">
          <div className="text-center mb-16">
            <span className="section-badge">서비스 절차</span>
            <h2 className="section-title">간편한 3단계로 시작하세요</h2>
          </div>

          <div className="grid md:grid-cols-5 gap-6 md:gap-4 items-start">
            {/* Step 1 */}
            <div className="process-step group">
              <div className="process-icon">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </div>
              <p className="font-bold text-gray-900 mb-2 text-lg">010-5811-5297 문의</p>
              <p className="text-sm text-gray-500 leading-relaxed">현장 상황과 필요한 작업 내용을 알려주세요. 가장 적합한 견적을 바로 추천해드립니다</p>
            </div>

            <div className="process-arrow pt-10">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </div>

            {/* Step 2 */}
            <div className="process-step group">
              <div className="process-icon">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <p className="font-bold text-gray-900 mb-2 text-lg">담당자 배정</p>
              <p className="text-sm text-gray-500 leading-relaxed">요청 내용을 바탕으로 전담 담당자가 배정됩니다. 신속한 소통으로 작업 준비를 완성합니다</p>
            </div>

            <div className="process-arrow pt-10">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </div>

            {/* Step 3 */}
            <div className="process-step group">
              <div className="process-icon">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.1-5.1m0 0L11.42 4.97m-5.1 5.1H21M3 21h18" />
                </svg>
              </div>
              <p className="font-bold text-gray-900 mb-2 text-lg">작업 진행</p>
              <p className="text-sm text-gray-500 leading-relaxed">안전 기준을 준수하며 계획된 일정에 맞춰 작업을 수행합니다. 높은 완성도와 만족도를 보장합니다</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== About Section ===== */}
      <section id="about" className="section-padding">
        <div className="max-w-container">
          {/* Work Photo */}
          <div className="relative h-[28rem] rounded-2xl overflow-hidden mb-16 group shadow-card">
            <Image src="/images/work-photo.jpg" alt="작업 현장" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end p-8 md:p-12">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-white text-lg font-semibold hover:text-accent transition-colors group/link"
              >
                Learn more about us
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left - Text */}
            <div>
              <span className="section-badge">회사 소개</span>
              <h2 className="section-title mb-6">
                높은 곳의 작업,<br />
                우승이 더 안전하게 만듭니다
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                우승 스카이차는 다양한 현장에 최적화된 스카이차·고소작업 장비를 제공합니다. 숙련된 전문 스탭이 직접 현장을 검토하고, 안전한 작업 진행을 위해 체계적으로 대응합니다. 신속한 출동과 높은 작업 완성도로 고객 만족을 최우선으로 하고 있습니다.
              </p>
            </div>

            {/* Right - Checklist */}
            <div className="space-y-4 md:pt-12">
              <div className="check-item">
                <div className="check-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-800 font-medium">경력과 자격을 갖춘 전문 스탭 운용</p>
              </div>
              <div className="check-item">
                <div className="check-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-800 font-medium">정기 점검된 안정적인 스카이차 보유</p>
              </div>
              <div className="check-item">
                <div className="check-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-800 font-medium">신속한 출동, 투명한 견적 안내</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ Section ===== */}
      <section id="faq" className="bg-gray-50 section-padding">
        <div className="max-w-container">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <span className="section-badge">FAQ</span>
              <h2 className="section-title mb-4">
                자주 묻는 질문을 모았습니다
              </h2>
              <p className="section-subtitle mx-auto">
                고객님들이 가장 많이 문의하시는 내용을 정리했습니다. 혹시 찾으시는 답변이 없다면 언제든지 문의해주세요.
              </p>
              <button
                onClick={() => scrollToSection('contact')}
                className="mt-4 text-primary font-semibold hover:text-primary-dark transition-colors inline-flex items-center gap-1"
              >
                문의하기
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>

            <div className="space-y-3">
              {faqItems.map((item, index) => (
                <div key={index} className="accordion-item">
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                    className="accordion-header w-full"
                  >
                    <span className="font-semibold text-left text-gray-900">{item.question}</span>
                    <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${expandedFAQ === index ? 'bg-primary text-white rotate-180' : 'bg-gray-100 text-gray-500'}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>
                  <div className="accordion-content" style={{ maxHeight: expandedFAQ === index ? '200px' : '0' }}>
                    <div className="accordion-body">{item.answer}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Reviews Section ===== */}
      <section id="reviews" className="bg-white section-padding overflow-hidden">
        <div className="max-w-container mb-14">
          <div className="text-center">
            <span className="section-badge">고객 후기</span>
            <h2 className="section-title mb-4">
              고객님들의 실제 후기를 소개합니다
            </h2>
            <p className="section-subtitle mx-auto">
              우승 스카이차를 이용해주신 고객님들의 경험을 바탕으로
              더 안전하고 신뢰할 수 있는 서비스를 만들어가고 있습니다.
            </p>
          </div>
        </div>

        <div className="marquee-container">
          <div className="marquee-track">
            {[...reviews, ...reviews, ...reviews, ...reviews].map((review, index) => (
              <div key={index} className="review-card">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="text-gray-700 text-sm leading-relaxed mb-5 flex-1">
                  &ldquo;{review.text}&rdquo;
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-blue-100">
                    <Image src={review.photo} alt={review.name} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{review.name}</p>
                    <p className="text-xs text-green-600 font-medium">Review on NAVER</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Contact Section ===== */}
      <section id="contact" className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-container relative z-10 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="text-white">
              <span className="inline-block text-sm font-medium bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full mb-6 tracking-wide text-blue-200">
                문의하기
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                함께 안전하고 완성도<br />
                높은 작업을 만들어가요!
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                스카이차가 필요한 작업이 있으신가요?<br />
                현장 상담부터 출동까지, 우승 스카이차가 빠르고 정확하게 도와드립니다.
              </p>

              <a
                href="tel:010-5811-5297"
                className="inline-flex items-center gap-3 text-2xl font-bold text-white hover:text-accent transition-colors"
              >
                <span className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </span>
                010-5811-5297
              </a>
            </div>

            <div className="bg-white/5 backdrop-blur-xl p-8 md:p-10 rounded-2xl border border-white/10">
              <h3 className="text-white text-xl font-bold mb-6">빠른 문의</h3>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    required
                    className="w-full px-5 py-3.5 bg-white/10 text-white rounded-xl border border-white/10 focus:border-primary focus:ring-2 focus:ring-primary/30 focus:outline-none placeholder-gray-400 transition-all"
                    placeholder="전화번호"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                    className="w-full px-5 py-3.5 bg-white/10 text-white rounded-xl border border-white/10 focus:border-primary focus:ring-2 focus:ring-primary/30 focus:outline-none placeholder-gray-400 transition-all"
                    placeholder="이메일"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full btn-accent py-3.5 rounded-xl text-base"
                >
                  문의하기
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="bg-gray-950 text-gray-400 py-10 border-t border-gray-800">
        <div className="max-w-container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 relative">
                <Image src="/images/logo.png" alt="로고" fill className="object-contain opacity-50" />
              </div>
              <span className="font-semibold text-gray-300">우승 스카이차</span>
            </div>
            <p className="text-sm">대표전화: 010-5811-5297</p>
            <p className="text-xs text-gray-500">&copy; 2024 우승 스카이차. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
