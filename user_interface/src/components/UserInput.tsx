import React, { useState } from 'react';
import { Send, Mic, Paperclip } from 'lucide-react';

interface UserInputProps {
  onSendMessage: (message: string) => void;
}

const UserInput: React.FC<UserInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  return (
    <div className="p-6 border-t border-glowing-violet">
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <button
          type="button"
          className="p-3 hover:bg-glowing-violet rounded-lg transition-colors"
        >
          <Paperclip className="w-5 h-5 text-neon-green" />
        </button>
        
        <div className="flex-1 relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Whisper to the void..."
            className="w-full bg-dark-gray border border-glowing-violet rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-neon-green text-base"
          />
        </div>
        
        <button
          type="button"
          onClick={toggleRecording}
          className={`p-3 rounded-lg transition-colors ${
            isRecording 
              ? 'bg-neon-green text-black animate-pulse' 
              : 'hover:bg-glowing-violet text-neon-green'
          }`}
        >
          <Mic className="w-5 h-5" />
        </button>
        
        <button
          type="submit"
          disabled={!message.trim()}
          className="p-3 bg-glowing-violet hover:bg-opacity-80 rounded-lg transition-colors disabled:opacity-50"
        >
          <Send className="w-5 h-5 text-white" />
        </button>
      </form>
    </div>
  );
};

export default UserInput;