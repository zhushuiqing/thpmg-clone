import Link from 'next/link';
import { StructuredData } from '@/components/StructuredData';

export const dynamic = 'force-dynamic';

// Mock news data
const newsData = {
  '1': {
    id: 1,
    title: '公司荣获2026年度行业最佳服务商奖项',
    date: '2026-03-01',
    author: 'THPMG新闻团队',
    content: `近日，我公司凭借卓越的服务质量和专业的团队，荣获2026年度行业最佳服务商奖项。这是对我们多年来坚持专业服务、追求卓越的肯定和鼓励。

在本次评选中，我们从数百家参选企业中脱颖而出，获得了评审团的高度认可。评审团特别指出，我们在服务质量、技术创新、客户满意度等方面表现突出，树立了行业标杆。

这一荣誉的获得，离不开全体员工的辛勤付出和客户的信任支持。多年来，我们始终坚持以客户为中心的服务理念，注重技术创新和管理优化，不断提升服务质量和客户满意度。

未来，我们将继续秉承专业、诚信、创新、共赢的核心价值观，不断提升服务质量和客户满意度，为客户创造更大的价值。我们也将继续加强团队建设，引进优秀人才，提升综合实力。

再次感谢各位客户的支持和信任！我们将继续努力，不负众望！`,
  },
  '2': {
    id: 2,
    title: '全新产品系列正式发布',
    date: '2026-02-25',
    author: 'THPMG产品团队',
    content: `我们很高兴宣布，全新的产品系列已于今日正式发布。新产品在功能、性能和用户体验方面都有显著提升，旨在为客户提供更优质的服务体验。

此次发布的新产品经过了数月的精心研发和测试，充分考虑了客户需求和市场趋势。在研发过程中，我们进行了大量的用户调研和测试，确保产品能够真正满足客户的实际需求。

新产品的主要特点包括：
- 更强大的功能：新增多项实用功能，满足客户的多样化需求
- 更优的性能：优化系统架构，提升运行效率
- 更好的体验：改进用户界面，提升操作便捷性
- 更高的安全性：加强安全防护，保障数据安全

我们相信，新产品将为客户带来更高效、更便捷的解决方案，帮助客户实现业务目标。同时，我们也将提供全面的技术支持和培训服务，确保客户能够充分利用新产品的各项功能。

感谢各位客户的支持和信任！我们期待与您共同见证新产品的成功！`,
  },
};

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

  // Get the news item based on slug
  const newsItem = newsData[params.slug as keyof typeof newsData];

  if (!newsItem) {
    return {
      title: '新闻不存在 - THPMG',
      description: '请求的新闻文章不存在',
    };
  }

  return {
    title: `${newsItem.title} - THPMG`,
    description: newsItem.content.substring(0, 160),
    alternates: {
      canonical: `${baseUrl}/zh/news/${params.slug}`,
    },
  };
}

export default function NewsDetailPage({ params }: { params: { slug: string } }) {
  const news = newsData[params.slug as keyof typeof newsData];

  if (!news) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">新闻不存在</h1>
          <Link
            href="/news"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← 返回新闻中心
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Structured Data */}
      {news && (
        <StructuredData
          type="Article"
          data={{
            "@type": "Article",
            "headline": news.title,
            "description": news.content.substring(0, 160),
            "datePublished": news.date,
            "author": {
              "@type": "Person",
              "name": news.author
            },
            "publisher": {
              "@type": "Organization",
              "name": "THPMG",
              "logo": {
                "@type": "ImageObject",
                "url": "https://example.com/logo.png"
              }
            }
          }}
        />
      )}
      <StructuredData
        type="BreadcrumbList"
        data={{
          "@id": `https://example.com/news/${params.slug}#breadcrumb`,
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
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": news?.title || "News Article",
              "item": `https://example.com/news/${params.slug}`
            }
          ]
        }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {news.title}
          </h1>
          <div className="text-gray-600 text-sm space-x-4">
            <span>{news.date}</span>
            <span>·</span>
            <span>{news.author}</span>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white rounded-t-[50%]"></div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="bg-white rounded-lg shadow-sm p-8">
            <div className="prose prose-lg max-w-none">
              {news.content.split('\n').map((paragraph, index) => (
                <p key={index} className="text-gray-700 leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Tags */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">标签：</span>
                <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  公司动态
                </button>
                <button className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                  荣誉奖项
                </button>
              </div>
            </div>

            {/* Share */}
            <div className="mt-8 pt-8 border-t border-gray-200 flex items-center justify-between">
              <span className="text-sm text-gray-600">分享到：</span>
              <div className="flex space-x-4">
                {['wechat', 'weibo', 'qq'].map((platform) => (
                  <button
                    key={platform}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {platform}
                  </button>
                ))}
              </div>
            </div>
          </article>

          {/* Related News */}
          <div className="mt-12">
            <h3 className="text-xl font-bold text-gray-900 mb-6">相关新闻</h3>
            <div className="space-y-4">
              {Object.values(newsData)
                .filter((n) => n.id !== news.id)
                .slice(0, 3)
                .map((related) => (
                  <Link
                    key={related.id}
                    href={`/news/${related.id}`}
                    className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="text-blue-600 font-medium text-sm mb-2">
                      {related.date}
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">
                      {related.title}
                    </h4>
                  </Link>
                ))}
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-12 text-center">
            <Link
              href="/news"
              className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              ← 返回新闻中心
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
