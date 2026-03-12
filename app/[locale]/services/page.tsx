import Link from 'next/link';
import FadeIn from '@/components/FadeIn';

export const dynamic = 'force-dynamic';

export default function ServicesPage() {
  const serviceCategories = [
    {
      title: '专业咨询',
      description: '提供全方位的专业咨询服务，为客户量身定制最优解决方案',
      icon: '💡',
      services: [
        '战略规划咨询',
        '业务流程优化',
        '风险管理咨询',
        '合规咨询服务',
      ],
    },
    {
      title: '技术支持',
      description: '强大的技术团队，为客户提供全方位的技术支持和保障',
      icon: '🛠️',
      services: [
        '系统架构设计',
        '技术方案实施',
        '系统运维支持',
        '技术培训服务',
      ],
    },
    {
      title: '定制开发',
      description: '根据客户需求进行定制化开发，确保系统稳定高效运行',
      icon: '💻',
      services: [
        'Web应用开发',
        '移动应用开发',
        '企业系统定制',
        '接口集成开发',
      ],
    },
    {
      title: '数据分析',
      description: '专业的数据分析服务，帮助企业洞察业务趋势和优化决策',
      icon: '📊',
      services: [
        '数据采集与清洗',
        '数据分析与挖掘',
        '数据可视化',
        '商业智能报告',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              服务项目
            </h1>
          </FadeIn>
          <nav className="mt-4 text-gray-600 text-sm">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              首页
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">服务项目</span>
          </nav>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white rounded-t-[50%]"></div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-white">
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
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {serviceCategories.map((category, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow overflow-hidden border border-gray-100"
              >
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 text-center">
                  <div className="text-6xl mb-4">{category.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {category.title}
                  </h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 text-sm mb-4">
                    {category.description}
                  </p>
                  <div className="space-y-2">
                    {category.services.map((service, i) => (
                      <div key={i} className="flex items-center text-gray-700">
                        <svg
                          className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-sm">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              服务优势
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              选择我们的理由
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                title: '专业团队',
                description:
                  '我们的团队由经验丰富的专业人士组成，具备深厚的专业知识和丰富的实践经验，能够为客户提供高质量的服务。'
              },
              {
                title: '定制方案',
                description:
                  '我们根据客户的实际需求，量身定制最适合的解决方案，确保服务的针对性和有效性。'
              },
              {
                title: '质量保证',
                description:
                  '我们严格把控服务质量，建立完善的质量管理体系，确保每一个项目都能达到最高标准。'
              },
              {
                title: '全程支持',
                description:
                  '我们提供全方位、全周期的服务支持，从项目咨询到实施交付，再到后期维护，确保客户无后顾之忧。'
              },
              {
                title: '技术创新',
                description:
                  '我们紧跟技术发展趋势，不断引进新技术、新方法，提升服务质量和效率。'
              },
              {
                title: '客户至上',
                description:
                  '我们始终坚持以客户为中心的服务理念，注重客户体验，努力超越客户期望。'
              },
            ].map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              服务流程
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              我们的标准服务流程
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-200 hidden md:block"></div>

              {/* Steps */}
              {[
                { step: 1, title: '需求沟通', description: '深入了解客户需求和目标' },
                { step: 2, title: '方案制定', description: '制定详细的服务方案和计划' },
                { step: 3, title: '方案确认', description: '与客户确认方案细节' },
                { step: 4, title: '项目实施', description: '按照方案执行项目' },
                { step: 5, title: '质量验收', description: '确保项目质量符合要求' },
                { step: 6, title: '交付支持', description: '项目交付和后续支持' },
              ].map((step, index) => (
                <div key={index} className="flex mb-8">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            开始您的项目
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            无论您的项目规模大小，我们都能提供专业的服务。立即联系我们，开启合作之旅。
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl"
          >
            获取免费咨询
          </Link>
        </div>
      </section>
    </div>
  );
}
