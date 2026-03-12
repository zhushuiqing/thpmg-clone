# Security Policy

## Overview

This document outlines the security practices and policies for the THPMG website project.

## Security Implementation Status

| Feature | Status | Implementation |
|---------|--------|----------------|
| XSS Protection | ✅ Complete | CSP, input sanitization, React built-in |
| CSRF Protection | ✅ Complete | Origin validation, SameSite cookies |
| Input Validation | ✅ Complete | Server & client-side validation |
| Rate Limiting | ✅ Complete | API rate limiting with headers |
| Security Headers | ✅ Complete | Full header configuration |
| Secret Management | ✅ Complete | Environment variables, .gitignore |

## Security Headers

The application implements comprehensive security headers via `next.config.ts` and `middleware.ts`:

### Content Security Policy (CSP)
```
default-src 'self';
script-src 'self' 'unsafe-inline' https://*.googletagmanager.com https://*.google-analytics.com;
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
font-src 'self' https://fonts.gstatic.com;
img-src 'self' data: https:;
connect-src 'self' https:;
frame-src 'none';
object-src 'none';
base-uri 'self';
form-action 'self';
```

### Additional Headers
- **X-XSS-Protection**: `1; mode=block` - XSS filtering
- **X-Frame-Options**: `DENY` - Clickjacking prevention
- **X-Content-Type-Options**: `nosniff` - MIME type sniffing prevention
- **Referrer-Policy**: `strict-origin-when-cross-origin` - Referrer control
- **Strict-Transport-Security**: `max-age=63072000; includeSubDomains; preload` - HTTPS enforcement (production only)
- **Permissions-Policy**: `geolocation=(), microphone=(), camera=(), payment=()` - Feature restriction

## Input Validation & Sanitization

All user inputs are validated and sanitized at multiple levels:

### Client-Side (ContactForm.tsx)
- Real-time field validation
- Input length limits
- Format validation (email, phone)
- XSS character filtering

### Server-Side (lib/security.ts)
- Comprehensive validation functions
- Input sanitization with character removal
- Length enforcement
- Type checking

```typescript
// Example validation
validateEmail(email)      // RFC 5322 compliant
validatePhone(phone)      // International format
validateRequired(value)   // Length and presence
```

## XSS Protection

### Defense Layers
1. **React Built-in**: Automatic escaping of JSX expressions
2. **Input Sanitization**: Removes `<`, `>`, `'`, `"`, `&` characters
3. **Content Security Policy**: Restricts script execution
4. **X-XSS-Protection Header**: Browser XSS filter

### Best Practices
- ❌ No usage of `dangerouslySetInnerHTML`
- ❌ No direct DOM manipulation with user input
- ✅ All user input is sanitized before use
- ✅ Output encoding handled by React

## CSRF Protection

### Implementation
1. **Origin Validation**: API routes verify `Origin` header against allowed origins
2. **SameSite Cookies**: Default browser behavior for session cookies
3. **Content-Type Check**: Only accepts `application/json` for POST requests

### Configuration
```typescript
// Allowed origins from environment
ALLOWED_ORIGINS=https://your-domain.com,https://www.your-domain.com
```

## Rate Limiting

### API Rate Limits
| Endpoint | Window | Max Requests |
|----------|--------|--------------|
| /api/contact | 1 minute | 5 requests |

### Response Headers
```
X-RateLimit-Limit: 5
X-RateLimit-Remaining: 3
X-RateLimit-Reset: 1234567890
Retry-After: 30
```

### Production Recommendation
For production, replace in-memory rate limiting with Redis:

```typescript
// Example Redis implementation
import { Redis } from 'ioredis';
const redis = new Redis(process.env.REDIS_URL);
```

## Secret Management

### Environment Variables
- ✅ `.env.local` is in `.gitignore`
- ✅ `.env.example` provides template without values
- ✅ Production secrets managed via deployment platform (Vercel)
- ✅ No hardcoded secrets in codebase

### Required Secrets (Production)
```bash
ALLOWED_ORIGINS     # CORS allowed origins
NEXT_PUBLIC_SITE_URL # Site URL for CSP
REDIS_URL           # Optional: for distributed rate limiting
```

## Dependencies Security

### Audit Status
Run `npm audit` to check for vulnerabilities.

### Known Issues
- 4 low severity vulnerabilities in `jest-environment-jsdom` (dev dependency only)
- These do not affect production builds

### Updating Dependencies
```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix

# Update specific packages
npm update <package>
```

## Security Testing Checklist

### Manual Testing
- [x] Verify all forms have proper input validation
- [x] Test XSS injection attempts in all input fields
- [x] Verify security headers are present in responses
- [x] Check that no sensitive information is exposed in errors
- [x] Validate that CSP is properly configured
- [x] Test rate limiting functionality
- [x] Verify CORS configuration

### Automated Testing
```bash
# Security audit
npm audit

# Type checking
npm run build

# Linting (includes security rules)
npm run lint
```

## Reporting Security Issues

If you discover a security vulnerability:

1. **Do not** create a public GitHub issue
2. Email the security team with details
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)
4. Allow 90 days for remediation before disclosure

## Security Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                       Client (Browser)                       │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│  │ Input Validation│  │ XSS Prevention │  │ CSRF Token   │ │
│  └────────┬────────┘  └────────┬────────┘  └──────┬───────┘ │
└───────────┼─────────────────────┼─────────────────┼─────────┘
            │                     │                 │
            ▼                     ▼                 ▼
┌─────────────────────────────────────────────────────────────┐
│                      Middleware Layer                        │
│  ┌───────────────┐  ┌────────────────┐  ┌────────────────┐  │
│  │ Security Hdrs │  │ Attack Pattern │  │ CORS Check     │  │
│  └───────────────┘  │ Detection      │  └────────────────┘  │
│                     └────────────────┘                      │
└─────────────────────────────┬───────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                        API Routes                            │
│  ┌───────────────┐  ┌────────────────┐  ┌────────────────┐  │
│  │ Rate Limiting │  │ CSRF Origin    │  │ Input Valid.   │  │
│  └───────────────┘  │ Validation     │  │ & Sanitization │  │
│                     └────────────────┘  └────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Future Enhancements

- [ ] Implement Redis-based rate limiting for production
- [ ] Add CSP reporting endpoint
- [ ] Implement security.txt (RFC 9116)
- [ ] Add Web Application Firewall (WAF) rules
- [ ] Implement automated security scanning in CI/CD
- [ ] Add security-focused E2E tests

## References

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security Documentation](https://nextjs.org/docs/app/building-your-application/configuring/security-headers)
- [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [OWASP CSRF Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)
- [OWASP XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)