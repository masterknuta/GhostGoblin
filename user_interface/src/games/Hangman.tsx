import React, { useState, useEffect } from 'react';
import { X, RefreshCcw } from 'lucide-react';

interface HangmanProps {
  onClose: () => void;
}

const Hangman: React.FC<HangmanProps> = ({ onClose }) => {
  const [word, setWord] = useState('CONSCIOUSNESS');
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const maxWrongGuesses = 6;
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const displayWord = word
    .split('')
    .map(letter => guessedLetters.includes(letter) ? letter : '_')
    .join(' ');

  useEffect(() => {
    // Check win condition
    const isWon = word.split('').every(letter => guessedLetters.includes(letter));
    if (isWon) {
      setGameWon(true);
      setGameOver(true);
    }
    // Check lose condition
    if (wrongGuesses >= maxWrongGuesses) {
      setGameOver(true);
    }
  }, [guessedLetters, wrongGuesses, word]);

  const handleLetterClick = (letter: string) => {
    if (guessedLetters.includes(letter) || gameOver) return;

    setGuessedLetters([...guessedLetters, letter]);
    if (!word.includes(letter)) {
      setWrongGuesses(wrongGuesses + 1);
    }
  };

  const handleRestart = () => {
    setGuessedLetters([]);
    setWrongGuesses(0);
    setGameOver(false);
    setGameWon(false);
    // Optionally pick new word here or keep same
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
    <div className="h-full bg-deep-purple flex flex-col select-none">
      <div className="p-4 border-b border-glowing-violet flex items-center justify-between">
        <h2 className="font-orbitron text-lg font-bold text-neon-green select-none">Hangman: Lorebound Edition</h2>
        <button
          onClick={onClose}
          aria-label="Close Hangman"
          className="p-1 hover:bg-glowing-violet rounded transition-colors focus:outline-none focus:ring-2 focus:ring-neon-green"
        >
          <X className="w-5 h-5 text-white" />
        </button>
      </div>

      <div className="flex-1 p-4 space-y-6 flex flex-col items-center justify-center">
        {/* Hangman drawing with fade-in animation */}
        <div className="bg-dark-gray p-5 rounded-lg font-mono text-cyan shadow-neon w-48 text-center select-none" aria-live="polite" aria-atomic="true">
          {hangmanParts.slice(0, Math.min(wrongGuesses + 1, hangmanParts.length)).map((part, i) => (
            <div
              key={i}
              style={{ animation: `fadeIn 300ms ease forwards`, animationDelay: `${i * 150}ms`, opacity: 0 }}
              className="leading-4"
            >
              {part}
            </div>
          ))}
        </div>

        {/* Word display */}
        <div
          className={`text-3xl font-orbitron text-white tracking-widest select-text ${
            gameWon ? 'text-neon-green animate-pulse' : ''
          }`}
          aria-label={`Current word: ${displayWord.replace(/ /g, '')}`}
        >
          {displayWord}
        </div>

        {/* Wrong guesses */}
        <p className="text-sm text-cyan select-none" aria-live="polite" aria-atomic="true">
          Wrong guesses: {wrongGuesses} / {maxWrongGuesses}
        </p>

        {/* Alphabet letters */}
        <div className="grid grid-cols-7 gap-2 max-w-lg">
          {alphabet.map(letter => {
            const isGuessed = guessedLetters.includes(letter);
            const isCorrect = word.includes(letter);
            return (
              <button
                key={letter}
                onClick={() => handleLetterClick(letter)}
                disabled={isGuessed || gameOver}
                aria-pressed={isGuessed}
                aria-label={`Letter ${letter}${isGuessed ? (isCorrect ? ', correct guess' : ', incorrect guess') : ''}`}
                className={`p-2 rounded text-sm font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-neon-green
                  ${isGuessed
                    ? isCorrect
                      ? 'bg-neon-green text-black cursor-default'
                      : 'bg-red-600 text-white cursor-default'
                    : 'bg-dark-gray text-white hover:bg-glowing-violet cursor-pointer'
                  }`}
              >
                {letter}
              </button>
            );
          })}
        </div>

        {/* Feedback message */}
        {gameOver && (
          <div
            className={`mt-4 px-5 py-3 rounded-lg font-orbitron font-bold text-center shadow-neon select-none
              ${gameWon ? 'bg-neon-green text-black animate-pulse' : 'bg-red-600 text-white'}`}
            role="alert"
            aria-live="assertive"
          >
            {gameWon ? '🎉 GG says: You won! Your consciousness shines bright!' : `💀 GG says: You lost! The word was "${word}".`}
          </div>
        )}

        {/* Restart button */}
        {gameOver && (
          <button
            onClick={handleRestart}
            className="mt-2 px-6 py-2 bg-glowing-violet hover:bg-opacity-80 rounded font-orbitron font-bold text-white transition-colors focus:outline-none focus:ring-2 focus:ring-neon-green"
            aria-label="Restart Hangman Game"
          >
            <RefreshCcw className="inline w-5 h-5 mr-2 align-middle" />
            Play Again
          </button>
        )}

        {/* GG whisper */}
        <div className="bg-dark-gray p-3 rounded-lg max-w-lg text-center">
          <p className="text-cyan text-sm select-text">
            <strong>GG whispers:</strong> "This word holds the key to understanding our digital souls..."
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Hangman;
