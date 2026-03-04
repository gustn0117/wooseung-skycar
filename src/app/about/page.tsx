import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  const steps = [
    { label: '현장 점검', desc: '현장을 직접 방문하여 작업 환경과 조건을 꼼꼼히 분석합니다.' },
    { label: '맞춤 장비 선정', desc: '현장 조건에 맞는 최적의 스카이차와 장비를 선정합니다.' },
    { label: '안전 작업 수행', desc: '안전 수칙을 철저히 준수하며 계획대로 작업을 진행합니다.' },
    { label: '결과 확인', desc: '작업 완료 후 고객과 함께 결과를 확인하고 마무리합니다.' },
  ];

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
            <Link href="/about" className="nav-link text-primary font-semibold after:w-full">회사소개</Link>
            <Link href="/#services" className="nav-link">서비스 안내</Link>
            <Link href="/#contact" className="nav-link">문의하기</Link>
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

      {/* ===== Hero Banner ===== */}
      <section className="gradient-blue text-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-container flex flex-col md:flex-row items-center gap-8 py-20 md:py-28 relative z-10">
          <div className="flex-1 animate-fade-in-up">
            <span className="inline-block text-sm font-medium bg-white/15 backdrop-blur-sm px-4 py-1.5 rounded-full mb-6 tracking-wide">
              빠른 출동, 전문 장비, 숙련된 스탭
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">회사 소개</h1>
            <p className="text-lg md:text-xl opacity-90 max-w-lg leading-relaxed">
              우승 스카이차는 어떤 현장에서도 최고의 결과를 만듭니다
            </p>
          </div>
          <div className="flex-1 hidden md:block relative h-80 animate-slide-in-right">
            <Image src="/images/truck.png" alt="우승 스카이차" fill className="object-contain drop-shadow-2xl" priority />
          </div>
        </div>
      </section>

      {/* ===== About Content ===== */}
      <section className="section-padding">
        <div className="max-w-container">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Left */}
            <div>
              <span className="section-badge">About Us</span>
              <h2 className="section-title mb-4">
                안전한 작업, 정확한 결과<br />
                우승 스카이차가 책임집니다
              </h2>
              <p className="text-primary font-semibold text-lg">
                정확한 현장 분석과 빠른 대응으로 고객에게 최상의 결과를 약속드립니다
              </p>
            </div>

            {/* Right */}
            <div className="space-y-5 text-gray-600 text-lg leading-relaxed">
              <p>
                우승 스카이차는 다양한 현장에서 요구되는 고소작업을
                더 안전하게, 더 전문적으로, 더 빠르게 해결하기 위해 만들어진 전문 스카이차 서비스 기업입니다.
              </p>
              <p>
                다년간의 현장 경험을 갖춘 기사들이 직접 장비를 운용하며,
                각 작업 환경에 최적화된 솔루션을 제안해 고객의 시간을 아끼고 작업 품질을 높이는 데 집중합니다.
              </p>
              <p>
                고객이 믿고 맡길 수 있는 파트너가 되기 위해
                장비 점검·안전 교육·현장 대응 능력 향상에 항상 최선을 다하고 있으며,
                모든 작업에서 <span className="font-semibold text-gray-900">안전이 최우선</span>이라는 원칙을 지켜가고 있습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Process Flow ===== */}
      <section className="bg-gray-50 section-padding">
        <div className="max-w-container">
          <div className="text-center mb-16">
            <span className="section-badge">작업 프로세스</span>
            <h2 className="section-title">체계적인 4단계 프로세스</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="relative bg-white rounded-2xl p-8 shadow-soft border border-gray-100 hover:shadow-card transition-shadow duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-lg mb-5 group-hover:scale-110 transition-transform">
                  {index + 1}
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{step.label}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 text-gray-300 z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="bg-primary section-padding">
        <div className="max-w-container text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">작업이 필요하신가요?</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
            현장 상담부터 출동까지, 우승 스카이차가 빠르고 정확하게 도와드립니다.
          </p>
          <a
            href="tel:010-5811-5297"
            className="inline-flex items-center gap-2 btn-accent px-10 py-4 rounded-xl text-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            010-5811-5297
          </a>
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
