import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface RealityTunnelingProps {
  onClose: () => void;
}

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
  const [allNodes, setAllNodes] = useState<Record<string, NodeData>>({});
  const [history, setHistory] = useState<string[]>([]);
  const [visitedPaths, setVisitedPaths] = useState<Set<string>>(new Set());
  const [isFlowchartSidebarOpen, setIsFlowchartSidebarOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const flowchartSvgRef = useRef<SVGSVGElement | null>(null);
  const d3gRef = useRef<d3.Selection<SVGGElement, unknown, null, undefined> | null>(null);
  const d3TreeRef = useRef<d3.TreeLayout<NodeData> | null>(null);

  // Initialize D3
  useEffect(() => {
    if (flowchartSvgRef.current) {
      const svgSelection = d3.select(flowchartSvgRef.current) as d3.Selection<SVGSVGElement | null, unknown, null, undefined>;
      d3gRef.current = svgSelection.append('g');
      d3TreeRef.current = d3.tree<NodeData>().nodeSize([100, 180]);
    }
  }, []);

  const generateNewScenario = async (userPrompt: string, isFirstNode = false) => {
    setIsLoading(true);
    const payload = {
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `You are a "Reality Tunneling AI". Given a user's question, create a plausible scenario and three distinct, branching options. Format the output as a JSON object with the following structure: { "title": "...", "description": "...", "options": [ { "text": "..." }, { "text": "..." }, { "text": "..." } ] }. The title should be a catchy name for the reality, the description a detailed explanation of the current situation, and each option should be a brief, single-sentence choice. The user's question is: "${userPrompt}"`
            }
          ]
        }
      ],
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: 'OBJECT',
          properties: {
            title: { type: 'STRING' },
            description: { type: 'STRING' },
            options: {
              type: 'ARRAY',
              items: { type: 'OBJECT', properties: { text: { type: 'STRING' } } }
            }
          },
          propertyOrdering: ['title', 'description', 'options']
        }
      }
    };

    const apiKey = '';
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error(`API call failed with status: ${response.status}`);
      const result = await response.json();
      const jsonText = result?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!jsonText) throw new Error('API response was empty or malformed.');

      const data: Omit<NodeData, 'id' | 'options'> & { options: { text: string }[] } = JSON.parse(jsonText);
      const newNodeId = `node-${Date.now()}`;
      const newNode: NodeData = {
        id: newNodeId,
        title: data.title,
        description: data.description,
        options: data.options.map((opt, index) => ({
          id: `${newNodeId}-option-${index}`,
          text: opt.text,
          parent: isFirstNode ? null : history[history.length - 1]
        }))
      };

      setAllNodes(prev => ({ ...prev, [newNodeId]: newNode }));
      if (isFirstNode) {
        setHistory([newNodeId]);
        setVisitedPaths(new Set());
      } else {
        const previousNodeId = history[history.length - 1];
        if (previousNodeId && allNodes[previousNodeId]?.options.length > 1) {
          setVisitedPaths(prev => new Set(prev).add(previousNodeId));
        }
        setHistory(prev => [...prev, newNodeId]);
      }
    } catch (err) {
      console.error('Error generating scenario:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!d3gRef.current || !d3TreeRef.current || Object.keys(allNodes).length === 0) return;

    d3gRef.current.selectAll('*').remove();

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
    if (!rootNode) return;

    const data = d3.hierarchy(rootNode, d => {
      const children = Object.values(allNodes).filter(node =>
        node.options.some(opt => opt.parent === d.id)
      );
      return children.length > 0 ? children : null;
    });

    const treeLayout = d3TreeRef.current(data);
    const nodes = treeLayout.descendants();

    const svgWidth = flowchartSvgRef.current?.clientWidth || 320;

    const linkGenerator = d3.linkVertical<d3.HierarchyPointLink<NodeData>, d3.HierarchyPointNode<NodeData>>()
      .x(d => d.x)
      .y(d => d.y);

    d3gRef.current.selectAll('.link')
      .data(treeLayout.links())
      .join('path')
      .attr('class', 'link')
      .attr('fill', 'none')
      .attr('stroke', 'var(--glowing-violet)')
      .attr('stroke-width', 2)
      .attr('d', linkGenerator);

    const node = d3gRef.current.selectAll('.node')
      .data(nodes)
      .join('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.x},${d.y})`);

    node.append('circle')
      .attr('r', 10)
      .attr('fill', 'var(--neon-green)')
      .attr('stroke', 'var(--glowing-violet)')
      .attr('stroke-width', 2)
      .on('click', (_, d) => handleGoToNode(d.data.id));

    node.append('text')
      .attr('dy', '-1.5em')
      .attr('text-anchor', 'middle')
      .attr('font-size', '10px')
      .attr('fill', 'white')
      .text(d => d.data.title);

    node.append('text')
      .attr('dy', '0.5em')
      .attr('text-anchor', 'middle')
      .attr('font-size', '16px')
      .attr('fill', d => history.includes(d.data.id) ? 'var(--neon-green)' : 'transparent')
      .html(d => history.includes(d.data.id) ? '<i class="fas fa-check-circle"></i>' : '');

    const minX = d3.min(nodes, d => d.x) || 0;
    const maxX = d3.max(nodes, d => d.x) || 0;
    const treeWidth = maxX - minX;
    d3gRef.current.attr('transform', `translate(${svgWidth / 2 - minX - treeWidth / 2}, 20)`);
  }, [allNodes, history]);

  const handleGoBack = () => {
    if (history.length > 1) setHistory(prev => prev.slice(0, -1));
  };

  const handleGoToNode = (nodeId: string) => {
    const nodeIndex = history.indexOf(nodeId);
    if (nodeIndex !== -1) {
      setHistory(history.slice(0, nodeIndex + 1));
      setIsFlowchartSidebarOpen(false);
    }
  };

  const toggleSidebar = () => setIsFlowchartSidebarOpen(prev => !prev);
  const handleSimulate = () => prompt.trim() && generateNewScenario(prompt.trim(), true);
  const currentNode = allNodes[history[history.length - 1]];

  return (
    <div className="h-screen flex flex-col font-inter bg-custom-black text-white">
      {/* Your UI JSX here, same as original */}
      {/* Input area, chat history, flowchart sidebar, footer */}
    </div>
  );
};

export default RealityTunneling;
