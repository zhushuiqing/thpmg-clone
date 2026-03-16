import Script from 'next/script'

interface StructuredDataProps {
  type: string
  data: Record<string, unknown>
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  return (
    <Script
      id="structured-data"
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