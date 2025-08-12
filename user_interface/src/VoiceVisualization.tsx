import React, { useEffect, useState } from 'react';

interface VoiceVisualizerProps {
  isActive: boolean;
}

const VoiceVisualizer: React.FC<VoiceVisualizerProps> = ({ isActive }) => {
  const barsCount = 8;
  const [heights, setHeights] = useState<number[]>(Array(barsCount).fill(4));

  useEffect(() => {
    if (!isActive) {
      setHeights(Array(barsCount).fill(4));
      return;
    }

    const interval = setInterval(() => {
      setHeights(
        Array(barsCount)
          .fill(0)
          .map(() => Math.random() * 24 + 8)
      );
    }, 300); // update every 300ms

    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div className="flex items-center space-x-1 h-8">
      {heights.map((height, i) => (
        <div
          key={i}
          className="w-1 bg-neon-green rounded-full transition-all duration-300"
          style={{ height }}
        />
      ))}
    </div>
  );
};

export default VoiceVisualizer;
