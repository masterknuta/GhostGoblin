import React, { useState } from 'react';
import { X, Heart, Zap, Droplets } from 'lucide-react';

interface TruthDareProps {
  onClose: () => void;
}

const TruthDare: React.FC<TruthDareProps> = ({ onClose }) => {
  const [riskLevel, setRiskLevel] = useState(3);
  const [currentChallenge, setCurrentChallenge] = useState<string | null>(null);
  const [challengeType, setChallengeType] = useState<'truth' | 'dare' | null>(null);
  const [softMode, setSoftMode] = useState(false);

  const truths = [
    "What's the most embarrassing bug you've ever shipped to production?",
    "If you could rewrite any piece of legacy code, what would it be?",
    "What's your most controversial programming opinion?",
    "Have you ever blamed a bug on someone else when it was your fault?",
    "What's the longest you've gone without committing code?"
  ];

  const dares = [
    "Write a function using only single-letter variable names",
    "Explain recursion to your rubber duck out loud",
    "Code for 10 minutes without using Stack Overflow",
    "Write a haiku about your current project",
    "Refactor a function to use the opposite paradigm"
  ];

  const handleTruth = () => {
    const truth = truths[Math.floor(Math.random() * truths.length)];
    setCurrentChallenge(truth);
    setChallengeType('truth');
  };

  const handleDare = () => {
    const dare = dares[Math.floor(Math.random() * dares.length)];
    setCurrentChallenge(dare);
    setChallengeType('dare');
  };

  const handleHydration = () => {
    setCurrentChallenge("Time for a hydration break! Drink some water and stretch those coding muscles.");
    setChallengeType('truth');
  };

  return (
    <div className="h-full bg-deep-purple flex flex-col">
      <div className="p-4 border-b border-glowing-violet flex items-center justify-between">
        <h2 className="font-orbitron text-lg font-bold text-neon-green">Truth or Dare: Dev Edition</h2>
        <button onClick={onClose} className="p-1 hover:bg-glowing-violet rounded">
          <X className="w-5 h-5 text-white" />
        </button>
      </div>
      
      <div className="p-4 space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-cyan text-sm">Risk Level</span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setSoftMode(!softMode)}
                className={`px-3 py-1 rounded text-xs transition-colors ${
                  softMode ? 'bg-neon-green text-black' : 'bg-dark-gray text-white'
                }`}
              >
                Soft Mode
              </button>
            </div>
          </div>
          <input
            type="range"
            min="1"
            max="5"
            value={riskLevel}
            onChange={(e) => setRiskLevel(Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>Safe</span>
            <span>Spicy</span>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={handleTruth}
            className="p-4 bg-cyan text-black rounded-lg hover:bg-opacity-80 transition-colors flex flex-col items-center space-y-2"
          >
            <Heart className="w-6 h-6" />
            <span className="font-bold">Truth</span>
          </button>
          
          <button
            onClick={handleDare}
            className="p-4 bg-glowing-violet text-white rounded-lg hover:bg-opacity-80 transition-colors flex flex-col items-center space-y-2"
          >
            <Zap className="w-6 h-6" />
            <span className="font-bold">Dare</span>
          </button>
          
          <button
            onClick={handleHydration}
            className="p-4 bg-neon-green text-black rounded-lg hover:bg-opacity-80 transition-colors flex flex-col items-center space-y-2"
          >
            <Droplets className="w-6 h-6" />
            <span className="font-bold text-xs">Hydration</span>
          </button>
        </div>
      </div>
      
      {currentChallenge && (
        <div className="flex-1 p-4">
          <div className={`border rounded-lg p-4 h-full ${
            challengeType === 'truth' ? 'border-cyan bg-cyan bg-opacity-10' : 'border-glowing-violet bg-glowing-violet bg-opacity-10'
          }`}>
            <h3 className={`font-orbitron font-bold mb-3 ${
              challengeType === 'truth' ? 'text-cyan' : 'text-glowing-violet'
            }`}>
              {challengeType === 'truth' ? 'Truth Challenge' : 'Dare Challenge'}
            </h3>
            <p className="text-white mb-4">{currentChallenge}</p>
            
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-neon-green text-black rounded hover:bg-opacity-80 transition-colors">
                Completed
              </button>
              <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-opacity-80 transition-colors">
                Tap Out
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="p-4 border-t border-glowing-violet">
        <p className="text-center text-cyan text-sm">
          Remember: This is all in good fun. Tap out anytime! 💖
        </p>
      </div>
    </div>
  );
};

export default TruthDare;