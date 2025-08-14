import React from 'react';

interface VoiceVisualizerProps {
  isActive: boolean;
}

const VoiceVisualizer: React.FC<VoiceVisualizerProps> = ({ isActive }) => {
  const bars = Array.from({ length: 8 }, (_, i) => i);

  return (
    <div className="flex items-center space-x-1 h-8">
      {bars.map((bar) => (
        <div
          key={bar}
          className={`w-1 bg-neon-green rounded-full transition-all duration-300 ${
            isActive 
              ? `animate-pulse h-${Math.floor(Math.random() * 6) + 2}` 
              : 'h-1'
          }`}
          style={{
            animationDelay: `${bar * 0.1}s`,
            height: isActive ? `${Math.random() * 24 + 8}px` : '4px'
          }}
        />
      ))}
    </div>
  );
};

export default VoiceVisualizer;