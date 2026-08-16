import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ChatButton } from './ChatButton';
import { ChatPanel } from './ChatPanel';
import { ChatMessageData, ActionCardItem } from './ChatMessage';
import { aiService } from '../../services/aiService';

export const EduAICopilot: React.FC = () => {
  const { user, role } = useAuth();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessageData[]>([]);

  // Clear unread indicator when opened
  const handleToggleOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
      setIsMinimized(false);
      setHasUnread(false);
    } else {
      setIsOpen(false);
    }
  };

  const handleToggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleClearMessages = () => {
    setMessages([]);
  };

  const handleSendMessage = async (text: string) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 1. Add user message to conversation
    const userMsg: ChatMessageData = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text,
      timestamp,
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      // 2. Prepare conversation history for backend
      const conversationHistory = updatedMessages.map((m) => ({
        role: (m.sender === 'user' ? 'user' : 'assistant') as 'user' | 'assistant',
        content: m.text,
      }));

      // 3. Call backend /api/ai/chat
      const response = await aiService.sendChatMessage({
        message: text,
        role,
        page: location.pathname,
        conversation: conversationHistory,
      });

      // 4. Map any backend action triggers to frontend cards
      let actionCards: ActionCardItem[] | undefined;
      if (response.actions && response.actions.length > 0) {
        actionCards = response.actions.map((act) =>
          aiService.mapActionToFrontendCard(act, role)
        );
      }

      // 5. Append AI response
      const aiMsg: ChatMessageData = {
        id: `ai_${Date.now()}`,
        sender: 'assistant',
        text: response.message || 'EduAI Copilot is available to assist you with your academic questions.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionCards,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      console.error('[EduAICopilot] Chat error:', err);
      const errorMsg: ChatMessageData = {
        id: `ai_err_${Date.now()}`,
        sender: 'assistant',
        text: 'EduAI Copilot is temporarily unavailable. Please verify your connection or try again in a moment.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ChatButton
        isOpen={isOpen}
        hasUnread={hasUnread}
        onClick={handleToggleOpen}
      />

      <ChatPanel
        isOpen={isOpen}
        isMinimized={isMinimized}
        onClose={() => setIsOpen(false)}
        onToggleMinimize={handleToggleMinimize}
        messages={messages}
        onSendMessage={handleSendMessage}
        onClearMessages={handleClearMessages}
        isLoading={isLoading}
        role={role}
        userName={user?.name}
        pathname={location.pathname}
      />
    </>
  );
};
