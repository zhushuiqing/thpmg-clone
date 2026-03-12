import Link from 'next/link';
import { StructuredData } from '@/components/StructuredData';
import FadeIn from '@/components/FadeIn';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const isZh = locale === 'zh';

  return {
    title: isZh ? 'THPMG - 专业服务，值得信赖' : 'THPMG - Professional Services',
    description: isZh
      ? 'THPMG官方网站首页 - 提供专业的项目管理咨询服务，15年行业经验，100+合作企业'
      : 'THPMG Official Homepage - Professional project management consulting services with 15+ years of experience and 100+ partner companies',
    alternates: {
      canonical: `${baseUrl}/${locale}`,
    },
  };
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Structured Data */}
      <StructuredData
        type="Organization"
        data={{
          "@id": "https://example.com/#organization",
          "name": "THPMG",
          "url": "https://example.com",
          "logo": {
            "@type": "ImageObject",
            "url": "https://example.com/logo.png"
          },
          "sameAs": [
            "https://weibo.com/thpmg",
            "https://github.com/thpmg"
          ]
        }}
      />
      <StructuredData
        type="WebSite"
        data={{
          "@id": "https://example.com/#website",
          "url": "https://example.com",
          "name": "THPMG",
          "description": "Professional project management consulting services",
          "publisher": {
            "@id": "https://example.com/#organization"
          }
        }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center">
            <FadeIn>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                专业服务，值得信赖
              </h1>
            </FadeIn>
            <FadeIn delay={200}>
              <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                我们致力于为客户提供最优质的专业服务，以卓越的品质和专业的态度赢得客户的信任与支持。
              </p>
            </FadeIn>
            <FadeIn delay={300}>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="/services"
                  className="inline-block px-8 py-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                >
                  了解我们的服务
                </Link>
                <Link
                  href="/contact"
                  className="inline-block px-8 py-4 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition-colors border-2 border-blue-600"
                >
                  联系我们
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white rounded-t-[50%]"></div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              关于我们
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                公司简介
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                我们是一家专业的企业，拥有多年行业经验，致力于为客户提供高质量的解决方案。我们的团队由经验丰富的专业人士组成，始终坚持以客户为中心的服务理念。
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                通过不断的技术创新和管理优化，我们已经发展成为行业内具有重要影响力的企业。我们注重品质，追求卓越，努力为客户创造更大的价值。
              </p>
              <Link
                href="/about"
                className="inline-block mt-4 text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                了解更多 →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">15+</div>
                <div className="text-gray-600">年经验</div>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <div className="text-3xl font-bold text-green-600 mb-2">100+</div>
                <div className="text-gray-600">合作企业</div>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg">
                <div className="text-3xl font-bold text-purple-600 mb-2">98%</div>
                <div className="text-gray-600">客户满意度</div>
              </div>
              <div className="bg-orange-50 p-6 rounded-lg">
                <div className="text-3xl font-bold text-orange-600 mb-2">50+</div>
                <div className="text-gray-600">专业团队</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              我们的服务
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              我们提供全面的专业服务，满足客户的多样化需求
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: '专业咨询',
                description: '提供专业的咨询服务，为客户量身定制解决方案',
                icon: '💡',
              },
              {
                title: '技术支持',
                description: '强大的技术团队，为客户提供全方位的技术支持',
                icon: '🛠️',
              },
              {
                title: '定制开发',
                description: '根据客户需求进行定制化开发，确保系统稳定运行',
                icon: '💻',
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Link
                  href="/services"
                  className="inline-block text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  了解更多 →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              新闻中心
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              了解我们的最新动态和行业资讯
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: '公司荣获行业大奖',
                date: '2026-03-01',
                excerpt: '近日，我公司凭借卓越的服务质量荣获行业年度最佳服务商奖项...',
              },
              {
                title: '新产品发布',
                date: '2026-02-25',
                excerpt: '我们很高兴宣布推出全新的产品系列，旨在为客户提供更优质的服务体验...',
              },
              {
                title: '战略合作达成',
                date: '2026-02-20',
                excerpt: '公司与多家知名企业达成战略合作，共同推动行业发展...',
              },
            ].map((news, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="text-blue-600 font-medium mb-2">{news.date}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {news.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">{news.excerpt}</p>
                <Link
                  href="/news"
                  className="inline-block text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
                >
                  阅读更多 →
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/news"
              className="inline-block px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              浏览所有新闻
            </Link>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            联系我们
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            如果您有任何问题或需求，欢迎随时与我们联系。我们的专业团队将竭诚为您服务。
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl"
          >
            立即咨询
          </Link>
        </div>
      </section>
    </div>
  );
}
