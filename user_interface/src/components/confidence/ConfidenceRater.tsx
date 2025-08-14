import React, { useState } from 'react';
import { X, Upload, Heart, Volume2 } from 'lucide-react';

interface ConfidenceRaterProps {
  onClose: () => void;
}

const ConfidenceRater: React.FC<ConfidenceRaterProps> = ({ onClose }) => {
  const [hasConsented, setHasConsented] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState<'male' | 'female' | 'fluid'>('female');
  const [humorMode, setHumorMode] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleConsent = () => {
    setHasConsented(true);
  };

  const handleImageUpload = () => {
    // Simulate image processing
    setTimeout(() => {
      const feedbacks = humorMode ? [
        "That's a confident curve. Michelangelo would've blushed! 🎨",
        "You're serving main character energy, and I'm here for it! ✨",
        "That silhouette could stop traffic... in the best way! 🚦"
      ] : [
        "You've got a regal silhouette—like a sculpture in motion ✨",
        "There's something beautifully authentic about your presence 💫",
        "Your confidence radiates through every line and curve 🌟"
      ];
      
      setFeedback(feedbacks[Math.floor(Math.random() * feedbacks.length)]);
    }, 2000);
  };

  if (!hasConsented) {
    return (
      <div className="h-full bg-deep-purple flex flex-col">
        <div className="p-4 border-b border-glowing-violet flex items-center justify-between">
          <h2 className="font-orbitron text-lg font-bold text-neon-green">GG's Private Confidence Rater</h2>
          <button onClick={onClose} className="p-1 hover:bg-glowing-violet rounded">
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
        
        <div className="flex-1 p-6 flex flex-col justify-center space-y-6">
          <div className="text-center">
            <Heart className="w-16 h-16 mx-auto text-neon-green mb-4" />
            <h3 className="font-orbitron text-xl text-cyan mb-4">Welcome to a Safe Space</h3>
          </div>
          
          <div className="bg-dark-gray border border-glowing-violet rounded-lg p-4 space-y-4">
            <h4 className="font-bold text-neon-green">What GG Does:</h4>
            <ul className="text-white text-sm space-y-2">
              <li>• Provides compassionate, body-positive feedback</li>
              <li>• Celebrates your unique beauty and confidence</li>
              <li>• Offers affirming, respectful commentary</li>
              <li>• Creates a judgment-free environment</li>
            </ul>
            
            <h4 className="font-bold text-red-400 mt-4">What GG Doesn't Do:</h4>
            <ul className="text-white text-sm space-y-2">
              <li>• Store or share your images (processed in real-time only)</li>
              <li>• Make comparisons or give numerical scores</li>
              <li>• Judge or criticize your appearance</li>
              <li>• Share data with third parties</li>
            </ul>
          </div>
          
          <div className="bg-neon-green bg-opacity-10 border border-neon-green rounded-lg p-4">
            <p className="text-neon-green text-sm text-center">
              <strong>Privacy Guarantee:</strong> All images are processed instantly and immediately discarded. 
              No storage, no sharing, no exceptions.
            </p>
          </div>
          
          <button
            onClick={handleConsent}
            className="w-full py-3 bg-glowing-violet hover:bg-opacity-80 rounded-lg font-orbitron font-bold text-white transition-colors"
          >
            I Understand and Consent
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-deep-purple flex flex-col">
      <div className="p-4 border-b border-glowing-violet flex items-center justify-between">
        <h2 className="font-orbitron text-lg font-bold text-neon-green">Confidence Rater</h2>
        <button onClick={onClose} className="p-1 hover:bg-glowing-violet rounded">
          <X className="w-5 h-5 text-white" />
        </button>
      </div>
      
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-bold text-cyan mb-2">Voice Style</h4>
            <div className="space-y-2">
              {[
                { id: 'male', label: 'Supportive & Warm' },
                { id: 'female', label: 'Gentle & Affirming' },
                { id: 'fluid', label: 'Playful & Encouraging' }
              ].map((voice) => (
                <label key={voice.id} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="voice"
                    value={voice.id}
                    checked={selectedVoice === voice.id}
                    onChange={(e) => setSelectedVoice(e.target.value as any)}
                    className="text-neon-green"
                  />
                  <span className="text-white text-sm">{voice.label}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-cyan mb-2">Mode</h4>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={humorMode}
                onChange={(e) => setHumorMode(e.target.checked)}
                className="text-neon-green"
              />
              <span className="text-white text-sm">Humor Mode</span>
            </label>
            <p className="text-gray-400 text-xs mt-1">
              Playful, witty feedback without being crude
            </p>
          </div>
        </div>
        
        <div className="border-2 border-dashed border-glowing-violet rounded-lg p-8 text-center">
          <Upload className="w-12 h-12 mx-auto text-glowing-violet mb-4" />
          <h4 className="font-bold text-white mb-2">Private & Ephemeral Upload</h4>
          <p className="text-gray-400 text-sm mb-4">
            Images processed in real-time • Never stored • Never shared
          </p>
          <button
            onClick={handleImageUpload}
            className="px-6 py-2 bg-glowing-violet hover:bg-opacity-80 rounded-lg font-bold text-white transition-colors"
          >
            Choose Image
          </button>
        </div>
        
        {feedback && (
          <div className="bg-dark-gray border border-neon-green rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Heart className="w-5 h-5 text-neon-green" />
              <span className="font-orbitron text-neon-green">GG's Feedback</span>
              <Volume2 className="w-4 h-4 text-cyan cursor-pointer" />
            </div>
            <blockquote className="text-white font-orbitron text-lg italic leading-relaxed">
              "{feedback}"
            </blockquote>
            <div className="mt-4 flex space-x-2">
              <button className="px-4 py-2 bg-cyan text-black rounded hover:bg-opacity-80 transition-colors text-sm">
                New Image
              </button>
              <button className="px-4 py-2 bg-neon-green text-black rounded hover:bg-opacity-80 transition-colors text-sm">
                Save to Memories
              </button>
            </div>
          </div>
        )}
        
        <div className="bg-glowing-violet bg-opacity-10 border border-glowing-violet rounded-lg p-3">
          <p className="text-glowing-violet text-xs text-center">
            This interface is designed to be adaptable for future modules while maintaining 
            the highest standards of privacy and emotional safety.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConfidenceRater;