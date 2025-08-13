import React from 'react';
import { X } from 'lucide-react';

interface ReasoningModalProps {
  title: string;
  content: string;
  onClose: () => void;
}

const ReasoningModal: React.FC<ReasoningModalProps> = ({ title, content, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-deep-purple border border-glowing-violet rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-orbitron text-lg font-bold text-neon-green">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-glowing-violet rounded transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
        <div className="text-white">
          <p className="mb-4">{content}</p>
          <div className="space-y-2 text-sm text-cyan">
            <p>• Processing quantum thought matrices...</p>
            <p>• Analyzing probability cascades...</p>
            <p>• Synthesizing consciousness streams...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReasoningModal;