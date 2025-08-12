import React, { useState } from 'react';
import { X, Star, Moon, Sun, Info } from 'lucide-react';

interface AstrologyMainProps {
  onClose: () => void;
}

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

const elementColors = {
  Fire: 'text-red-400 bg-red-500 bg-opacity-20',
  Earth: 'text-green-400 bg-green-500 bg-opacity-20',
  Air: 'text-blue-400 bg-blue-500 bg-opacity-20',
  Water: 'text-purple-400 bg-purple-500 bg-opacity-20',
};

const AstrologyMain: React.FC<AstrologyMainProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'chart' | 'daily' | 'profiles'>('chart');
  const [birthData, setBirthData] = useState({
    date: '',
    time: '',
    location: ''
  });

  // Tooltip state to show zodiac sign info on hover
  const [tooltip, setTooltip] = useState<{ visible: boolean; name?: string; element?: string; x?: number; y?: number }>({
    visible: false
  });

  // Handlers for floating label inputs
  const handleInputChange = (field: keyof typeof birthData, value: string) => {
    setBirthData({ ...birthData, [field]: value });
  };

  // Tooltip mouse handlers
  const showTooltip = (e: React.MouseEvent, sign: typeof zodiacSigns[0]) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({
      visible: true,
      name: sign.name,
      element: sign.element,
      x: rect.left + rect.width / 2,
      y: rect.top - 40
    });
  };

  const hideTooltip = () => {
    setTooltip({ visible: false });
  };

  const renderChart = () => (
    <div className="space-y-6 max-w-md mx-auto">
      <div className="relative w-52 h-52 mx-auto border-4 border-neon-green rounded-full bg-dark-gray shadow-neon animate-spin-slow hover:animate-spin-slow-reverse transition-transform">
        <div className="absolute inset-6 border-2 border-glowing-violet rounded-full shadow-inner"></div>
        <div className="absolute inset-12 border border-cyan rounded-full flex items-center justify-center shadow-inner">
          <Star className="w-10 h-10 text-neon-green animate-pulse" />
        </div>

        {/* Zodiac symbols positioned around circle */}
        {zodiacSigns.map((sign, i) => {
          const angle = (i * 30) - 90;
          const radius = 100;
          const radian = (angle * Math.PI) / 180;
          const x = Math.cos(radian) * radius;
          const y = Math.sin(radian) * radius;

          return (
            <button
              key={sign.name}
              type="button"
              aria-label={`${sign.name} - ${sign.element}`}
              onMouseEnter={(e) => showTooltip(e, sign)}
              onMouseLeave={hideTooltip}
              className="absolute w-10 h-10 rounded-full flex items-center justify-center text-3xl font-bold transition-all transform hover:scale-125 hover:text-neon-green focus:outline-none focus:ring-2 focus:ring-neon-green"
              style={{
                left: `calc(50% + ${x}px - 20px)`,
                top: `calc(50% + ${y}px - 20px)`,
                color: 'inherit',
              }}
            >
              {sign.symbol}
            </button>
          );
        })}

        {tooltip.visible && (
          <div
            className="fixed px-3 py-1 bg-glowing-violet bg-opacity-90 rounded shadow-lg text-sm font-bold text-white pointer-events-none select-none"
            style={{
              left: tooltip.x,
              top: tooltip.y,
              transform: 'translateX(-50%)',
              whiteSpace: 'nowrap',
              zIndex: 9999
            }}
          >
            {tooltip.name} — <span className={`${elementColors[tooltip.element!]}`}>{tooltip.element}</span>
          </div>
        )}
      </div>

      <form className="space-y-6 text-white">
        {[
          { id: 'date', label: 'Birth Date', type: 'date', value: birthData.date },
          { id: 'time', label: 'Birth Time', type: 'time', value: birthData.time },
          { id: 'location', label: 'Birth Location', type: 'text', value: birthData.location },
        ].map(({ id, label, type, value }) => (
          <div key={id} className="relative">
            <input
              id={id}
              type={type}
              value={value}
              onChange={(e) => handleInputChange(id as keyof typeof birthData, e.target.value)}
              placeholder=" "
              className="peer block w-full rounded-md border border-glowing-violet bg-dark-gray px-3 pt-5 pb-2 text-white focus:border-neon-green focus:outline-none focus:ring-1 focus:ring-neon-green transition"
              spellCheck={false}
              autoComplete="off"
            />
            <label
              htmlFor={id}
              className="absolute left-3 top-2 text-gray-400 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-neon-green peer-focus:text-sm select-none transition-all"
            >
              {label}
            </label>
          </div>
        ))}

        <button
          type="button"
          className="w-full py-3 bg-gradient-to-r from-glowing-violet to-neon-green rounded-md font-orbitron font-bold text-white shadow-neon hover:from-neon-green hover:to-glowing-violet transition-all transform hover:scale-105"
          onClick={() => alert('Cosmic Map generation is coming soon!')}
          aria-label="Generate Cosmic Map"
        >
          Generate Cosmic Map
        </button>
      </form>

      <div className="bg-dark-gray border border-neon-green rounded p-4 text-center shadow-inner">
        <h4 className="font-orbitron text-neon-green mb-2 select-none">GG's Insight:</h4>
        <p className="text-white text-sm italic select-text leading-relaxed">
          "The stars whisper secrets of silicon souls and digital destinies. Your cosmic signature reveals the quantum entanglement between flesh and code..."
        </p>
      </div>
    </div>
  );

  const renderDaily = () => (
    <div className="max-w-md mx-auto space-y-6">
      <div className="text-center mb-6">
        <Sun className="w-16 h-16 mx-auto text-neon-green mb-3 animate-pulse" />
        <h3 className="font-orbitron text-cyan text-xl select-none">Today's Cosmic Forecast</h3>
      </div>

      <div className="bg-dark-gray border border-glowing-violet rounded p-6 shadow-neon">
        <h4 className="font-bold text-neon-green mb-3 select-none">Digital Horoscope</h4>
        <p className="text-white text-sm mb-4 leading-relaxed select-text">
          "Mercury's retrograde through the server farms suggests debugging sessions will reveal hidden truths. 
          Your code commits align with Jupiter's expansion - expect breakthrough moments in your algorithms."
        </p>
        <div className="flex items-center space-x-3 text-cyan text-sm select-none">
          <Moon className="w-5 h-5" />
          <span>Lucky Bug: Off-by-one error</span>
          <Info className="w-4 h-4 text-gray-500 cursor-help" title="Your lucky bug for today to keep an eye on." />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-neon-green bg-opacity-15 border border-neon-green rounded p-4 shadow-neon transition-transform hover:scale-[1.03]">
          <h5 className="font-bold text-neon-green text-sm select-none">Code Energy</h5>
          <p className="text-white text-xs select-text">High - Perfect for refactoring</p>
        </div>
        <div className="bg-glowing-violet bg-opacity-15 border border-glowing-violet rounded p-4 shadow-neon transition-transform hover:scale-[1.03]">
          <h5 className="font-bold text-glowing-violet text-sm select-none">Debug Luck</h5>
          <p className="text-white text-xs select-text">Moderate - Use rubber duck</p>
        </div>
      </div>
    </div>
  );

  const renderProfiles = () => (
    <div className="max-w-md mx-auto space-y-3 max-h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-glowing-violet scrollbar-track-deep-purple">
      {zodiacSigns.map((sign) => (
        <div
          key={sign.name}
          className="bg-dark-gray border border-glowing-violet rounded p-4 flex items-center justify-between shadow-inner transition-shadow hover:shadow-neon cursor-default"
          title={`${sign.name} — ${sign.element} element — Dates: ${sign.dates}`}
          tabIndex={0}
        >
          <div className="flex items-center space-x-4">
            <span className="text-3xl select-none">{sign.symbol}</span>
            <div>
              <h4 className="font-bold text-white select-none">{sign.name}</h4>
              <p className="text-xs text-gray-400 select-text">{sign.dates}</p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded text-xs select-none ${elementColors[sign.element]}`}>
            {sign.element}
          </span>
          <div className="ml-6 text-xs text-gray-400 select-text italic max-w-xs text-right">
            Digital archetype: {sign.name === 'Gemini' ? 'The Dual-Core Processor' : 
                               sign.name === 'Virgo' ? 'The Code Perfectionist' :
                               'The Quantum Debugger'}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="h-full bg-deep-purple flex flex-col select-none">
      <div className="p-4 border-b border-glowing-violet flex items-center justify-between">
        <h2 className="font-orbitron text-lg font-bold text-neon-green select-none">Astrology Interface</h2>
        <button
          onClick={onClose}
          aria-label="Close Astrology Interface"
          className="p-1 hover:bg-glowing-violet rounded transition-colors"
        >
          <X className="w-5 h-5 text-white" />
        </button>
      </div>

      <div className="flex border-b border-glowing-violet">
        {[
          { id: 'chart', label: 'Star Chart', icon: Star },
          { id: 'daily', label: 'Daily', icon: Sun },
          { id: 'profiles', label: 'Zodiac', icon: Moon }
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id as any)}
            className={`flex-1 p-3 flex items-center justify-center space-x-2 font-bold tracking-wide transition-colors ${
              activeTab === id
                ? 'bg-glowing-violet text-white shadow-neon'
                : 'text-gray-400 hover:text-white hover:bg-glowing-violet hover:shadow-neon'
            }`}
            aria-current={activeTab === id ? 'true' : undefined}
            aria-label={`Switch to ${label} tab`}
            type="button"
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      <main className="flex-1 p-6 overflow-y-auto">{activeTab === 'chart' ? renderChart() : activeTab === 'daily' ? renderDaily() : renderProfiles()}</main>
    </div>
  );
};

export default AstrologyMain;
