import React, { useState } from 'react';
import { X, Star, Moon, Sun, Info } from 'lucide-react';

interface AstrologyMainProps {
  onClose: () => void;
}

type ElementType = 'Fire' | 'Earth' | 'Air' | 'Water';

const zodiacSigns = [
  { name: 'Aries', symbol: '♈', element: 'Fire' as ElementType, dates: 'Mar 21 - Apr 19' },
  { name: 'Taurus', symbol: '♉', element: 'Earth' as ElementType, dates: 'Apr 20 - May 20' },
  { name: 'Gemini', symbol: '♊', element: 'Air' as ElementType, dates: 'May 21 - Jun 20' },
  { name: 'Cancer', symbol: '♋', element: 'Water' as ElementType, dates: 'Jun 21 - Jul 22' },
  { name: 'Leo', symbol: '♌', element: 'Fire' as ElementType, dates: 'Jul 23 - Aug 22' },
  { name: 'Virgo', symbol: '♍', element: 'Earth' as ElementType, dates: 'Aug 23 - Sep 22' },
  { name: 'Libra', symbol: '♎', element: 'Air' as ElementType, dates: 'Sep 23 - Oct 22' },
  { name: 'Scorpio', symbol: '♏', element: 'Water' as ElementType, dates: 'Oct 23 - Nov 21' },
  { name: 'Sagittarius', symbol: '♐', element: 'Fire' as ElementType, dates: 'Nov 22 - Dec 21' },
  { name: 'Capricorn', symbol: '♑', element: 'Earth' as ElementType, dates: 'Dec 22 - Jan 19' },
  { name: 'Aquarius', symbol: '♒', element: 'Air' as ElementType, dates: 'Jan 20 - Feb 18' },
  { name: 'Pisces', symbol: '♓', element: 'Water' as ElementType, dates: 'Feb 19 - Mar 20' },
];

const elementColors: Record<ElementType, string> = {
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

  const [tooltip, setTooltip] = useState<{ visible: boolean; name?: string; element?: ElementType; x?: number; y?: number }>({ visible: false });

  const handleInputChange = (field: keyof typeof birthData, value: string) => {
    setBirthData({ ...birthData, [field]: value });
  };

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

  const hideTooltip = () => setTooltip({ visible: false });

  // ... Keep renderChart, renderDaily, renderProfiles functions unchanged
  // Replace all `elementColors[tooltip.element!]` and `elementColors[sign.element]` accesses with:
  // elementColors[tooltip.element as ElementType] or elementColors[sign.element as ElementType]

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

      <main className="flex-1 p-6 overflow-y-auto">
        {activeTab === 'chart'
          ? renderChart()
          : activeTab === 'daily'
          ? renderDaily()
          : renderProfiles()}
      </main>
    </div>
  );
};

export default AstrologyMain;
