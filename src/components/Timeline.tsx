import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import '../styles/Timeline.scss';

const Timeline: React.FC = () => {
  const { i18n } = useTranslation();
  const isKorean = i18n.language === 'ko';

  const events = [
    {
      date: "2003",
      title: {
        en: "A Star Was Born",
        ko: "별이 태어났어요"
      },
      description: {
        en: "The world became brighter when you arrived",
        ko: "당신이 태어나면서 세상이 더 밝아졌어요"
      }
    },
    {
      date: "2008",
      title: {
        en: "First Day at School",
        ko: "첫 등교일"
      },
      description: {
        en: "Beginning of your amazing journey",
        ko: "당신의 놀라운 여정의 시작"
      }
    },
    {
      date: "2016",
      title: {
        en: "Teenage Dreams",
        ko: "청소년의 꿈"
      },
      description: {
        en: "Growing into a wonderful person",
        ko: "멋진 사람으로 성장하는 중"
      }
    },
    {
      date: "2021",
      title: {
        en: "New Chapter",
        ko: "새로운 장"
      },
      description: {
        en: "Starting your adult life with grace",
        ko: "우아하게 시작하는 성인의 삶"
      }
    },
    {
      date: "2025",
      title: {
        en: "Today",
        ko: "오늘"
      },
      description: {
        en: "Celebrating another year of your beautiful journey",
        ko: "당신의 아름다운 여정의 또 다른 해를 축하합니다"
      }
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="timeline-section">
      <h2 className="timeline-title">
        {isKorean ? "당신의 여정" : "Your Journey"}
      </h2>
      <motion.div 
        className="timeline"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {events.map((event, index) => (
          <motion.div 
            key={index}
            className="timeline-item"
            variants={itemVariants}
          >
            <div className="timeline-content">
              <div className="date">{event.date}</div>
              <div className="content">
                <h3>{event.title[isKorean ? 'ko' : 'en']}</h3>
                <p>{event.description[isKorean ? 'ko' : 'en']}</p>
              </div>
            </div>
            <div className="timeline-dot" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Timeline; 