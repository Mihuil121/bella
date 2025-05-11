import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import '../styles/AgeCounter.scss';

const AgeCounter: React.FC = () => {
  const [days, setDays] = useState(0);
  const birthDate = new Date('2002-01-01'); // Replace with actual birth date
  const { i18n } = useTranslation();
  const isKorean = i18n.language === 'ko';
  
  useEffect(() => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - birthDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // Animation for counting days
    let count = 0;
    const interval = setInterval(() => {
      if (count < diffDays) {
        count += Math.ceil(diffDays / 100);
        if (count > diffDays) count = diffDays;
        setDays(count);
      } else {
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className="age-counter"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <div className="counter-container">
        <div className="counter-number">{days.toLocaleString()}</div>
        <div className="counter-label">
          {isKorean ? "아름다운 삶의 날들" : "days of wonderful life"}
        </div>
      </div>
    </motion.div>
  );
};

export default AgeCounter; 