import React, { useEffect, useState } from 'react';
import '../styles/Confetti.scss';

interface ConfettiPiece {
  id: number;
  left: string;
  color: string;
  delay: number;
  rotation: number;
}

const Confetti: React.FC = () => {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);

  const colors = ['#ff6b6b', '#ffd93d', '#4ecdc4', '#45b7d1', '#96f7d2'];

  useEffect(() => {
    const pieces: ConfettiPiece[] = [];
    for (let i = 0; i < 50; i++) {
      pieces.push({
        id: i,
        left: `${Math.random() * 100}%`,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 5,
        rotation: Math.random() * 360
      });
    }
    setConfetti(pieces);
  }, []);

  return (
    <div className="confetti-container">
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="confetti-piece"
          style={{
            left: piece.left,
            backgroundColor: piece.color,
            animationDelay: `${piece.delay}s`,
            transform: `rotate(${piece.rotation}deg)`
          }}
        />
      ))}
    </div>
  );
};

export default Confetti; 