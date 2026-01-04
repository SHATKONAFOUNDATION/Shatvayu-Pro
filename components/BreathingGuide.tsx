import React, { useEffect, useState } from 'react';

export const BreathingGuide = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<'In' | 'Hold' | 'Out'>('In');
  const [seconds, setSeconds] = useState(4);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev === 1) {
          if (phase === 'In') { setPhase('Hold'); return 4; }
          if (phase === 'Hold') { setPhase('Out'); return 4; }
          if (phase === 'Out') { onComplete(); return 0; }
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [phase]);

  return (
    <div className="flex flex-col items-center justify-center p-10 bg-shatkonaGold/10 rounded-full border-2 border-shatkonaGold animate-pulse">
      <h2 className="text-4xl font-bold text-shatkonaGold mb-4">{phase.toUpperCase()}</h2>
      <p className="text-6xl text-white">{seconds}</p>
    </div>
  );
};