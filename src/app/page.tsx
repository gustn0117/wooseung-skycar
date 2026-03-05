'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import FadeIn from '@/components/FadeIn';

interface CasePreview {
  id: number;
  title: string;
  location: string;
  work_date: string | null;
  image_urls: string[];
}

function AnimatedCounter({ target, suffix = '', duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(target * eased));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Home() {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(0);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const [recentCases, setRecentCases] = useState<CasePreview[]>([]);

  useEffect(() => {
    fetch('/api/cases')
      .then(res => res.json())
      .then(data => setRecentCases((data as CasePreview[]).slice(0, 3)))
      .catch(() => {});
  }, []);

  const faqItems = [
    { question: "스카이차 기사님이 현장까지 함께 오시나요?", answer: "네, 모든 작업은 전문 스탭이 동행하여 안전하게 진행합니다. 현장 상황을 확인 후 최적의 작업 방식을 안내해드립니다." },
    { question: "견적은 어떻게 받나요?", answer: "전화 또는 문의 폼을 통해 현장 정보를 알려주시면, 담당자가 신속하게 연락드려 투명한 견적을 제시해드립니다." },
    { question: "어떤 결제 방식이 가능한가요?", answer: "현금, 계좌이체, 카드 결제 등 다양한 결제 방식이 가능합니다. 작업 완료 후 결제해주시면 됩니다." },
    { question: "당일 출동도 가능한가요?", answer: "네, 가능한 한 빠른 시간 내 출동하기 위해 노력하고 있습니다. 긴급 상황의 경우 전화로 먼저 연락주시기 바랍니다." },
  ];

  const reviews = [
    { name: "정은서", photo: "/images/review1.jpg", text: "높은 층 유리 청소가 필요해 문의했는데, 장비 상태도 좋고 작업도 매끄러웠습니다. 안전 장비를 철저히 착용하고 작업하셔서 믿음이 갔습니다.", role: "아파트 관리사무소" },
    { name: "이승훈", photo: "/images/review2.jpg", text: "통신선 점검 때문에 급히 연락드렸는데, 당일 바로 출동해주셔서 정말 도움됐습니다. 현장 상황 설명도 이해하기 쉽게 해주셔서 좋았어요.", role: "통신 설비 업체" },
    { name: "박지현", photo: "/images/review3.jpg", text: "외벽 청소 작업을 요청했는데 기사님이 너무 친절하고 전문적이셨어요. 작업 전후 비교 사진까지 보내주셔서 더 신뢰가 갔습니다.", role: "건물 관리 담당" },
    { name: "김도윤", photo: "/images/review4.jpg", text: "간판 철거 작업을 맡겼는데, 현장 파악부터 안전조치까지 정말 꼼꼼했습니다. 작업 속도도 빨라 부담 없이 진행할 수 있었어요.", role: "자영업자" },
  ];

  const services = [
    { icon: <><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" /></>, title: '간판 설치 · 철거', desc: '고층 건물 간판 설치 및 철거 작업을 안전하게 진행합니다.', color: 'from-blue-500 to-blue-600' },
    { icon: <><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></>, title: '외벽 청소', desc: '건물 외벽, 유리 청소 등 고소 클리닝 전문 작업을 제공합니다.', color: 'from-cyan-500 to-blue-500' },
    { icon: <><path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" /></>, title: 'CCTV · 통신 설비', desc: 'CCTV 설치, 통신선 점검 등 높은 곳의 설비 작업을 수행합니다.', color: 'from-violet-500 to-purple-600' },
    { icon: <><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.1-5.1m0 0L11.42 4.97m-5.1 5.1H22.54" /></>, title: '고소 작업', desc: '일반 사다리로는 불가능한 높이의 다양한 작업을 해결합니다.', color: 'from-amber-500 to-orange-500' },
    { icon: <><path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" /></>, title: '페인트 · 도장', desc: '외벽 도장, 방수 도포 등 고소 페인팅 작업을 전문으로 합니다.', color: 'from-rose-500 to-pink-600' },
    { icon: <><path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" /></>, title: '조명 · 전기', desc: '고소 조명 설치, 전기 배선 작업 등을 안전하게 처리합니다.', color: 'from-emerald-500 to-teal-500' },
  ];

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="overflow-hidden">
      <Header activePage="home" />

      {/* ===== Hero ===== */}
      <section className="gradient-blue text-white relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots" />
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-white/[0.03] rounded-full blur-3xl animate-float" />
          <div className="absolute -bottom-60 -left-40 w-[500px] h-[500px] bg-blue-400/[0.06] rounded-full blur-3xl animate-float-delayed" />
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
                <span className="text-gradient-gold">우승</span>이 해결합니다
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
                { number: 10, suffix: '+', label: '년 경력', sub: 'Years Experience', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /> },
                { number: 500, suffix: '+', label: '건 작업 완료', sub: 'Projects Done', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /> },
                { number: 24, suffix: 'h', label: '빠른 출동', sub: 'Quick Response', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /> },
                { number: 100, suffix: '%', label: '안전 작업', sub: 'Safety Record', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /> },
              ].map((stat, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 md:p-8 text-center border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.04)' }}>
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="w-10 h-10 rounded-xl bg-primary/[0.08] flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>{stat.icon}</svg>
                  </div>
                  <p className="stat-number mb-2.5">
                    <AnimatedCounter target={stat.number} suffix={stat.suffix} />
                  </p>
                  <p className="text-gray-800 text-sm font-semibold">{stat.label}</p>
                  <p className="text-gray-400 text-[11px] mt-1 tracking-wide uppercase">{stat.sub}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== Service Types ===== */}
      <section className="bg-gray-50 section-padding relative">
        <div className="absolute inset-0 pattern-diagonal" />
        <div className="max-w-container relative z-10">
          <FadeIn className="text-center mb-20">
            <span className="section-badge">Services</span>
            <h2 className="section-title mb-6">
              <span className="text-gradient">전문 서비스</span> 분야
            </h2>
            <p className="section-desc mx-auto">스카이차를 활용한 다양한 고소 작업 서비스를 제공합니다</p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div className="service-card p-8 h-full group cursor-default">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${svc.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-[-3deg] transition-all duration-300`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      {svc.icon}
                    </svg>
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-3">{svc.title}</h3>
                  <p className="text-gray-500 text-[15px]" style={{ lineHeight: '1.85' }}>{svc.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Process ===== */}
      <section id="services" className="bg-white section-padding relative">
        <div className="absolute inset-0 pattern-grid" />
        <div className="max-w-container relative z-10">
          <FadeIn className="text-center mb-20">
            <span className="section-badge">Service Process</span>
            <h2 className="section-title mb-6">간편한 <span className="text-gradient">3단계</span>로 시작하세요</h2>
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
      <section id="about" className="bg-gray-50 section-padding relative">
        <div className="absolute inset-0 gradient-mesh" />
        <div className="max-w-container relative z-10">
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
                <span className="text-gradient">우승</span>이 더 안전하게
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

      {/* ===== Why Choose Us / Trust ===== */}
      <section className="bg-white section-padding relative">
        <div className="absolute inset-0 gradient-mesh" />
        <div className="max-w-container relative z-10">
          <FadeIn className="text-center mb-20">
            <span className="section-badge">Why Choose Us</span>
            <h2 className="section-title mb-6"><span className="text-gradient">우승</span>을 선택해야 하는 이유</h2>
            <p className="section-desc mx-auto">단순한 장비 대여가 아닌, 전문적인 고소작업 파트너를 제공합니다</p>
          </FadeIn>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />, title: '안전 인증', desc: '모든 장비 법적 검사 통과, 안전 기준 100% 준수' },
              { icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />, title: '당일 출동', desc: '긴급 요청 시 당일 현장 출동 가능' },
              { icon: <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />, title: '투명한 견적', desc: '현장 확인 후 합리적인 가격 안내, 추가 비용 없음' },
              { icon: <><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></>, title: '전문 인력', desc: '다년간 경험의 전문 기사가 직접 작업 수행' },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="trust-card group">
                  <div className="w-14 h-14 rounded-2xl bg-primary/[0.07] flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/[0.12] transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      {item.icon}
                    </svg>
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-3">{item.title}</h3>
                  <p className="text-gray-500 text-sm" style={{ lineHeight: '1.8' }}>{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Recent Cases Preview ===== */}
      {recentCases.length > 0 && (
        <section className="bg-white section-padding relative">
          <div className="absolute inset-0 pattern-grid" />
          <div className="max-w-container relative z-10">
            <FadeIn className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
              <div>
                <span className="section-badge">Portfolio</span>
                <h2 className="section-title">최근 <span className="text-gradient">시공사례</span></h2>
              </div>
              <Link href="/cases" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all text-[15px] group">
                모든 사례 보기
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                </svg>
              </Link>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
              {recentCases.map((c, idx) => (
                <FadeIn key={c.id} delay={idx * 100} direction="up">
                  <Link href="/cases" className="case-card group block h-full">
                    {c.image_urls && c.image_urls.length > 0 ? (
                      <div className="relative h-56 overflow-hidden">
                        <Image src={c.image_urls[0]} alt={c.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="case-card-overlay">
                          <span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                            자세히 보기
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="h-56 bg-gray-100 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        {c.location && <span className="meta-badge meta-badge-location text-[11px]">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                          </svg>
                          {c.location}
                        </span>}
                        {c.work_date && <span className="meta-badge meta-badge-date text-[11px]">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                          </svg>
                          {c.work_date}
                        </span>}
                      </div>
                      <h3 className="font-bold text-gray-900 text-[17px] group-hover:text-primary transition-colors">{c.title}</h3>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== FAQ ===== */}
      <section id="faq" className="bg-gray-50 section-padding relative">
        <div className="absolute inset-0 gradient-mesh" />
        <div className="max-w-container relative z-10">
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
            <h2 className="section-title mb-6">고객님들의 <span className="text-gradient">실제 후기</span></h2>
            <p className="section-desc mx-auto">
              우승 스카이차를 이용해주신 고객님들의 생생한 경험담입니다.
            </p>
          </div>
        </FadeIn>

        <div className="marquee-container mb-6">
          <div className="marquee-track">
            {[...reviews, ...reviews, ...reviews, ...reviews].map((review, index) => (
              <div key={index} className="review-card">
                <div className="text-primary/10 mb-4">
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609L9.978 5.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H0z" />
                  </svg>
                </div>
                <div className="flex gap-0.5 mb-4">
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
                    <p className="text-[11px] text-gray-400 mt-0.5">{review.role}</p>
                  </div>
                  <div className="ml-auto">
                    <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-full border border-green-100">NAVER</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reverse direction row */}
        <div className="marquee-container">
          <div className="marquee-track-reverse">
            {[...reviews.slice().reverse(), ...reviews.slice().reverse(), ...reviews.slice().reverse(), ...reviews.slice().reverse()].map((review, index) => (
              <div key={index} className="review-card">
                <div className="text-primary/10 mb-4">
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609L9.978 5.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H0z" />
                  </svg>
                </div>
                <div className="flex gap-0.5 mb-4">
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
                    <p className="text-[11px] text-gray-400 mt-0.5">{review.role}</p>
                  </div>
                  <div className="ml-auto">
                    <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-full border border-green-100">NAVER</span>
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
        <div className="absolute inset-0 pattern-dots opacity-50" />
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
                  <span className="w-16 h-16 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center group-hover:bg-primary/30 transition-colors relative pulse-ring">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </span>
                  <span className="text-2xl md:text-3xl font-extrabold text-white group-hover:text-accent transition-colors tracking-tight">010-5811-5297</span>
                </a>
              </div>
            </FadeIn>

            <FadeIn direction="right" delay={150}>
              <div className="glass-card p-10 md:p-12 rounded-3xl">
                <h3 className="text-white text-xl font-bold mb-2">빠른 문의</h3>
                <p className="text-gray-500 text-sm mb-8" style={{ lineHeight: '1.7' }}>연락처를 남겨주시면 빠르게 연락드립니다</p>
                <form onSubmit={(e) => { e.preventDefault(); setFormData({ name: '', phone: '', email: '', message: '' }); alert('문의가 접수되었습니다!'); }} className="space-y-4">
                  <input
                    type="text" name="name" value={formData.name} onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))} required
                    className="w-full px-5 py-4 bg-white/[0.06] text-white rounded-2xl border border-white/[0.08] focus:border-primary focus:ring-2 focus:ring-primary/30 focus:outline-none placeholder-gray-500 transition-all text-[16px]"
                    placeholder="이름 / 업체명"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="tel" name="phone" value={formData.phone} onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))} required
                      className="w-full px-5 py-4 bg-white/[0.06] text-white rounded-2xl border border-white/[0.08] focus:border-primary focus:ring-2 focus:ring-primary/30 focus:outline-none placeholder-gray-500 transition-all text-[16px]"
                      placeholder="전화번호"
                    />
                    <input
                      type="email" name="email" value={formData.email} onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                      className="w-full px-5 py-4 bg-white/[0.06] text-white rounded-2xl border border-white/[0.08] focus:border-primary focus:ring-2 focus:ring-primary/30 focus:outline-none placeholder-gray-500 transition-all text-[16px]"
                      placeholder="이메일 (선택)"
                    />
                  </div>
                  <textarea
                    name="message" value={formData.message} onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))} rows={3}
                    className="w-full px-5 py-4 bg-white/[0.06] text-white rounded-2xl border border-white/[0.08] focus:border-primary focus:ring-2 focus:ring-primary/30 focus:outline-none placeholder-gray-500 transition-all text-[16px] resize-none"
                    placeholder="작업 내용을 간단히 적어주세요 (선택)"
                  />
                  <button type="submit" className="w-full btn-accent py-4 rounded-2xl text-[16px] mt-1 flex items-center justify-center gap-2">
                    문의하기
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                    </svg>
                  </button>
                </form>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ===== CTA Banner ===== */}
      <section className="gradient-blue relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots" />
        <div className="absolute inset-0">
          <div className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-white/[0.04] rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] bg-blue-400/[0.06] rounded-full blur-3xl" />
        </div>
        <FadeIn className="max-w-container py-20 md:py-28 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mb-4" style={{ lineHeight: '1.3' }}>
                지금 바로 전문가와 상담하세요
              </h2>
              <p className="text-blue-100/60 text-lg">연중무휴 · 당일 출동 · 무료 현장 상담</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a href="tel:010-5811-5297" className="inline-flex items-center gap-3 btn-accent px-10 py-4 rounded-2xl text-lg whitespace-nowrap">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                010-5811-5297
              </a>
              <Link href="/cases" className="inline-flex items-center gap-2 btn-outline-white px-8 py-4 rounded-2xl text-[16px] whitespace-nowrap">
                시공사례 보기
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ===== Footer ===== */}
      <footer className="bg-gray-950 border-t border-white/5">
        <div className="max-w-container py-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
            {/* Company info */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-9 h-9 relative">
                  <Image src="/images/logo.png" alt="로고" fill className="object-contain opacity-60" />
                </div>
                <span className="font-bold text-white text-lg tracking-tight">우승스카이차</span>
              </div>
              <p className="footer-text mb-6">
                안전하고 전문적인 고소작업 서비스를 제공하는 스카이차 전문 업체입니다.
              </p>
              <a href="tel:010-5811-5297" className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:text-blue-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                010-5811-5297
              </a>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="footer-heading">바로가기</h4>
              <ul className="space-y-3">
                <li><Link href="/" className="footer-link text-sm">홈</Link></li>
                <li><Link href="/about" className="footer-link text-sm">회사소개</Link></li>
                <li><Link href="/cases" className="footer-link text-sm">시공사례</Link></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="footer-heading">서비스</h4>
              <ul className="space-y-3">
                <li><span className="footer-text">간판 설치 · 철거</span></li>
                <li><span className="footer-text">외벽 청소</span></li>
                <li><span className="footer-text">CCTV · 통신 설비</span></li>
                <li><span className="footer-text">고소 작업</span></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="footer-heading">연락처</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2.5 text-sm text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  <span className="text-gray-300 font-medium">010-5811-5297</span>
                </li>
                <li className="flex items-start gap-2.5 text-sm text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  연중무휴 · 빠른 출동
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[11px] text-gray-600 tracking-wide">&copy; 2025 우승 스카이차. All rights reserved.</p>
            <div className="flex items-center gap-1">
              <span className="text-[11px] text-gray-700">Powered by</span>
              <span className="text-[11px] text-gray-500 font-medium">Next.js</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
