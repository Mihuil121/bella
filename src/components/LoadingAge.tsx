import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import '../styles/LoadingAge.scss';
import { useTranslation } from 'react-i18next';

const LoadingAge: React.FC<{ onLoadingComplete: () => void }> = ({ onLoadingComplete }) => {
  const { t } = useTranslation();
  const numberRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.5,
          onComplete: onLoadingComplete
        });
      }
    });

    tl.to(numberRef.current, {
      duration: 2,
      innerHTML: 22,
      snap: { innerHTML: 1 },
      ease: "power2.inOut"
    });

    tl.to(".loading-line", {
      width: "100%",
      duration: 2,
      ease: "power2.inOut"
    }, 0);

    // Исправленная функция очистки
    return () => {
      tl.kill();
    };
  }, [onLoadingComplete]);

  return (
    <div className="loading-container" ref={containerRef}>
      <div className="age-counter">
        <span ref={numberRef}>0</span>
        <span className="years">{t('age.years')}</span>
      </div>
      <div className="loading-line-container">
        <div className="loading-line"></div>
      </div>
    </div>
  );
};

export default LoadingAge;