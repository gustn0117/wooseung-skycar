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
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ phone: '', email: '' });
    alert('문의가 접수되었습니다. 감사합니다!');
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
              className="text-gray-700 hover:text-primary transition-colors"
            >
              회사소개
            </Link>
            <button
              onClick={() => scrollToSection('services')}
              className="text-gray-700 hover:text-primary transition-colors"
            >
              서비스 안내
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-gray-700 hover:text-primary transition-colors"
            >
              문의하기
            </button>
          </div>

          <a
            href="tel:010-5811-5297"
            className="text-primary font-semibold hover:text-blue-700 transition-colors"
          >
            010-5811-5297
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="hero" className="gradient-blue text-white section-padding relative overflow-hidden">
        <div className="max-w-container flex items-center justify-between gap-8">
          <div className="flex-1">
            <p className="text-lg md:text-xl mb-2 opacity-90">신속한 대응, 완벽한 작업</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              우승 스카이차
            </h1>
            <p className="text-lg opacity-90 mb-8 max-w-xl">
              우승 스카이차는 스카이차·고소작업차 전문 대여 업체로 어떤 환경에서도 안전하고 정확한 작업을 보장합니다
            </p>
            <a
              href="tel:010-5811-5297"
              className="inline-block btn-accent px-8 py-3 rounded-lg font-semibold"
            >
              지금 문의하기
            </a>
          </div>

          <div className="flex-1 hidden md:block relative h-96">
            <Image
              src="/images/truck.png"
              alt="우승 스카이차"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Mobile truck image */}
        <div className="md:hidden relative h-64 mt-8">
          <Image
            src="/images/truck.png"
            alt="우승 스카이차"
            fill
            className="object-contain"
            priority
          />
        </div>
      </section>

      {/* Process Section */}
      <section id="services" className="bg-gray-50 section-padding">
        <div className="max-w-container">
          <div className="grid md:grid-cols-5 gap-4 md:gap-8 items-start">
            {/* Step 1 */}
            <div className="process-step">
              <div className="process-icon">
                <span className="text-2xl">📞</span>
              </div>
              <p className="text-center font-semibold text-gray-800 mb-2">010-5811-5297 문의</p>
              <p className="text-center text-sm text-gray-500">현장 상황과 필요한 작업 내용을 알려주세요. 가장 적합한 견적을 바로 추천해드립니다</p>
            </div>

            <div className="hidden md:flex items-center justify-center text-2xl text-gray-400 pt-8">→</div>

            {/* Step 2 */}
            <div className="process-step">
              <div className="process-icon">
                <span className="text-2xl">👤</span>
              </div>
              <p className="text-center font-semibold text-gray-800 mb-2">담당자 배정</p>
              <p className="text-center text-sm text-gray-500">요청 내용을 바탕으로 전담 담당자가 배정됩니다. 신속한 소통으로 작업 준비를 완성합니다</p>
            </div>

            <div className="hidden md:flex items-center justify-center text-2xl text-gray-400 pt-8">→</div>

            {/* Step 3 */}
            <div className="process-step">
              <div className="process-icon">
                <span className="text-2xl">⚙️</span>
              </div>
              <p className="text-center font-semibold text-gray-800 mb-2">작업 진행</p>
              <p className="text-center text-sm text-gray-500">안전 기준을 준수하며 계획된 일정에 맞춰 작업을 수행합니다. 높은 완성도와 만족도를 보장합니다</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding">
        <div className="max-w-container">
          {/* Work Photo with Overlay */}
          <div className="relative h-96 rounded-lg overflow-hidden mb-12 group">
            <Image
              src="/images/work-photo.jpg"
              alt="작업 현장"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/20 flex items-end justify-end p-8">
              <Link
                href="/about"
                className="text-white text-lg font-semibold hover:text-accent transition-colors"
              >
                Learn more about us →
              </Link>
            </div>
          </div>

          {/* About Content */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              높은 곳의 작업,
            </h2>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              우승이 더 안전하게 만듭니다
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-3xl">
              우승 스카이차는 다양한 현장에 최적화된 스카이차·고소작업 장비를 제공합니다. 숙련된 전문 스탭이 직접 현장을 검토하고, 안전한 작업 진행을 위해 체계적으로 대응합니다. 신속한 출동과 높은 작업 완성도로 고객 만족을 최우선으로 하고 있습니다.
            </p>

            {/* Bullet Points */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-primary text-2xl mt-1">✓</span>
                <p className="text-gray-700 text-lg">경력과 자격을 갖춘 전문 스탭 운용</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary text-2xl mt-1">✓</span>
                <p className="text-gray-700 text-lg">정기 점검된 안정적인 스카이차 보유</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary text-2xl mt-1">✓</span>
                <p className="text-gray-700 text-lg">신속한 출동, 투명한 견적 안내</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="bg-gray-50 section-padding">
        <div className="max-w-container">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-2">
              자주 묻는
            </h2>
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
              질문을 모았습니다
            </h2>
            <p className="text-center text-gray-500 mb-4">
              고객님들이 가장 많이 문의하시는 내용을 정리했습니다. 혹시 찾으시는 답변이 없다면 언제든지 문의해주세요.
            </p>
            <div className="text-center mb-12">
              <button
                onClick={() => scrollToSection('contact')}
                className="text-primary font-semibold hover:text-blue-700 transition-colors"
              >
                문의하기
              </button>
            </div>

            <div className="space-y-2">
              {faqItems.map((item, index) => (
                <div key={index} className="accordion-item bg-white">
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                    className="accordion-header w-full"
                  >
                    <span className="font-semibold text-left text-gray-900">{item.question}</span>
                    <span className={`transition-transform duration-300 ${expandedFAQ === index ? 'rotate-180' : ''}`}>
                      ▼
                    </span>
                  </button>

                  <div
                    className="accordion-content"
                    style={{
                      maxHeight: expandedFAQ === index ? '200px' : '0',
                    }}
                  >
                    <div className="accordion-body">
                      {item.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="bg-blue-50 section-padding overflow-hidden">
        <div className="max-w-container mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            고객님들의 실제 후기를 소개합니다
          </h2>
          <p className="text-center text-gray-500 max-w-xl mx-auto">
            우승 스카이차를 이용해주신 고객님들의 경험을 바탕으로
            더 안전하고 신뢰할 수 있는 서비스를 만들어가고 있습니다.
          </p>
        </div>

        {/* Infinite scrolling marquee */}
        <div className="marquee-container">
          <div className="marquee-track">
            {[...reviews, ...reviews, ...reviews, ...reviews].map((review, index) => (
              <div key={index} className="review-card">
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  {review.text}
                </p>

                <div className="flex items-center gap-3 mt-auto">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={review.photo}
                      alt={review.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{review.name}</p>
                    <p className="text-xs text-blue-600">Review on NAVER</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact/CTA Section */}
      <section id="contact" className="bg-gray-900 text-white section-padding">
        <div className="max-w-container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Side - CTA Text */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                함께 안전하고 완성도
              </h2>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                높은 작업을 만들어가요!
              </h2>
              <p className="text-gray-300 text-lg">
                스카이차가 필요한 작업이 있으신가요?<br />
                현장 상담부터 출동까지, 우승 스카이차가 빠르고 정확하게 도와드립니다.
              </p>
            </div>

            {/* Right Side - Contact Form */}
            <div className="bg-gray-800 p-8 rounded-lg">
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700 text-white rounded border border-gray-600 focus:border-primary focus:outline-none"
                    placeholder="010-5811-5297"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700 text-white rounded border border-gray-600 focus:border-primary focus:outline-none"
                    placeholder="your@email.com"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-accent py-3 rounded font-semibold transition-colors"
                >
                  문의하기
                </button>
              </form>
            </div>
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
