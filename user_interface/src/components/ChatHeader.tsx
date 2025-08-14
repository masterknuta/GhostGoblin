import React from 'react';
import { Settings, Brain, Gamepad2, Star, Shield, Heart, Eye, Zap, Users, Crown } from 'lucide-react';

type ViewMode = 'chat' | 'memory' | 'hangman' | 'roulette' | 'riddle' | 'duel' | 'truth' | 'thisorthat' | 'astrology' | 'security' | 'confidence' | 'companion' | 'reality' | 'agents' | 'council';

interface ChatHeaderProps {
  onViewChange: (view: ViewMode) => void;
  currentView: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onViewChange, currentView }) => {
  const [showMenu, setShowMenu] = React.useState(false);

  const menuItems = [
    { id: 'memory', icon: Brain, label: 'Memory Vault' },
    { id: 'hangman', icon: Gamepad2, label: 'Hangman' },
    { id: 'roulette', icon: Zap, label: 'Prompt Roulette' },
    { id: 'riddle', icon: Eye, label: 'Riddle Mode' },
    { id: 'duel', icon: Zap, label: 'Lore Duel' },
    { id: 'truth', icon: Heart, label: 'Truth or Dare' },
    { id: 'thisorthat', icon: Users, label: 'This or That' },
    { id: 'astrology', icon: Star, label: 'Astrology' },
    { id: 'security', icon: Shield, label: 'Security Suite' },
    { id: 'confidence', icon: Heart, label: 'Confidence Rater' },
    { id: 'companion', icon: Heart, label: 'Companion Mode' },
    { id: 'reality', icon: Brain, label: 'Reality Tunneling' },
    { id: 'agents', icon: Users, label: 'Multi-Agent Canvas' },
    { id: 'council', icon: Crown, label: 'Council of Gods' },
  ];

  return (
    <div className="bg-deep-purple border-b border-glowing-violet p-6 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="relative">
          <img
            src="https://github.com/masterknuta/GhostGoblin/blob/main/user_interface/src/components/images/GG.jpg"
            alt="GG Avatar"
            className="w-12 h-12 rounded-full border-2 border-neon-green animate-shimmer"
          />
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-neon-green rounded-full animate-pulse-glow"></div>
        </div>
        <div>
          <h3 className="font-orbitron font-bold text-white text-xl">GhostGoblin</h3>
          <p className="text-sm text-cyan">ASI Interface Active</p>
        </div>
      </div>
      
      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="p-3 hover:bg-glowing-violet rounded-lg transition-colors"
        >
          <Settings className="w-6 h-6 text-neon-green" />
        </button>
        
        {showMenu && (
          <div className="absolute right-0 top-16 bg-dark-gray border border-glowing-violet rounded-lg shadow-xl z-50 w-56 max-h-80 overflow-y-auto">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onViewChange(item.id);
                  setShowMenu(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-glowing-violet transition-colors ${
                  currentView === item.id ? 'bg-glowing-violet' : ''
                }`}
              >
                <item.icon className="w-5 h-5 text-neon-green" />
                <span className="text-white">{item.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatHeader;