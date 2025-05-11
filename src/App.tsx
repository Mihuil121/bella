import React, { useState } from 'react';
import './i18n/config';
import LoadingAge from './components/LoadingAge';
import LanguageSelector from './components/LanguageSelector';
import BirthdayContent from './components/BirthdayContent';
import './styles/App.scss';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <div className="app">
      {isLoading ? (
        <LoadingAge onLoadingComplete={handleLoadingComplete} />
      ) : (
        <>
          <LanguageSelector />
          <BirthdayContent />
        </>
      )}
    </div>
  );
};

export default App; 