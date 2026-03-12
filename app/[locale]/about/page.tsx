import Link from 'next/link';
import FadeIn from '@/components/FadeIn';

export const dynamic = 'force-dynamic';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              关于我们
            </h1>
          </FadeIn>
          <nav className="mt-4 text-gray-600 text-sm">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              首页
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">关于我们</span>
          </nav>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white rounded-t-[50%]"></div>
      </section>

      {/* Company Profile */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              公司简介
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                THPMG是一家专业的服务型企业，致力于为客户提供最优质的专业解决方案。公司成立于多年前，凭借卓越的服务质量和专业的团队，已发展成为行业内具有重要影响力的企业。
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                我们始终坚持"客户至上、质量第一"的经营理念，注重技术创新和管理优化，不断提升服务质量和客户满意度。我们的专业团队由经验丰富的行业专家组成，具备深厚的专业知识和丰富的实践经验。
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                通过多年的发展，我们已经为众多企业提供了优质的服务，赢得了广大客户的信赖和支持。未来，我们将继续秉承专业、诚信、创新、共赢的核心价值观，不断追求卓越，为客户创造更大的价值。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              核心价值观
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              我们的企业文化和核心价值观
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                title: '专业',
                icon: '🎯',
                description: '我们拥有专业的团队和深厚的技术积累，为客户提供专业的服务和解决方案。',
              },
              {
                title: '诚信',
                icon: '🤝',
                description: '我们始终坚持诚信经营，以诚待人，赢得了客户的信任和尊重。',
              },
              {
                title: '创新',
                icon: '🚀',
                description: '我们注重技术创新和管理创新，不断提升服务质量和效率。',
              },
              {
                title: '共赢',
                icon: '⭐',
                description: '我们与客户、合作伙伴共同发展，实现互利共赢。'
              },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Strengths */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              我们的优势
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              为什么选择我们
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  专业的团队
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  我们拥有一支经验丰富、专业素质过硬的团队，成员均具备深厚的专业知识和丰富的实践经验，能够为客户提供专业的解决方案。
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  丰富的经验
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  多年行业经验积累，我们深入了解行业特点和客户需求，能够提供针对性的解决方案，帮助客户实现业务目标。
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  优质的服务
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  我们始终坚持以客户为中心的服务理念，注重服务质量和客户体验，提供全方位、一站式的专业服务。
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  持续创新
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  我们注重技术创新和管理创新，不断引进新技术、新方法，提升服务质量和效率，保持行业领先地位。
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-8 rounded-lg text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">15+</div>
                <div className="text-gray-700 font-medium">年经验</div>
              </div>
              <div className="bg-green-50 p-8 rounded-lg text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">100+</div>
                <div className="text-gray-700 font-medium">合作企业</div>
              </div>
              <div className="bg-purple-50 p-8 rounded-lg text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">98%</div>
                <div className="text-gray-700 font-medium">客户满意度</div>
              </div>
              <div className="bg-orange-50 p-8 rounded-lg text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">50+</div>
                <div className="text-gray-700 font-medium">专业团队</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            期待与您合作
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            我们期待与您的合作，共同创造更美好的未来。如有任何问题或需求，欢迎随时与我们联系。
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl"
          >
            联系我们
          </Link>
        </div>
      </section>
    </div>
  );
}
