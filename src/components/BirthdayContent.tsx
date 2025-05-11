import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import '../styles/BirthdayContent.scss';
import WishCards from './WishCards';
import MusicPlayer from './MusicPlayer';
import Confetti from './Confetti';
import AgeCounter from './AgeCounter';
import PhotoGallery from './PhotoGallery';
import Timeline from './Timeline';

const BirthdayContent: React.FC = () => {
  const { t } = useTranslation();
  const imageRef = useRef<HTMLImageElement>(null);
  const [showAge, setShowAge] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Initial animation for the image
    gsap.from(imageRef.current, {
      duration: 2,
      scale: 0.5,
      opacity: 0,
      rotation: 360,
      ease: "elastic.out(1, 0.3)"
    });

    // Age animation timeline
    const ageTl = gsap.timeline({
      onComplete: () => {
        setShowAge(false);
        setShowContent(true);
      }
    });

    ageTl.to(".age-text", {
      duration: 1,
      opacity: 1,
      y: 0,
      scale: 1,
      ease: "back.out(1.7)"
    })
    .to(".bella-text", {
      duration: 1,
      opacity: 1,
      y: 0,
      scale: 1,
      ease: "back.out(1.7)"
    }, "-=0.5")
    .to([".age-text", ".bella-text"], {
      duration: 1,
      opacity: 0,
      y: -50,
      scale: 0.8,
      delay: 2
    });
  }, []);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="birthday-content">
      <Confetti />
      <AnimatePresence>
        {showAge && (
          <motion.div
            className="age-intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="age-text"
              initial={{ opacity: 0, y: 50, scale: 0.5 }}
            >
              22
            </motion.div>
            <motion.div
              className="bella-text"
              initial={{ opacity: 0, y: 50, scale: 0.5 }}
            >
              Bella
            </motion.div>
          </motion.div>
        )}

        {showContent && (
          <>
            <motion.h1
              variants={itemVariants}
              className="title"
              initial="hidden"
              animate="visible"
            >
              {t('happy.birthday')}
            </motion.h1>
            
            <div className="image-container">
              <img
                ref={imageRef}
                src="/images/Bella.jpg"
                alt="Bella"
                className="profile-image"
              />
            </div>

            <motion.h2
              variants={itemVariants}
              className="name"
              initial="hidden"
              animate="visible"
            >
              {t('dear')} Bella
            </motion.h2>

            <AgeCounter />
            <Timeline />
            <WishCards />
            <PhotoGallery />
            <MusicPlayer />
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BirthdayContent;