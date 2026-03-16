'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

interface ContactFormProps {
  locale: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export default function ContactForm({ locale }: ContactFormProps) {
  const t = useTranslations('Contact');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [rateLimitRemaining, setRateLimitRemaining] = useState<number | null>(null);

  // Client-side validation patterns (must match server-side)
  const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  const PHONE_REGEX = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,20}$/;

  // Validate individual field
  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return t('name') + ' ' + t('required');
        if (value.trim().length < 2) return t('name') + ' ' + t('minLength');
        if (value.trim().length > 100) return t('name') + ' ' + t('maxLength');
        break;
      case 'email':
        if (!value.trim()) return t('email') + ' ' + t('required');
        if (!EMAIL_REGEX.test(value)) return t('invalidEmail');
        break;
      case 'phone':
        if (value && !PHONE_REGEX.test(value)) return t('invalidPhone');
        break;
      case 'message':
        if (!value.trim()) return t('message') + ' ' + t('required');
        if (value.trim().length < 10) return t('message') + ' ' + t('minLengthMessage');
        if (value.trim().length > 2000) return t('message') + ' ' + t('maxLength');
        break;
    }
    return undefined;
  };

  // Validate all fields
  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    let isValid = true;

    (['name', 'email', 'phone', 'message'] as const).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        errors[field] = error;
        isValid = false;
      }
    });

    setFormErrors(errors);
    return isValid;
  };

  // Sanitize input on the client side (defense in depth)
  const sanitizeInput = (input: string, maxLength: number = 1000): string => {
    return input
      .trim()
      .replace(/[<>'"&]/g, '')
      .replace(/[\x00-\x1F\x7F]/g, '')
      .slice(0, maxLength);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    setFormErrors({});

    // Validate before submission
    if (!validateForm()) {
      return;
    }

    // Check rate limit
    if (rateLimitRemaining !== null && rateLimitRemaining <= 0) {
      setSubmitError(t('rateLimited'));
      return;
    }

    setIsSubmitting(true);

    // Prepare sanitized data
    const sanitizedData = {
      name: sanitizeInput(formData.name, 100),
      email: sanitizeInput(formData.email, 254).toLowerCase(),
      phone: formData.phone ? sanitizeInput(formData.phone, 20) : '',
      company: formData.company ? sanitizeInput(formData.company, 200) : '',
      message: sanitizeInput(formData.message, 2000),
    };

    try {
      const response = await fetch(`/${locale}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sanitizedData),
      });

      const data = await response.json();

      // Update rate limit info from response headers
      const remaining = response.headers.get('X-RateLimit-Remaining');
      if (remaining) {
        setRateLimitRemaining(parseInt(remaining));
      }

      if (!response.ok) {
        // Handle specific error cases
        if (response.status === 429) {
          setSubmitError(data.error || t('rateLimited'));
        } else if (response.status === 400 && data.details) {
          // Server validation errors
          setFormErrors(data.details);
        } else if (response.status === 403) {
          setSubmitError(t('forbidden'));
        } else {
          setSubmitError(data.error || t('submitError'));
        }
        return;
      }

      // Success
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
      });
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitError(t('networkError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setFormErrors(prev => ({
      ...prev,
      [name]: error,
    }));
  };

  // Reset success state
  const handleReset = () => {
    setSubmitSuccess(false);
    setSubmitError('');
    setFormErrors({});
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-premium p-8 sm:p-10 border border-gray-200">
      {submitSuccess ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">✅</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">
            {t('successTitle')}
          </h3>
          <p className="text-gray-600 mb-6 font-light">
            {t('successMessage')}
          </p>
          <button
            onClick={handleReset}
            className="px-8 py-3 bg-primary text-white font-medium rounded-full hover:bg-primary-hover transition-colors shadow-lg hover:shadow-xl"
          >
            {t('successButton')}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              {t('name')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              maxLength={100}
              aria-describedby={formErrors.name ? 'name-error' : undefined}
              aria-invalid={!!formErrors.name}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${
                formErrors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder={t('name')}
            />
            {formErrors.name && (
              <p id="name-error" className="mt-1 text-sm text-red-500">
                {formErrors.name}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              {t('email')} <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              maxLength={254}
              aria-describedby={formErrors.email ? 'email-error' : undefined}
              aria-invalid={!!formErrors.email}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${
                formErrors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="example@email.com"
            />
            {formErrors.email && (
              <p id="email-error" className="mt-1 text-sm text-red-500">
                {formErrors.email}
              </p>
            )}
          </div>

          {/* Phone Field */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              {t('phone')}
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              maxLength={20}
              aria-describedby={formErrors.phone ? 'phone-error' : undefined}
              aria-invalid={!!formErrors.phone}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${
                formErrors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder={t('phone')}
            />
            {formErrors.phone && (
              <p id="phone-error" className="mt-1 text-sm text-red-500">
                {formErrors.phone}
              </p>
            )}
          </div>

          {/* Company Field */}
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
              {t('company')}
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              maxLength={200}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
              placeholder={t('company')}
            />
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              {t('message')} <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              rows={5}
              maxLength={2000}
              aria-describedby={formErrors.message ? 'message-error' : undefined}
              aria-invalid={!!formErrors.message}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none ${
                formErrors.message ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder={t('message')}
            />
            {formErrors.message && (
              <p id="message-error" className="mt-1 text-sm text-red-500">
                {formErrors.message}
              </p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              {formData.message.length}/2000
            </p>
          </div>

          {/* Submit Error */}
          {submitError && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg" role="alert">
              <p className="text-red-700 text-sm">{submitError}</p>
            </div>
          )}

          {/* Rate Limit Info */}
          {rateLimitRemaining !== null && rateLimitRemaining < 5 && (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-700 text-sm">
                {t('rateLimitWarning')}: {rateLimitRemaining}
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || (rateLimitRemaining !== null && rateLimitRemaining <= 0)}
            className="w-full px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            aria-busy={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t('loading')}
              </span>
            ) : (
              t('submit')
            )}
          </button>
        </form>
      )}
    </div>
  );
}