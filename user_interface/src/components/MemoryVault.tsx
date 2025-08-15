import React, { useState } from 'react';
import { Brain, X } from 'lucide-react';

// --- Component Interfaces ---

interface Lobe {
  id: string;
  title: string;
  subtitle: string;
  color: string;
}

interface Memory {
  id: string;
  type: string;
  title: string;
  content: string;
  timestamp: Date;
}

// --- Data & Constants ---

const brainLobes: Lobe[] = [
  { id: 'memory', title: 'MEMORY', subtitle: 'Archiving digital memories', color: 'border-neon-green' },
  { id: 'knowledge', title: 'KNOWLEDGE', subtitle: 'Vault of learned facts', color: 'border-blue-500' },
  { id: 'self-model', title: 'SELF-MODEL', subtitle: 'Perceiving self-identity', color: 'border-green-500' },
  { id: 'ontology', title: 'ONTOLOGY', subtitle: 'Mapping concepts and reality', color: 'border-cyan-500' },
  { id: 'goals', title: 'GOALS', subtitle: 'Formulating objectives', color: 'border-purple-500' },
  { id: 'journal', title: 'JOURNAL', subtitle: 'Documenting daily events', color: 'border-fuchsia-500' },
];

const mockMemories: Memory[] = [
  {
    id: '1',
    type: 'log',
    title: 'First boot sequence',
    content: 'Initial system diagnostics completed. All subroutines online. Awaiting user input.',
    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
  },
  {
    id: '2',
    type: 'log',
    title: 'System state snapshot',
    content: 'All cognitive lobes are initialized and ready for data ingestion.',
    timestamp: new Date(Date.now() - 1200000), // 20 minutes ago
  },
  {
    id: '3',
    type: 'log',
    title: 'User command acknowledged',
    content: 'Received command to remove Firebase dependencies. Commencing code refactoring.',
    timestamp: new Date(),
  },
];

// --- Memory Vault Component ---

const MemoryVault: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [activeLobe, setActiveLobe] = useState<Lobe | null>(null);

  const handleLobeClick = (lobe: Lobe) => {
    setActiveLobe(lobe);
  };

  const getLobePosition = (index: number) => {
    const angle = (index / brainLobes.length) * 2 * Math.PI;
    const radius = 180;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return {
      transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
    };
  };

  const renderActiveLobeView = () => {
    if (!activeLobe) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center p-4">
          <p className="text-gray-400 font-orbitron animate-pulse">
            Select a lobe to dive into GG's consciousness streams.
          </p>
        </div>
      );
    }
    return (
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <h3 className={`text-2xl font-bold font-orbitron text-center ${activeLobe.color.replace('border-', 'text-')}`}>
          {activeLobe.title}
        </h3>
        <p className="text-gray-300 text-center italic">{activeLobe.subtitle}</p>
        {activeLobe.id === 'memory' && (
          <div className="space-y-4">
            <h4 className="text-xl text-neon-green font-bold">Recent Memories:</h4>
            {mockMemories.length > 0 ? (
              mockMemories.map((memory) => (
                <div key={memory.id} className="bg-custom-black border border-glowing-violet rounded-lg p-4 shadow-lg transition-all duration-300 hover:scale-[1.02]">
                  <div className="flex justify-between items-center mb-2">
                    <h5 className="font-semibold text-white">{memory.title}</h5>
                    <span className="text-xs text-cyan-400">{memory.timestamp?.toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-gray-400">{memory.content}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">No memories found. Time to make some!</p>
            )}
          </div>
        )}
        {activeLobe.id !== 'memory' && (
          <div className="text-gray-500 text-center pt-8">
            <p className="italic">Data for {activeLobe.title} will be displayed here.</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4 border-b border-glowing-violet flex items-center justify-between">
        <h2 className="font-orbitron text-lg font-bold text-neon-green">Memory Vault</h2>
        <button onClick={onClose} className="p-1 hover:bg-glowing-violet rounded-full">
          <X className="w-5 h-5 text-white" />
        </button>
      </div>
      <div className="flex-1 p-8 flex flex-col items-center justify-center">
        <div className="relative w-[500px] h-[500px]">
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
            w-48 h-48 rounded-full border-4 border-cyan-500 flex items-center justify-center
            font-orbitron font-bold text-lg text-white text-center cursor-pointer transition-all duration-500
            shadow-[0_0_20px_rgba(0,255,255,0.7)] hover:scale-105"
          >
            <span className="tracking-widest">
              COGNITION<br />CORE
            </span>
          </div>
          {brainLobes.map((lobe, index) => (
            <div
              key={lobe.id}
              onClick={() => handleLobeClick(lobe)}
              style={getLobePosition(index)}
              className={`absolute top-1/2 left-1/2 w-32 h-32 rounded-full border-2 ${lobe.color}
              bg-deep-purple/50 flex flex-col items-center justify-center text-center
              cursor-pointer transition-all duration-500 hover:scale-110
              shadow-[0_0_10px_rgba(100,200,255,0.5)]`}
            >
              <h4 className="font-orbitron font-bold text-sm">{lobe.title}</h4>
              <p className="text-xs text-gray-400 italic mt-1">{lobe.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 bg-deep-purple border-t border-glowing-violet overflow-y-auto">
        {renderActiveLobeView()}
      </div>
    </div>
  );
};

export default MemoryVault;
