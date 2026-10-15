import { useEffect, useRef, useState, useCallback } from 'react';

interface UseCounterOptions {
  target: string;
  duration?: number;
}

export const useCounter = ({ target, duration = 2000 }: UseCounterOptions) => {
  const [count, setCount] = useState('0');
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  const animateCount = useCallback(() => {
    // Extract number and suffix from target
    const match = target.match(/^([\d,]+)(.*)/);
    if (!match) {
      setCount(target);
      return;
    }

    const numericValue = parseInt(match[1].replace(/,/g, ''));
    const suffix = match[2];

    if (isNaN(numericValue)) {
      setCount(target);
      return;
    }

    const startTime = Date.now();
    const endTime = startTime + duration;

    const updateCount = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(easeOutQuart * numericValue);

      // Format with commas if original had commas
      const formattedValue = match[1].includes(',') 
        ? currentValue.toLocaleString()
        : currentValue.toString();

      setCount(formattedValue + suffix);

      if (now < endTime) {
        requestAnimationFrame(updateCount);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(updateCount);
  }, [target, duration]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateCount();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [hasAnimated, animateCount]);

  return { count, ref: elementRef };
};
