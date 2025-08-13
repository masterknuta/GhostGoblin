import React, { useState } from 'react';
import { X, User, Heart, AlertTriangle } from 'lucide-react';

interface ThisOrThatProps {
  onClose: () => void;
}

const ThisOrThat: React.FC<ThisOrThatProps> = ({ onClose }) => {
  const [currentQuestion, setCurrentQuestion] = useState({
    option1: "Tabs",
    option2: "Spaces",
    category: "Code Style"
  });
  const [profile, setProfile] = useState<any>(null);
  const [answers, setAnswers] = useState<string[]>([]);

  const questions = [
    { option1: "Tabs", option2: "Spaces", category: "Code Style" },
    { option1: "Vim", option2: "Emacs", category: "Editor Wars" },
    { option1: "Frontend", option2: "Backend", category: "Development" },
    { option1: "Coffee", option2: "Tea", category: "Fuel" },
    { option1: "Dark Mode", option2: "Light Mode", category: "Theme" }
  ];

  const handleChoice = (choice: string) => {
    const newAnswers = [...answers, choice];
    setAnswers(newAnswers);
    
    if (newAnswers.length < questions.length) {
      setCurrentQuestion(questions[newAnswers.length]);
    } else {
      generateProfile(newAnswers);
    }
  };

  const generateProfile = (userAnswers: string[]) => {
    const archetype = userAnswers.includes("Tabs") && userAnswers.includes("Vim") 
      ? "The Minimalist Coder" 
      : "The Modern Developer";
    
    setProfile({
      archetype,
      bio: "A mysterious developer who speaks in semicolons and dreams in binary.",
      greenFlags: ["Writes clean code", "Good at debugging", "Team player"],
      redFlags: ["Commits directly to main", "No tests", "Uses Comic Sans"]
    });
  };

  const resetGame = () => {
    setAnswers([]);
    setProfile(null);
    setCurrentQuestion(questions[0]);
  };

  return (
    <div className="h-full bg-deep-purple flex flex-col">
      <div className="p-4 border-b border-glowing-violet flex items-center justify-between">
        <h2 className="font-orbitron text-lg font-bold text-neon-green">This or That: Dev Dating</h2>
        <button onClick={onClose} className="p-1 hover:bg-glowing-violet rounded">
          <X className="w-5 h-5 text-white" />
        </button>
      </div>
      
      {!profile ? (
        <div className="flex-1 p-4 flex flex-col justify-center">
          <div className="text-center mb-6">
            <h3 className="font-orbitron text-cyan mb-2">Question {answers.length + 1} of {questions.length}</h3>
            <p className="text-gray-400 text-sm">{currentQuestion.category}</p>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={() => handleChoice(currentQuestion.option1)}
              className="w-full p-6 bg-dark-gray border-2 border-glowing-violet rounded-lg hover:border-neon-green hover:bg-glowing-violet hover:bg-opacity-20 transition-all"
            >
              <span className="text-white font-bold text-lg">{currentQuestion.option1}</span>
            </button>
            
            <div className="text-center text-cyan font-orbitron">OR</div>
            
            <button
              onClick={() => handleChoice(currentQuestion.option2)}
              className="w-full p-6 bg-dark-gray border-2 border-glowing-violet rounded-lg hover:border-neon-green hover:bg-glowing-violet hover:bg-opacity-20 transition-all"
            >
              <span className="text-white font-bold text-lg">{currentQuestion.option2}</span>
            </button>
          </div>
          
          <div className="mt-6 flex justify-center space-x-2">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index < answers.length ? 'bg-neon-green' : 'bg-dark-gray'
                }`}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="bg-dark-gray border border-neon-green rounded-lg p-4 space-y-4">
            <div className="text-center">
              <User className="w-16 h-16 mx-auto text-neon-green mb-2" />
              <h3 className="font-orbitron text-xl text-neon-green">{profile.archetype}</h3>
              <p className="text-gray-300 text-sm mt-2">{profile.bio}</p>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-neon-green bg-opacity-10 border border-neon-green rounded p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <Heart className="w-4 h-4 text-neon-green" />
                  <span className="font-bold text-neon-green">Green Flags</span>
                </div>
                <ul className="text-white text-sm space-y-1">
                  {profile.greenFlags.map((flag: string, index: number) => (
                    <li key={index}>• {flag}</li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-red-500 bg-opacity-10 border border-red-500 rounded p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  <span className="font-bold text-red-400">Red Flags</span>
                </div>
                <ul className="text-white text-sm space-y-1">
                  {profile.redFlags.map((flag: string, index: number) => (
                    <li key={index}>• {flag}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <button
              onClick={resetGame}
              className="w-full py-2 bg-glowing-violet hover:bg-opacity-80 rounded-lg font-bold text-white transition-colors"
            >
              Create New Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThisOrThat;