import React, { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import '../styles/PhotoGallery.scss';

const PhotoGallery: React.FC = () => {
  const { scrollY } = useScroll();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const { i18n } = useTranslation();
  const isKorean = i18n.language === 'ko';
  
  // Create parallax effect for each photo
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -200]);
  const y3 = useTransform(scrollY, [0, 1000], [0, 150]);

  const photos = [
    {
      src: "https://placekitten.com/400/600",
      caption: {
        en: "Special moments",
        ko: "특별한 순간"
      },
      description: {
        en: "Every moment with you is precious",
        ko: "당신과 함께하는 모든 순간이 소중해요"
      }
    },
    {
      src: "https://placekitten.com/401/600",
      caption: {
        en: "Happy times",
        ko: "행복한 시간"
      },
      description: {
        en: "Your smile lights up the world",
        ko: "당신의 미소가 세상을 밝게 만들어요"
      }
    },
    {
      src: "https://placekitten.com/402/600",
      caption: {
        en: "Beautiful memories",
        ko: "아름다운 추억"
      },
      description: {
        en: "Creating memories that last forever",
        ko: "영원히 간직할 추억을 만들어요"
      }
    }
  ];

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
  };

  return (
    <div className="photo-gallery">
     
      

      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div 
              className="modal-content"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <img src={photos[selectedImage].src} alt={`Memory ${selectedImage + 1}`} />
              <div className="modal-caption">
                <h3>{photos[selectedImage].caption[isKorean ? 'ko' : 'en']}</h3>
                <p>{photos[selectedImage].description[isKorean ? 'ko' : 'en']}</p>
              </div>
              <button className="close-button" onClick={() => setSelectedImage(null)}>
                <i className="fas fa-times"></i>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PhotoGallery; 