import React from 'react';
import { Copy, RefreshCw } from 'lucide-react';

interface MessageBubbleProps {
  message: string;
  isUser: boolean;
  timestamp: Date;
  onReasoningClick: (type: 'logic' | 'creative' | 'business') => void;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ 
  message, 
  isUser, 
  timestamp, 
  onReasoningClick 
}) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(message);
  };

  const contextualButtons = [
    { emoji: '🌌', label: 'Expand Theme' },
    { emoji: '🎭', label: 'Change Tone' },
    { emoji: '🔮', label: 'Mystify' },
  ];

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-2xl px-6 py-4 rounded-lg ${
        isUser 
          ? 'bg-glowing-violet text-white' 
          : 'bg-dark-gray text-slate-100'
      }`}>
        <p className="text-base leading-relaxed">{message}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm opacity-70">
            {timestamp.toLocaleTimeString()}
          </span>
          <div className="flex space-x-1">
            <button
              onClick={handleCopy}
              className="p-2 hover:bg-neon-green hover:bg-opacity-20 rounded transition-colors"
            >
              <Copy className="w-4 h-4" />
            </button>
            {!isUser && (
              <button className="p-2 hover:bg-neon-green hover:bg-opacity-20 rounded transition-colors">
                <RefreshCw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
        
        {!isUser && (
          <>
            {/* Reasoning Buttons */}
            <div className="flex space-x-2 mt-3">
              <button
                onClick={() => onReasoningClick('logic')}
                className="px-3 py-2 bg-cyan bg-opacity-20 text-cyan text-sm rounded hover:bg-opacity-30 transition-colors"
              >
                Logic
              </button>
              <button
                onClick={() => onReasoningClick('creative')}
                className="px-3 py-2 bg-glowing-violet bg-opacity-20 text-glowing-violet text-sm rounded hover:bg-opacity-30 transition-colors"
              >
                Creative
              </button>
              <button
                onClick={() => onReasoningClick('business')}
                className="px-3 py-2 bg-neon-green bg-opacity-20 text-neon-green text-sm rounded hover:bg-opacity-30 transition-colors"
              >
                Business
              </button>
            </div>
            
            {/* Contextual Buttons */}
            <div className="flex flex-wrap gap-1 mt-2">
              {contextualButtons.map((button, index) => (
                <button
                  key={index}
                  className="px-3 py-2 bg-deep-purple border border-neon-green text-neon-green text-sm rounded hover:bg-neon-green hover:text-black transition-colors"
                >
                  {button.emoji} {button.label}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;