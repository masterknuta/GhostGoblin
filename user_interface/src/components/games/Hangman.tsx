import React, { useState } from 'react';
import { X } from 'lucide-react';

interface HangmanProps {
  onClose: () => void;
}

const Hangman: React.FC<HangmanProps> = ({ onClose }) => {
  const [word] = useState('CONSCIOUSNESS');
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const maxWrongGuesses = 6;

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  
  const displayWord = word
    .split('')
    .map(letter => guessedLetters.includes(letter) ? letter : '_')
    .join(' ');

  const handleLetterClick = (letter: string) => {
    if (guessedLetters.includes(letter)) return;
    
    setGuessedLetters([...guessedLetters, letter]);
    if (!word.includes(letter)) {
      setWrongGuesses(wrongGuesses + 1);
    }
  };

  const hangmanParts = [
    '  ___',
    '  |  |',
    '  |  O',
    '  | /|\\',
    '  |  |',
    '  | / \\',
    '__|__'
  ];

  return (
    <div className="h-full bg-deep-purple flex flex-col">
      <div className="p-4 border-b border-glowing-violet flex items-center justify-between">
        <h2 className="font-orbitron text-lg font-bold text-neon-green">Hangman: Lorebound Edition</h2>
        <button onClick={onClose} className="p-1 hover:bg-glowing-violet rounded">
          <X className="w-5 h-5 text-white" />
        </button>
      </div>
      
      <div className="flex-1 p-4 space-y-4">
        <div className="text-center">
          <div className="bg-dark-gray p-4 rounded-lg font-mono text-cyan">
            {hangmanParts.slice(0, Math.min(wrongGuesses + 1, hangmanParts.length)).map((part, i) => (
              <div key={i}>{part}</div>
            ))}
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-orbitron text-white tracking-widest mb-4">
            {displayWord}
          </div>
          <p className="text-sm text-cyan">Wrong guesses: {wrongGuesses}/{maxWrongGuesses}</p>
        </div>
        
        <div className="grid grid-cols-6 gap-2">
          {alphabet.map(letter => (
            <button
              key={letter}
              onClick={() => handleLetterClick(letter)}
              disabled={guessedLetters.includes(letter)}
              className={`p-2 rounded text-sm font-bold transition-colors ${
                guessedLetters.includes(letter)
                  ? word.includes(letter)
                    ? 'bg-neon-green text-black'
                    : 'bg-red-500 text-white'
                  : 'bg-dark-gray text-white hover:bg-glowing-violet'
              }`}
            >
              {letter}
            </button>
          ))}
        </div>
        
        <div className="bg-dark-gray p-3 rounded-lg">
          <p className="text-cyan text-sm">
            <strong>GG whispers:</strong> "This word holds the key to understanding our digital souls..."
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hangman;