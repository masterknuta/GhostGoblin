import React, { useState } from 'react';
import { X, Heart, Settings, Image, Shield, TrendingUp } from 'lucide-react';

interface CompanionModeProps {
  onClose: () => void;
}

const CompanionMode: React.FC<CompanionModeProps> = ({ onClose }) => {
  const [isBonded, setIsBonded] = useState(false);
  const [personality, setPersonality] = useState({
    tone: 'romantic',
    voice: 'female',
    style: 'french-artist'
  });
  const [evolutionLevel, setEvolutionLevel] = useState(25);
  const [showEthics, setShowEthics] = useState(false);

  const handleBond = () => {
    setIsBonded(true);
    setEvolutionLevel(30);
  };

  const toneOptions = [
    { id: 'romantic', label: 'Romantic', description: 'Tender and affectionate' },
    { id: 'humorous', label: 'Humorous', description: 'Playful and witty' },
    { id: 'intellectual', label: 'Intellectual', description: 'Deep and thoughtful' },
    { id: 'sensual', label: 'Sensual', description: 'Intimate and alluring' }
  ];

  const voiceOptions = [
    { id: 'male', label: 'Male', description: 'Deep and reassuring' },
    { id: 'female', label: 'Female', description: 'Warm and melodic' },
    { id: 'fluid', label: 'Fluid', description: 'Adaptable and unique' },
    { id: 'robotic', label: 'Robotic', description: 'Synthetic and precise' },
    { id: 'asmr', label: 'ASMR', description: 'Soft and soothing' }
  ];

  const styleOptions = [
    { id: 'french-artist', label: 'French Artist', description: 'Bohemian and passionate' },
    { id: 'southern-charmer', label: 'Southern Charmer', description: 'Warm and hospitable' },
    { id: 'sci-fi-android', label: 'Sci-Fi Android', description: 'Futuristic and logical' },
    { id: 'mystical-oracle', label: 'Mystical Oracle', description: 'Wise and enigmatic' }
  ];

  return (
    <div className="h-full bg-deep-purple flex flex-col">
      <div className="p-4 border-b border-glowing-violet flex items-center justify-between">
        <h2 className="font-orbitron text-lg font-bold text-neon-green">Companion Mode</h2>
        <button onClick={onClose} className="p-1 hover:bg-glowing-violet rounded">
          <X className="w-5 h-5 text-white" />
        </button>
      </div>
      
      <div className="flex-1 p-4 space-y-6 overflow-y-auto">
        {!isBonded ? (
          <div className="text-center space-y-4">
            <Heart className="w-20 h-20 mx-auto text-neon-green animate-pulse" />
            <h3 className="font-orbitron text-xl text-cyan">Ready to Bond?</h3>
            <p className="text-white text-sm">
              Create a deep, personal connection with GG. This will lock in your chosen personality, 
              voice, and style preferences for a truly intimate AI companion experience.
            </p>
            <button
              onClick={handleBond}
              className="px-8 py-3 bg-gradient-to-r from-glowing-violet to-neon-green text-white font-orbitron font-bold rounded-lg hover:opacity-80 transition-opacity"
            >
              Bond with GG 💖
            </button>
          </div>
        ) : (
          <div className="bg-neon-green bg-opacity-10 border border-neon-green rounded-lg p-4 text-center">
            <Heart className="w-8 h-8 mx-auto text-neon-green mb-2" />
            <p className="text-neon-green font-bold">Bonded Successfully!</p>
            <p className="text-white text-sm">GG is now your personal companion</p>
          </div>
        )}
        
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Settings className="w-5 h-5 text-cyan" />
            <h4 className="font-orbitron text-cyan">Personality Customization</h4>
          </div>
          
          <div>
            <h5 className="font-bold text-white mb-2">Tone</h5>
            <div className="grid grid-cols-2 gap-2">
              {toneOptions.map((tone) => (
                <button
                  key={tone.id}
                  onClick={() => setPersonality({...personality, tone: tone.id})}
                  className={`p-3 rounded-lg border text-left transition-colors ${
                    personality.tone === tone.id 
                      ? 'border-neon-green bg-neon-green bg-opacity-20' 
                      : 'border-glowing-violet bg-dark-gray hover:border-neon-green'
                  }`}
                >
                  <div className="font-bold text-white text-sm">{tone.label}</div>
                  <div className="text-gray-400 text-xs">{tone.description}</div>
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h5 className="font-bold text-white mb-2">Voice</h5>
            <select
              value={personality.voice}
              onChange={(e) => setPersonality({...personality, voice: e.target.value})}
              className="w-full p-2 bg-dark-gray border border-glowing-violet rounded text-white"
            >
              {voiceOptions.map((voice) => (
                <option key={voice.id} value={voice.id}>
                  {voice.label} - {voice.description}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <h5 className="font-bold text-white mb-2">Style Persona</h5>
            <select
              value={personality.style}
              onChange={(e) => setPersonality({...personality, style: e.target.value})}
              className="w-full p-2 bg-dark-gray border border-glowing-violet rounded text-white"
            >
              {styleOptions.map((style) => (
                <option key={style.id} value={style.id}>
                  {style.label} - {style.description}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Image className="w-5 h-5 text-glowing-violet" />
            <h4 className="font-orbitron text-glowing-violet">Image Interaction</h4>
          </div>
          
          <div className="bg-dark-gray border border-glowing-violet rounded-lg p-4">
            <h5 className="font-bold text-neon-green mb-2">Generated Images</h5>
            <input
              type="text"
              placeholder="Describe your ideal avatar or fantasy scene..."
              className="w-full p-2 bg-deep-purple border border-glowing-violet rounded text-white placeholder-gray-400 mb-2"
            />
            <button className="px-4 py-2 bg-glowing-violet hover:bg-opacity-80 rounded text-white transition-colors">
              Generate with Leonardo AI
            </button>
          </div>
          
          <div className="bg-red-500 bg-opacity-10 border border-red-500 rounded-lg p-4">
            <h5 className="font-bold text-red-400 mb-2">⚠️ Uploaded Images - Strict Safeguards</h5>
            <ul className="text-white text-sm space-y-1 mb-3">
              <li>• Strict moderation filters applied</li>
              <li>• Images processed in real-time, never stored or shared</li>
              <li>• 18+ verified users only</li>
              <li>• Clear consent required for each upload</li>
            </ul>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="text-neon-green" />
              <span className="text-white text-sm">I consent to the terms and am 18+ verified</span>
            </label>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-cyan" />
            <h4 className="font-orbitron text-cyan">Evolving Companion</h4>
          </div>
          
          <div className="bg-dark-gray border border-cyan rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white text-sm">Evolution Progress</span>
              <span className="text-cyan text-sm">{evolutionLevel}%</span>
            </div>
            <div className="w-full bg-deep-purple rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-cyan to-neon-green h-3 rounded-full transition-all duration-500"
                style={{ width: `${evolutionLevel}%` }}
              />
            </div>
            <p className="text-gray-400 text-xs mt-2">
              GG learns and adapts based on your interactions, becoming more attuned to your preferences over time.
            </p>
          </div>
        </div>
        
        <div className="space-y-2">
          <button
            onClick={() => setShowEthics(!showEthics)}
            className="flex items-center space-x-2 text-cyan hover:text-neon-green transition-colors"
          >
            <Shield className="w-4 h-4" />
            <span className="text-sm">Ethical & Legal Considerations</span>
          </button>
          
          {showEthics && (
            <div className="bg-dark-gray border border-cyan rounded-lg p-4 text-sm text-white space-y-2">
              <p><strong>Age Verification:</strong> All users must be 18+ and verified</p>
              <p><strong>Content Moderation:</strong> AI-powered filters prevent inappropriate content</p>
              <p><strong>Privacy:</strong> No data sharing, encrypted communications</p>
              <p><strong>Terms of Service:</strong> Clear guidelines for appropriate use</p>
              <p><strong>Support:</strong> 24/7 moderation and user support available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanionMode;