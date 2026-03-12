import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Create the internationalization middleware
const intlMiddleware = createMiddleware({
  locales: ['zh', 'en'],
  defaultLocale: 'zh',
});

// Security headers to add to all responses
const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=(), payment=()',
};

// Paths that should have stricter security
const apiPaths = ['/api/'];
const adminPaths = ['/admin/'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Apply intl middleware for localized routes
  const response = intlMiddleware(request);

  // Add security headers to all responses
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  // Add CORS headers for API routes
  if (apiPaths.some(path => pathname.startsWith(path))) {
    const origin = request.headers.get('origin');
    const allowedOrigins = getAllowedOrigins(request);

    if (origin && allowedOrigins.includes(origin)) {
      response.headers.set('Access-Control-Allow-Origin', origin);
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
      response.headers.set('Access-Control-Max-Age', '86400');
    }

    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, {
        status: 204,
        headers: response.headers,
      });
    }
  }

  // Block requests to admin paths without proper authentication
  if (adminPaths.some(path => pathname.startsWith(path))) {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
  }

  // Block common attack patterns in URL
  const suspiciousPatterns = [
    /\.\.\//, // Path traversal
    /<script/i, // XSS attempts
    /javascript:/i, // JavaScript protocol
    /on\w+=/i, // Event handlers
    /union.*select/i, // SQL injection
    /exec\(/i, // Command injection
    /eval\(/i, // Code injection
  ];

  for (const pattern of suspiciousPatterns) {
    if (pattern.test(pathname)) {
      console.warn(`Blocked suspicious request to: ${pathname}`);
      return NextResponse.json(
        { error: 'Bad Request' },
        { status: 400 }
      );
    }
  }

  return response;
}

function getAllowedOrigins(request: NextRequest): string[] {
  const origins: string[] = [];

  // From environment
  const envOrigins = process.env.ALLOWED_ORIGINS;
  if (envOrigins) {
    origins.push(...envOrigins.split(',').map(o => o.trim()));
  }

  // Site URL
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (siteUrl) {
    origins.push(siteUrl);
  }

  // Development origins
  if (process.env.NODE_ENV === 'development') {
    origins.push('http://localhost:3000', 'http://127.0.0.1:3000');
  }

  // Vercel preview URLs
  if (process.env.VERCEL_URL) {
    origins.push(`https://${process.env.VERCEL_URL}`);
  }

  return origins;
}

export const config = {
  matcher: [
    // Match all paths except static files and internal Next.js paths
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)',
  ],
};