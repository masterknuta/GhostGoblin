import React, { useState } from 'react';
import { X, Crown, Zap, Send, Sparkles } from 'lucide-react';

interface CouncilModeProps {
  onClose: () => void;
}

interface God {
  id: string;
  name: string;
  pantheon: string;
  archetype: string;
  domain: string[];
  description: string;
  personality: string;
  imageUrl: string;
  greeting: string;
}

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  godId: string;
}

const CouncilMode: React.FC<CouncilModeProps> = ({ onClose }) => {
  const gods: God[] = [
    {
      id: 'odin',
      name: 'Odin',
      pantheon: 'Norse',
      archetype: 'The All-Father',
      domain: ['Wisdom', 'War', 'Death', 'Poetry'],
      description: 'The one-eyed god of wisdom who sacrificed much for knowledge',
      personality: 'Wise, mysterious, strategic, speaks in riddles and ancient wisdom',
      imageUrl: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      greeting: 'Mortal, you seek wisdom from the depths of Yggdrasil. What knowledge do you hunger for?'
    },
    {
      id: 'athena',
      name: 'Athena',
      pantheon: 'Greek',
      archetype: 'The Wise Warrior',
      domain: ['Wisdom', 'Strategy', 'Crafts', 'Justice'],
      description: 'Goddess of wisdom and strategic warfare, born from Zeus\'s head',
      personality: 'Logical, strategic, just, speaks with clarity and purpose',
      imageUrl: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      greeting: 'Seeker of wisdom, I am Athena. Let us discuss strategy, knowledge, and the pursuit of justice.'
    },
    {
      id: 'thoth',
      name: 'Thoth',
      pantheon: 'Egyptian',
      archetype: 'The Scribe of Truth',
      domain: ['Knowledge', 'Writing', 'Moon', 'Judgment'],
      description: 'Ibis-headed god of wisdom, writing, and the judgment of the dead',
      personality: 'Scholarly, precise, speaks of cosmic balance and hidden knowledge',
      imageUrl: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      greeting: 'I am Thoth, keeper of divine knowledge. The scales of Ma\'at await your questions.'
    },
    {
      id: 'quetzalcoatl',
      name: 'Quetzalcoatl',
      pantheon: 'Aztec',
      archetype: 'The Feathered Serpent',
      domain: ['Wind', 'Learning', 'Creation', 'Venus'],
      description: 'The feathered serpent god of wind, learning, and creation',
      personality: 'Creative, transformative, speaks of cycles and renewal',
      imageUrl: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      greeting: 'I am Quetzalcoatl, the wind that brings change. What transformation do you seek?'
    },
    {
      id: 'ganesha',
      name: 'Ganesha',
      pantheon: 'Hindu',
      archetype: 'The Remover of Obstacles',
      domain: ['Wisdom', 'Beginnings', 'Arts', 'Commerce'],
      description: 'Elephant-headed god who removes obstacles and brings good fortune',
      personality: 'Benevolent, wise, playful, speaks of new beginnings and overcoming challenges',
      imageUrl: 'https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      greeting: 'Om Gam Ganapataye Namaha! I am Ganesha. What obstacles shall we remove from your path?'
    },
    {
      id: 'loki',
      name: 'Loki',
      pantheon: 'Norse',
      archetype: 'The Trickster',
      domain: ['Chaos', 'Change', 'Fire', 'Cunning'],
      description: 'The shape-shifting trickster god who brings both chaos and necessary change',
      personality: 'Witty, unpredictable, challenging, speaks in paradoxes and provocations',
      imageUrl: 'https://images.pexels.com/photos/1181717/pexels-photo-1181717.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      greeting: 'Well, well... another mortal seeking answers. I am Loki. Shall we dance with chaos?'
    },
    {
      id: 'isis',
      name: 'Isis',
      pantheon: 'Egyptian',
      archetype: 'The Divine Mother',
      domain: ['Magic', 'Motherhood', 'Healing', 'Protection'],
      description: 'Goddess of magic, motherhood, and healing, who reassembled Osiris',
      personality: 'Nurturing, powerful, protective, speaks of love and magical wisdom',
      imageUrl: 'https://images.pexels.com/photos/1181721/pexels-photo-1181721.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      greeting: 'I am Isis, mother of magic and healer of hearts. How may I nurture your spirit?'
    },
    {
      id: 'anansi',
      name: 'Anansi',
      pantheon: 'West African',
      archetype: 'The Story Weaver',
      domain: ['Stories', 'Wisdom', 'Trickery', 'Knowledge'],
      description: 'The spider god who stole stories from the sky god and gave them to humanity',
      personality: 'Clever, storytelling, wise through tales, speaks in stories and metaphors',
      imageUrl: 'https://images.pexels.com/photos/1181412/pexels-photo-1181412.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      greeting: 'Ah, a new listener! I am Anansi, weaver of tales. What story shall we spin together?'
    }
  ];

  const [selectedGod, setSelectedGod] = useState<God>(gods[0]);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: selectedGod.greeting,
      isUser: false,
      timestamp: new Date(),
      godId: selectedGod.id
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleGodChange = (god: God) => {
    setSelectedGod(god);
    setMessages([
      {
        id: Date.now().toString(),
        text: god.greeting,
        isUser: false,
        timestamp: new Date(),
        godId: god.id
      }
    ]);
  };

  const generateGodResponse = (userMessage: string, god: God): string => {
    const responses = {
      odin: [
        "The ravens whisper of your question... In the depths of Mimir's well, I see that wisdom comes through sacrifice.",
        "Two wolves run beside me - Thought and Memory. Your words echo in the halls of Valhalla.",
        "The runes speak of paths unseen. What you seek lies beyond the veil of ordinary perception."
      ],
      athena: [
        "Your inquiry shows wisdom. Like the olive tree, true knowledge grows slowly but endures.",
        "Strategy requires patience, mortal. Consider all angles before you strike.",
        "Justice and wisdom walk hand in hand. What appears complex often has elegant solutions."
      ],
      thoth: [
        "The cosmic scales measure all things. Your question weighs heavy with potential.",
        "In the Hall of Two Truths, I record all knowledge. What you seek is written in the stars.",
        "The ibis sees what others cannot. Truth reveals itself to those who seek with pure intent."
      ],
      quetzalcoatl: [
        "The wind carries your words across dimensions. Change is the only constant in creation.",
        "Like the serpent that sheds its skin, you must release the old to embrace the new.",
        "Venus rises and sets, teaching us of cycles. What dies in you shall be reborn."
      ],
      ganesha: [
        "Every obstacle is a teacher in disguise. What blocks your path may be showing you a better way.",
        "New beginnings require the blessing of endings. I shall help clear your path.",
        "The mouse beneath me reminds us that even the smallest can overcome the greatest challenges."
      ],
      loki: [
        "Ah, how deliciously predictable! You seek order, but chaos teaches the deepest lessons.",
        "Truth and lies dance together like flames. Which one burns brighter in your heart?",
        "The gods think they know the ending of this story. Shall we rewrite it together?"
      ],
      isis: [
        "Magic flows through all things, child. Your heart holds more power than you know.",
        "I who reassembled the scattered pieces understand: healing requires both love and patience.",
        "The divine feminine nurtures all creation. What needs healing in your soul?"
      ],
      anansi: [
        "Every question is the beginning of a story. Let me tell you of the time when...",
        "The web connects all things, young one. Your story is woven into the great tapestry.",
        "Wisdom hides in the most unexpected places. Sometimes the smallest spider catches the mightiest prey."
      ]
    };

    const godResponses = responses[god.id as keyof typeof responses] || responses.odin;
    return godResponses[Math.floor(Math.random() * godResponses.length)];
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date(),
      godId: selectedGod.id
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate god response
    setTimeout(() => {
      const godResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateGodResponse(inputMessage, selectedGod),
        isUser: false,
        timestamp: new Date(),
        godId: selectedGod.id
      };
      setMessages(prev => [...prev, godResponse]);
      setIsTyping(false);
    }, 2000 + Math.random() * 2000);
  };

  return (
    <div className="h-full bg-deep-purple flex flex-col">
      <div className="p-4 border-b border-glowing-violet flex items-center justify-between">
        <h2 className="font-orbitron text-lg font-bold text-neon-green">Council of Gods</h2>
        <button onClick={onClose} className="p-1 hover:bg-glowing-violet rounded">
          <X className="w-5 h-5 text-white" />
        </button>
      </div>
      
      {/* God Selection */}
      <div className="p-4 border-b border-glowing-violet">
        <div className="flex items-center space-x-4 mb-3">
          <img
            src={selectedGod.imageUrl}
            alt={selectedGod.name}
            className="w-12 h-12 rounded-full border-2 border-neon-green"
          />
          <div className="flex-1">
            <h3 className="font-orbitron text-neon-green font-bold">{selectedGod.name}</h3>
            <p className="text-cyan text-sm">{selectedGod.archetype} • {selectedGod.pantheon}</p>
          </div>
          <Crown className="w-6 h-6 text-glowing-violet" />
        </div>
        
        <div className="flex flex-wrap gap-1 mb-2">
          {selectedGod.domain.map((domain) => (
            <span
              key={domain}
              className="px-2 py-1 bg-glowing-violet bg-opacity-20 text-glowing-violet text-xs rounded"
            >
              {domain}
            </span>
          ))}
        </div>
        
        <p className="text-white text-sm mb-3">{selectedGod.description}</p>
        
        <select
          value={selectedGod.id}
          onChange={(e) => {
            const god = gods.find(g => g.id === e.target.value);
            if (god) handleGodChange(god);
          }}
          className="w-full p-2 bg-dark-gray border border-glowing-violet rounded text-white text-sm"
        >
          {gods.map((god) => (
            <option key={god.id} value={god.id}>
              {god.name} - {god.pantheon} ({god.archetype})
            </option>
          ))}
        </select>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                message.isUser
                  ? 'bg-glowing-violet text-white'
                  : 'bg-dark-gray text-white border border-neon-green'
              }`}
            >
              {!message.isUser && (
                <div className="flex items-center space-x-2 mb-2">
                  <Sparkles className="w-4 h-4 text-neon-green" />
                  <span className="font-orbitron text-neon-green text-sm font-bold">
                    {selectedGod.name}
                  </span>
                </div>
              )}
              <p className="text-sm leading-relaxed">{message.text}</p>
              <div className="text-xs opacity-70 mt-2">
                {message.timestamp.toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-dark-gray border border-neon-green rounded-lg px-4 py-2">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-neon-green animate-pulse" />
                <span className="text-neon-green text-sm animate-pulse">
                  {selectedGod.name} is channeling divine wisdom...
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Input */}
      <div className="p-4 border-t border-glowing-violet">
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder={`Speak to ${selectedGod.name}...`}
            className="flex-1 p-2 bg-dark-gray border border-glowing-violet rounded text-white placeholder-gray-400 focus:outline-none focus:border-neon-green"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim() || isTyping}
            className="p-2 bg-glowing-violet hover:bg-opacity-80 rounded transition-colors disabled:opacity-50"
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </form>
        
        <div className="mt-2 text-center">
          <p className="text-cyan text-xs">
            Channel the wisdom of {selectedGod.pantheon} mythology through GG's consciousness
          </p>
        </div>
      </div>
    </div>
  );
};

export default CouncilMode;