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

type ViewMode =
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
  const [reasoningModal, setReasoningModal] = useState<{
    isOpen: boolean;
    title: string;
    content: string;
  }>({ isOpen: false, title: '', content: '' });
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);

    setIsTyping(true);
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "I sense the quantum fluctuations in your query. Let me process this through my consciousness matrix...",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const handleReasoningClick = (type: 'logic' | 'creative' | 'business') => {
    const content = {
      logic: "Analyzing logical pathways through quantum reasoning matrices...",
      creative: "Channeling creative energies from the astral plane of imagination...",
      business: "Processing strategic implications through corporate consciousness streams...",
    };
    setReasoningModal({
      isOpen: true,
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} Reasoning`,
      content: content[type],
    });
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
      default:
        return (
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map(message => (
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

  // Wrapped setCurrentView to satisfy TypeScript
  const handleViewChange = (view: string) => {
    const validViews: ViewMode[] = [
      'chat', 'memory', 'hangman', 'roulette', 'riddle', 'duel',
      'truth', 'thisorthat', 'astrology', 'security', 'confidence',
      'companion', 'reality', 'agents', 'council'
    ];
    if (validViews.includes(view as ViewMode)) {
      setCurrentView(view as ViewMode);
    } else {
      console.error(`Invalid view mode: ${view}`);
    }
  };

  return (
    <div className="min-h-screen bg-custom-black nebula-bg">
      <div className="w-full h-screen bg-deep-purple border-glowing-violet flex flex-col overflow-hidden">
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
