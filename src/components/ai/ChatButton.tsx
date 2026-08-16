import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface ChatButtonProps {
  isOpen: boolean;
  hasUnread: boolean;
  onClick: () => void;
}

export const ChatButton: React.FC<ChatButtonProps> = ({ isOpen, hasUnread, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2 group">
      {/* Hover Tooltip */}
      <div
        className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-on-background/90 text-white text-xs font-semibold shadow-lg backdrop-blur-sm pointer-events-none transition-all duration-200 ${
          isHovered && !isOpen
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 translate-x-2 pointer-events-none'
        }`}
      >
        <Sparkles className="w-3.5 h-3.5 text-secondary-fixed animate-spin" style={{ animationDuration: '4s' }} />
        <span>Ask EduAI</span>
      </div>

      {/* Floating Action Button */}
      <button
        type="button"
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label={isOpen ? 'Close EduAI Copilot' : 'Open EduAI Copilot'}
        aria-expanded={isOpen}
        className={`relative w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-primary via-[#3b4ecc] to-secondary text-white flex items-center justify-center cursor-pointer shadow-ai transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-secondary/30 ${
          isOpen ? 'rotate-90' : 'copilot-glow-pulse'
        }`}
      >
        {/* Glow backdrop layer */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary to-secondary opacity-0 group-hover:opacity-40 blur-md transition-opacity duration-300 -z-10" />

        {/* Icon */}
        <div className="relative flex items-center justify-center">
          <Sparkles className={`w-6 h-6 transition-transform duration-300 group-hover:rotate-12 ${isOpen ? 'scale-90' : 'scale-100'}`} />
        </div>

        {/* Unread / Unopened Notification Badge */}
        {hasUnread && !isOpen && (
          <span className="absolute top-0 right-0 flex h-4 w-4">
            <span className="copilot-badge-pulse absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-secondary-fixed text-[9px] font-bold text-on-secondary-fixed items-center justify-center border-2 border-white">
              1
            </span>
          </span>
        )}
      </button>
    </div>
  );
};
