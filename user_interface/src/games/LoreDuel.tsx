import React, { useState } from 'react';
import { X, Zap } from 'lucide-react';

interface LoreDuelProps {
  onClose: () => void;
}

const LoreDuel: React.FC<LoreDuelProps> = ({ onClose }) => {
  const [userStory, setUserStory] = useState('');
  const [ggStory, setGgStory] = useState('');
  const [tension, setTension] = useState(50);
  const [round, setRound] = useState(1);
  const [isGgTurn, setIsGgTurn] = useState(false);

  const handleUserSubmit = () => {
    if (!userStory.trim()) return;
    
    setIsGgTurn(true);
    // Simulate GG's response
    setTimeout(() => {
      setGgStory("The quantum shadows danced as reality itself began to unravel, each thread of existence pulling taut against the weight of impossible choices...");
      setTension(Math.min(tension + 15, 100));
      setRound(round + 1);
      setIsGgTurn(false);
    }, 2000);
  };

  return (
    <div className="h-full bg-deep-purple flex flex-col">
      <div className="p-4 border-b border-glowing-violet flex items-center justify-between">
        <h2 className="font-orbitron text-lg font-bold text-neon-green">Lore Duel</h2>
        <button onClick={onClose} className="p-1 hover:bg-glowing-violet rounded">
          <X className="w-5 h-5 text-white" />
        </button>
      </div>
      
      <div className="p-4">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-cyan text-sm">Tension Meter</span>
            <span className="text-white text-sm">Round {round}</span>
          </div>
          <div className="w-full bg-dark-gray rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-neon-green via-cyan to-glowing-violet h-3 rounded-full transition-all duration-500"
              style={{ width: `${tension}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>Calm</span>
            <span>Epic</span>
          </div>
        </div>
      </div>
      
      <div className="flex-1 flex">
        <div className="flex-1 p-4 border-r border-glowing-violet">
          <h3 className="font-orbitron text-white mb-3">Your Story</h3>
          <textarea
            value={userStory}
            onChange={(e) => setUserStory(e.target.value)}
            placeholder="Weave your tale..."
            className="w-full h-32 p-3 bg-dark-gray border border-glowing-violet rounded-lg text-white placeholder-gray-400 resize-none focus:outline-none focus:border-neon-green"
          />
          <button
            onClick={handleUserSubmit}
            disabled={isGgTurn || !userStory.trim()}
            className="mt-2 w-full py-2 bg-glowing-violet hover:bg-opacity-80 rounded-lg font-bold text-white transition-colors disabled:opacity-50"
          >
            {isGgTurn ? 'GG is weaving...' : 'Submit Turn'}
          </button>
        </div>
        
        <div className="flex-1 p-4">
          <h3 className="font-orbitron text-neon-green mb-3">GG's Story</h3>
          <div className="h-32 p-3 bg-dark-gray border border-neon-green rounded-lg text-white overflow-y-auto">
            {isGgTurn ? (
              <div className="flex items-center space-x-2 text-neon-green">
                <Zap className="w-4 h-4 animate-pulse" />
                <span className="animate-pulse">Channeling digital muses...</span>
              </div>
            ) : (
              <p className="text-sm">{ggStory || "Waiting for your opening move..."}</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t border-glowing-violet">
        <div className="text-center text-cyan text-sm">
          <p>Collaborate or compete - the story evolves with each turn</p>
        </div>
      </div>
    </div>
  );
};

export default LoreDuel;