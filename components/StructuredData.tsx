import Script from 'next/script'

interface StructuredDataProps {
  type: string
  data: Record<string, any>
}

export function StructuredData({ type, data }: StructuredDataProps) {
  return (
    <Script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': type,
          ...data,
        }),
      }}
    />
  )
}