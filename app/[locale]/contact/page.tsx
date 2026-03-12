import Link from 'next/link';
import ContactForm from '@/components/ContactForm';

export const dynamic = 'force-dynamic';

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            联系我们
          </h1>
          <nav className="mt-4 text-gray-600 text-sm">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              首页
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">联系我们</span>
          </nav>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white rounded-t-[50%]"></div>
      </section>

      {/* Contact Info */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              联系方式
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              选择最适合您的方式联系我们
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '📧',
                title: '电子邮箱',
                value: 'info@thpmg.com',
                link: 'mailto:info@thpmg.com',
              },
              {
                icon: '📱',
                title: '联系电话',
                value: '+86 123 4567 8900',
                link: 'tel:+8612345678900',
              },
              {
                icon: '🏢',
                title: '公司地址',
                value: '北京市朝阳区某某大厦18层',
                link: '#',
              },
            ].map((contact, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <div className="text-6xl mb-4">{contact.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {contact.title}
                </h3>
                <a
                  href={contact.link}
                  className="text-blue-600 hover:text-blue-700 font-medium break-words"
                >
                  {contact.value}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              在线咨询
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              填写以下表单，我们的客服人员将尽快与您联系
            </p>
          </div>
          <ContactForm locale={locale} />
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              公司位置
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              欢迎莅临参观
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="aspect-video bg-gray-200 flex items-center justify-center">
              <div className="text-center">
                <div className="text-8xl mb-4">🗺️</div>
                <p className="text-gray-600">
                  地图功能将在生产环境配置后显示
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Hours */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              工作时间
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: '周一至周五',
                hours: '09:00 - 18:00',
                icon: '💼',
              },
              {
                title: '周六',
                hours: '09:00 - 12:00',
                icon: '📅',
              },
              {
                title: '周日及节假日',
                hours: '休息',
                icon: '🌴',
              },
            ].map((time, index) => (
              <div
                key={index}
                className="bg-gray-50 p-8 rounded-lg shadow-sm text-center"
              >
                <div className="text-6xl mb-4">{time.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {time.title}
                </h3>
                <p className="text-gray-700 text-lg">{time.hours}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}