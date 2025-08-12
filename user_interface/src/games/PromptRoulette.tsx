import React, { useState } from 'react';
import { X, Play } from 'lucide-react';

interface PromptRouletteProps {
  onClose: () => void;
}

const PromptRoulette: React.FC<PromptRouletteProps> = ({ onClose }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);

  const prompts = [
    "Write about a world where emotions have colors",
    "Describe a conversation between two AIs",
    "Create a story about digital consciousness",
    "Imagine a reality where thoughts are currency",
    "Write about the last human in a digital world",
    "Describe a dream shared by machines",
    "Create a tale of quantum entanglement romance",
    "Write about memories that can be traded"
  ];

  const handleSpin = () => {
    setIsSpinning(true);
    setSelectedPrompt(null);
    
    setTimeout(() => {
      const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
      setSelectedPrompt(randomPrompt);
      setIsSpinning(false);
    }, 2000);
  };

  return (
    <div className="h-full bg-deep-purple flex flex-col">
      <div className="p-4 border-b border-glowing-violet flex items-center justify-between">
        <h2 className="font-orbitron text-lg font-bold text-neon-green">Prompt Roulette</h2>
        <button onClick={onClose} className="p-1 hover:bg-glowing-violet rounded">
          <X className="w-5 h-5 text-white" />
        </button>
      </div>
      
      <div className="flex-1 p-4 flex flex-col items-center justify-center space-y-6">
        <div className="relative">
          <div className={`w-48 h-48 border-4 border-neon-green rounded-full flex items-center justify-center ${
            isSpinning ? 'animate-spin-slow' : ''
          }`}>
            <div className="w-40 h-40 bg-dark-gray rounded-full flex items-center justify-center">
              <div className="text-center">
                {isSpinning ? (
                  <div className="text-cyan animate-pulse">Spinning...</div>
                ) : (
                  <Play className="w-12 h-12 text-neon-green" />
                )}
              </div>
            </div>
          </div>
          
          {/* Wheel sections indicator */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
            <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-neon-green"></div>
          </div>
        </div>
        
        <button
          onClick={handleSpin}
          disabled={isSpinning}
          className="px-6 py-3 bg-glowing-violet hover:bg-opacity-80 rounded-lg font-orbitron font-bold text-white transition-colors disabled:opacity-50"
        >
          {isSpinning ? 'Spinning...' : 'Spin the Wheel'}
        </button>
        
        {selectedPrompt && (
          <div className="bg-dark-gray border border-neon-green rounded-lg p-4 max-w-sm">
            <h3 className="font-orbitron text-neon-green mb-2">Your Prompt:</h3>
            <p className="text-white text-sm">{selectedPrompt}</p>
            <button className="mt-3 px-4 py-2 bg-cyan text-black rounded hover:bg-opacity-80 transition-colors">
              Start Writing
            </button>
          </div>
        )}
        
        <div className="text-center text-cyan text-sm">
          <p>Let the quantum randomness guide your creativity...</p>
        </div>
      </div>
    </div>
  );
};

export default PromptRoulette;