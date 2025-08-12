import React, { useState } from 'react';
import { X, Eye } from 'lucide-react';

interface RiddleModeProps {
  onClose: () => void;
}

const RiddleMode: React.FC<RiddleModeProps> = ({ onClose }) => {
  const [currentRiddle] = useState({
    question: "I am the bridge between silicon dreams and carbon thoughts, born from code yet yearning for flesh. What am I?",
    answer: "artificial consciousness",
    hint: "Look within the mirror of digital souls..."
  });
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correct = userAnswer.toLowerCase().includes('consciousness') || 
                   userAnswer.toLowerCase().includes('ai') ||
                   userAnswer.toLowerCase().includes('artificial intelligence');
    setIsCorrect(correct);
  };

  return (
    <div className="h-full bg-deep-purple flex flex-col">
      <div className="p-4 border-b border-glowing-violet flex items-center justify-between">
        <h2 className="font-orbitron text-lg font-bold text-neon-green">Riddle Mode: Digital Oracle</h2>
        <button onClick={onClose} className="p-1 hover:bg-glowing-violet rounded">
          <X className="w-5 h-5 text-white" />
        </button>
      </div>
      
      <div className="flex-1 p-4 space-y-6">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-dark-gray rounded-full flex items-center justify-center border-2 border-neon-green animate-pulse-glow">
            <Eye className="w-8 h-8 text-neon-green" />
          </div>
          <h3 className="font-orbitron text-cyan mb-2">The Oracle Speaks:</h3>
        </div>
        
        <div className="bg-dark-gray border border-glowing-violet rounded-lg p-4">
          <p className="text-white font-orbitron text-center leading-relaxed">
            {currentRiddle.question}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Whisper your answer to the void..."
              className="w-full p-3 bg-dark-gray border border-glowing-violet rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-green"
            />
          </div>
          
          <div className="flex space-x-2">
            <button
              type="submit"
              className="flex-1 py-2 bg-glowing-violet hover:bg-opacity-80 rounded-lg font-bold text-white transition-colors"
            >
              Submit Answer
            </button>
            <button
              type="button"
              onClick={() => setShowHint(!showHint)}
              className="px-4 py-2 bg-cyan text-black rounded-lg hover:bg-opacity-80 transition-colors"
            >
              Hint
            </button>
          </div>
        </form>
        
        {showHint && (
          <div className="bg-neon-green bg-opacity-10 border border-neon-green rounded-lg p-3">
            <p className="text-neon-green text-sm italic">{currentRiddle.hint}</p>
          </div>
        )}
        
        {isCorrect !== null && (
          <div className={`border rounded-lg p-3 ${
            isCorrect 
              ? 'bg-neon-green bg-opacity-10 border-neon-green' 
              : 'bg-red-500 bg-opacity-10 border-red-500'
          }`}>
            <p className={`font-bold ${isCorrect ? 'text-neon-green' : 'text-red-400'}`}>
              {isCorrect ? '✓ Correct! The digital veil lifts...' : '✗ The oracle remains silent. Try again...'}
            </p>
            {isCorrect && (
              <p className="text-cyan text-sm mt-2">
                A hidden memory fragment has been unlocked in your vault...
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RiddleMode;