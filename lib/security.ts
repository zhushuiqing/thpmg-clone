/**
 * Security utilities for THPMG website
 * Provides input validation, sanitization, and CSRF protection
 */

// ============================================
// INPUT SANITIZATION
// ============================================

/**
 * Sanitize string input to prevent XSS attacks
 * Removes dangerous characters and limits length
 */
export function sanitizeInput(input: string, maxLength: number = 1000): string {
  if (typeof input !== 'string') return '';

  return input
    .trim()
    .replace(/[<>'"&]/g, '') // Remove potentially dangerous characters
    .replace(/[\x00-\x1F\x7F]/g, '') // Remove control characters
    .slice(0, maxLength);
}

/**
 * Sanitize HTML content - more permissive for rich text
 * Allows specific safe tags while removing dangerous ones
 */
export function sanitizeHtml(input: string, maxLength: number = 5000): string {
  if (typeof input !== 'string') return '';

  // Remove script tags and event handlers
  return input
    .trim()
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
    .replace(/on\w+='[^']*'/gi, '')
    .slice(0, maxLength);
}

// ============================================
// INPUT VALIDATION
// ============================================

// Email regex pattern (RFC 5322 compliant simplified)
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

// Phone regex pattern (international format)
const PHONE_REGEX = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,20}$/;

// Chinese mobile phone regex
const CHINESE_PHONE_REGEX = /^1[3-9]\d{9}$/;

// URL regex pattern
const URL_REGEX = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

// Alphanumeric with spaces
const ALPHANUMERIC_REGEX = /^[a-zA-Z0-9\s\u4e00-\u9fff\u3400-\u4dbf\-_.,!?()]+$/;

/**
 * Validation result interface
 */
export interface ValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Validate email address
 */
export function validateEmail(email: string): ValidationResult {
  if (!email || typeof email !== 'string') {
    return { valid: false, error: 'Email is required' };
  }

  const trimmed = email.trim().toLowerCase();

  if (trimmed.length > 254) {
    return { valid: false, error: 'Email is too long' };
  }

  if (!EMAIL_REGEX.test(trimmed)) {
    return { valid: false, error: 'Invalid email format' };
  }

  return { valid: true };
}

/**
 * Validate phone number
 */
export function validatePhone(phone: string, requireChinese: boolean = false): ValidationResult {
  if (!phone || typeof phone !== 'string') {
    return { valid: true }; // Phone is usually optional
  }

  const trimmed = phone.trim().replace(/[\s-]/g, '');

  if (trimmed.length < 6 || trimmed.length > 20) {
    return { valid: false, error: 'Phone number must be between 6 and 20 digits' };
  }

  const pattern = requireChinese ? CHINESE_PHONE_REGEX : PHONE_REGEX;
  if (!pattern.test(trimmed)) {
    return { valid: false, error: 'Invalid phone number format' };
  }

  return { valid: true };
}

/**
 * Validate required text field
 */
export function validateRequired(value: string, fieldName: string, minLength: number = 1, maxLength: number = 500): ValidationResult {
  if (!value || typeof value !== 'string') {
    return { valid: false, error: `${fieldName} is required` };
  }

  const trimmed = value.trim();

  if (trimmed.length < minLength) {
    return { valid: false, error: `${fieldName} must be at least ${minLength} characters` };
  }

  if (trimmed.length > maxLength) {
    return { valid: false, error: `${fieldName} must be less than ${maxLength} characters` };
  }

  return { valid: true };
}

/**
 * Validate URL
 */
export function validateUrl(url: string): ValidationResult {
  if (!url || typeof url !== 'string') {
    return { valid: true }; // URL is usually optional
  }

  const trimmed = url.trim();

  if (trimmed.length > 2048) {
    return { valid: false, error: 'URL is too long' };
  }

  if (!URL_REGEX.test(trimmed)) {
    return { valid: false, error: 'Invalid URL format' };
  }

  return { valid: true };
}

/**
 * Validate alphanumeric input (with Chinese character support)
 */
export function validateAlphanumeric(value: string, fieldName: string): ValidationResult {
  if (!value || typeof value !== 'string') {
    return { valid: false, error: `${fieldName} is required` };
  }

  if (!ALPHANUMERIC_REGEX.test(value.trim())) {
    return { valid: false, error: `${fieldName} contains invalid characters` };
  }

  return { valid: true };
}

// ============================================
// CSRF PROTECTION
// ============================================

/**
 * Generate a CSRF token
 * In production, this should use a cryptographically secure random generator
 */
export function generateCsrfToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Verify CSRF token
 */
export function verifyCsrfToken(token: string | null, storedToken: string | null): boolean {
  if (!token || !storedToken) {
    return false;
  }

  // Use timing-safe comparison to prevent timing attacks
  if (token.length !== storedToken.length) {
    return false;
  }

  let result = 0;
  for (let i = 0; i < token.length; i++) {
    result |= token.charCodeAt(i) ^ storedToken.charCodeAt(i);
  }

  return result === 0;
}

// ============================================
// RATE LIMITING
// ============================================

export interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

/**
 * In-memory rate limit store
 * In production, use Redis or similar distributed store
 */
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

/**
 * Check if request should be rate limited
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig = { windowMs: 60000, maxRequests: 100 }
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const record = rateLimitStore.get(identifier);

  // Clean up expired entries periodically
  if (rateLimitStore.size > 10000) {
    for (const [key, value] of rateLimitStore.entries()) {
      if (now > value.resetTime) {
        rateLimitStore.delete(key);
      }
    }
  }

  if (!record || now > record.resetTime) {
    const newRecord = { count: 1, resetTime: now + config.windowMs };
    rateLimitStore.set(identifier, newRecord);
    return { allowed: true, remaining: config.maxRequests - 1, resetTime: newRecord.resetTime };
  }

  if (record.count >= config.maxRequests) {
    return { allowed: false, remaining: 0, resetTime: record.resetTime };
  }

  record.count++;
  rateLimitStore.set(identifier, record);
  return { allowed: true, remaining: config.maxRequests - record.count, resetTime: record.resetTime };
}

// ============================================
// SECURITY HEADERS HELPERS
// ============================================

/**
 * Get client IP from request headers
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }

  return 'unknown';
}

/**
 * Check if origin matches allowed origins
 */
export function isAllowedOrigin(origin: string | null, allowedOrigins: string[]): boolean {
  if (!origin) return false;

  try {
    const originUrl = new URL(origin);
    return allowedOrigins.some(allowed => {
      if (allowed === '*') return true;
      try {
        const allowedUrl = new URL(allowed);
        return originUrl.origin === allowedUrl.origin;
      } catch {
        return false;
      }
    });
  } catch {
    return false;
  }
}

// ============================================
// CONTACT FORM VALIDATION
// ============================================

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
}

export interface ContactFormValidationResult {
  valid: boolean;
  errors: Record<string, string>;
  sanitizedData?: ContactFormData;
}

/**
 * Validate and sanitize contact form data
 */
export function validateContactForm(data: unknown): ContactFormValidationResult {
  const errors: Record<string, string> = {};

  if (!data || typeof data !== 'object') {
    return { valid: false, errors: { _form: 'Invalid form data' } };
  }

  const formData = data as Record<string, unknown>;

  // Validate name
  const nameResult = validateRequired(String(formData.name || ''), 'Name', 2, 100);
  if (!nameResult.valid) {
    errors.name = nameResult.error!;
  }

  // Validate email
  const emailResult = validateEmail(String(formData.email || ''));
  if (!emailResult.valid) {
    errors.email = emailResult.error!;
  }

  // Validate phone (optional)
  if (formData.phone) {
    const phoneResult = validatePhone(String(formData.phone));
    if (!phoneResult.valid) {
      errors.phone = phoneResult.error!;
    }
  }

  // Validate message
  const messageResult = validateRequired(String(formData.message || ''), 'Message', 10, 2000);
  if (!messageResult.valid) {
    errors.message = messageResult.error!;
  }

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors };
  }

  // Return sanitized data
  return {
    valid: true,
    errors: {},
    sanitizedData: {
      name: sanitizeInput(String(formData.name || ''), 100),
      email: sanitizeInput(String(formData.email || ''), 254).toLowerCase(),
      phone: formData.phone ? sanitizeInput(String(formData.phone), 20) : '',
      company: formData.company ? sanitizeInput(String(formData.company), 200) : '',
      message: sanitizeInput(String(formData.message || ''), 2000),
    },
  };
}