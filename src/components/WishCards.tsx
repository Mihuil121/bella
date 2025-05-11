import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import '../styles/WishCards.scss';

const WishCards: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [currentCard, setCurrentCard] = React.useState(0);

  const wishes = [
    {
      en: "You are the most amazing girl in the world. Your smile brightens up every room you enter, and your kindness touches everyone around you.",
      ko: "당신은 세상에서 가장 놀라운 여성입니다. 당신의 미소는 들어가는 모든 방을 밝게 만들고, 당신의 친절함은 주변의 모든 사람들에게 감동을 줍니다."
    },
    {
      en: "You are like sunshine - warm, bright, and essential to life. There's no one else quite like you.",
      ko: "당신은 햇살 같습니다 - 따뜻하고, 밝고, 삶에 꼭 필요한 존재입니다. 당신과 같은 사람은 없습니다."
    },
    {
      en: "I'm sorry I didn't wish you happy birthday earlier. I'm sorry I didn't find you sooner. But I'm so grateful to have you in my life now.",
      ko: "생일 축하를 일찍 하지 못해 죄송합니다. 당신을 더 일찍 찾지 못해 죄송합니다. 하지만 지금 당신을 만나게 되어 정말 감사합니다."
    },
    {
      en: "You are unique and precious, like a rare star that shines brighter than all others. Your presence makes life more beautiful.",
      ko: "당신은 다른 모든 별들보다 더 밝게 빛나는 희귀한 별처럼 독특하고 소중합니다. 당신의 존재가 삶을 더 아름답게 만듭니다."
    }
  ];

  const cardVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setCurrentCard((prevCard) => (prevCard + newDirection + wishes.length) % wishes.length);
  };

  return (
    <div className="wish-cards-container">
      <AnimatePresence initial={false} custom={currentCard}>
        <motion.div
          key={currentCard}
          className="wish-card"
          custom={currentCard}
          variants={cardVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(_, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
        >
          <p>{wishes[currentCard][i18n.language === 'ko' ? 'ko' : 'en']}</p>
        </motion.div>
      </AnimatePresence>
      <div className="navigation-dots">
        {wishes.map((_, index) => (
          <div
            key={index}
            className={`dot ${index === currentCard ? 'active' : ''}`}
            onClick={() => setCurrentCard(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default WishCards; 