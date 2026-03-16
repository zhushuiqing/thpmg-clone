import { NextRequest, NextResponse } from 'next/server';
import {
  checkRateLimit,
  getClientIp,
  validateContactForm,
  isAllowedOrigin,
} from '@/lib/security';

// Rate limit configuration for contact form
const RATE_LIMIT_CONFIG = {
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 5, // 5 requests per minute
};

// Allowed origins for CSRF protection
const getAllowedOrigins = (): string[] => {
  const origins = process.env.ALLOWED_ORIGINS || '';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || '';

  const allowedOrigins: string[] = [];

  if (origins) {
    allowedOrigins.push(...origins.split(',').map(o => o.trim()));
  }

  if (siteUrl) {
    allowedOrigins.push(siteUrl);
  }

  // Add common development origins
  if (process.env.NODE_ENV === 'development') {
    allowedOrigins.push('http://localhost:3000', 'http://127.0.0.1:3000');
  }

  return allowedOrigins;
};

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = getClientIp(request);

    // Check rate limit
    const rateLimitResult = checkRateLimit(`contact:${ip}`, RATE_LIMIT_CONFIG);
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        {
          error: '请求过于频繁，请稍后再试',
          retryAfter: Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000)
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000)),
            'X-RateLimit-Limit': String(RATE_LIMIT_CONFIG.maxRequests),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': String(Math.ceil(rateLimitResult.resetTime / 1000)),
          }
        }
      );
    }

    // CSRF Protection: Check Origin header
    const origin = request.headers.get('origin');
    const allowedOrigins = getAllowedOrigins();

    if (!isAllowedOrigin(origin, allowedOrigins)) {
      console.warn(`Blocked request from unauthorized origin: ${origin}`);
      return NextResponse.json(
        { error: '请求来源不被允许' },
        { status: 403 }
      );
    }

    // Content-Type validation
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return NextResponse.json(
        { error: '请求类型必须是 application/json' },
        { status: 415 }
      );
    }

    // Parse request body with size limit
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > 10000) {
      return NextResponse.json(
        { error: '请求体过大' },
        { status: 413 }
      );
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: '无效的 JSON 格式' },
        { status: 400 }
      );
    }

    // Validate and sanitize form data
    const validationResult = validateContactForm(body);

    if (!validationResult.valid) {
      return NextResponse.json(
        { error: '表单验证失败', details: validationResult.errors },
        { status: 400 }
      );
    }

    const sanitizedData = validationResult.sanitizedData!;

    // Add metadata
    const submissionData = {
      ...sanitizedData,
      timestamp: new Date().toISOString(),
      ip,
      userAgent: request.headers.get('user-agent') || 'unknown',
    };

    // In production, you would:
    // 1. Save to database
    // 2. Send email notification
    // 3. Add to CRM system
    // 4. Potentially add to a message queue for processing

    console.log('Contact form submission:', {
      name: submissionData.name,
      email: submissionData.email,
      timestamp: submissionData.timestamp,
      // Don't log full message or other sensitive data in production
    });

    // Simulate API delay for demo
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Return success response with rate limit headers
    return NextResponse.json(
      {
        success: true,
        message: '提交成功，我们会尽快与您联系',
      },
      {
        status: 200,
        headers: {
          'X-RateLimit-Limit': String(RATE_LIMIT_CONFIG.maxRequests),
          'X-RateLimit-Remaining': String(rateLimitResult.remaining),
          'X-RateLimit-Reset': String(Math.ceil(rateLimitResult.resetTime / 1000)),
        }
      }
    );
  } catch (error) {
    // Log error for debugging but don't expose details to client
    console.error('Contact form error:', error);

    return NextResponse.json(
      { error: '提交失败，请稍后重试' },
      { status: 500 }
    );
  }
}

// GET endpoint for health check
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Contact API is running',
    version: '1.0.0',
  });
}

// Disallow other HTTP methods
export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function PATCH() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}