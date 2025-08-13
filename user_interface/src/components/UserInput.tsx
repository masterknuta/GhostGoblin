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
    setIsRecording((prev) => !prev);
  };

  return (
    <div className="p-4 border-t border-glowing-violet">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        
        {/* Attach Button */}
        <button
          type="button"
          className="p-2 rounded-lg hover:bg-glowing-violet hover:bg-opacity-30 transition-colors"
        >
          <Paperclip className="w-4 h-4 text-neon-green" />
        </button>

        {/* Message Input */}
        <div className="flex-1 relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Whisper to the void..."
            className="w-full bg-dark-gray border border-glowing-violet rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-neon-green"
          />
        </div>

        {/* Mic Button */}
        <button
          type="button"
          onClick={toggleRecording}
          className={`p-2 rounded-lg transition-colors ${
            isRecording
              ? 'bg-neon-green text-black animate-pulse'
              : 'hover:bg-glowing-violet hover:bg-opacity-30 text-neon-green'
          }`}
        >
          <Mic className="w-4 h-4" />
        </button>

        {/* Send Button */}
        <button
          type="submit"
          disabled={!message.trim()}
          className="p-2 bg-glowing-violet hover:bg-opacity-80 rounded-lg transition-colors disabled:opacity-50"
        >
          <Send className="w-4 h-4 text-white" />
        </button>
      </form>
    </div>
  );
};

export default UserInput;
