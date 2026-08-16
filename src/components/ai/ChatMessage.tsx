import React from 'react';
import { Sparkles, User as UserIcon, ArrowRight, ExternalLink, BookOpen, BarChart3, FileText, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface ActionCardItem {
  label: string;
  path?: string;
  actionId?: string;
  icon?: 'test' | 'analytics' | 'assignment' | 'grade' | 'course' | 'general';
  variant?: 'primary' | 'secondary' | 'outline';
}

export interface ChatMessageData {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  actionCards?: ActionCardItem[];
}

interface ChatMessageProps {
  message: ChatMessageData;
  onActionClick?: (action: ActionCardItem) => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, onActionClick }) => {
  const navigate = useNavigate();
  const isUser = message.sender === 'user';

  const handleAction = (action: ActionCardItem) => {
    if (onActionClick) {
      onActionClick(action);
    }
    if (action.path) {
      navigate(action.path);
    }
  };

  const renderIcon = (iconName?: string) => {
    switch (iconName) {
      case 'test':
        return <BookOpen className="w-3.5 h-3.5 shrink-0" />;
      case 'analytics':
        return <BarChart3 className="w-3.5 h-3.5 shrink-0" />;
      case 'assignment':
        return <FileText className="w-3.5 h-3.5 shrink-0" />;
      default:
        return <ArrowRight className="w-3.5 h-3.5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />;
    }
  };

  // Simple rich text formatting for bold (**text**), bullet points, and code snippets
  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, lIdx) => {
      // Bullet list item
      const isBullet = line.trim().startsWith('•') || line.trim().startsWith('-');
      const cleanLine = isBullet ? line.trim().replace(/^[•-]\s*/, '') : line;

      // Parse bold **words**
      const parts = cleanLine.split(/(\*\*.*?\*\*)/g);

      const parsedLine = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={pIdx} className="font-semibold text-on-surface">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      });

      if (isBullet) {
        return (
          <div key={lIdx} className="flex items-start gap-2 my-1 pl-1">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0 mt-2" />
            <span className="leading-relaxed">{parsedLine}</span>
          </div>
        );
      }

      return (
        <p key={lIdx} className={lIdx > 0 ? 'mt-2 leading-relaxed' : 'leading-relaxed'}>
          {parsedLine}
        </p>
      );
    });
  };

  return (
    <div
      className={`flex items-start gap-2.5 my-3 copilot-fade-up ${
        isUser ? 'flex-row-reverse' : 'flex-row'
      }`}
    >
      {/* Avatar */}
      <div
        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 shadow-xs ${
          isUser
            ? 'bg-primary-container text-white'
            : 'bg-gradient-to-tr from-primary to-secondary text-white'
        }`}
      >
        {isUser ? (
          <UserIcon className="w-4 h-4" />
        ) : (
          <Sparkles className="w-4 h-4 animate-pulse" style={{ animationDuration: '3s' }} />
        )}
      </div>

      {/* Message Bubble & Cards */}
      <div className={`max-w-[82%] sm:max-w-[78%] flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`p-3.5 rounded-2xl text-[13.5px] shadow-xs ${
            isUser
              ? 'bg-gradient-to-r from-primary to-secondary text-white rounded-tr-xs'
              : 'bg-surface-container-lowest border border-outline-variant/30 text-on-surface rounded-tl-xs'
          }`}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap leading-relaxed">{message.text}</p>
          ) : (
            <div className="space-y-1">{renderFormattedText(message.text)}</div>
          )}
        </div>

        {/* Action Cards (if present) */}
        {!isUser && message.actionCards && message.actionCards.length > 0 && (
          <div className="w-full mt-2.5 space-y-2 copilot-scale-in">
            <div className="p-3 bg-surface-container-low/70 border border-secondary/20 rounded-xl space-y-2 shadow-xs">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-secondary uppercase tracking-wider">
                <Sparkles className="w-3 h-3" />
                <span>Recommended Actions</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {message.actionCards.map((card, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleAction(card)}
                    className={`group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer shadow-xs transform hover:scale-[1.02] active:scale-98 ${
                      card.variant === 'secondary'
                        ? 'bg-secondary text-white hover:bg-secondary-container'
                        : card.variant === 'outline'
                        ? 'bg-surface-container-lowest text-on-surface border border-outline-variant/50 hover:bg-surface-container'
                        : 'bg-primary text-white hover:bg-primary-container'
                    }`}
                  >
                    {renderIcon(card.icon)}
                    <span>{card.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Timestamp */}
        <span className="text-[10px] text-on-surface-variant/70 mt-1 px-1">
          {message.timestamp}
        </span>
      </div>
    </div>
  );
};

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-start gap-2.5 my-3 copilot-fade-up">
      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-primary to-secondary text-white flex items-center justify-center shrink-0 shadow-xs">
        <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '3s' }} />
      </div>

      <div className="p-3.5 bg-surface-container-lowest border border-outline-variant/30 text-on-surface rounded-2xl rounded-tl-xs shadow-xs flex items-center gap-2">
        <span className="text-xs font-medium text-on-surface-variant">AI is thinking</span>
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-secondary copilot-dot-1" />
          <span className="w-1.5 h-1.5 rounded-full bg-secondary copilot-dot-2" />
          <span className="w-1.5 h-1.5 rounded-full bg-secondary copilot-dot-3" />
        </div>
      </div>
    </div>
  );
};
