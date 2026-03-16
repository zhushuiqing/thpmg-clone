'use client';

import { useLayoutEffect, useState, useRef } from 'react';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  threshold?: number;
  className?: string;
}

export default function FadeIn({
  children,
  delay = 0,
  duration = 800,
  direction = 'up',
  distance = 40,
  threshold = 0.1,
  className = ''
}: FadeInProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setTimeout(() => {
            setIsVisible(true);
            setHasAnimated(true);
          }, delay);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [delay, threshold, hasAnimated]);

  const getTransform = () => {
    if (!isVisible) {
      switch (direction) {
        case 'up':
          return `translateY(${distance}px)`;
        case 'down':
          return `translateY(-${distance}px)`;
        case 'left':
          return `translateX(${distance}px)`;
        case 'right':
          return `translateX(-${distance}px)`;
        case 'none':
          return 'translateY(0)';
        default:
          return `translateY(${distance}px)`;
      }
    }
    return 'translateY(0)';
  };

  const transformValue = getTransform();
  const shouldAnimateTransform = direction !== 'none';

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: shouldAnimateTransform ? transformValue : 'none',
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms${shouldAnimateTransform ? `, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms` : ''}`
      }}
    >
      {children}
    </div>
  );
}
