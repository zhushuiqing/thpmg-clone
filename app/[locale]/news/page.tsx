import Link from 'next/link';
import { StructuredData } from '@/components/StructuredData';

export const dynamic = 'force-dynamic';

// Mock news data
const newsData = [
  {
    id: 1,
    title: '公司荣获 2026 年度行业最佳服务商奖项',
    date: '2026-03-01',
    author: 'THPMG 新闻团队',
    category: 'company',
    excerpt: '近日，我公司凭借卓越的服务质量荣获行业年度最佳服务商奖项...',
  },
  {
    id: 2,
    title: '全新产品系列正式发布',
    date: '2026-02-25',
    author: 'THPMG 产品团队',
    category: 'product',
    excerpt: '我们很高兴宣布推出全新的产品系列，旨在为客户提供更优质的服务体验...',
  },
  {
    id: 3,
    title: '战略合作达成',
    date: '2026-02-20',
    author: 'THPMG 新闻团队',
    category: 'company',
    excerpt: '公司与多家知名企业达成战略合作，共同推动行业发展...',
  },
  {
    id: 4,
    title: '2026 年行业发展趋势分析',
    date: '2026-02-15',
    author: 'THPMG 研究院',
    category: 'industry',
    excerpt: '本文深入分析 2026 年行业发展趋势，为企业提供决策参考...',
  },
  {
    id: 5,
    title: '产品功能更新 - 版本 3.0',
    date: '2026-02-10',
    author: 'THPMG 产品团队',
    category: 'product',
    excerpt: '最新版本带来多项功能改进和性能优化，用户体验全面提升...',
  },
  {
    id: 6,
    title: '公司参加行业峰会并发表主题演讲',
    date: '2026-02-05',
    author: 'THPMG 新闻团队',
    category: 'industry',
    excerpt: '我公司受邀参加 2026 年全球行业峰会，CEO 发表重要演讲...',
  },
];

export async function generateMetadata() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

  return {
    title: '新闻中心 - THPMG',
    description: '了解 THPMG 的最新动态和行业资讯',
    alternates: {
      canonical: `${baseUrl}/zh/news`,
    },
  };
}

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Structured Data */}
      <StructuredData
        type="WebPage"
        data={{
          "@id": "https://example.com/news/#webpage",
          "url": "https://example.com/news",
          "name": "新闻中心 - THPMG",
          "description": "了解 THPMG 的最新动态和行业资讯",
        }}
      />
      <StructuredData
        type="BreadcrumbList"
        data={{
          "@id": "https://example.com/news/#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://example.com"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "News Center",
              "item": "https://example.com/news"
            }
          ]
        }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            新闻中心
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            了解我们的最新动态和行业资讯
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white rounded-t-[50%]"></div>
      </section>

      {/* News Categories */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {['all', 'company', 'industry', 'product'].map((category) => (
              <button
                key={category}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  category === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category === 'all' && '全部'}
                {category === 'company' && '公司动态'}
                {category === 'industry' && '行业资讯'}
                {category === 'product' && '产品更新'}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* News List */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsData.map((news) => (
              <Link
                key={news.id}
                href={`/news/${news.id}`}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-blue-600 font-medium">
                    {news.category === 'company' && '公司动态'}
                    {news.category === 'industry' && '行业资讯'}
                    {news.category === 'product' && '产品更新'}
                  </span>
                  <span className="text-sm text-gray-500">{news.date}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {news.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {news.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{news.author}</span>
                  <span className="text-blue-600 font-medium text-sm group-hover:translate-x-1 transition-transform">
                    阅读更多 →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex justify-center">
            <nav className="flex items-center space-x-2">
              <button className="px-4 py-2 text-gray-500 hover:text-gray-700 disabled:opacity-50" disabled>
                上一页
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded">1</button>
              <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">2</button>
              <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">3</button>
              <span className="px-2 text-gray-500">...</span>
              <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">10</button>
              <button className="px-4 py-2 text-gray-500 hover:text-gray-700">
                下一页
              </button>
            </nav>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            订阅我们的新闻
          </h2>
          <p className="text-blue-100 mb-8">
            及时了解我们的最新动态和行业资讯
          </p>
          <form className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="输入您的邮箱"
              className="px-6 py-4 rounded-lg text-gray-900 w-full sm:w-96 focus:ring-2 focus:ring-white focus:outline-none"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors"
            >
              订阅
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
