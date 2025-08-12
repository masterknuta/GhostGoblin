import React, { useState, useEffect } from 'react';
import { X, Zap, Brain, Eye, Heart } from 'lucide-react';

interface MultiAgentCanvasProps {
  onClose: () => void;
}

interface MiniAgent {
  id: string;
  name: string;
  type: 'logic' | 'creative' | 'emotional' | 'analytical';
  x: number;
  y: number;
  status: 'idle' | 'thinking' | 'active' | 'collaborating';
  task: string;
}

const MultiAgentCanvas: React.FC<MultiAgentCanvasProps> = ({ onClose }) => {
  const [agents, setAgents] = useState<MiniAgent[]>([
    {
      id: 'logic-1',
      name: 'Logos',
      type: 'logic',
      x: 20,
      y: 30,
      status: 'thinking',
      task: 'Analyzing logical pathways'
    },
    {
      id: 'creative-1',
      name: 'Muse',
      type: 'creative',
      x: 70,
      y: 25,
      status: 'active',
      task: 'Generating narrative possibilities'
    },
    {
      id: 'emotional-1',
      name: 'Empathy',
      type: 'emotional',
      x: 45,
      y: 60,
      status: 'collaborating',
      task: 'Processing emotional context'
    },
    {
      id: 'analytical-1',
      name: 'Cipher',
      type: 'analytical',
      x: 25,
      y: 75,
      status: 'idle',
      task: 'Pattern recognition standby'
    }
  ]);

  const [connections, setConnections] = useState<Array<{from: string, to: string}>>([
    { from: 'logic-1', to: 'creative-1' },
    { from: 'creative-1', to: 'emotional-1' },
    { from: 'emotional-1', to: 'analytical-1' }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setAgents(prev => prev.map(agent => ({
        ...agent,
        status: ['idle', 'thinking', 'active', 'collaborating'][Math.floor(Math.random() * 4)] as any,
        x: Math.max(10, Math.min(90, agent.x + (Math.random() - 0.5) * 5)),
        y: Math.max(10, Math.min(90, agent.y + (Math.random() - 0.5) * 5))
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getAgentIcon = (type: MiniAgent['type']) => {
    switch (type) {
      case 'logic': return Brain;
      case 'creative': return Zap;
      case 'emotional': return Heart;
      case 'analytical': return Eye;
    }
  };

  const getStatusColor = (status: MiniAgent['status']) => {
    switch (status) {
      case 'idle': return 'text-gray-400';
      case 'thinking': return 'text-cyan animate-pulse';
      case 'active': return 'text-neon-green';
      case 'collaborating': return 'text-glowing-violet';
    }
  };

  const getAgentBorder = (status: MiniAgent['status']) => {
    switch (status) {
      case 'idle': return 'border-gray-600';
      case 'thinking': return 'border-cyan animate-pulse';
      case 'active': return 'border-neon-green animate-pulse-glow';
      case 'collaborating': return 'border-glowing-violet';
    }
  };

  return (
    <div className="h-full bg-deep-purple flex flex-col">
      <div className="p-4 border-b border-glowing-violet flex items-center justify-between">
        <h2 className="font-orbitron text-lg font-bold text-neon-green">Multi-Agent Canvas</h2>
        <button onClick={onClose} className="p-1 hover:bg-glowing-violet rounded">
          <X className="w-5 h-5 text-white" />
        </button>
      </div>
      
      <div className="p-4 border-b border-glowing-violet">
        <div className="flex items-center justify-between">
          <span className="text-cyan text-sm">Live Mini-G Agent Network</span>
          <div className="flex items-center space-x-4 text-xs">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
              <span className="text-neon-green">Active</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-cyan rounded-full animate-pulse"></div>
              <span className="text-cyan">Thinking</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-glowing-violet rounded-full"></div>
              <span className="text-glowing-violet">Collaborating</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex-1 relative overflow-hidden nebula-bg">
        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {connections.map((conn, index) => {
            const fromAgent = agents.find(a => a.id === conn.from);
            const toAgent = agents.find(a => a.id === conn.to);
            if (!fromAgent || !toAgent) return null;
            
            return (
              <line
                key={index}
                x1={`${fromAgent.x}%`}
                y1={`${fromAgent.y}%`}
                x2={`${toAgent.x}%`}
                y2={`${toAgent.y}%`}
                stroke="#8a2be2"
                strokeWidth="1"
                strokeDasharray="5,5"
                className="opacity-40"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  values="0;10"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </line>
            );
          })}
        </svg>
        
        {/* Mini-G Agents */}
        {agents.map(agent => {
          const IconComponent = getAgentIcon(agent.type);
          return (
            <div
              key={agent.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000"
              style={{ left: `${agent.x}%`, top: `${agent.y}%` }}
            >
              <div className={`w-16 h-16 rounded-full border-2 ${getAgentBorder(agent.status)} bg-dark-gray flex items-center justify-center cursor-pointer hover:scale-110 transition-transform`}>
                <IconComponent className={`w-8 h-8 ${getStatusColor(agent.status)}`} />
              </div>
              
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-center">
                <div className="bg-black bg-opacity-75 px-2 py-1 rounded text-xs">
                  <div className="font-orbitron text-white font-bold">{agent.name}</div>
                  <div className="text-gray-400">{agent.type}</div>
                </div>
              </div>
              
              {agent.status === 'active' && (
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-neon-green text-black px-2 py-1 rounded text-xs font-bold whitespace-nowrap">
                  {agent.task}
                </div>
              )}
            </div>
          );
        })}
        
        {/* Data Flow Particles */}
        {connections.map((conn, index) => {
          const fromAgent = agents.find(a => a.id === conn.from);
          const toAgent = agents.find(a => a.id === conn.to);
          if (!fromAgent || !toAgent) return null;
          
          return (
            <div
              key={`particle-${index}`}
              className="absolute w-2 h-2 bg-cyan rounded-full animate-consciousness-flow"
              style={{
                left: `${fromAgent.x}%`,
                top: `${fromAgent.y}%`,
                animationDelay: `${index * 0.5}s`
              }}
            />
          );
        })}
      </div>
      
      <div className="p-4 border-t border-glowing-violet">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-orbitron text-neon-green mb-2">Network Status</h4>
            <div className="space-y-1 text-white">
              <div>Active Agents: {agents.filter(a => a.status === 'active').length}</div>
              <div>Collaborations: {agents.filter(a => a.status === 'collaborating').length}</div>
            </div>
          </div>
          <div>
            <h4 className="font-orbitron text-cyan mb-2">Processing</h4>
            <div className="space-y-1 text-white">
              <div>Thinking: {agents.filter(a => a.status === 'thinking').length}</div>
              <div>Idle: {agents.filter(a => a.status === 'idle').length}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiAgentCanvas;