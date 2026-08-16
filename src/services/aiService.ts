import { UserRole } from '../types';
import { ActionCardItem } from '../components/ai/ChatMessage';

export interface BackendChatAction {
  label: string;
  action: string;
}

export interface BackendChatResponse {
  success: boolean;
  message: string;
  actions?: BackendChatAction[];
  model?: string;
  error?: string;
}

export interface SendChatMessageParams {
  message: string;
  role?: UserRole | null;
  page?: string;
  conversation?: Array<{ role: 'user' | 'assistant'; content: string }>;
}

const API_BASE = '/api';

class AIService {
  private getToken(): string | null {
    return localStorage.getItem('eduai_token');
  }

  /**
   * Maps safe backend action IDs to deterministic frontend routes and styles
   */
  public mapActionToFrontendCard(backendAction: BackendChatAction, role: UserRole | null): ActionCardItem {
    const isTeacher = role === 'teacher';
    const isAdmin = role === 'admin';

    let path = '/student';
    let icon: 'test' | 'analytics' | 'assignment' | 'grade' | 'course' | 'general' = 'general';
    let variant: 'primary' | 'secondary' | 'outline' = 'primary';

    switch (backendAction.action) {
      case 'OPEN_DIAGNOSTIC':
        path = isTeacher ? '/teacher/ai' : '/student/ai';
        icon = 'test';
        variant = 'primary';
        break;
      case 'OPEN_AI_ANALYTICS':
        path = isTeacher ? '/teacher/ai' : isAdmin ? '/admin/ai' : '/student/ai';
        icon = 'analytics';
        variant = 'secondary';
        break;
      case 'OPEN_ASSIGNMENTS':
        path = isTeacher ? '/teacher/assignments' : '/student/assignments';
        icon = 'assignment';
        variant = 'primary';
        break;
      case 'OPEN_COURSES':
        path = isTeacher ? '/teacher/courses' : '/student/courses';
        icon = 'course';
        variant = 'outline';
        break;
      case 'OPEN_GRADES':
        path = isTeacher ? '/teacher/grades' : '/student/grades';
        icon = 'grade';
        variant = 'primary';
        break;
      case 'OPEN_ATTENDANCE':
        path = isTeacher ? '/teacher/attendance' : '/student/attendance';
        icon = 'general';
        variant = 'outline';
        break;
      case 'OPEN_EXAMS':
        path = isTeacher ? '/teacher/exams' : '/student/exams';
        icon = 'test';
        variant = 'primary';
        break;
      case 'OPEN_SCHEDULE':
        path = '/student/schedule';
        icon = 'general';
        variant = 'outline';
        break;
      case 'OPEN_PROGRESS':
        path = '/student/progress';
        icon = 'analytics';
        variant = 'secondary';
        break;
      case 'OPEN_PROFILE':
        path = isTeacher ? '/teacher/profile' : isAdmin ? '/admin/profile' : '/student/profile';
        icon = 'general';
        variant = 'outline';
        break;
      case 'OPEN_DASHBOARD':
      default:
        path = isTeacher ? '/teacher' : isAdmin ? '/admin' : '/student';
        icon = 'general';
        variant = 'outline';
        break;
    }

    return {
      label: backendAction.label || 'View Details',
      path,
      actionId: backendAction.action,
      icon,
      variant,
    };
  }

  /**
   * Sends user message to backend /api/ai/chat
   */
  public async sendChatMessage(params: SendChatMessageParams): Promise<BackendChatResponse> {
    const token = this.getToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${API_BASE}/ai/chat`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          message: params.message,
          role: params.role || 'student',
          page: params.page || '/',
          conversation: params.conversation || [],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || errorData.error || `HTTP ${response.status}`);
      }

      const data: BackendChatResponse = await response.json();
      return data;
    } catch (err: any) {
      console.warn('[AIService] Backend request error:', err.message);
      return {
        success: false,
        message: err.message || 'EduAI Copilot is temporarily unavailable. Please try again in a moment.',
      };
    }
  }
}

export const aiService = new AIService();
