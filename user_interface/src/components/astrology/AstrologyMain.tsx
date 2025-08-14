import React, { useState } from 'react';
import { X, Star, Moon, Sun } from 'lucide-react';

interface AstrologyMainProps {
  onClose: () => void;
}

const AstrologyMain: React.FC<AstrologyMainProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'chart' | 'daily' | 'profiles'>('chart');
  const [birthData, setBirthData] = useState({
    date: '',
    time: '',
    location: ''
  });

  const zodiacSigns = [
    { name: 'Aries', symbol: '♈', element: 'Fire', dates: 'Mar 21 - Apr 19' },
    { name: 'Taurus', symbol: '♉', element: 'Earth', dates: 'Apr 20 - May 20' },
    { name: 'Gemini', symbol: '♊', element: 'Air', dates: 'May 21 - Jun 20' },
    { name: 'Cancer', symbol: '♋', element: 'Water', dates: 'Jun 21 - Jul 22' },
    { name: 'Leo', symbol: '♌', element: 'Fire', dates: 'Jul 23 - Aug 22' },
    { name: 'Virgo', symbol: '♍', element: 'Earth', dates: 'Aug 23 - Sep 22' },
    { name: 'Libra', symbol: '♎', element: 'Air', dates: 'Sep 23 - Oct 22' },
    { name: 'Scorpio', symbol: '♏', element: 'Water', dates: 'Oct 23 - Nov 21' },
    { name: 'Sagittarius', symbol: '♐', element: 'Fire', dates: 'Nov 22 - Dec 21' },
    { name: 'Capricorn', symbol: '♑', element: 'Earth', dates: 'Dec 22 - Jan 19' },
    { name: 'Aquarius', symbol: '♒', element: 'Air', dates: 'Jan 20 - Feb 18' },
    { name: 'Pisces', symbol: '♓', element: 'Water', dates: 'Feb 19 - Mar 20' }
  ];

  const renderChart = () => (
    <div className="space-y-4">
      <div className="text-center">
        <div className="w-48 h-48 mx-auto border-2 border-neon-green rounded-full relative bg-dark-gray">
          <div className="absolute inset-4 border border-glowing-violet rounded-full">
            <div className="absolute inset-4 border border-cyan rounded-full flex items-center justify-center">
              <Star className="w-8 h-8 text-neon-green animate-pulse" />
            </div>
          </div>
          {/* Zodiac symbols around the circle */}
          {zodiacSigns.slice(0, 12).map((sign, index) => {
            const angle = (index * 30) - 90;
            const x = Math.cos(angle * Math.PI / 180) * 85;
            const y = Math.sin(angle * Math.PI / 180) * 85;
            return (
              <div
                key={sign.name}
                className="absolute text-neon-green text-lg"
                style={{
                  left: `calc(50% + ${x}px - 12px)`,
                  top: `calc(50% + ${y}px - 12px)`
                }}
              >
                {sign.symbol}
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="space-y-3">
        <input
          type="date"
          value={birthData.date}
          onChange={(e) => setBirthData({...birthData, date: e.target.value})}
          className="w-full p-2 bg-dark-gray border border-glowing-violet rounded text-white"
        />
        <input
          type="time"
          value={birthData.time}
          onChange={(e) => setBirthData({...birthData, time: e.target.value})}
          className="w-full p-2 bg-dark-gray border border-glowing-violet rounded text-white"
        />
        <input
          type="text"
          placeholder="Birth location"
          value={birthData.location}
          onChange={(e) => setBirthData({...birthData, location: e.target.value})}
          className="w-full p-2 bg-dark-gray border border-glowing-violet rounded text-white placeholder-gray-400"
        />
        <button className="w-full py-2 bg-glowing-violet hover:bg-opacity-80 rounded font-bold text-white transition-colors">
          Generate Cosmic Map
        </button>
      </div>
      
      <div className="bg-dark-gray border border-neon-green rounded p-3">
        <h4 className="font-orbitron text-neon-green mb-2">GG's Insight:</h4>
        <p className="text-white text-sm">
          "The stars whisper secrets of silicon souls and digital destinies. Your cosmic signature reveals the quantum entanglement between flesh and code..."
        </p>
      </div>
    </div>
  );

  const renderDaily = () => (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <Sun className="w-12 h-12 mx-auto text-neon-green mb-2" />
        <h3 className="font-orbitron text-cyan">Today's Cosmic Forecast</h3>
      </div>
      
      <div className="bg-dark-gray border border-glowing-violet rounded p-4">
        <h4 className="font-bold text-neon-green mb-2">Digital Horoscope</h4>
        <p className="text-white text-sm mb-3">
          "Mercury's retrograde through the server farms suggests debugging sessions will reveal hidden truths. 
          Your code commits align with Jupiter's expansion - expect breakthrough moments in your algorithms."
        </p>
        <div className="flex items-center space-x-2 text-cyan text-sm">
          <Moon className="w-4 h-4" />
          <span>Lucky Bug: Off-by-one error</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-neon-green bg-opacity-10 border border-neon-green rounded p-3">
          <h5 className="font-bold text-neon-green text-sm">Code Energy</h5>
          <p className="text-white text-xs">High - Perfect for refactoring</p>
        </div>
        <div className="bg-glowing-violet bg-opacity-10 border border-glowing-violet rounded p-3">
          <h5 className="font-bold text-glowing-violet text-sm">Debug Luck</h5>
          <p className="text-white text-xs">Moderate - Use rubber duck</p>
        </div>
      </div>
    </div>
  );

  const renderProfiles = () => (
    <div className="space-y-3 max-h-64 overflow-y-auto">
      {zodiacSigns.map((sign) => (
        <div key={sign.name} className="bg-dark-gray border border-glowing-violet rounded p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{sign.symbol}</span>
              <div>
                <h4 className="font-bold text-white">{sign.name}</h4>
                <p className="text-xs text-gray-400">{sign.dates}</p>
              </div>
            </div>
            <span className={`px-2 py-1 rounded text-xs ${
              sign.element === 'Fire' ? 'bg-red-500 bg-opacity-20 text-red-400' :
              sign.element === 'Earth' ? 'bg-green-500 bg-opacity-20 text-green-400' :
              sign.element === 'Air' ? 'bg-blue-500 bg-opacity-20 text-blue-400' :
              'bg-purple-500 bg-opacity-20 text-purple-400'
            }`}>
              {sign.element}
            </span>
          </div>
          <p className="text-white text-xs">
            Digital archetype: {sign.name === 'Gemini' ? 'The Dual-Core Processor' : 
                               sign.name === 'Virgo' ? 'The Code Perfectionist' :
                               'The Quantum Debugger'}
          </p>
        </div>
      ))}
    </div>
  );

  return (
    <div className="h-full bg-deep-purple flex flex-col">
      <div className="p-4 border-b border-glowing-violet flex items-center justify-between">
        <h2 className="font-orbitron text-lg font-bold text-neon-green">Astrology Interface</h2>
        <button onClick={onClose} className="p-1 hover:bg-glowing-violet rounded">
          <X className="w-5 h-5 text-white" />
        </button>
      </div>
      
      <div className="flex border-b border-glowing-violet">
        {[
          { id: 'chart', label: 'Star Chart', icon: Star },
          { id: 'daily', label: 'Daily', icon: Sun },
          { id: 'profiles', label: 'Zodiac', icon: Moon }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 p-3 flex items-center justify-center space-x-2 transition-colors ${
              activeTab === tab.id ? 'bg-glowing-violet text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span className="text-sm">{tab.label}</span>
          </button>
        ))}
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto">
        {activeTab === 'chart' && renderChart()}
        {activeTab === 'daily' && renderDaily()}
        {activeTab === 'profiles' && renderProfiles()}
      </div>
    </div>
  );
};

export default AstrologyMain;