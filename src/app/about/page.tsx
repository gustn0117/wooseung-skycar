import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="overflow-hidden">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <nav className="max-w-container flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 relative">
              <Image
                src="/images/logo.png"
                alt="우승 스카이차 로고"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-lg font-bold text-gray-900">우승스카이차</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/about"
              className="text-primary font-semibold transition-colors"
            >
              회사소개
            </Link>
            <Link
              href="/#services"
              className="text-gray-700 hover:text-primary transition-colors"
            >
              서비스 안내
            </Link>
            <Link
              href="/#contact"
              className="text-gray-700 hover:text-primary transition-colors"
            >
              문의하기
            </Link>
          </div>

          <a
            href="tel:010-5811-5297"
            className="text-primary font-semibold hover:text-blue-700 transition-colors"
          >
            010-5811-5297
          </a>
        </nav>
      </header>

      {/* Hero Banner */}
      <section className="gradient-blue text-white py-16 md:py-24">
        <div className="max-w-container flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <p className="text-lg mb-2 opacity-90">빠른 출동, 전문 장비, 숙련된 스탭</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">회사 소개</h1>
            <p className="text-lg opacity-90 max-w-xl">
              우승 스카이차는 어떤 현장에서도 최고의 결과를 만듭니다
            </p>
          </div>
          <div className="flex-1 hidden md:block relative h-80">
            <Image
              src="/images/truck.png"
              alt="우승 스카이차"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="section-padding">
        <div className="max-w-container">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            안전한 작업, 정확한 결과
          </h2>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            우승 스카이차가 책임집니다
          </h2>
          <p className="text-primary font-semibold mb-8">
            정확한 현장 분석과 빠른 대응으로 고객에게 최상의 결과를 약속드립니다
          </p>

          <div className="space-y-6 text-gray-700 text-lg leading-relaxed max-w-4xl">
            <p>
              우승 스카이차는 다양한 현장에서 요구되는 고소작업을
              더 안전하게, 더 전문적으로, 더 빠르게 해결하기 위해 만들어진 전문 스카이차 서비스 기업입니다.
            </p>
            <p>
              다년간의 현장 경험을 갖춘 기사들이 직접 장비를 운용하며,
              각 작업 환경에 최적화된 솔루션을 제안해 고객의 시간을 아끼고 작업 품질을 높이는 데 집중합니다.
            </p>
            <p>
              우리는 단순히 장비만 제공하는 것이 아니라<br />
              <span className="font-semibold text-gray-900">현장 점검 → 맞춤 장비 선정 → 안전 작업 수행 → 결과 확인</span><br />
              모든 과정을 체계적으로 관리하여 높은 신뢰도를 유지합니다.
            </p>
            <p>
              고객이 믿고 맡길 수 있는 파트너가 되기 위해
              장비 점검·안전 교육·현장 대응 능력 향상에 항상 최선을 다하고 있으며,
              모든 작업에서 <span className="font-semibold text-gray-900">안전이 최우선</span>이라는 원칙을 지켜가고 있습니다.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-400 py-8">
        <div className="max-w-container text-center">
          <p className="mb-2">우승 스카이차</p>
          <p className="text-sm">
            대표전화: 010-5811-5297
          </p>
          <p className="text-xs mt-4">© 2024 우승 스카이차. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
