import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

// Define the props for the component, including the onClose prop
interface RealityTunnelingProps {
  onClose: () => void;
}

// Define the data structures for type safety
interface Option {
  id: string;
  text: string;
  parent: string | null;
}

interface NodeData {
  id: string;
  title: string;
  description: string;
  options: Option[];
}

const RealityTunneling: React.FC<RealityTunnelingProps> = ({ onClose }) => {
  // State management for the application
  const [allNodes, setAllNodes] = useState<Record<string, NodeData>>({});
  const [history, setHistory] = useState<string[]>([]);
  const [visitedPaths, setVisitedPaths] = useState<Set<string>>(new Set());
  const [isFlowchartSidebarOpen, setIsFlowchartSidebarOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Refs for D3.js elements to persist across renders
  const flowchartSvgRef = useRef<SVGSVGElement>(null);
  const d3SvgRef = useRef<d3.Selection<SVGSVGElement | null, unknown, null, undefined> | null>(null);
  const d3gRef = useRef<d3.Selection<SVGGElement, unknown, null, undefined> | null>(null);
  const d3TreeRef = useRef<d3.TreeLayout<NodeData> | null>(null);
  
  // D3.js initialization: set up the SVG and tree layout on component mount
  useEffect(() => {
    if (flowchartSvgRef.current) {
      d3SvgRef.current = d3.select(flowchartSvgRef.current);
      d3gRef.current = d3SvgRef.current.append("g");
      d3TreeRef.current = d3.tree<NodeData>().nodeSize([100, 180]);
    }
  }, []);

  // Function to handle API call and response, generating a new scenario
  const generateNewScenario = async (userPrompt: string, isFirstNode = false) => {
    setIsLoading(true);

    // Payload for the Gemini API call, requesting a structured JSON response
    const payload = {
        contents: [{
            role: "user",
            parts: [{
                text: `You are a "Reality Tunneling AI". Given a user's question, create a plausible scenario and three distinct, branching options. Format the output as a JSON object with the following structure: { "title": "...", "description": "...", "options": [ { "text": "..." }, { "text": "..." }, { "text": "..." } ] }. The title should be a catchy name for the reality, the description a detailed explanation of the current situation, and each option should be a brief, single-sentence choice. The user's question is: "${userPrompt}"`
            }]
        }],
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: {
                type: "OBJECT",
                properties: {
                    "title": { "type": "STRING" },
                    "description": { "type": "STRING" },
                    "options": {
                        "type": "ARRAY",
                        "items": {
                            "type": "OBJECT",
                            "properties": {
                                "text": { "type": "STRING" }
                            }
                        }
                    }
                },
                "propertyOrdering": ["title", "description", "options"]
            }
        }
    };

    const apiKey = "";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        
        if (!response.ok) {
            throw new Error(`API call failed with status: ${response.status}`);
        }

        const result = await response.json();
        const jsonText = result?.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (!jsonText) {
            throw new Error('API response was empty or malformed.');
        }

        // Parse the JSON response and create a new node
        const data: Omit<NodeData, 'id' | 'options'> & { options: { text: string }[] } = JSON.parse(jsonText);
        const newNodeId = `node-${Date.now()}`;
        const newNode: NodeData = {
          id: newNodeId,
          title: data.title,
          description: data.description,
          options: data.options.map((opt, index) => ({
              id: `${newNodeId}-option-${index}`,
              text: opt.text,
              parent: isFirstNode ? null : history[history.length - 1],
          })),
        };

        // Update the state with the new node
        setAllNodes(prevNodes => ({ ...prevNodes, [newNodeId]: newNode }));

        if (isFirstNode) {
            setHistory([newNodeId]);
            setVisitedPaths(new Set());
        } else {
            const previousNodeId = history[history.length - 1];
            if (previousNodeId && allNodes[previousNodeId].options.length > 1) {
              setVisitedPaths(prev => new Set(prev).add(previousNodeId));
            }
            setHistory(prev => [...prev, newNodeId]);
        }

    } catch (error) {
        console.error('Error generating new scenario:', error);
        // Log a user-friendly error message
        console.error('Failed to generate scenario. Please try again.');
    } finally {
        setIsLoading(false);
    }
  };

  // D3.js rendering logic: updates the flowchart whenever nodes or history change
  useEffect(() => {
    if (!d3gRef.current || !d3TreeRef.current || Object.keys(allNodes).length === 0) {
      return;
    }
    
    // Clear previous SVG content
    d3gRef.current.selectAll("*").remove();
    
    // Find the root node to build the tree hierarchy
    let rootNode: NodeData | null = null;
    let nodesArray = Object.values(allNodes);
    
    if (nodesArray.length > 0) {
        let currentNode = nodesArray[nodesArray.length - 1];
        while (currentNode) {
            const parentId = currentNode.options[0]?.parent;
            if (!parentId) {
                rootNode = currentNode;
                break;
            }
            currentNode = allNodes[parentId];
        }
    }

    if (!rootNode) {
        console.error("Could not find root node for flowchart.");
        return;
    }
    
    // Create the D3 hierarchy from the root node
    const data = d3.hierarchy(rootNode, (d: NodeData) => {
        const childNodes: NodeData[] = [];
        Object.values(allNodes).forEach(node => {
          const hasParent = node.options.some(opt => opt.parent === d.id);
          if (hasParent) {
            childNodes.push(node);
          }
        });
        return childNodes;
    });
    
    const treeLayout = d3TreeRef.current(data);
    const nodes = treeLayout.descendants();

    const svgWidth = flowchartSvgRef.current?.clientWidth || 320;

    // Draw the links (paths) between nodes
    d3gRef.current.selectAll(".link")
        .data(data.links())
        .join("path")
        .attr("class", "link")
        .attr("fill", "none")
        .attr("stroke", "var(--glowing-violet)")
        .attr("stroke-width", 2)
        .attr("d", d3.linkVertical<d3.HierarchyPointLink<NodeData>>()
            .x((d: d3.HierarchyPointNode<NodeData>) => d.x)
            .y((d: d3.HierarchyPointNode<NodeData>) => d.y));

    // Draw the nodes (circles and text)
    const node = d3gRef.current.selectAll(".node")
        .data(nodes)
        .join("g")
        .attr("class", "node")
        .attr("transform", (d: d3.HierarchyPointNode<NodeData>) => `translate(${d.x},${d.y})`);

    node.append("circle")
        .attr("r", 10)
        .attr("fill", "var(--neon-green)")
        .attr("stroke", "var(--glowing-violet)")
        .attr("stroke-width", 2)
        .on("click", (event: MouseEvent, d: d3.HierarchyPointNode<NodeData>) => handleGoToNode(d.data.id));

    node.append("text")
        .attr("dy", "-1.5em")
        .attr("text-anchor", "middle")
        .attr("font-size", "10px")
        .attr("fill", "white")
        .text((d: d3.HierarchyPointNode<NodeData>) => d.data.title);

    node.append("text")
        .attr("dy", "0.5em")
        .attr("text-anchor", "middle")
        .attr("font-size", "16px")
        .attr("fill", (d: d3.HierarchyPointNode<NodeData>) => history.includes(d.data.id) ? "var(--neon-green)" : "transparent")
        .html((d: d3.HierarchyPointNode<NodeData>) => history.includes(d.data.id) ? '<i class="fas fa-check-circle"></i>' : '');

    // Center the tree
    const minX = d3.min(nodes, (d: d3.HierarchyPointNode<NodeData>) => d.x) || 0;
    const maxX = d3.max(nodes, (d: d3.HierarchyPointNode<NodeData>) => d.x) || 0;
    const treeWidth = maxX - minX;
    d3gRef.current.attr("transform", `translate(${svgWidth / 2 - minX - treeWidth / 2}, 20)`);
  
  }, [allNodes, history]);

  // Event handlers for UI interaction
  const handleGoBack = () => {
    if (history.length > 1) {
      setHistory(prev => prev.slice(0, -1));
    }
  };

  const handleGoToNode = (nodeId: string) => {
    const nodeIndex = history.indexOf(nodeId);
    if (nodeIndex !== -1) {
      setHistory(history.slice(0, nodeIndex + 1));
      setIsFlowchartSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    setIsFlowchartSidebarOpen(!isFlowchartSidebarOpen);
  };
  
  const handleSimulate = () => {
    if (prompt.trim()) {
      generateNewScenario(prompt.trim(), true);
    }
  };

  const currentNode = allNodes[history[history.length - 1]];

  return (
    <div className="h-screen flex flex-col font-inter bg-custom-black text-white">
      {/* Styles for the app, including Tailwind and custom CSS variables */}
      <style>
        {`
          :root {
              --neon-green: #39ff14;
              --glowing-violet: #8a2be2;
              --darker-violet: #4A148C;
              --dark-teal: #008080;
              --deep-purple: #1e112a;
              --dark-gray: #1a1a1a;
              --custom-black: #0d0d0d;
          }

          body {
              font-family: 'Inter', sans-serif;
              background-color: var(--custom-black);
              color: white;
          }

          .font-varela {
              font-family: 'Varela Round', sans-serif;
          }

          .text-neon-green { color: var(--neon-green); }
          .bg-neon-green { background-color: var(--neon-green); }
          .border-neon-green { border-color: var(--neon-green); }
          .text-glowing-violet { color: var(--glowing-violet); }
          .bg-glowing-violet { background-color: var(--glowing-violet); }
          .border-glowing-violet { border-color: var(--glowing-violet); }
          .text-darker-violet { color: var(--darker-violet); }
          .bg-darker-violet { background-color: var(--darker-violet); }
          .border-darker-violet { border-color: var(--darker-violet); }
          .text-dark-teal { color: var(--dark-teal); }
          .bg-dark-teal { background-color: var(--dark-teal); }
          .border-dark-teal { border-color: var(--dark-teal); }
          .bg-deep-purple { background-color: var(--deep-purple); }
          .bg-dark-gray { background-color: var(--dark-gray); }
          .bg-custom-black { background-color: var(--custom-black); }
          .text-custom-black { color: var(--custom-black); }

          .animate-pulse {
              animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
          @keyframes pulse {
              0%, 100% {
                  opacity: 1;
              }
              50% {
                  opacity: .5;
              }
          }
          
          .icon { font-family: 'Font Awesome 6 Free'; font-weight: 900; }
          .fa-git-branch::before { content: '\\f126'; }
          .fa-xmark::before { content: '\\f00d'; }
          .fa-arrow-left-long::before { content: '\\f177'; }
          .fa-play::before { content: '\\f04b'; }
          .fa-check-circle::before { content: '\\f058'; }
          .fa-chevron-down::before { content: '\\f078'; }
          .fa-chevron-right::before { content: '\\f054'; }
        `}
      </style>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />

      {/* Header with title and close button */}
      <div className="p-4 border-b border-glowing-violet flex items-center justify-between">
          <h2 className="text-lg font-bold text-neon-green font-varela">Reality Tunneling & Flowchart View</h2>
          <button className="p-1 hover:bg-glowing-violet rounded-full" onClick={onClose}>
              <i className="fas fa-xmark text-white"></i>
          </button>
      </div>

      {/* Main Content and Sidebar Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Pane: Chat-style content and prompt input */}
        <div className="flex-1 relative overflow-y-auto p-6 space-y-4">
          {/* Persistent Prompt Input Area */}
          <div className="p-4 rounded-lg bg-dark-gray sticky top-0 z-10 shadow-lg">
            <h3 className="font-bold text-lg text-neon-green font-varela">Simulate a Reality</h3>
            <p className="text-sm text-gray-400">
                Enter a simple "what-if" question below to begin a new reality simulation.
            </p>
            <div className="mt-4 flex space-x-2">
                <input
                  type="text"
                  placeholder="e.g., Should I wear a cap today in 80 degrees?"
                  className="flex-1 px-3 py-2 rounded-lg bg-custom-black border border-glowing-violet text-white text-sm focus:outline-none focus:border-neon-green"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSimulate()}
                />
                <button
                  onClick={handleSimulate}
                  disabled={isLoading}
                  className="px-4 py-2 bg-neon-green text-custom-black rounded-lg font-bold disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed"
                >
                  Simulate
                </button>
            </div>
            {isLoading && (
              <div className="mt-2 text-center text-cyan-400">
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  <span className="text-sm">Tuning into possibilities...</span>
              </div>
            )}
          </div>

          {/* Dynamic Chat History: displays the generated scenarios */}
          <div className="space-y-4">
            {history.map((nodeId, index) => {
              const node = allNodes[nodeId];
              if (!node) return null;
              
              const isCurrent = nodeId === history[history.length - 1];
              const isCrossroad = visitedPaths.has(nodeId);

              return (
                <div key={node.id} className="relative">
                  <div className={`w-full p-4 rounded-lg shadow-lg relative transition-all duration-300 ${isCurrent ? 'bg-darker-violet animate-pulse' : 'bg-dark-gray'}`}>
                    <div className="flex items-center space-x-2 mb-2">
                      <i className={`fas fa-git-branch ${isCurrent ? 'text-white' : 'text-cyan-400'}`}></i>
                      <h3 className={`font-bold text-lg ${isCurrent ? 'text-white' : 'text-neon-green'} font-varela`}>{node.title}</h3>
                      {isCrossroad && <div className="ml-auto"><i className="fas fa-check-circle text-green-500"></i></div>}
                    </div>
                    <p className={`text-sm leading-relaxed ${isCurrent ? 'text-white' : 'text-gray-400'}`}>{node.description}</p>
                  </div>
                  {isCurrent && node.options.length > 0 && (
                    <div className="mt-4 flex flex-col space-y-2">
                      {node.options.map((option, optionIndex) => (
                        <button
                          key={option.id}
                          className="w-full px-4 py-3 bg-darker-violet hover:bg-opacity-80 rounded-lg text-white text-left transition-colors font-bold"
                          onClick={() => generateNewScenario(option.text)}
                        >
                          {option.text}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Pane: D3.js Flowchart Sidebar */}
        <div className={`w-80 bg-deep-purple p-4 border-l border-glowing-violet overflow-y-auto transition-all duration-300 transform lg:translate-x-0 absolute inset-y-0 right-0 lg:static z-20 ${isFlowchartSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg text-neon-green font-bold font-varela">Flowchart</h4>
            <button onClick={toggleSidebar} className="lg:hidden p-1 rounded-full hover:bg-glowing-violet z-20">
                <i className="fas fa-xmark text-white"></i>
            </button>
          </div>
          {Object.keys(allNodes).length === 0 ? (
            <p className="text-gray-400 italic text-center">No reality flows to visualize yet.</p>
          ) : (
            <svg ref={flowchartSvgRef} className="w-full h-full"></svg>
          )}
        </div>
      </div>
      
      {/* Footer Navigation */}
      <div className="p-4 border-t border-glowing-violet flex items-center justify-between">
        <div className="flex space-x-2">
          <button
            onClick={handleGoBack}
            disabled={history.length <= 1}
            className="flex items-center space-x-2 px-3 py-1 rounded-full transition-colors bg-transparent border border-neon-green text-neon-green hover:bg-neon-green hover:text-custom-black disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed"
          >
            <i className="fas fa-arrow-left-long"></i>
            <span className="text-sm">Go Back</span>
          </button>
          
          <button
            onClick={toggleSidebar}
            className="flex items-center space-x-2 px-3 py-1 bg-dark-teal hover:bg-opacity-80 rounded-full text-white transition-colors"
          >
            <i className="fas fa-git-branch"></i>
            <span className="text-sm">Flowchart</span>
            <i className={`fas ${isFlowchartSidebarOpen ? 'fa-chevron-down' : 'fa-chevron-right'}`}></i>
          </button>
        </div>
        
        <button className="flex items-center space-x-2 px-3 py-1 bg-neon-green text-custom-black rounded-full font-bold transition-colors">
            <i className="fas fa-play"></i>
            <span className="text-sm">Start Flow</span>
        </button>
      </div>
    </div>
  );
};

export default RealityTunneling;
