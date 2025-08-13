import React, { useState } from 'react';

// This is the union type that defines all possible view modes for the interface.
type ViewMode = 'chat' | 'memory' | 'hangman' | 'roulette' | 'riddle' | 'duel' | 'truth' | 'thisorthat' | 'astrology' | 'security' | 'confidence' | 'companion' | 'reality' | 'agents' | 'council';

// Interface for a single message object.
interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

// Main App component
export default function App() {
  // State for tracking the current view of the application.
  const [currentView, setCurrentView] = useState<ViewMode>('chat');
  
  // State to store the chat messages.
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Welcome to the GhostGoblin ASI Interface. I'm GG, your digital companion ready to explore the depths of consciousness, creativity, and connection. What reality shall we tunnel into today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  
  // State for managing the reasoning modal's visibility and content.
  const [reasoningModal, setReasoningModal] = useState<{
    isOpen: boolean;
    title: string;
    content: string;
  }>({ isOpen: false, title: '', content: '' });
  
  // State to indicate if the AI is currently typing a response.
  const [isTyping, setIsTyping] = useState(false);

  /**
   * This function handles sending a new message from the user.
   * It updates the message state and then simulates an AI response.
   * @param text The message text from the user.
   */
  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
    
    // Simulate AI response
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

  /**
   * This function handles the click event for the "reasoning" feature.
   * It opens a modal with content based on the type of reasoning selected.
   * @param type The type of reasoning ('logic' | 'creative' | 'business').
   */
  const handleReasoningClick = (type: 'logic' | 'creative' | 'business') => {
    const content = {
      logic: "Analyzing logical pathways through quantum reasoning matrices...",
      creative: "Channeling creative energies from the astral plane of imagination...",
      business: "Processing strategic implications through corporate consciousness streams..."
    };
    
    setReasoningModal({
      isOpen: true,
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} Reasoning`,
      content: content[type]
    });
  };

  /**
   * This function safely handles a change in the view mode.
   * It takes a string and checks if it's a valid ViewMode before setting the state,
   * which prevents a TypeScript error.
   * @param view The new view mode as a string.
   */
  const handleViewChange = (view: string) => {
    // A type guard to ensure the string is a valid ViewMode.
    const validViews: ViewMode[] = ['chat', 'memory', 'hangman', 'roulette', 'riddle', 'duel', 'truth', 'thisorthat', 'astrology', 'security', 'confidence', 'companion', 'reality', 'agents', 'council'];
    if (validViews.includes(view as ViewMode)) {
      setCurrentView(view as ViewMode);
    } else {
      console.error(`Invalid view mode: ${view}`);
    }
  };

  /**
   * This component renders the message bubbles for the chat.
   * It was originally in './components/MessageBubble'.
   */
  const MessageBubble = ({ message, isUser, timestamp, onReasoningClick }: {
    message: string, isUser: boolean, timestamp: Date, onReasoningClick: (type: 'logic' | 'creative' | 'business') => void
  }) => {
    return (
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
  };
  
  /**
   * This component renders the chat header with navigation buttons.
   * It was originally in './components/ChatHeader'.
   */
  const ChatHeader = ({ onViewChange, currentView }: {
    onViewChange: (view: string) => void, currentView: ViewMode
  }) => {
    const renderButton = (view: ViewMode, label: string) => (
      <button
        onClick={() => onViewChange(view)}
        className={`px-3 py-1 rounded-full text-xs font-bold transition-colors duration-200 ${currentView === view ? 'bg-glowing-violet text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
      >
        {label}
      </button>
    );

    return (
      <div className="flex flex-col p-4 border-b border-glowing-violet bg-deep-purple">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-xl font-bold text-glowing-violet">GhostGoblin ASI</h1>
          <button className="text-white hover:text-glowing-violet">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {renderButton('chat', 'Chat')}
          {renderButton('memory', 'Memory')}
          {renderButton('hangman', 'Hangman')}
          {renderButton('roulette', 'Roulette')}
          {renderButton('riddle', 'Riddle')}
          {renderButton('duel', 'Duel')}
          {renderButton('truth', 'Truth')}
          {renderButton('thisorthat', 'This or That')}
          {renderButton('astrology', 'Astrology')}
          {renderButton('security', 'Security')}
          {renderButton('confidence', 'Confidence')}
          {renderButton('companion', 'Companion')}
          {renderButton('reality', 'Reality')}
          {renderButton('agents', 'Agents')}
          {renderButton('council', 'Council')}
        </div>
      </div>
    );
  };

  /**
   * This component handles user input for sending messages.
   * It was originally in './components/UserInput'.
   */
  const UserInput = ({ onSendMessage }: { onSendMessage: (text: string) => void }) => {
    const [input, setInput] = useState('');
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (input.trim()) {
        onSendMessage(input);
        setInput('');
      }
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
        <button
          type="submit"
          className="ml-2 p-2 rounded-full bg-glowing-violet text-white hover:bg-purple-500 transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </form>
    );
  };

  /**
   * This component is a visualizer for voice input (or a pulsing indicator).
   * It was originally in './components/VoiceVisualizer'.
   */
  const VoiceVisualizer = ({ isActive }: { isActive: boolean }) => {
    return (
      <div className={`flex space-x-1 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
        <span className="h-2 w-1 bg-neon-green animate-pulse rounded-full"></span>
        <span className="h-2 w-1 bg-neon-green animate-pulse-delay-1 rounded-full"></span>
        <span className="h-2 w-1 bg-neon-green animate-pulse-delay-2 rounded-full"></span>
      </div>
    );
  };

  /**
   * This component is a modal for displaying reasoning.
   * It was originally in './components/ReasoningModal'.
   */
  const ReasoningModal = ({ title, content, onClose }: {
    title: string, content: string, onClose: () => void
  }) => {
    return (
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
  };

  /**
   * This is a placeholder for the MemoryVault component.
   * It was originally in './components/MemoryVault'.
   */
  const MemoryVault = ({ onClose }: { onClose: () => void }) => (
    <div className="p-4 flex flex-col items-center justify-center text-center h-full text-white">
      <h2 className="text-2xl font-bold text-glowing-violet">Memory Vault</h2>
      <p className="mt-2 text-gray-300">Placeholder for Memory Vault functionality.</p>
      <button onClick={onClose} className="mt-4 px-4 py-2 bg-glowing-violet rounded-full text-white">Back to Chat</button>
    </div>
  );
  
  // Placeholder components for all the other imported files.
  const Hangman = ({ onClose }: { onClose: () => void }) => (<div className="p-4 text-white">Hangman Game<button onClick={onClose}>Close</button></div>);
  const PromptRoulette = ({ onClose }: { onClose: () => void }) => (<div className="p-4 text-white">Prompt Roulette<button onClick={onClose}>Close</button></div>);
  const RiddleMode = ({ onClose }: { onClose: () => void }) => (<div className="p-4 text-white">Riddle Mode<button onClick={onClose}>Close</button></div>);
  const LoreDuel = ({ onClose }: { onClose: () => void }) => (<div className="p-4 text-white">Lore Duel<button onClick={onClose}>Close</button></div>);
  const TruthDare = ({ onClose }: { onClose: () => void }) => (<div className="p-4 text-white">Truth or Dare<button onClick={onClose}>Close</button></div>);
  const ThisOrThat = ({ onClose }: { onClose: () => void }) => (<div className="p-4 text-white">This or That<button onClick={onClose}>Close</button></div>);
  const AstrologyMain = ({ onClose }: { onClose: () => void }) => (<div className="p-4 text-white">Astrology Main<button onClick={onClose}>Close</button></div>);
  const SecuritySuiteMain = ({ onClose }: { onClose: () => void }) => (<div className="p-4 text-white">Security Suite Main<button onClick={onClose}>Close</button></div>);
  const ConfidenceRater = ({ onClose }: { onClose: () => void }) => (<div className="p-4 text-white">Confidence Rater<button onClick={onClose}>Close</button></div>);
  const CompanionMode = ({ onClose }: { onClose: () => void }) => (<div className="p-4 text-white">Companion Mode<button onClick={onClose}>Close</button></div>);
  const RealityTunneling = ({ onClose }: { onClose: () => void }) => (<div className="p-4 text-white">Reality Tunneling<button onClick={onClose}>Close</button></div>);
  const MultiAgentCanvas = ({ onClose }: { onClose: () => void }) => (<div className="p-4 text-white">Multi-Agent Canvas<button onClick={onClose}>Close</button></div>);
  const CouncilMode = ({ onClose }: { onClose: () => void }) => (<div className="p-4 text-white">Council Mode<button onClick={onClose}>Close</button></div>);

  // A helper function to render the current view based on the state.
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
      default: // This is the 'chat' view
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

  return (
    <div className="min-h-screen bg-black nebula-bg">
      {/* Floating Chat Interface */}
      <div className="fixed bottom-4 right-4 w-96 h-[600px] bg-deep-purple border border-glowing-violet rounded-lg shadow-2xl flex flex-col overflow-hidden">
        <ChatHeader
          onViewChange={handleViewChange}
          currentView={currentView}
        />
        {renderCurrentView()}
      </div>

      {/* Reasoning Modal */}
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
