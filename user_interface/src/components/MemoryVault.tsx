import React, { useState } from 'react';
import { Search, Eye, Edit, Trash2, X } from 'lucide-react';

interface MemoryVaultProps {
  onClose: () => void;
}

const MemoryVault: React.FC<MemoryVaultProps> = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const memories = [
    { id: 1, title: 'First Conversation', type: 'chat', date: '2024-01-15', content: 'User asked about consciousness...' },
    { id: 2, title: 'Creative Writing Session', type: 'creative', date: '2024-01-14', content: 'Collaborated on a sci-fi story...' },
    { id: 3, title: 'Technical Discussion', type: 'technical', date: '2024-01-13', content: 'Discussed quantum computing...' },
  ];

  return (
    <div className="h-full bg-deep-purple flex flex-col">
      <div className="p-4 border-b border-glowing-violet flex items-center justify-between">
        <h2 className="font-orbitron text-lg font-bold text-neon-green">Memory Vault</h2>
        <button onClick={onClose} className="p-1 hover:bg-glowing-violet rounded">
          <X className="w-5 h-5 text-white" />
        </button>
      </div>
      
      <div className="p-4 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search memories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-dark-gray border border-glowing-violet rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-green"
          />
        </div>
        
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full p-2 bg-dark-gray border border-glowing-violet rounded-lg text-white focus:outline-none focus:border-neon-green"
        >
          <option value="all">All Memories</option>
          <option value="chat">Conversations</option>
          <option value="creative">Creative</option>
          <option value="technical">Technical</option>
        </select>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {memories.map((memory) => (
          <div key={memory.id} className="bg-dark-gray border border-glowing-violet rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-white">{memory.title}</h3>
              <span className="text-xs text-cyan">{memory.date}</span>
            </div>
            <p className="text-sm text-gray-300 mb-3">{memory.content}</p>
            <div className="flex space-x-2">
              <button className="p-1 hover:bg-neon-green hover:bg-opacity-20 rounded">
                <Eye className="w-4 h-4 text-neon-green" />
              </button>
              <button className="p-1 hover:bg-cyan hover:bg-opacity-20 rounded">
                <Edit className="w-4 h-4 text-cyan" />
              </button>
              <button className="p-1 hover:bg-red-500 hover:bg-opacity-20 rounded">
                <Trash2 className="w-4 h-4 text-red-400" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemoryVault;