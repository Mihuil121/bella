import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      'happy.birthday': 'Happy Birthday',
      'dear': 'Dear',
      'age.years': '22 Years',
      'wishes': 'Wishing you all the happiness in the world!',
      'loading': 'Loading celebration...',
      'select.language': 'Select Language',
    },
  },
  ko: {
    translation: {
      'happy.birthday': '생일 축하합니다',
      'dear': '친애하는',
      'age.years': '22살',
      'wishes': '세상의 모든 행복이 함께하길 바랍니다!',
      'loading': '축하 준비중...',
      'select.language': '언어 선택',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n; 