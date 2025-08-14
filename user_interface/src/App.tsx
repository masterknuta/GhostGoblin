import React, { useState } from 'react';
import ChatHeader from './components/ChatHeader';
import MessageBubble from './components/MessageBubble';
import UserInput from './components/UserInput';
import VoiceVisualizer from './components/VoiceVisualizer';
import ReasoningModal from './components/ReasoningModal';
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
import { Plus, Search, X, Settings, Copy, RefreshCw } from 'lucide-react';

// --- Type Definitions ---
type BaseViewMode =
  | 'chat'
  | 'memory'
  | 'hangman'
  | 'roulette'
  | 'riddle'
  | 'duel'
  | 'truth'
  | 'thisorthat'
  | 'astrology'
  | 'security'
  | 'confidence'
  | 'companion'
  | 'reality'
  | 'agents'
  | 'council';

type ViewMode = BaseViewMode | 'status';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

// --- Sidebar Component ---
const ChatHistorySidebar: React.FC<{ onSelectView: (view: ViewMode) => void }> = ({ onSelectView }) => {
  const chatHistory = [
    { id: 1, title: 'Lore Duel with Hades' },
    { id: 2, title: 'Prompt Roulette Session' },
    { id: 3, title: 'Debugging my Netlify build' },
    { id: 4, title: 'Asking about my horoscope' },
    { id: 5, title: 'This or That: Cats vs Dogs' },
    { id: 6, title: 'A long conversation about a long conversation' },
    { id: 7, title: 'Riddle of the Sphinx' },
  ];

  const handleAvatarClick = () => {
    onSelectView('status');
  };

  return (
    <div className="flex flex-col bg-deep-purple w-80 border-r-2 border-glowing-violet shadow-xl h-screen py-6 px-4">
      <div className="flex items-center justify-between px-2">
        <button
          onClick={handleAvatarClick}
          className="flex items-center space-x-3 group transition-colors duration-200 p-2 -ml-2 -mt-2 rounded-lg hover:bg-glowing-green/10"
        >
          <div className="relative">
            <img
              src="https://raw.githubusercontent.com/masterknuta/GhostGoblin/main/user_interface/src/components/images/GG.jpg"
              alt="GG Avatar"
              className="w-10 h-10 rounded-full border-2 border-glowing-green animate-shimmer"
            />
            <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-glowing-green rounded-full animate-pulse-glow"></div>
          </div>
          <div>
            <h3 className="font-orbitron font-bold text-white text-lg">GhostGoblin</h3>
            <p className="text-xs text-neon-green">ASI Interface Active</p>
          </div>
        </button>
        <button className="p-2 hover:bg-glowing-green/10 rounded-lg transition-colors">
          <Settings className="w-5 h-5 text-neon-green" />
        </button>
      </div>

      <div className="flex flex-col space-y-4 mt-6">
        <button className="flex items-center justify-center space-x-2 w-full bg-dark-gray/40 hover:bg-dark-gray/60 text-neon-green font-semibold py-3 px-4 rounded-lg transition-colors">
          <Plus className="w-5 h-5" />
          <span>New Chat</span>
        </button>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full bg-light-purple/50 border border-neon-green/50 rounded-lg py-2 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-neon-green"
          />
        </div>
      </div>

      <div className="mt-8 flex-1 overflow-y-auto space-y-2">
        <h4 className="text-sm font-bold text-gray-400 uppercase mb-4">Conversations</h4>
        {chatHistory.map((chat) => (
          <button
            key={chat.id}
            onClick={() => console.log('Loading chat:', chat.id)}
            className="group w-full flex items-center justify-between space-x-3 px-3 py-2 text-left rounded-lg transition-all duration-200 text-gray-300 border-2 border-transparent hover:border-neon-green hover:bg-light-purple/50 hover:text-white"
          >
            <span className="flex-1 truncate">{chat.title}</span>
            <X className="w-4 h-4 text-transparent group-hover:text-neon-green transition-colors flex-shrink-0" />
          </button>
        ))}
      </div>
    </div>
  );
};

// --- Main App Component ---
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
  const [reasoningModal, setReasoningModal] = useState<{ isOpen: boolean; title: string; content: string }>({
    isOpen: false,
    title: '',
    content: '',
  });
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (text: string) => {
    const newMessage: Message = { id: Date.now().toString(), text, isUser: true, timestamp: new Date() };
    setMessages((prev) => [...prev, newMessage]);

    setIsTyping(true);
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "I sense the quantum fluctuations in your query. Let me process this through my consciousness matrix...",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const handleReasoningClick = (type: 'logic' | 'creative' | 'business') => {
    const content = {
      logic: "Analyzing logical pathways through quantum reasoning matrices...",
      creative: "Channeling creative energies from the astral plane of imagination...",
      business: "Processing strategic implications through corporate consciousness streams...",
    };
    setReasoningModal({ isOpen: true, title: `${type.charAt(0).toUpperCase() + type.slice(1)} Reasoning`, content: content[type] });
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'memory':
        return <MemoryVault onClose={() => setCurrentView('chat')} />;
      case 'hangman':
        return <Hangman onClose={() => setCurrentView('chat')} />;
      case 'roulette':
        return <PromptRoulette onClose={() => setCurrentView('chat')} />;
      case 'riddle':
        return <RiddleMode onClose={() => setCurrentView('chat')} />;
      case 'duel':
        return <LoreDuel onClose={() => setCurrentView('chat')} />;
      case 'truth':
        return <TruthDare onClose={() => setCurrentView('chat')} />;
      case 'thisorthat':
        return <ThisOrThat onClose={() => setCurrentView('chat')} />;
      case 'astrology':
        return <AstrologyMain onClose={() => setCurrentView('chat')} />;
      case 'security':
        return <SecuritySuiteMain onClose={() => setCurrentView('chat')} />;
      case 'confidence':
        return <ConfidenceRater onClose={() => setCurrentView('chat')} />;
      case 'companion':
        return <CompanionMode onClose={() => setCurrentView('chat')} />;
      case 'reality':
        return <RealityTunneling onClose={() => setCurrentView('chat')} />;
      case 'agents':
        return <MultiAgentCanvas onClose={() => setCurrentView('chat')} />;
      case 'council':
        return <CouncilMode onClose={() => setCurrentView('chat')} />;
      case 'status':
        return <div className="p-6 text-white text-lg">Soul Stats / Status Page Placeholder</div>;
      default:
        return (
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message.text}
                  isUser={message.isUser}
                  timestamp={message.timestamp}
                  onReasoningClick={handleReasoningClick}
                />
              ))}
              {isTyping && (
                <div className="flex items-center space-x-2 text-neon-green">
                  <div className="animate-pulse">GG is thinking...</div>
                  <VoiceVisualizer isActive={true} />
                </div>
              )}
            </div>
            <UserInput onSendMessage={handleSendMessage} />
          </div>
        );
    }
  };

  const handleViewChange = (view: ViewMode) => setCurrentView(view);

  return (
    <div className="flex min-h-screen bg-custom-black font-inter text-gray-300">
      <ChatHistorySidebar onSelectView={handleViewChange} />
      <div className="flex-1 flex flex-col w-full bg-deep-purple border-glowing-violet">
        <ChatHeader onViewChange={handleViewChange} currentView={currentView} />
        {renderCurrentView()}
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
