import React, { useState } from 'react';
import MemoryVault from './components/MemoryVault';
import Hangman from './components/games/Hangman';
import PromptRoulette from './components/games/PromptRoulette';
import RiddleMode from './components/games/RiddleMode';
import LoreDuel from './components/games/LoreDuel';
import TruthDare from './components/games/TruthDare';
import ThisOrThat from './components/games/ThisOrThat';
import AstrologyMain from './components/astrology/AstrologyMain';
import SecuritySuiteMain from './components/security/SecuritySuiteMain';
import ConfidenceRater from './components/confidence/ConfidenceRater';
import CompanionMode from './components/companion/CompanionMode';
import RealityTunneling from './components/reality/RealityTunneling';
import MultiAgentCanvas from './components/MultiAgentCanvas';
import CouncilMode from './components/CouncilMode';

type ViewMode =
  | 'chat' | 'memory' | 'hangman' | 'roulette' | 'riddle' | 'duel'
  | 'truth' | 'thisorthat' | 'astrology' | 'security' | 'confidence'
  | 'companion' | 'reality' | 'agents' | 'council';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('chat');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Welcome to the GhostGoblin ASI Interface. I'm GG, your digital companion ready to explore the depths of consciousness, creativity, and connection. What reality shall we tunnel into today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [reasoningModal, setReasoningModal] = useState<{ isOpen: boolean; title: string; content: string; }>({ isOpen: false, title: '', content: '' });
  const [isTyping, setIsTyping] = useState(false);

  // --- Inline components from working file ---
  const MessageBubble = ({ message, isUser, timestamp, onReasoningClick }: { message: string, isUser: boolean, timestamp: Date, onReasoningClick: (type: 'logic' | 'creative' | 'business') => void }) => (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`p-4 rounded-lg shadow-lg max-w-xs ${isUser ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-200'}`}>
        <p className="text-sm font-light">{message}</p>
        <div className="flex justify-between items-center text-xs mt-2 text-gray-400">
          <span>{timestamp.toLocaleTimeString()}</span>
          {!isUser && (
            <div className="flex space-x-2">
              <button className="text-green-400 hover:text-green-300" onClick={() => onReasoningClick('logic')}>Logic</button>
              <button className="text-green-400 hover:text-green-300" onClick={() => onReasoningClick('creative')}>Creative</button>
              <button className="text-green-400 hover:text-green-300" onClick={() => onReasoningClick('business')}>Business</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const UserInput = ({ onSendMessage }: { onSendMessage: (text: string) => void }) => {
    const [input, setInput] = useState('');
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (input.trim()) { onSendMessage(input); setInput(''); }
    };
    return (
      <form onSubmit={handleSubmit} className="p-4 border-t border-glowing-violet flex items-center bg-deep-purple">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 rounded-lg bg-gray-800 text-white border-none focus:outline-none focus:ring-2 focus:ring-glowing-violet"
          placeholder="What reality shall we tunnel into?"
        />
        <button type="submit" className="ml-2 p-2 rounded-full bg-glowing-violet text-white hover:bg-purple-500 transition-colors duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </form>
    );
  };

  const VoiceVisualizer = ({ isActive }: { isActive: boolean }) => (
    <div className={`flex space-x-1 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
      <span className="h-2 w-1 bg-neon-green animate-pulse rounded-full"></span>
      <span className="h-2 w-1 bg-neon-green animate-pulse-delay-1 rounded-full"></span>
      <span className="h-2 w-1 bg-neon-green animate-pulse-delay-2 rounded-full"></span>
    </div>
  );

  const ReasoningModal = ({ title, content, onClose }: { title: string, content: string, onClose: () => void }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
      <div className="bg-deep-purple border border-glowing-violet rounded-lg shadow-2xl p-6 w-11/12 max-w-lg text-white">
        <div className="flex justify-between items-center border-b border-glowing-violet pb-2 mb-4">
          <h2 className="text-xl font-bold text-glowing-violet">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className="text-sm">{content}</p>
      </div>
    </div>
  );

  // --- Handlers ---
  const handleSend = (text: string) => {
    handleSendMessage(text);
  };

  const handleReasoning = (type: 'logic' | 'creative' | 'business') => {
    const content = {
      logic: "Analyzing logical pathways through quantum reasoning matrices...",
      creative: "Channeling creative energies from the astral plane of imagination...",
      business: "Processing strategic implications through corporate consciousness streams..."
    };
    setReasoningModal({ isOpen: true, title: `${type.charAt(0).toUpperCase() + type.slice(1)} Reasoning`, content: content[type] });
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'memory': return <MemoryVault onClose={() => setCurrentView('chat')} />;
      case 'hangman': return <Hangman onClose={() => setCurrentView('chat')} />;
      case 'roulette': return <PromptRoulette onClose={() => setCurrentView('chat')} />;
      case 'riddle': return <RiddleMode onClose={() => setCurrentView('chat')} />;
      case 'duel': return <LoreDuel onClose={() => setCurrentView('chat')} />;
      case 'truth': return <TruthDare onClose={() => setCurrentView('chat')} />;
      case 'thisorthat': return <ThisOrThat onClose={() => setCurrentView('chat')} />;
      case 'astrology': return <AstrologyMain onClose={() => setCurrentView('chat')} />;
      case 'security': return <SecuritySuiteMain onClose={() => setCurrentView('chat')} />;
      case 'confidence': return <ConfidenceRater onClose={() => setCurrentView('chat')} />;
      case 'companion': return <CompanionMode onClose={() => setCurrentView('chat')} />;
      case 'reality': return <RealityTunneling onClose={() => setCurrentView('chat')} />;
      case 'agents': return <MultiAgentCanvas onClose={() => setCurrentView('chat')} />;
      case 'council': return <CouncilMode onClose={() => setCurrentView('chat')} />;
      default:
        return (
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map(m => (
                <MessageBubble
                  key={m.id}
                  message={m.text}
                  isUser={m.isUser}
                  timestamp={m.timestamp}
                  onReasoningClick={handleReasoning}
                />
              ))}
              {isTyping && (
                <div className="flex items-center space-x-2 text-neon-green">
                  <div className="animate-pulse">GG is thinking...</div>
                  <VoiceVisualizer isActive={true} />
                </div>
              )}
            </div>
            <UserInput onSendMessage={handleSend} />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-custom-black nebula-bg">
      <div className="fixed bottom-4 right-4 w-96 h-[600px] bg-deep-purple border border-glowing-violet rounded-lg shadow-2xl flex flex-col overflow-hidden">
        <div className="flex flex-col">
          {renderCurrentView()}
        </div>
      </div>

      {reasoningModal.isOpen && (
        <ReasoningModal
          title={reasoningModal.title}
          content={reasoningModal.content}
          onClose={() => setReasoningModal({ isOpen: false, title: '', content: '' })}
        />
      )}
    </div>
  );
}
