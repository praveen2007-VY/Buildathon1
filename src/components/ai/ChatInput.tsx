import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Mic } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  placeholder?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  isLoading,
  placeholder = 'Ask EduAI anything...',
}) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    onSendMessage(input.trim());
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const canSend = input.trim().length > 0 && !isLoading;

  return (
    <div className="p-3 bg-surface-container-lowest border-t border-outline-variant/30">
      <div className="relative flex flex-col rounded-2xl bg-surface-container-low border border-outline-variant/40 focus-within:border-secondary focus-within:ring-2 focus-within:ring-secondary/20 transition-all duration-200 shadow-xs">
        {/* Text Input */}
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={isLoading}
          rows={1}
          aria-label="Ask EduAI"
          className="w-full px-3.5 pt-3 pb-2 bg-transparent text-[13.5px] text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none resize-none max-h-32 min-h-[42px] leading-relaxed"
        />

        {/* Footer controls inside input card */}
        <div className="flex items-center justify-between px-2.5 pb-2 pt-0.5">
          {/* Decorative Tools */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled
              title="File attachment coming soon"
              aria-label="File attachment coming soon"
              className="p-1.5 rounded-lg text-on-surface-variant/40 hover:text-on-surface-variant/60 cursor-not-allowed transition-colors"
            >
              <Paperclip className="w-4 h-4" />
            </button>
            <button
              type="button"
              disabled
              title="Voice query coming soon"
              aria-label="Voice query coming soon"
              className="p-1.5 rounded-lg text-on-surface-variant/40 hover:text-on-surface-variant/60 cursor-not-allowed transition-colors"
            >
              <Mic className="w-4 h-4" />
            </button>
          </div>

          {/* Send Button */}
          <button
            type="button"
            onClick={handleSend}
            disabled={!canSend}
            aria-label="Send message"
            className={`p-2 rounded-xl transition-all duration-200 flex items-center justify-center cursor-pointer ${
              canSend
                ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-xs hover:scale-105 active:scale-95'
                : 'bg-outline-variant/20 text-on-surface-variant/40 cursor-not-allowed'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center px-2 pt-1.5 text-[10.5px] text-on-surface-variant/60">
        <span>EduAI Copilot Academic Assistant</span>
        <span>Enter to send · Shift+Enter for newline</span>
      </div>
    </div>
  );
};
