'use client';

import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import FadeIn from '@/components/FadeIn';

export default function AboutPage() {
  const steps = [
    { label: '현장 점검', desc: '현장을 직접 방문하여 작업 환경과 조건을 꼼꼼히 분석합니다.', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /> },
    { label: '맞춤 장비 선정', desc: '현장 조건에 맞는 최적의 스카이차와 장비를 선정합니다.', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.1-5.1m0 0L11.42 4.97m-5.1 5.1H22.54" /> },
    { label: '안전 작업 수행', desc: '안전 수칙을 철저히 준수하며 계획대로 작업을 진행합니다.', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /> },
    { label: '결과 확인', desc: '작업 완료 후 고객과 함께 결과를 확인하고 마무리합니다.', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /> },
  ];

  const values = [
    { icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />, title: '안전 최우선', desc: '모든 작업에서 안전을 가장 중요한 가치로 여기며, 철저한 안전 수칙을 준수합니다.', color: 'from-blue-500 to-blue-600' },
    { icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />, title: '신속한 대응', desc: '긴급한 작업 요청에도 빠르게 대응하여 고객의 시간을 아낍니다.', color: 'from-amber-500 to-orange-500' },
    { icon: <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />, title: '전문 역량', desc: '다년간의 현장 경험을 바탕으로 최적의 솔루션을 제공합니다.', color: 'from-emerald-500 to-teal-500' },
  ];

  const capabilities = [
    { title: '최대 작업 높이', value: '45m', desc: '고층 건물도 문제없이', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" /> },
    { title: '장비 정기 점검', value: '매월', desc: '안전한 장비 상태 유지', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.1-5.1m0 0L11.42 4.97m-5.1 5.1H22.54" /> },
    { title: '출동 가능 범위', value: '전국', desc: '어디든 빠르게 출동', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />, icon2: <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /> },
    { title: '보험 가입', value: '완비', desc: '만일의 상황에 대비', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /> },
  ];

  return (
    <main className="overflow-hidden">
      <Header activePage="about" />

      {/* ===== Hero ===== */}
      <section className="gradient-blue text-white relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots" />
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-white/[0.03] rounded-full blur-3xl animate-float" />
          <div className="absolute -bottom-60 -left-60 w-[600px] h-[600px] bg-blue-400/[0.06] rounded-full blur-3xl animate-float-delayed" />
        </div>

        <div className="max-w-container flex flex-col lg:flex-row items-center gap-14 pt-20 pb-32 md:pt-28 md:pb-44 relative z-10">
          <div className="flex-1">
            <FadeIn>
              <span className="inline-flex items-center gap-2 text-sm font-medium bg-white/[0.12] backdrop-blur-sm px-5 py-2.5 rounded-full mb-8 border border-white/10">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                빠른 출동, 전문 장비, 숙련된 스탭
              </span>
            </FadeIn>
            <FadeIn delay={100}>
              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold mb-6" style={{ lineHeight: '1.15' }}>
                <span className="text-gradient-gold">회사</span> 소개
              </h1>
            </FadeIn>
            <FadeIn delay={200}>
              <p className="text-lg md:text-xl text-blue-100/80 max-w-lg mb-12" style={{ lineHeight: '1.85' }}>
                우승 스카이차는 어떤 현장에서도 최고의 결과를 만듭니다
              </p>
            </FadeIn>
            <FadeIn delay={300}>
              <div className="flex items-center gap-8">
                {[
                  { num: '10+', label: '년 경력' },
                  { num: '500+', label: '건 완료' },
                  { num: '100%', label: '안전 작업' },
                ].map((s, i) => (
                  <div key={i} className={i > 0 ? 'border-l border-white/15 pl-8' : ''}>
                    <p className="text-2xl md:text-3xl font-extrabold">{s.num}</p>
                    <p className="text-blue-200/60 text-sm mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
          <FadeIn direction="right" delay={200} className="flex-1 hidden lg:block relative h-80">
            <Image src="/images/truck.png" alt="우승 스카이차" fill className="object-contain drop-shadow-2xl" priority />
          </FadeIn>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60V30C240 0 480 0 720 30C960 60 1200 60 1440 30V60H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ===== About Content ===== */}
      <section className="section-padding">
        <div className="max-w-container">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-28 items-start">
            <FadeIn direction="left">
              <span className="section-badge">About Us</span>
              <h2 className="section-title mb-7">
                안전한 작업, 정확한 결과<br />
                <span className="text-gradient">우승 스카이차</span>가 책임집니다
              </h2>
              <div className="deco-line mb-8" />
              <p className="text-primary font-bold text-lg mb-6" style={{ lineHeight: '1.8' }}>
                정확한 현장 분석과 빠른 대응으로<br className="hidden md:block" />
                고객에게 최상의 결과를 약속드립니다
              </p>
              <Link href="/cases" className="inline-flex items-center gap-2 text-primary font-semibold text-[15px] hover:gap-3 transition-all group">
                시공사례 보러가기
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                </svg>
              </Link>
            </FadeIn>

            <FadeIn direction="right" delay={150}>
              <div className="space-y-8 text-gray-600 text-[17px]" style={{ lineHeight: '2.05' }}>
                <p>
                  우승 스카이차는 다양한 현장에서 요구되는 고소작업을
                  더 안전하게, 더 전문적으로, 더 빠르게 해결하기 위해 만들어진 전문 스카이차 서비스 기업입니다.
                </p>
                <p>
                  다년간의 현장 경험을 갖춘 기사들이 직접 장비를 운용하며,
                  각 작업 환경에 최적화된 솔루션을 제안해 고객의 시간을 아끼고 작업 품질을 높이는 데 집중합니다.
                </p>
                <div className="bg-gradient-to-r from-blue-50 to-blue-50/30 rounded-2xl p-7 border border-blue-100/50">
                  <p className="text-gray-700 font-medium">
                    고객이 믿고 맡길 수 있는 파트너가 되기 위해
                    장비 점검·안전 교육·현장 대응 능력 향상에 항상 최선을 다하고 있으며,
                    모든 작업에서 <span className="font-bold text-primary">안전이 최우선</span>이라는 원칙을 지켜가고 있습니다.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ===== Equipment & Capabilities ===== */}
      <section className="bg-gray-50 section-padding relative">
        <div className="absolute inset-0 pattern-diagonal" />
        <div className="max-w-container relative z-10">
          <FadeIn className="text-center mb-20">
            <span className="section-badge">Equipment</span>
            <h2 className="section-title mb-6">장비 및 <span className="text-gradient">역량</span></h2>
            <p className="section-desc mx-auto">철저한 장비 관리와 전문 인력으로 최상의 작업 품질을 보장합니다</p>
          </FadeIn>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((cap, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="bg-white rounded-2xl p-8 text-center border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group h-full" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="w-12 h-12 rounded-2xl bg-primary/[0.08] flex items-center justify-center mx-auto mb-5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      {cap.icon}
                      {cap.icon2}
                    </svg>
                  </div>
                  <p className="text-xs text-gray-400 font-medium mb-2 uppercase tracking-wide">{cap.title}</p>
                  <p className="number-highlight mb-2">{cap.value}</p>
                  <p className="text-gray-500 text-sm">{cap.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Values ===== */}
      <section className="bg-white section-padding relative">
        <div className="absolute inset-0 gradient-mesh" />
        <div className="max-w-container relative z-10">
          <FadeIn className="text-center mb-20">
            <span className="section-badge">Core Values</span>
            <h2 className="section-title mb-6">우승 스카이차가 중요하게 여기는 것</h2>
            <p className="section-desc mx-auto">모든 현장에서 지켜나가는 3가지 핵심 가치</p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((val, i) => (
              <FadeIn key={i} delay={i * 150}>
                <div className="bg-white rounded-3xl p-10 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full relative overflow-hidden group" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.04)' }}>
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${val.color} flex items-center justify-center mb-7 shadow-lg group-hover:scale-110 group-hover:rotate-[-3deg] transition-all duration-300`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      {val.icon}
                    </svg>
                  </div>
                  <h3 className="font-bold text-gray-900 text-xl mb-4">{val.title}</h3>
                  <p className="text-gray-500 text-[16px]" style={{ lineHeight: '1.95' }}>{val.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Process Flow ===== */}
      <section className="bg-gray-50 section-padding relative">
        <div className="absolute inset-0 pattern-grid" />
        <div className="max-w-container relative z-10">
          <FadeIn className="text-center mb-20">
            <span className="section-badge">Work Process</span>
            <h2 className="section-title mb-6">체계적인 <span className="text-gradient">4단계</span> 프로세스</h2>
            <p className="section-desc mx-auto">현장 점검부터 최종 확인까지, 빈틈없는 작업 과정</p>
          </FadeIn>

          {/* Timeline process */}
          <div className="relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-[60px] left-[calc(12.5%+28px)] right-[calc(12.5%+28px)] h-[2px] bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />

            <div className="grid md:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <FadeIn key={index} delay={index * 120}>
                  <div className="relative flex flex-col items-center text-center group">
                    <div className="relative z-10 w-[60px] h-[60px] rounded-full bg-white border-[3px] border-primary flex items-center justify-center mb-6 shadow-lg group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                      <span className="text-primary font-extrabold text-lg group-hover:text-white transition-colors">0{index + 1}</span>
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 w-full" style={{ boxShadow: '0 1px 6px rgba(0,0,0,0.03)' }}>
                      <div className="w-10 h-10 rounded-xl bg-primary/[0.08] flex items-center justify-center mx-auto mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          {step.icon}
                        </svg>
                      </div>
                      <h3 className="font-bold text-gray-900 text-lg mb-3">{step.label}</h3>
                      <p className="text-gray-500 text-[14px]" style={{ lineHeight: '1.85' }}>{step.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
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
            <Link href="/cases" className="inline-flex items-center gap-2 btn-outline-white px-8 py-4 rounded-2xl text-[16px]">
              시공사례 보러가기
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* ===== Footer ===== */}
      <footer className="bg-gray-950 border-t border-white/5">
        <div className="max-w-container py-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
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

            <div>
              <h4 className="footer-heading">바로가기</h4>
              <ul className="space-y-3">
                <li><Link href="/" className="footer-link text-sm">홈</Link></li>
                <li><Link href="/cases" className="footer-link text-sm">시공사례</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="footer-heading">서비스</h4>
              <ul className="space-y-3">
                <li><span className="footer-text">간판 설치 · 철거</span></li>
                <li><span className="footer-text">외벽 청소</span></li>
                <li><span className="footer-text">CCTV · 통신 설비</span></li>
                <li><span className="footer-text">고소 작업</span></li>
              </ul>
            </div>

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
