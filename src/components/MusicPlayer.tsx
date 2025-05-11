import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import '../styles/MusicPlayer.scss';

interface Song {
  title: string;
  artist: string;
  url: string;
  link?: string; // Добавляем необязательное поле для ссылки
}

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const songs: Song[] = [
    {
      title: "Happy Birthday Song",
      artist: "For Bella",
      url: "/music/Bella.mp3"
    },
    {
      title: "Ведь только мне нужна",
      artist: "For Bella",
      url: "/music/121.m4a",
      link: "https://www.shazam.com/song/1751209385/d18f-d0b2d18bd182d0b0d189d183-d182d0b5d0b1d18f-d181d0be-d0b4d0bdd0b0"

    },
    {
      title: "Цаеточек аленький",
      artist: "For Bella",
      url: "/music/fly.m4a",
      link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },

  ];

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextSong = () => {
    setCurrentSong((prev) => (prev + 1) % songs.length);
    if (isPlaying && audioRef.current) {
      audioRef.current.play();
    }
  };

  const prevSong = () => {
    setCurrentSong((prev) => (prev - 1 + songs.length) % songs.length);
    if (isPlaying && audioRef.current) {
      audioRef.current.play();
    }
  };

  const openLink = () => {
    if (songs[currentSong].link) {
      window.open(songs[currentSong].link, '_blank');
    }
  };

  return (
    <motion.div 
      className="music-player"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <audio
        ref={audioRef}
        src={songs[currentSong].url}
        onEnded={nextSong}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      
      <div className="song-info">
        <h3>{songs[currentSong].title}</h3>
        <p>{songs[currentSong].artist}</p>
        <div className="song-progress">
          <span className="current-song">{currentSong + 1}/{songs.length}</span>
        </div>
      </div>

      <div className="controls">
        <button onClick={prevSong} className="control-button">
          <i className="fas fa-backward"></i>
        </button>
        
        <button onClick={togglePlay} className="play-button">
          {isPlaying ? (
            <i className="fas fa-pause"></i>
          ) : (
            <i className="fas fa-play"></i>
          )}
        </button>
        
        <button onClick={nextSong} className="control-button">
          <i className="fas fa-forward"></i>
        </button>

        {/* Кнопка для перехода по ссылке (отображается только если у песни есть ссылка) */}
        {songs[currentSong].link && (
          <button 
            onClick={openLink} 
            className="link-button"
            title="Перейти по ссылке / 링크로 이동"
          >
            <i className="fas fa-external-link-alt"></i>
            <span className="link-text">
              Link / 링크
            </span>
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default MusicPlayer;