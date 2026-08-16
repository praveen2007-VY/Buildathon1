import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  X, 
  Minus, 
  Maximize2, 
  RotateCcw, 
  MoreVertical, 
  Compass, 
  BookOpen, 
  CheckCircle,
  HelpCircle,
  MessageSquare
} from 'lucide-react';
import { UserRole } from '../../types';
import { ChatMessage, ChatMessageData, ActionCardItem, TypingIndicator } from './ChatMessage';
import { QuickActions } from './QuickActions';
import { ChatInput } from './ChatInput';

interface ChatPanelProps {
  isOpen: boolean;
  isMinimized: boolean;
  onClose: () => void;
  onToggleMinimize: () => void;
  messages: ChatMessageData[];
  onSendMessage: (text: string) => void;
  onClearMessages: () => void;
  isLoading: boolean;
  role: UserRole | null;
  userName?: string;
  pathname: string;
}

export const ChatPanel: React.FC<ChatPanelProps> = ({
  isOpen,
  isMinimized,
  onClose,
  onToggleMinimize,
  messages,
  onSendMessage,
  onClearMessages,
  isLoading,
  role,
  userName,
  pathname,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when new message or loading state appears
  useEffect(() => {
    if (messagesEndRef.current && isOpen && !isMinimized) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen, isMinimized]);

  // Handle Escape key to close panel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Minimized Compact State
  if (isMinimized) {
    return (
      <div 
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 p-3 px-4 rounded-2xl bg-surface-container-lowest border border-secondary/30 shadow-floating text-on-surface cursor-pointer copilot-scale-in"
        onClick={onToggleMinimize}
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-secondary text-white flex items-center justify-center shadow-xs">
          <Sparkles className="w-4 h-4" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-bold text-on-surface">EduAI Copilot</span>
          <span className="text-[11px] text-tertiary flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse" />
            Active · Click to expand
          </span>
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleMinimize();
          }}
          className="p-1 text-on-surface-variant hover:text-on-surface rounded-lg hover:bg-surface-container ml-2"
          aria-label="Expand EduAI Copilot"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="p-1 text-on-surface-variant hover:text-error rounded-lg hover:bg-error/10"
          aria-label="Close EduAI Copilot"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  const isTeacher = role === 'teacher';

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      <div 
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs sm:hidden copilot-fade-up"
        aria-hidden="true"
      />

      {/* Main Chat Panel Container */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="EduAI Copilot Academic Assistant"
        className="fixed z-50 inset-x-2 bottom-2 top-14 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[410px] sm:h-[640px] sm:max-h-[calc(100vh-2rem)] flex flex-col bg-surface-container-lowest border border-outline-variant/30 rounded-2xl shadow-floating overflow-hidden copilot-slide-in"
      >
        {/* Panel Header */}
        <header className="p-3.5 px-4 bg-gradient-to-r from-surface-container-low via-surface-container to-surface-container-low border-b border-outline-variant/30 flex items-center justify-between shrink-0 select-none">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary via-[#3b4ecc] to-secondary text-white flex items-center justify-center shadow-xs">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#10b981] border-2 border-surface-container-lowest" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-title text-sm font-bold text-on-surface">EduAI Copilot</h2>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-secondary/15 text-secondary">
                  AI
                </span>
              </div>
              <p className="text-[11px] text-on-surface-variant">Your intelligent academic assistant</p>
            </div>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-1 relative">
            {/* Options Dropdown Trigger */}
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-1.5 text-on-surface-variant hover:text-on-surface rounded-lg hover:bg-surface-container-high transition-colors"
              aria-label="More options"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {menuOpen && (
              <div 
                className="absolute top-full right-0 mt-1 w-44 bg-surface-container-lowest border border-outline-variant/30 rounded-xl shadow-floating py-1 z-50 copilot-scale-in text-xs"
              >
                <button
                  type="button"
                  onClick={() => {
                    onClearMessages();
                    setMenuOpen(false);
                  }}
                  className="w-full px-3 py-2 text-left text-on-surface hover:bg-surface-container flex items-center gap-2"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-secondary" />
                  <span>Clear conversation</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onSendMessage('Help me navigate EduAI');
                    setMenuOpen(false);
                  }}
                  className="w-full px-3 py-2 text-left text-on-surface hover:bg-surface-container flex items-center gap-2"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-primary" />
                  <span>Feature guide</span>
                </button>
              </div>
            )}

            {/* Minimize */}
            <button
              type="button"
              onClick={onToggleMinimize}
              className="p-1.5 text-on-surface-variant hover:text-on-surface rounded-lg hover:bg-surface-container-high transition-colors hidden sm:flex"
              aria-label="Minimize Copilot"
            >
              <Minus className="w-4 h-4" />
            </button>

            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-on-surface-variant hover:text-error rounded-lg hover:bg-error/10 transition-colors"
              aria-label="Close Copilot"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Message Stream Container */}
        <div 
          ref={scrollContainerRef}
          className="flex-1 p-3.5 overflow-y-auto space-y-2 bg-gradient-to-b from-background to-surface-container-lowest"
        >
          {/* Welcome Screen if no user messages yet */}
          {messages.length === 0 ? (
            <div className="py-3 px-1 space-y-4">
              {/* Staggered Greeting Header */}
              <div 
                className="p-4 rounded-2xl bg-gradient-to-br from-secondary/10 via-primary/5 to-transparent border border-secondary/20 space-y-2"
                style={{ animation: 'copilotFadeUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
              >
                <div className="flex items-center gap-2 text-secondary font-bold text-sm">
                  <span className="text-xl">👋</span>
                  <span>Hi {userName ? userName.split(' ')[0] : 'there'}! I'm EduAI Copilot</span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {isTeacher
                    ? "I'm here to assist you with class analytics, identifying struggling students, drafting quiz assessments, and tracking academic progress."
                    : "I can help analyze your course performance, suggest targeted diagnostic practice quizzes, explain assignments, and plan your study schedule."}
                </p>
                <div className="pt-1 flex items-center gap-1.5 text-[11px] font-semibold text-primary">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>How can I help you today?</span>
                </div>
              </div>

              {/* Contextual Quick Action Suggestions */}
              <QuickActions 
                role={role} 
                pathname={pathname} 
                onSelectAction={onSendMessage} 
              />
            </div>
          ) : (
            <>
              {/* Message List */}
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}

              {/* Typing State Indicator */}
              {isLoading && <TypingIndicator />}
            </>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Bottom Input Area */}
        <ChatInput
          onSendMessage={onSendMessage}
          isLoading={isLoading}
          placeholder={
            isTeacher
              ? 'Ask about students, grades, or lesson plans...'
              : 'Ask about assignments, exams, or courses...'
          }
        />
      </div>
    </>
  );
};
