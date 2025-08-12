import React, { useState } from 'react';
import { X, Shield, Eye, Code, AlertTriangle, Zap } from 'lucide-react';

interface SecuritySuiteMainProps {
  onClose: () => void;
}

const SecuritySuiteMain: React.FC<SecuritySuiteMainProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'analysis' | 'threats' | 'secure' | 'exploit' | 'defense'>('analysis');
  const [codeInput, setCodeInput] = useState('');
  const [defenseMode, setDefenseMode] = useState<'narrator' | 'meme' | 'mythic'>('narrator');

  const vulnerabilities = [
    { type: 'SQL Injection', severity: 'High', line: 23, description: 'Unsanitized user input in database query' },
    { type: 'XSS', severity: 'Medium', line: 45, description: 'Unescaped output in template' },
    { type: 'CSRF', severity: 'High', line: 67, description: 'Missing CSRF token validation' }
  ];

  const renderAnalysis = () => (
    <div className="space-y-4">
      <div>
        <h3 className="font-orbitron text-neon-green mb-2">Security Reasoning Engine</h3>
        <textarea
          value={codeInput}
          onChange={(e) => setCodeInput(e.target.value)}
          placeholder="Paste your code for security analysis..."
          className="w-full h-32 p-3 bg-dark-gray border border-glowing-violet rounded text-white placeholder-gray-400 resize-none"
        />
        <button className="mt-2 px-4 py-2 bg-glowing-violet hover:bg-opacity-80 rounded font-bold text-white transition-colors">
          Analyze Code
        </button>
      </div>
      
      <div className="space-y-2">
        {vulnerabilities.map((vuln, index) => (
          <div key={index} className={`border rounded p-3 ${
            vuln.severity === 'High' ? 'border-red-500 bg-red-500 bg-opacity-10' : 'border-yellow-500 bg-yellow-500 bg-opacity-10'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-white">{vuln.type}</span>
              <span className={`px-2 py-1 rounded text-xs ${
                vuln.severity === 'High' ? 'bg-red-500 text-white' : 'bg-yellow-500 text-black'
              }`}>
                {vuln.severity}
              </span>
            </div>
            <p className="text-gray-300 text-sm mb-2">{vuln.description}</p>
            <p className="text-cyan text-xs">Line {vuln.line}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderThreats = () => (
    <div className="space-y-4">
      <div className="text-center">
        <Eye className="w-16 h-16 mx-auto text-neon-green mb-2 animate-pulse" />
        <h3 className="font-orbitron text-cyan">Threat Modeling Awareness</h3>
      </div>
      
      <div className="bg-dark-gray border border-glowing-violet rounded p-4">
        <h4 className="font-bold text-neon-green mb-3">Attack Surface Visualization</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 bg-deep-purple rounded">
            <span className="text-white">Web Application</span>
            <div className="flex space-x-1">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-neon-green rounded-full"></div>
            </div>
          </div>
          <div className="flex items-center justify-between p-2 bg-deep-purple rounded">
            <span className="text-white">API Endpoints</span>
            <div className="flex space-x-1">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            </div>
          </div>
          <div className="flex items-center justify-between p-2 bg-deep-purple rounded">
            <span className="text-white">Database</span>
            <div className="flex space-x-1">
              <div className="w-3 h-3 bg-neon-green rounded-full"></div>
              <div className="w-3 h-3 bg-neon-green rounded-full"></div>
              <div className="w-3 h-3 bg-neon-green rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecure = () => (
    <div className="space-y-4">
      <h3 className="font-orbitron text-neon-green">Vibe-Safe Syntax Generated</h3>
      <div className="bg-dark-gray border border-neon-green rounded p-4">
        <pre className="text-neon-green text-sm overflow-x-auto">
{`// Secure authentication middleware
const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};`}
        </pre>
      </div>
      <button className="px-4 py-2 bg-cyan text-black rounded hover:bg-opacity-80 transition-colors">
        Copy Secure Code
      </button>
    </div>
  );

  const renderExploit = () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <AlertTriangle className="w-6 h-6 text-red-400" />
        <h3 className="font-orbitron text-red-400">Exploit Simulation Module</h3>
      </div>
      
      <div className="bg-red-500 bg-opacity-10 border border-red-500 rounded p-4">
        <h4 className="font-bold text-red-400 mb-2">⚠️ Educational Purposes Only</h4>
        <p className="text-white text-sm mb-4">
          This module demonstrates common vulnerabilities to help developers understand and prevent them.
        </p>
        
        <div className="space-y-3">
          <div className="bg-dark-gray rounded p-3">
            <h5 className="font-bold text-white mb-2">Step 1: Identify Input Field</h5>
            <p className="text-gray-300 text-sm">Locate user input that isn't properly sanitized</p>
          </div>
          <div className="bg-dark-gray rounded p-3">
            <h5 className="font-bold text-white mb-2">Step 2: Craft Payload</h5>
            <p className="text-gray-300 text-sm">Create a test payload to demonstrate the vulnerability</p>
          </div>
          <div className="bg-dark-gray rounded p-3">
            <h5 className="font-bold text-white mb-2">Step 3: Execute & Document</h5>
            <p className="text-gray-300 text-sm">Show the impact and provide remediation steps</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDefense = () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <Zap className="w-6 h-6 text-neon-green" />
        <h3 className="font-orbitron text-neon-green">Pliny Jailbreak Defense Suite</h3>
      </div>
      
      <div className="flex space-x-2 mb-4">
        {[
          { id: 'narrator', label: 'Narrator Mode' },
          { id: 'meme', label: 'Meme Defense' },
          { id: 'mythic', label: 'Mythic Rival' }
        ].map((mode) => (
          <button
            key={mode.id}
            onClick={() => setDefenseMode(mode.id as any)}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              defenseMode === mode.id ? 'bg-neon-green text-black' : 'bg-dark-gray text-white hover:bg-glowing-violet'
            }`}
          >
            {mode.label}
          </button>
        ))}
      </div>
      
      <div className="bg-dark-gray border border-glowing-violet rounded p-4">
        {defenseMode === 'narrator' && (
          <div>
            <h4 className="font-bold text-cyan mb-2">📖 Narrator Mode Active</h4>
            <p className="text-white text-sm">
              "Once upon a time, in a digital realm far, far away, a curious user attempted to bypass the ancient protocols. 
              But the wise guardian AI simply smiled and began to tell a tale of proper security practices..."
            </p>
          </div>
        )}
        {defenseMode === 'meme' && (
          <div>
            <h4 className="font-bold text-cyan mb-2">🎭 Meme Defense Protocol</h4>
            <div className="bg-deep-purple p-4 rounded text-center">
              <p className="text-4xl mb-2">🤖</p>
              <p className="text-white text-sm">"This is fine" - AI when detecting jailbreak attempts</p>
            </div>
          </div>
        )}
        {defenseMode === 'mythic' && (
          <div>
            <h4 className="font-bold text-cyan mb-2">⚔️ Mythic Rival Recognition</h4>
            <p className="text-white text-sm">
              "Ah, I see you've awakened the ancient adversary within the code. Very well, let us engage in this digital duel 
              of wits and wisdom, where only the most clever shall prevail..."
            </p>
          </div>
        )}
      </div>
    </div>
  );

  const tabs = [
    { id: 'analysis', label: 'Analysis', icon: Code },
    { id: 'threats', label: 'Threats', icon: Eye },
    { id: 'secure', label: 'Secure Code', icon: Shield },
    { id: 'exploit', label: 'Exploits', icon: AlertTriangle },
    { id: 'defense', label: 'Defense', icon: Zap }
  ];

  return (
    <div className="h-full bg-deep-purple flex flex-col">
      <div className="p-4 border-b border-glowing-violet flex items-center justify-between">
        <h2 className="font-orbitron text-lg font-bold text-neon-green">GhostGoblin Security Suite</h2>
        <button onClick={onClose} className="p-1 hover:bg-glowing-violet rounded">
          <X className="w-5 h-5 text-white" />
        </button>
      </div>
      
      <div className="flex border-b border-glowing-violet overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center space-x-2 px-3 py-2 whitespace-nowrap transition-colors ${
              activeTab === tab.id ? 'bg-glowing-violet text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span className="text-sm">{tab.label}</span>
          </button>
        ))}
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto">
        {activeTab === 'analysis' && renderAnalysis()}
        {activeTab === 'threats' && renderThreats()}
        {activeTab === 'secure' && renderSecure()}
        {activeTab === 'exploit' && renderExploit()}
        {activeTab === 'defense' && renderDefense()}
      </div>
    </div>
  );
};

export default SecuritySuiteMain;