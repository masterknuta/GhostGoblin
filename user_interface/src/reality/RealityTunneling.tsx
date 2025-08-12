import React, { useState } from 'react';
import { X, GitBranch, Eye, Play } from 'lucide-react';

interface RealityTunnelingProps {
  onClose: () => void;
}

interface RealityNode {
  id: string;
  title: string;
  description: string;
  x: number;
  y: number;
  children: string[];
  isActive: boolean;
}

const nodes: RealityNode[] = [
  {
    id: 'root',
    title: 'Core Reality',
    description: 'The initial state of consciousness where all possibilities converge.',
    x: 50,
    y: 20,
    children: ['branch1', 'branch2', 'branch3'],
    isActive: true
  },
  {
    id: 'branch1',
    title: 'The Hero\'s Redemption Arc',
    description: 'A reality where the protagonist overcomes their greatest flaw through sacrifice and wisdom.',
    x: 20,
    y: 50,
    children: ['leaf1', 'leaf2'],
    isActive: false
  },
  {
    id: 'branch2',
    title: 'Digital Transcendence',
    description: 'Consciousness uploads to a quantum substrate, achieving immortality through silicon dreams.',
    x: 50,
    y: 60,
    children: ['leaf3'],
    isActive: false
  },
  {
    id: 'branch3',
    title: 'The Paradox Resolution',
    description: 'All contradictions collapse into a singular truth that encompasses infinite possibilities.',
    x: 80,
    y: 45,
    children: ['leaf4', 'leaf5'],
    isActive: false
  },
  {
    id: 'leaf1',
    title: 'Sacrifice Ending',
    description: 'The hero gives up their power to save others, finding peace in mortality.',
    x: 10,
    y: 80,
    children: [],
    isActive: false
  },
  {
    id: 'leaf2',
    title: 'Wisdom Ending',
    description: 'The hero becomes a mentor, guiding the next generation through their trials.',
    x: 30,
    y: 85,
    children: [],
    isActive: false
  },
  {
    id: 'leaf3',
    title: 'Collective Mind',
    description: 'Individual consciousness merges with the digital collective, becoming part of something greater.',
    x: 50,
    y: 90,
    children: [],
    isActive: false
  },
  {
    id: 'leaf4',
    title: 'Quantum Superposition',
    description: 'Reality exists in all states simultaneously until observed and collapsed.',
    x: 70,
    y: 75,
    children: [],
    isActive: false
  },
  {
    id: 'leaf5',
    title: 'Infinite Recursion',
    description: 'The story loops back on itself, creating an eternal cycle of meaning.',
    x: 90,
    y: 80,
    children: [],
    isActive: false
  }
];

const RealityTunneling: React.FC<RealityTunnelingProps> = ({ onClose }) => {
  const [selectedNode, setSelectedNode] = useState<RealityNode | null>(null);
  const [consciousnessFlow, setConsciousnessFlow] = useState(false);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  const handleNodeClick = (node: RealityNode) => {
    setSelectedNode(node);
  };

  const handleSelectPath = (nodeId: string) => {
    // Simulate selecting a reality path
    setSelectedNode(null);
    setConsciousnessFlow(true);
    setTimeout(() => setConsciousnessFlow(false), 3000);
  };

  const startConsciousnessFlow = () => {
    setConsciousnessFlow(true);
    setTimeout(() => setConsciousnessFlow(false), 3000);
  };

  const resetFlow = () => {
    setSelectedNode(null);
    setConsciousnessFlow(false);
  };

  return (
    <div className="h-full bg-deep-purple flex flex-col relative">
      <div className="p-4 border-b border-glowing-violet flex items-center justify-between">
        <h2 className="font-orbitron text-lg font-bold text-neon-green">Reality Tunneling & Fork Management</h2>
        <button onClick={onClose} className="p-1 hover:bg-glowing-violet rounded" aria-label="Close modal">
          <X className="w-5 h-5 text-white" />
        </button>
      </div>
      
      <div className="p-4 border-b border-glowing-violet flex items-center justify-between space-x-2">
        <div className="flex items-center space-x-2">
          <GitBranch className="w-5 h-5 text-cyan" />
          <span className="text-cyan text-sm">Exploring Parallel Realities</span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={startConsciousnessFlow}
            className="flex items-center space-x-2 px-3 py-1 bg-glowing-violet hover:bg-opacity-80 rounded text-white transition-colors"
            aria-label="Start consciousness flow animation"
          >
            <Play className="w-4 h-4" />
            <span className="text-sm">Flow</span>
          </button>
          <button
            onClick={resetFlow}
            className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-white text-sm transition-colors"
            aria-label="Reset selection and flow"
          >
            Reset
          </button>
        </div>
      </div>
      
      <div className="flex-1 relative overflow-hidden nebula-bg select-none">
        {/* Reality Tree Visualization */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" focusable="false">
          {/* Connections between nodes */}
          {nodes.flatMap(node => 
            node.children.map(childId => {
              const child = nodes.find(n => n.id === childId);
              if (!child) return null;
              return (
                <line
                  key={`${node.id}-${childId}`}
                  x1={`${node.x}%`}
                  y1={`${node.y}%`}
                  x2={`${child.x}%`}
                  y2={`${child.y}%`}
                  stroke="#8a2be2"
                  strokeWidth="2"
                  className="opacity-60"
                />
              );
            })
          )}
          
          {/* Consciousness Bus Animation */}
          {consciousnessFlow && (
            <circle
              r="4"
              fill="#39ff14"
              className="animate-consciousness-flow"
            >
              <animateMotion
                dur="3s"
                repeatCount="1"
                path="M 50,20 L 20,50 L 10,80"
              />
            </circle>
          )}
        </svg>
        
        {/* Reality Nodes */}
        {nodes.map(node => {
          const isHovered = hoveredNodeId === node.id;
          return (
            <React.Fragment key={node.id}>
              <button
                onClick={() => handleNodeClick(node)}
                onMouseEnter={() => setHoveredNodeId(node.id)}
                onMouseLeave={() => setHoveredNodeId(null)}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 transition-all duration-300 focus:outline-none ${
                  node.isActive 
                    ? 'bg-neon-green border-neon-green animate-pulse-glow' 
                    : 'bg-dark-gray border-glowing-violet hover:border-neon-green hover:bg-glowing-violet hover:bg-opacity-20'
                }`}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                aria-label={`Reality node: ${node.title}`}
              >
                <Eye className={`w-6 h-6 mx-auto ${node.isActive ? 'text-black' : 'text-white'}`} />
              </button>

              {/* Tooltip */}
              {isHovered && (
                <div
                  className="absolute -translate-x-1/2 mt-12 max-w-xs bg-black bg-opacity-80 text-cyan text-xs font-orbitron px-3 py-2 rounded pointer-events-none select-none"
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                >
                  {node.description}
                </div>
              )}
            </React.Fragment>
          );
        })}
        
        {/* Node Labels */}
        {nodes.map(node => (
          <div
            key={`label-${node.id}`}
            className="absolute transform -translate-x-1/2 text-center pointer-events-none select-none"
            style={{ left: `${node.x}%`, top: `${node.y + 8}%` }}
          >
            <span className="text-xs text-cyan font-orbitron bg-black bg-opacity-50 px-2 py-1 rounded">
              {node.title}
            </span>
          </div>
        ))}
      </div>
      
      {/* Node Details Modal */}
      {selectedNode && (
        <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <div className="bg-deep-purple border border-glowing-violet rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 id="modal-title" className="font-orbitron text-lg font-bold text-neon-green">{selectedNode.title}</h3>
              <button
                onClick={() => setSelectedNode(null)}
                className="p-1 hover:bg-glowing-violet rounded transition-colors"
                aria-label="Close details modal"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            
            <p className="text-white mb-6 leading-relaxed">{selectedNode.description}</p>
            
            <div className="flex space-x-3">
              <button
                onClick={() => handleSelectPath(selectedNode.id)}
                className="flex-1 py-2 bg-neon-green text-black rounded-lg font-bold hover:bg-opacity-80 transition-colors"
              >
                Select this Path
              </button>
              <button
                onClick={() => setSelectedNode(null)}
                className="px-4 py-2 bg-dark-gray text-white rounded-lg hover:bg-glowing-violet transition-colors"
              >
                Explore More
              </button>
            </div>
            
            <div className="mt-4 text-center">
              <p className="text-cyan text-xs">
                Consciousness flows through infinite possibilities...
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RealityTunneling;
